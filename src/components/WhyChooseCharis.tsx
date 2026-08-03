import CharisName from "./CharisName";

type Props = {
  lang: "fr" | "en";
};

export default function WhyChooseCharis({ lang }: Props) {
  const isFr = lang === "fr";

  const items = isFr
    ? [
        ["Excellence académique", "Des apprentissages structurés et une recherche constante de progression."],
        ["Éducation bilingue", "Des parcours francophone et anglophone de la maternelle au primaire."],
        ["Pensée critique", "Apprendre à analyser, questionner et rechercher des solutions."],
        ["Droiture", "Former le caractère, l’intégrité et le sens des responsabilités."],
        ["Collaboration", "Apprendre à écouter, contribuer et réussir avec les autres."],
        ["Développement global", "Une éducation qui va au-delà des seules performances académiques."],
      ]
    : [
        ["Academic Excellence", "Structured learning and a constant pursuit of progress."],
        ["Bilingual Education", "French and English programmes from preschool through primary school."],
        ["Critical Thinking", "Learning to analyse, question and develop solutions."],
        ["Integrity", "Building character, responsibility and integrity."],
        ["Collaboration", "Learning to listen, contribute and succeed with others."],
        ["Whole-child Development", "An education that goes beyond academic performance."],
      ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            {isFr ? "Notre différence" : "Our Difference"}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr ? "Pourquoi choisir " : "Why choose "}
            <CharisName />
            {" ?"}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, text], index) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-5 text-xl font-bold text-blue-950">{title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}