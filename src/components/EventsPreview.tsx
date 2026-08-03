import Link from "next/link";

type Props = {
  lang: "fr" | "en";
};

export default function EventsPreview({ lang }: Props) {
  const isFr = lang === "fr";

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Vie de l’école" : "School Life"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr ? "Événements et actualités" : "Events and News"}
            </h2>
          </div>

          <Link href={`/${lang}/evenements`} className="font-bold text-orange-600">
            {isFr ? "Voir tous les événements →" : "View all events →"}
          </Link>
        </div>

        <p className="mt-8 text-gray-600">
          {isFr
            ? "Les prochains événements et temps forts du Groupe Scolaire Bilingue CHARIS seront présentés ici."
            : "Upcoming events and highlights from Groupe Scolaire Bilingue CHARIS will appear here."}
        </p>
      </div>
    </section>
  );
}