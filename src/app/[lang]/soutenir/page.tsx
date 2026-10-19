import CharisName from "@/components/CharisName";
import { renderBrandText } from "@/components/content/brand-text";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import SupportPayment from "@/components/SupportPayment";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function SupportPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <>
      <PageHero
        eyebrow={isFr ? `Soutenir CHARIS` : `Support CHARIS`}
        title={
          isFr
            ? "Ensemble, transformons des vies par l’éducation"
            : "Together, let us transform lives through education"
        }
        description={renderBrandText(
          isFr
            ? `Votre contribution peut soutenir un enfant, développer notre école ou accompagner la mission éducative et communautaire de ${{
                CharisName,
              }}.`
            : `Your contribution can support a child, develop our school or strengthen the educational and community mission of ${{
                CharisName,
              }}.`
        )}
      />

      <SupportPayment lang={currentLang} />
    </>
  );
}
