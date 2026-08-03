import Link from "next/link";
import CharisName from "./CharisName";

type AboutPreviewProps = {
  lang: "fr" | "en";
};

export default function AboutPreview({ lang }: AboutPreviewProps) {
  const isFr = lang === "fr";

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-bold uppercase tracking-widest text-orange-500">
          {isFr ? "Notre histoire" : "Our Story"}
        </p>

        <h2 className="mt-3 text-4xl font-bold text-blue-950">
          {isFr
            ? "Une conviction devenue école"
            : "A conviction that became a school"}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          {isFr ? (
            <>
              <CharisName /> est née d’une conviction : l’Afrique francophone a
              besoin d’une nouvelle génération de leaders capables de penser,
              d’agir avec droiture et d’apporter des solutions à leurs
              communautés.
            </>
          ) : (
            <>
              <CharisName /> was born from a conviction: Africa needs a new
              generation of leaders able to think, act with integrity and bring
              solutions to their communities.
            </>
          )}
        </p>

        <Link
          href={`/${lang}/a-propos`}
          className="mt-8 inline-block rounded-lg bg-blue-950 px-6 py-3 font-bold text-white transition hover:bg-blue-900"
        >
          {isFr ? "Découvrir notre histoire" : "Discover our story"}
        </Link>
      </div>
    </section>
  );
}