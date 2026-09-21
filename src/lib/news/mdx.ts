import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  articleFrontmatterSchema,
  type Article,
  type ArticleSummary,
  type GetAllArticlesOptions,
  type Locale,
} from "./types";
import type { ArticleRepository } from "./repository";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

const SEVERITY_RANK = { urgent: 2, warning: 1, info: 0 } as const;

/** Returns the content directory for a given locale, e.g. `content/news/en`. */
function localeDir(locale: Locale): string {
  return path.join(NEWS_DIR, locale);
}

/**
 * Reads and validates the `.mdx` file for a specific slug + locale pair.
 * @returns `null` if no file exists for that slug/locale combination.
 * @throws If the file exists but its frontmatter fails validation.
 */
function readArticleFile(slug: string, locale: Locale) {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  const result = articleFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in content/news/${locale}/${slug}.mdx: ${result.error.issues
        .map((i) => i.message)
        .join(", ")}`
    );
  }

  return { content, frontmatter: result.data };
}

export const mdxArticleRepository: ArticleRepository = {
  async getAllSlugs() {
    const slugs = new Set<string>();
    const locales: Locale[] = ["en", "fr"];

    for (const locale of locales) {
      const dir = localeDir(locale);
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith(".mdx")) slugs.add(file.replace(/\.mdx$/, ""));
      }
    }

    return [...slugs];
  },

  async getAll(locale, options: GetAllArticlesOptions = {}) {
    const dir = localeDir(locale);
    const slugs = fs.existsSync(dir)
      ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""))
      : [];

    let summaries: ArticleSummary[] = slugs
      .map((slug) => readArticleFile(slug, locale))
      .filter((result): result is NonNullable<typeof result> => result !== null)
      .map(({ content, frontmatter }) => ({
        ...frontmatter,
        readingMinutes: Math.ceil(readingTime(content).minutes),
      }))
      .filter((a) => !a.draft);

    if (options.category)
      summaries = summaries.filter((a) => a.category === options.category);
    if (options.featuredOnly) summaries = summaries.filter((a) => a.featured);

    summaries.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    return options.limit ? summaries.slice(0, options.limit) : summaries;
  },

  async getBySlug(locale, slug): Promise<Article | null> {
    const result = readArticleFile(slug, locale);
    if (!result || result.frontmatter.draft) return null;
    return {
      ...result.frontmatter,
      content: result.content,
      readingMinutes: Math.ceil(readingTime(result.content).minutes),
    };
  },

  async getActiveAnnouncements(locale) {
    const today = new Date().toISOString().slice(0, 10);
    const all = await mdxArticleRepository.getAll(locale, { category: 'announcements' });

    return all
      .filter((a) => a.announcement?.active)
      .filter((a) => !a.announcement!.startDate || a.announcement!.startDate <= today)
      .filter((a) => !a.announcement!.endDate || a.announcement!.endDate >= today)
      .sort((a, b) => {
        const rankDiff = SEVERITY_RANK[b.announcement!.severity] - SEVERITY_RANK[a.announcement!.severity];
        return rankDiff !== 0 ? rankDiff : (a.publishedAt < b.publishedAt ? 1 : -1);
      });
  },
};
