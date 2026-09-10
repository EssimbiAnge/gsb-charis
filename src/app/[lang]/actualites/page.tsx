import { articleRepository } from "@/lib/news/repository";
import { ArticleCard } from "@/components/content/article-card";
import type { Locale } from "@/lib/news/types";
import PageHero from "@/components/PageHero";

interface NewsIndexPageProps {
  params: Promise<{ lang: Locale }>;
}

// export const metadata = { title: "News — CHARIS Bilingual School Complex" };

export async function generateMetadata({ params }: NewsIndexPageProps) {
  const { lang } = await params;
  const isFr = lang === "fr";


  return {
    title: isFr? `Actualites — Groupe Scolaire Bilingue`: `News — CHARIS Bilingual School Complex`,
    description: isFr
    ? "Restez au cœur de la vie de CHARIS"
    : "Stay Up to Date with Life at CHARIS"
  };
}

export default async function NewsIndexPage({ params }: NewsIndexPageProps) {
  const { lang } = await params;

    const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  const [featured, allArticles] = await Promise.all([
    articleRepository.getAll(lang, { featuredOnly: true, limit: 2 }),
    articleRepository.getAll(lang),
  ]);

  // Keep featured articles out of the main grid so they aren't shown twice.
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const [lead, ...rest] = allArticles.filter((a) => !featuredSlugs.has(a.slug));

  return (

    <>
    <PageHero
        eyebrow={isFr ? "ACTUALITÉS & ÉVÉNEMENTS" : "NEWS & EVENTS"}
        title={
          isFr
            ? "Restez au cœur de la vie de CHARIS"
            : "Stay Up to Date with Life at CHARIS"
        }
        description={
          isFr
            ? "Découvrez les dernières actualités, événements, activités et temps forts du Groupe Scolaire Bilingue CHARIS."
            : "Discover the latest news, events, activities and highlights from Groupe Scolaire Bilingue CHARIS."
        }
      />
    <section className=" px-6 py-10">
      {featured.length > 0 && (
        <div className="mb-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {lang === "fr" ? "À la une" : "Featured"}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={lang} size="large" />
            ))}
          </div>
        </div>
      )}

      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        {lang === "fr" ? "Actualités" : "News"}
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {lead && (
          <div className="sm:col-span-2">
            <ArticleCard article={lead} locale={lang} size="large" />
          </div>
        )}
        {rest.map((article) => (
          <ArticleCard key={article.slug} article={article} locale={lang} />
        ))}
      </div>
    </section>
    </>
  );
}