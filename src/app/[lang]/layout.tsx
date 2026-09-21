import { AnnouncementBanner } from "@/components/announcements/announcement-banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { articleRepository } from "@/lib/news/repository";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";

  const announcements = await articleRepository.getActiveAnnouncements(
    currentLang
  );

  return (
    <>
      <AnnouncementBanner announcements={announcements} locale={currentLang} />
      <Header lang={currentLang} />

      <main>{children}</main>

      <Footer lang={currentLang} />
    </>
  );
}
