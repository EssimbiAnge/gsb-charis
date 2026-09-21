import { galleryRepository } from "@/lib/gallery/repository";
import { YearSection } from "@/components/gallery/year-section";
import type { Locale } from "@/lib/news/types";
import PageHero from "@/components/PageHero";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";
import { teamRepository } from "@/lib/team/repository";
import { TeamSection } from "@/components/team/team-section";

interface GalleryPageProps {
  params: Promise<{ lang: Locale }>;
}

export const metadata = {
  title: "Rencontrez l'équipe — CHARIS Bilingual School Complex",
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { lang } = await params;
  const sections = await teamRepository.getGroupedMembers();

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <>
      <PageHero
        eyebrow={isFr ? "Rencontrez l'équipe" : "Meet the Team"}
        title={
          isFr
            ? "Découvrez l’équipe de CHARIS"
            : "Meet the People Behind CHARIS"
        }
        description={
          isFr
            ? "Découvrez les enseignants, membres du personnel et responsables qui accompagnent nos élèves, développent leur potentiel et contribuent à faire de CHARIS un environnement où chacun peut apprendre, grandir et s’épanouir."
            : "Get to know the teachers, staff and administrators who support our students, nurture their potential and help make life at CHARIS a place to learn, grow and thrive."
        }
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr
              ? "Les personnes qui font la différence"
              : "The People Who Make It Happen"}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {isFr
              ? "De la salle de classe à l’administration, notre équipe travaille ensemble pour offrir à chaque élève un environnement d’apprentissage bienveillant, stimulant et porteur de sens."
              : "From the classroom to the administration, our team works together to provide a supportive, engaging and purposeful learning environment for every student."}
          </p>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          {sections.map((section) => (
            <TeamSection key={section.group} section={section} locale={lang} />
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-blue-950 p-8 text-white">
            <h2 className="mt-3 text-3xl font-bold">
              {isFr
                ? "Rejoignez la communauté CHARIS"
                : "Be Part of the CHARIS Community"}
            </h2>

            <p className="mt-5 leading-8 text-blue-100">
              {isFr
                ? "À CHARIS, nous croyons que les grandes écoles sont bâties par des personnes profondément engagées dans l’éducation et dans l’accompagnement des jeunes. Nous construisons une communauté collaborative où les enseignants et les membres du personnel peuvent mettre leurs compétences, leurs idées et leur expérience au service de la prochaine génération."
                : `At CHARIS, we believe great schools are built by people who care deeply about education and the young people they serve. We are building a collaborative community where teachers and staff can bring their skills, ideas and experience to the work of shaping the next generation.`}
              <br />
              <br />
              {isFr
                ? "Travailler à CHARIS, c’est rejoindre une équipe qui valorise la collaboration, la pensée critique et la droiture. Que vous soyez un enseignant expérimenté, un spécialiste passionné ou un professionnel souhaitant mettre ses compétences au service d’une mission éducative, nous accueillons les personnes prêtes à apprendre, à évoluer et à avoir un impact significatif."
                : `Working at CHARIS means being part of a team that values collaboration, critical thinking and righteousness. Whether you are an experienced educator, a passionate specialist or a dedicated professional looking for an opportunity to contribute, there is a place for people who are ready to learn, grow and make a meaningful impact.`}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Nos catégories" : "Work With Us"}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-blue-950">
              {isFr
                ? "Faites grandir votre carrière. Faites la différence."
                : "Grow Your Career. Make a Difference."}
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-1">
              {[
                isFr
                  ? "Une communauté collaborative — Travaillez aux côtés de personnes engagées dans la réussite et l’épanouissement de nos élèves."
                  : "A collaborative community — Work alongside people who share a commitment to our students and their development.",
                isFr
                  ? "Un travail qui a du sens — Contribuez directement à l’éducation et au développement des jeunes."
                  : "Meaningful work — Make a direct difference in the lives and education of young people.",
                isFr
                  ? "Des possibilités d’évolution — Développez vos compétences, partagez vos idées et continuez à apprendre au sein d’une école en pleine croissance."
                  : "Room to grow — Develop your skills, share your ideas and continue learning as part of a growing school.",
                isFr
                  ? "Un environnement fondé sur des valeurs — Rejoignez une communauté guidée par la droiture, la pensée critique et la collaboration."
                  : "A values-driven environment — Be part of a community built around righteousness, critical thinking and collaboration.",
              ].map((category) => (
                <div
                  key={category}
                  className="rounded-xl bg-white p-4 font-medium text-blue-950 shadow-xs"
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
                ? "Rejoignez la communauté CHARIS"
                : "Be Part of the CHARIS Community"}
            </h2>

            <p className="mt-3 text-lg text-blue-950">
              {isFr
                ? "Si vous êtes passionné(e) par l’éducation et souhaitez contribuer à une communauté scolaire en pleine croissance, nous serions heureux de vous connaître."
                : "If you are passionate about education and ready to contribute to a growing school community, we would love to hear from you."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${currentLang}/contact`}
              className="rounded-lg bg-blue-950 px-7 py-4 font-bold text-white transition hover:bg-blue-900"
            >
              {isFr ? "Nous contacter" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
