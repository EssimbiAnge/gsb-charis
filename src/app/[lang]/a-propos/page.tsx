import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import CharisName from "@/components/CharisName";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  const values = isFr
    ? [
        {
          title: "Droiture",
          description:
            "Nous faisons ce qui est juste, même lorsque cela demande du courage, de la discipline et de la responsabilité.",
        },
        {
          title: "Pensée critique",
          description:
            "Nous apprenons à analyser, questionner, comprendre et proposer des solutions pertinentes.",
        },
        {
          title: "Collaboration",
          description:
            "Nous apprenons à écouter, contribuer, travailler en équipe et progresser avec les autres.",
        },
      ]
    : [
        {
          title: "Integrity",
          description:
            "We do what is right, even when it requires courage, discipline and responsibility.",
        },
        {
          title: "Critical Thinking",
          description:
            "We learn to analyse, question, understand and develop relevant solutions.",
        },
        {
          title: "Collaboration",
          description:
            "We learn to listen, contribute, work as a team and grow with others.",
        },
      ];

  return (
    <>
      <Header lang={currentLang} />

      <main>
        <PageHero
          eyebrow={isFr ? "À propos de nous" : "About Us"}
          title={
            isFr
              ? "Former des leaders capables de transformer leurs communautés"
              : "Raising leaders who can transform their communities"
          }
          description={
            isFr
              ? "Le Groupe Scolaire Bilingue CHARIS développe les compétences académiques, le caractère, la pensée critique, la collaboration et la capacité à apporter des solutions."
              : "Groupe Scolaire Bilingue CHARIS develops academic competence, character, critical thinking, collaboration and the ability to create solutions."
          }
        />

        <section className="bg-white px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Notre histoire" : "Our Story"}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {isFr
                  ? "Une conviction devenue une école"
                  : "A conviction that became a school"}
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-gray-600">
              <p>
                {isFr ? (
                  <>
                    <CharisName /> est née dans un cadre simple, avec la conviction
                    que l’éducation pouvait devenir un puissant moyen de
                    transformation des personnes, des familles et des communautés.
                  </>
                ) : (
                  <>
                    <CharisName /> began in a simple setting, with the conviction
                    that education could become a powerful means of transforming
                    individuals, families and communities.
                  </>
                )}
              </p>

              <p>
                {isFr
                  ? "Les premiers apprentissages ont commencé dans un contexte proche de l’école à domicile, porté par le sacrifice, l’engagement et la vision de bâtir une école capable de former une nouvelle génération de leaders."
                  : "The first learning experiences began in a home-school-like setting, shaped by sacrifice, commitment and the vision of building a school capable of raising a new generation of leaders."}
              </p>

              <p>
                {isFr
                  ? "Aujourd’hui, cette vision continue de grandir à Bertoua à travers une école bilingue qui veut unir excellence académique, caractère, compétences pratiques et engagement communautaire."
                  : "Today, this vision continues to grow in Bertoua through a bilingual school seeking to unite academic excellence, character, practical skills and community engagement."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="font-bold uppercase tracking-widest text-orange-500">
                  {isFr ? "Notre mission" : "Our Mission"}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-blue-950">
                  {isFr
                    ? "Transformer les communautés par l’éducation"
                    : "Transforming communities through education"}
                </h2>
              </article>

              <article className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="font-bold uppercase tracking-widest text-orange-500">
                  {isFr ? "Notre vision" : "Our Vision"}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-blue-950">
                  {isFr
                    ? "Former des leaders globaux capables d’apporter des solutions"
                    : "Raising global leaders capable of creating solutions"}
                </h2>
              </article>

              <article className="rounded-2xl bg-white p-8 shadow-sm">
                <p className="font-bold uppercase tracking-widest text-orange-500">
                  {isFr ? "Notre ambition" : "Our Ambition"}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-blue-950">
                  {isFr
                    ? "Contribuer à former 10 000 leaders d’ici 2045"
                    : "Contributing to the development of 10,000 leaders by 2045"}
                </h2>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Nos valeurs" : "Our Values"}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {isFr
                  ? "Les convictions qui guident notre manière d’éduquer"
                  : "The convictions that shape the way we educate"}
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-blue-950">
                    {value.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {value.description}
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
                {isFr ? "Notre approche" : "Our Approach"}
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {isFr
                  ? "Une éducation qui développe toute la personne"
                  : "An education that develops the whole person"}
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                isFr ? "Compétences académiques" : "Academic competence",
                isFr ? "Caractère et droiture" : "Character and integrity",
                isFr ? "Pensée critique" : "Critical thinking",
                isFr ? "Collaboration" : "Collaboration",
                isFr ? "Leadership" : "Leadership",
                isFr ? "Impact communautaire" : "Community impact",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-blue-900 p-6 font-bold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-orange-500 px-6 py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h2 className="text-4xl font-bold text-blue-950">
                {isFr
                  ? "Découvrez les programmes de CHARIS"
                  : "Discover CHARIS programmes"}
              </h2>

              <p className="mt-3 text-lg text-blue-950">
                {isFr
                  ? "Des parcours francophone et anglophone de la maternelle au primaire."
                  : "French and English programmes from preschool through primary school."}
              </p>
            </div>

            <Link
              href={`/${currentLang}/admissions`}
              className="rounded-lg bg-blue-950 px-7 py-4 font-bold text-white transition hover:bg-blue-900"
            >
              {isFr ? "Voir les admissions" : "View admissions"}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={currentLang} />
    </>
  );
}