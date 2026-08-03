import Link from "next/link";

type SchoolLifePreviewProps = {
  lang: "fr" | "en";
};

export default function SchoolLifePreview({
  lang,
}: SchoolLifePreviewProps) {
  const isFr = lang === "fr";

  const activities = isFr
    ? [
        "Renforcement linguistique",
        "Jeux éducatifs",
        "Fitness et danse",
        "Musique",
        "Art et décoration",
        "Cuisine et pâtisserie",
        "Informatique et bureautique",
        "Activités communautaires",
      ]
    : [
        "Language Development",
        "Educational Games",
        "Fitness and Dance",
        "Music",
        "Arts and Decoration",
        "Cooking and Baking",
        "ICT",
        "Community Activities",
      ];

  return (
    <section className="bg-blue-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            {isFr ? "Au-delà de la classe" : "Beyond the Classroom"}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr ? "La vie à CHARIS" : "Life at CHARIS"}
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {isFr
              ? "Nous créons des occasions d’apprendre, de développer ses talents, de collaborer et de servir la communauté."
              : "We create opportunities to learn, develop talents, collaborate and serve the community."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity, index) => (
            <article
              key={activity}
              className="rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 font-bold text-orange-400">
                {index + 1}
              </div>

              <h3 className="mt-4 font-bold text-blue-950">{activity}</h3>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/vie-scolaire`}
            className="inline-block rounded-lg bg-blue-950 px-6 py-3 font-bold text-white transition hover:bg-blue-900"
          >
            {isFr
              ? "Découvrir la vie scolaire"
              : "Discover school life"}
          </Link>
        </div>
      </div>
    </section>
  );
}