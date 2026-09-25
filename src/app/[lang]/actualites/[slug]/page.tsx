import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articleRepository } from "@/lib/news/repository";
import { mdxComponents } from "@/components/content/mdx-components";
import PageHero from "@/components/PageHero";
import { Locale } from "@/lib/news/types";
import { ArticleCard } from "@/components/content/article-card";
import { articleCategories } from "@/lib/types";

interface NewsArticlePageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await articleRepository.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { lang, slug } = await params;
  const article = await articleRepository.getBySlug(lang, slug);
  if (!article) return {};
  return {
    title: `${article.title} — CHARIS Bilingual School Complex`,
    description: article.excerpt,
    openGraph: article.coverImage
      ? { images: [article.coverImage] }
      : undefined,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { lang, slug } = await params;
  const article = await articleRepository.getBySlug(lang, slug);
  if (!article) notFound();

  const allArticles = await articleRepository.getAll(lang);
  const moreArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 4);

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <section>
      <PageHero
        eyebrow={
          articleCategories.find((c) => c.slug === article.category)?.name[
            currentLang
          ]
        }
        title={article.title}
        description={article.excerpt}
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
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
            subtitle={lang === "fr" ? "Date de Publication" : "Date Published"}
            title={new Date(article.publishedAt).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          />
          <ArticleMeta
            subtitle={lang === "fr" ? "Publié par" : "Published by"}
            title={article.author}
          />
          <ArticleMeta
            subtitle={lang === "fr" ? "Catégorie" : "Category"}
            title={article.category}
          />
        </div>
      </article>

      {moreArticles.length > 0 && (
        <section className="bg-gray-100 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {lang === "fr" ? "Plus d'Articles" : "More Articles"}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {moreArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
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
