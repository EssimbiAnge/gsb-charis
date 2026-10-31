import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/content/mdx-components";
import type { Article, Locale } from "@/lib/news/types";
import { renderBrandText } from "./brand-text";

/** Props for {@link ArticleView}. */
export interface ArticleViewProps {
  article: Article;
  locale: Locale;
}

/** The article itself (category, title, byline, MDX body), shared by the live news page and the drafts preview. */
export function ArticleView({ article, locale }: ArticleViewProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-10">
      <div className="mt-8">
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{
            blockJS: false,
            // blockDangerousJS defaults to true, which is what you want here —
            // this only unblocks JS expressions like arrays/objects in props,
            // it still filters eval/Function/require/process.
          }}
        />
      </div>

      <div className="mt-10 border-t pt-6 text-sm text-muted-foreground flex flex-col gap-6">
        <ArticleMeta
          subtitle={locale === "fr" ? "Date de Publication" : "Date Published"}
          title={new Date(article.publishedAt).toLocaleDateString(
            locale === "fr" ? "fr-FR" : "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        />
        <ArticleMeta
          subtitle={locale === "fr" ? "Publié par" : "Published by"}
          title={article.author}
        />
        <ArticleMeta
          subtitle={locale === "fr" ? "Catégorie" : "Category"}
          title={article.category}
        />
      </div>
    </article>
  );
}

function ArticleMeta({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase">{subtitle}</span>
      <span>{title}</span>
    </div>
  );
}
