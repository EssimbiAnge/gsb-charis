import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary, Locale } from "@/lib/news/types";
import React from "react";
import { articleCategories } from "@/lib/types";

/** Props for {@link ArticleCard}. */
export interface ArticleCardProps {
  /** The article summary to display. */
  article: ArticleSummary;
  /** Active locale, used to build the `/[lang]/news/[slug]` link and format the date. */
  locale: Locale;
  /** `"large"` renders a bigger image/title — use for the lead article and featured spots. */
  size?: "default" | "large";
}

/**
 * A news article preview card: cover image, category label, title,
 * excerpt, and publish date. Used in the listing grid and featured section.
 */
export function ArticleCard({
  article,
  locale,
  size = "default",
}: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { month: "long", year: "numeric" }
  );

  return (
    <Link
      href={`/${locale}/actualites/${article.slug}`}
      className="group block"
    >
      {article.coverImage && (
        <div
          className={`relative overflow-hidden bg-muted ${
            size === "large" ? "aspect-video" : "aspect-4/3"
          }`}
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="mt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {
            articleCategories.find((c) => c.slug === article.category)?.name[
              locale
            ]
          }
        </p>

        <h3
          className={`mt-1 font-semibold leading-snug ${
            size === "large" ? "text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}
