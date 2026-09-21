import { z } from "zod";
import { coerceDate } from "../utils";

/**
 * Frontmatter schema for a news article `.mdx` file. Validated on read
 * so a malformed file fails loudly (and specifically) instead of
 * producing a broken page at render time.
 *
 * @example
 * ```
 * ---
 * title: CHARIS Cultural Day 2026
 * slug: charis-cultural-day-2026
 * excerpt: A celebration of culture, creativity and collaboration.
 * publishedAt: 2026-09-08
 * author: CHARIS School
 * category: School Life
 * coverImage: /news/charis-cultural-day-2026/cover.jpg
 * featured: true
 * ---
 * ```
 */
export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  /** URL-safe identifier. Should match the filename, but is stored explicitly
   * so it survives a future migration where filenames won't exist. */
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  /** ISO date string, e.g. "2026-09-08". */
  /** Accepts either a YAML-parsed Date or a plain string, normalized to YYYY-MM-DD. */
  /** Accepts loosely-formatted dates ("2026-9-4", "9/4/2026", a Date) and normalizes to YYYY-MM-DD. */
  publishedAt: z.preprocess(
    coerceDate(),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
  ),
  author: z.string().default("CHARIS School"),
  category: z.string().default("General"),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  /** Set true to keep a file in content/news without publishing it. */
  draft: z.boolean().default(false),

  /** Marks this article to also appear as a site-wide announcement banner while active. */
  announcement: z
    .object({
      active: z.boolean().default(false),
      severity: z.enum(["info", "warning", "urgent"]).default("info"),
      /** Short banner-friendly text. Falls back to `excerpt` if omitted. */
      bannerText: z.string().optional(),
      /** ISO date — banner starts showing on this day. Omit to show immediately. */
      startDate: z
        .preprocess(coerceDate(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
        .optional(),
      /** ISO date — banner stops showing after this day. Omit for no auto-expiry. */
      endDate: z
        .preprocess(coerceDate(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
        .optional(),
    })
    .optional(),
});

/** Validated frontmatter for a single article. */
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

/** Article metadata plus computed fields, without the MDX body — used in listings. */
export interface ArticleSummary extends ArticleFrontmatter {
  /** Estimated reading time in minutes. */
  readingMinutes: number;
}

/** A full article: metadata plus the raw MDX body to be compiled/rendered. */
export interface Article extends ArticleSummary {
  /** Raw MDX source, ready to pass to `<MDXRemote source={...} />`. */
  content: string;
}

/** Optional filters accepted by `ArticleRepository.getAll`. */
export interface GetAllArticlesOptions {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
}

/** Supported site locales, matching the `[lang]` route segment. */
export type Locale = "en" | "fr";
