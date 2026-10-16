import { partnerRepository } from "@/lib/partners/repository";
import { PartnerCard } from "@/components/partners/partner-card";
import type { Locale } from "@/lib/news/types";
import PageHero from "@/components/PageHero";

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
        title={
          lang === "fr"
            ? "Les organisations qui collaborent avec le Groupe Scolaire Bilingue CHARIS."
            : "The organizations that work with CHARIS Bilingual School Complex."
        }
      />

      <section className="px-6 py-10">
        {partners.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            {lang === "fr"
              ? "Aucun partenaire pour le moment."
              : "No partners listed yet."}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} locale={lang} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
