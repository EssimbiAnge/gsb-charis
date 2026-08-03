import AboutPreview from "@/components/AboutPreview";
import ContactCTA from "@/components/ContactCTA";
import EventsPreview from "@/components/EventsPreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroHome from "@/components/HeroHome";
import PartnersSection from "@/components/PartnersSection";
import ProgramsSection from "@/components/ProgramsSection";
import SchoolLifePreview from "@/components/SchoolLifePreview";
import SupportSection from "@/components/SupportSection";
import WhyChooseCharis from "@/components/WhyChooseCharis";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";

  return (
    <>
      <Header lang={currentLang} />

      <main>
        <HeroHome lang={currentLang} />
        <WhyChooseCharis lang={currentLang} />
        <ProgramsSection lang={currentLang} />
        <AboutPreview lang={currentLang} />
        <SchoolLifePreview lang={currentLang} />
        <EventsPreview lang={currentLang} />
        <PartnersSection lang={currentLang} />
        <SupportSection lang={currentLang} />
        <ContactCTA lang={currentLang} />
      </main>

      <Footer lang={currentLang} />
    </>
  );
}