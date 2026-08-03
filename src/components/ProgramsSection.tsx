import Image from "next/image";
import Link from "next/link";

type Props = {
  lang: "fr" | "en";
};

export default function ProgramsSection({ lang }: Props) {
  const isFr = lang === "fr";

  return (
    <section className="bg-gray-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            {isFr ? "Nos programmes" : "Our Programmes"}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr
              ? "Deux sections, un même engagement pour la qualité"
              : "Two sections, one commitment to quality"}
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative h-64">
              <Image
                src="/maternelle.jpg"
                alt="Section francophone"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Section francophone" : "French Section"}
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-950">
                Maternelle & Primaire
              </h3>

              <p className="mt-5 text-gray-600">
                {isFr
                  ? "Maternelle : Petite Section, Moyenne Section et Grande Section."
                  : "Preschool equivalent: Petite Section, Moyenne Section and Grande Section."}
              </p>

              <p className="mt-3 text-gray-600">
                {isFr ? "Primaire : de la SIL au CM2." : "Primary: SIL through CM2."}
              </p>

              <Link
                href={`/${lang}/admissions`}
                className="mt-7 inline-block font-bold text-orange-600"
              >
                {isFr ? "Voir les admissions →" : "View admissions →"}
              </Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative h-64">
              <Image
                src="/primaire.jpg"
                alt="English Section"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                English Section
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-950">
                Preschool & Primary
              </h3>

              <p className="mt-5 text-gray-600">
                Pre-Nursery, Nursery 1 and Nursery 2.
              </p>

              <p className="mt-3 text-gray-600">
                Primary: Class 1 to Class 6.
              </p>

              <Link
                href={`/${lang}/admissions`}
                className="mt-7 inline-block font-bold text-orange-600"
              >
                {isFr ? "Voir les admissions →" : "View admissions →"}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}