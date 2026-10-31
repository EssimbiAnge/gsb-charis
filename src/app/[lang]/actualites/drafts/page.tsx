import { ArticleCard } from "@/components/content/article-card";
import { articleRepository } from "@/lib/news/repository";
import type { Locale } from "@/lib/news/types";

interface DraftsPageProps {
  params: Promise<{ lang: Locale }>;
}

export const metadata = {
  title: "Drafts — CHARIS Bilingual School Complex",
  robots: { index: false, follow: false },
};

export default async function DraftsPage({ params }: DraftsPageProps) {
  const { lang } = await params;
  const drafts = await articleRepository.getDrafts(lang);

  return (
    <section className=" px-6 py-10">
      <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        {lang === "fr"
          ? "Brouillons non publiés : visibles uniquement avec ce lien, absents de la page Actualités."
          : "Unpublished drafts: visible only through this link, not listed on the News page."}
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        {lang === "fr" ? "Brouillons" : "Drafts"}
      </h1>

      {drafts.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          {lang === "fr"
            ? "Aucun brouillon pour le moment."
            : "No drafts right now."}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {drafts.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={lang}
              href={`/${lang}/actualites/drafts/${article.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
