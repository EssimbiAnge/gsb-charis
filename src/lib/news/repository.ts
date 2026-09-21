import type {
  Article,
  ArticleSummary,
  GetAllArticlesOptions,
  Locale,
} from "./types";
import { mdxArticleRepository } from "./mdx";

/**
 * Data-access contract for news articles, scoped by locale.. The rest of the app depends
 * only on this interface — never on how/where articles are actually
 * stored — so the storage backend can be swapped (MDX today, a CMS or
 * Supabase later) without touching any page component.
 */
export interface ArticleRepository {
  /** Returns published article summaries for a given locale, newest first. */
  getAll(
    locale: Locale,
    options?: GetAllArticlesOptions
  ): Promise<ArticleSummary[]>;
  /** Returns a single full article by slug in the given locale, or `null`. */
  getBySlug(locale: Locale, slug: string): Promise<Article | null>;
  /** Returns every known slug across all locales (deduplicated) — used by `generateStaticParams`. */
  getAllSlugs(): Promise<string[]>;
  /** Returns currently-active announcements for a locale, most urgent/newest first. */
  getActiveAnnouncements(locale: Locale): Promise<ArticleSummary[]>;
}

/**
 * The active repository implementation.
 *
 * This is the only line that changes when the content source changes —
 * e.g. `export const articleRepository: ArticleRepository = supabaseArticleRepository;`
 */
export const articleRepository: ArticleRepository = mdxArticleRepository;
