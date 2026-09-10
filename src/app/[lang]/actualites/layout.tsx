import Footer from "@/components/Footer";
import Header from "@/components/Header";

type PageProps = {
    params: Promise<{
      lang: string;
    }>;
  };

export default async function NewsLayout({
    children, params
  }: Readonly<{
    children: React.ReactNode; params: Promise<{
        lang: string;
    }>;
  }>) {
    const { lang } = await params;

    const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
    const isFr = currentLang === "fr";

    return (
      <>

<Header lang={currentLang} />

<main>{children}</main>

<Footer lang={currentLang} />

      </>
    );
  }