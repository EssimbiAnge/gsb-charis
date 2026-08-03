import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function SchoolLifePage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  const activities = isFr
    ? [
        {
          title: "Renforcement linguistique",
          description:
            "Développer la maîtrise du français et de l'anglais à travers des activités pratiques.",
        },
        {
          title: "Informatique",
          description:
            "Découvrir les outils numériques et développer les compétences digitales.",
        },
        {
          title: "Musique",
          description:
            "Développer les talents artistiques et l'expression personnelle.",
        },
        {
          title: "Sport",
          description:
            "Favoriser la santé, la discipline et l'esprit d'équipe.",
        },
        {
          title: "Arts & Créativité",
          description:
            "Dessins, peinture, décoration et expression artistique.",
        },
        {
          title: "Leadership",
          description:
            "Former des élèves capables d'influencer positivement leur communauté.",
        },
      ]
    : [
        {
          title: "Language Development",
          description:
            "Strengthening both French and English communication skills.",
        },
        {
          title: "ICT",
          description:
            "Developing digital literacy and computer skills.",
        },
        {
          title: "Music",
          description:
            "Helping learners discover and develop their artistic talents.",
        },
        {
          title: "Sports",
          description:
            "Promoting health, discipline and teamwork.",
        },
        {
          title: "Arts & Creativity",
          description:
            "Drawing, painting, decoration and creative expression.",
        },
        {
          title: "Leadership",
          description:
            "Preparing learners to positively influence their communities.",
        },
      ];

  return (
    <>
      <Header lang={currentLang} />

      <main>
        <PageHero
          eyebrow={isFr ? "Vie scolaire" : "School Life"}
          title={
            isFr
              ? "Une école où chaque journée est une occasion de grandir"
              : "A school where every day is an opportunity to grow"
          }
          description={
            isFr
              ? "À CHARIS, les apprentissages dépassent les salles de classe. Nous voulons développer la personne dans toutes ses dimensions."
              : "At CHARIS, learning goes beyond the classroom. We aim to develop the whole child."
          }
        />

        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Notre approche" : "Our Approach"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr
                ? "Une éducation globale"
                : "A Whole-Child Education"}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {isFr
                ? "Nous croyons que les enfants grandissent lorsqu'ils développent simultanément leurs connaissances, leur caractère, leurs compétences pratiques, leurs relations et leur sens des responsabilités."
                : "We believe children grow best when they develop knowledge, character, practical skills, relationships and responsibility together."}
            </p>
          </div>
        </section>

        <section className="bg-gray-100 px-6 py-20">
          <div className="mx-auto max-w-7xl">

            <div className="text-center">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Nos activités" : "Our Activities"}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {isFr
                  ? "Développer tous les talents"
                  : "Developing Every Talent"}
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {activities.map((activity) => (

                <article
                  key={activity.title}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-blue-950">
                    {activity.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {activity.description}
                  </p>

                </article>

              ))}

            </div>

          </div>
        </section>

        <section className="bg-blue-950 px-6 py-20 text-white">

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

            <div>

              <p className="font-bold uppercase tracking-widest text-orange-400">
                {isFr ? "Notre culture" : "Our Culture"}
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {isFr
                  ? "Ce que les élèves vivent chaque jour"
                  : "What students experience every day"}
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                isFr ? "Respect" : "Respect",
                isFr ? "Responsabilité" : "Responsibility",
                isFr ? "Collaboration" : "Collaboration",
                isFr ? "Pensée critique" : "Critical Thinking",
                isFr ? "Leadership" : "Leadership",
                isFr ? "Service" : "Service",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-xl bg-blue-900 p-5 font-bold"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </section>

        <section className="bg-white px-6 py-20">

          <div className="mx-auto max-w-7xl text-center">

            <h2 className="text-4xl font-bold text-blue-950">
              {isFr
                ? "Envie de découvrir notre école ?"
                : "Would you like to discover our school?"}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {isFr
                ? "Nous serons heureux de vous accueillir et de vous faire découvrir l'environnement d'apprentissage de CHARIS."
                : "We would be delighted to welcome you and show you the CHARIS learning environment."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                href={`/${currentLang}/contact`}
                className="rounded-lg bg-orange-500 px-7 py-4 font-bold text-white hover:bg-orange-600"
              >
                {isFr ? "Nous contacter" : "Contact Us"}
              </Link>

              <Link
                href={`/${currentLang}/admissions`}
                className="rounded-lg border-2 border-blue-950 px-7 py-4 font-bold text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                {isFr ? "Admissions" : "Admissions"}
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer lang={currentLang} />

    </>
  );
}