import Image from "next/image";
import Link from "next/link";
import CharisName from "./CharisName";

type Props = {
  lang: "fr" | "en";
};

export default function HeroHome({ lang }: Props) {
  const isFr = lang === "fr";

  return (
    <section className="bg-blue-950 px-6 py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
            {isFr ? "Groupe Scolaire Bilingue" : "Bilingual School"}
          </p>

          <div className="mt-3">
            <CharisName className="text-5xl md:text-7xl" />
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-tight md:text-6xl">
            {isFr
              ? "Transformer les communautés par l’éducation"
              : "Transforming communities through education"}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            {isFr
              ? "Une éducation bilingue qui développe les compétences académiques, la droiture, la pensée critique, la collaboration et la capacité à apporter des solutions."
              : "A bilingual education developing academic competence, integrity, critical thinking, collaboration and the ability to create solutions."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${lang}/admissions`}
              className="rounded-lg bg-orange-500 px-7 py-4 font-bold hover:bg-orange-600"
            >
              {isFr ? "Inscrire mon enfant" : "Enroll my child"}
            </Link>

            <Link
              href={`/${lang}/a-propos`}
              className="rounded-lg border-2 border-white px-7 py-4 font-bold hover:bg-white hover:text-blue-950"
            >
              {isFr ? "Découvrir CHARIS" : "Discover CHARIS"}
            </Link>
          </div>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/charis-campus.jpg"
            alt={
              isFr
                ? "Campus du Groupe Scolaire Bilingue CHARIS"
                : "Groupe Scolaire Bilingue CHARIS campus"
            }
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}