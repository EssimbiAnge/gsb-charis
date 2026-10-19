import { partnerRepository } from "@/lib/partners/repository";
import { PartnerCard } from "@/components/partners/partner-card";
import type { Locale } from "@/lib/news/types";
import PageHero from "@/components/PageHero";
import SupportSection from "@/components/SupportSection";
import CharisName from "@/components/CharisName";
import { renderBrandText } from "@/components/content/brand-text";

interface PartnersPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PartnersPageProps) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return {
    title: isFr ? `Nos Partenaires` : `Our Partners`,
    description: isFr
      ? "Les organisations qui collaborent avec le Groupe Scolaire Bilingue CHARIS."
      : "The organizations that work with CHARIS Bilingual School Complex.",
  };
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { lang } = await params;
  const partners = await partnerRepository.getAll();
  const isFr = lang === "fr";

  return (
    <>
      <PageHero
        eyebrow={isFr ? "Nos Partenaires" : "Our Partners"}
        title={renderBrandText(
          lang === "fr"
            ? `Les organisations qui collaborent avec le Groupe Scolaire Bilingue {{CharisName}}.`
            : `The organizations that work with {{CharisName}} Bilingual School Complex.`
        )}
      />

      <section className="bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mt-3 text-3xl font-bold text-blue-950">
            {isFr
              ? "Ensemble pour une éducation qui transforme"
              : "Together for transformative education"}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            {isFr
              ? "Nous collaborons avec des organisations et des personnes qui partagent notre conviction que l’éducation peut transformer durablement les communautés."
              : "We collaborate with organisations and individuals who share our conviction that education can transform communities sustainably."}
          </p>

          {partners.length === 0 ? (
            <p className="mt-10 text-muted-foreground">
              {lang === "fr"
                ? "Aucun partenaire pour le moment."
                : "No partners listed yet."}
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <PartnerCard
                  key={partner.slug}
                  partner={partner}
                  locale={lang}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <SupportSection lang={lang} />
    </>
  );
}
