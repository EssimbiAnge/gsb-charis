import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginPanel from "@/components/LoginPanel";
import PageHero from "@/components/PageHero";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <>
      <PageHero
        eyebrow={isFr ? "Espace sécurisé" : "Secure Portal"}
        title={
          isFr
            ? "Connectez-vous à votre espace CHARIS"
            : "Sign in to your CHARIS portal"
        }
        description={
          isFr
            ? "Accédez à votre espace personnel pour consulter les informations scolaires, administratives et pédagogiques qui vous concernent."
            : "Access your personal portal to view the school, administrative and academic information relevant to you."
        }
      />

      <LoginPanel lang={currentLang} />
    </>
  );
}
