import { notFound } from "next/navigation";
import { articleRepository } from "@/lib/news/repository";
import type { Locale } from "@/lib/news/types";
import { ArticleView } from "@/components/content/article-view";
import {
  renderBrandText,
  stripBrandMarker,
} from "@/components/content/brand-text";

interface DraftPageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: DraftPageProps) {
  const { lang, slug } = await params;
  const article = await articleRepository.getDraftBySlug(lang, slug);
  return {
    title: article ? `[Draft] ${stripBrandMarker(article.title)}` : "Draft",
    robots: { index: false, follow: false },
  };
}

export default async function DraftPage({ params }: DraftPageProps) {
  const { lang, slug } = await params;
  const article = await articleRepository.getDraftBySlug(lang, slug);
  if (!article) notFound();

  return (
    <>
      <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900">
        {lang === "fr"
          ? "Aperçu du brouillon : cet article n'est pas encore publié."
          : "Draft preview: this article is not published yet."}
      </div>

      <h1 className="mt-1 text-3xl font-bold tracking-tight mx-auto max-w-3xl px-4 pt-10">
        {renderBrandText(article.title)}
      </h1>

      <ArticleView article={article} locale={lang} />
    </>
  );
}
