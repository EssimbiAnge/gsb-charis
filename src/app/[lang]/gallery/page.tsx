import { galleryRepository } from "@/lib/gallery/repository";
import { YearSection } from "@/components/gallery/year-section";
import type { Locale } from "@/lib/news/types";
import PageHero from "@/components/PageHero";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";

interface GalleryPageProps {
  params: Promise<{ lang: Locale }>;
}

export const metadata = { title: "Gallery — CHARIS Bilingual School Complex" };

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { lang } = await params;
  const years = await galleryRepository.getAllYears();

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <>
      <PageHero
        eyebrow={isFr ? "Notre galerie" : "Our Gallery"}
        title={
          isFr
            ? "Découvrez la vie au Groupe Scolaire Bilingue CHARIS"
            : "Discover life at Groupe Scolaire Bilingue CHARIS"
        }
        description={
          isFr
            ? "Retrouvez les temps forts de notre école, les apprentissages, les activités, les célébrations et les moments de vie partagés par notre communauté."
            : "Explore highlights from our school, including learning, activities, celebrations and shared moments within our community."
        }
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            {isFr ? "CHARIS en images" : "CHARIS in Pictures"}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr
              ? "Apprendre, grandir et construire ensemble"
              : "Learning, growing and building together"}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {isFr
              ? "Cette galerie présentera progressivement les photos officielles de nos classes, événements, activités pédagogiques, rencontres communautaires et projets scolaires."
              : "This gallery will progressively feature official photographs of our classrooms, events, educational activities, community gatherings and school projects."}
          </p>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          {years.map((yearData) => (
            <YearSection
              key={yearData.year}
              yearData={yearData}
              locale={lang}
            />
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-blue-950 p-8 text-white">
            <p className="font-bold uppercase tracking-widest text-orange-400">
              {isFr ? "Photos scolaires" : "School Photography"}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {isFr
                ? "Une galerie respectueuse des enfants"
                : "A gallery that respects children"}
            </h2>

            <p className="mt-5 leading-8 text-blue-100">
              {isFr
                ? "Les images publiées sur le site doivent respecter la dignité, la sécurité et la protection des enfants. Seules les photos autorisées par l’établissement seront mises en ligne."
                : "Images published on the website must respect the dignity, safety and protection of children. Only photographs authorised by the school will be published."}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Nos catégories" : "Our Categories"}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-blue-950">
              {isFr
                ? "Les moments que nous voulons partager"
                : "The moments we want to share"}
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                isFr ? "Vie académique" : "Academic life",
                isFr ? "Activités pédagogiques" : "Learning activities",
                isFr ? "Arts et culture" : "Arts and culture",
                isFr ? "Sport et bien-être" : "Sports and wellbeing",
                isFr ? "Événements scolaires" : "School events",
                isFr ? "Impact communautaire" : "Community impact",
              ].map((category) => (
                <div
                  key={category}
                  className="rounded-xl bg-white p-4 font-bold text-blue-950 shadow-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-500 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div>
            <h2 className="text-4xl font-bold text-blue-950">
              {isFr
                ? "Vous souhaitez découvrir CHARIS ?"
                : "Would you like to discover CHARIS?"}
            </h2>

            <p className="mt-3 text-lg text-blue-950">
              {isFr
                ? "Contactez notre équipe ou venez visiter notre établissement à Bertoua."
                : "Contact our team or visit our school in Bertoua."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${currentLang}/contact`}
              className="rounded-lg bg-blue-950 px-7 py-4 font-bold text-white transition hover:bg-blue-900"
            >
              {isFr ? "Nous contacter" : "Contact Us"}
            </Link>

            <Link
              href={`/${currentLang}/admissions`}
              className="rounded-lg border-2 border-blue-950 px-7 py-4 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              {isFr ? "Voir les admissions" : "View Admissions"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
