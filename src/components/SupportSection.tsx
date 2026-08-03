import Link from "next/link";
import CharisName from "./CharisName";

type Props = {
  lang: "fr" | "en";
};

export default function SupportSection({ lang }: Props) {
  const isFr = lang === "fr";

  return (
    <section className="bg-blue-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-400">
            {isFr ? "Construisons ensemble" : "Build With Us"}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {isFr ? "Soutenir " : "Support "}
            <CharisName />
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            [
              isFr ? "Parrainer un enfant" : "Sponsor a Child",
              isFr
                ? "Contribuer à sa scolarité, ses fournitures, son goûter ou son soutien scolaire."
                : "Support tuition, school supplies, meals or academic support.",
            ],
            [
              isFr ? "Soutenir une activité" : "Support an Activity",
              isFr
                ? "Contribuer à une activité éducative, communautaire ou de ministère."
                : "Contribute to an educational, community or ministry activity.",
            ],
            [
              isFr ? "Faire un don" : "Make a Donation",
              isFr
                ? "Soutenir librement le développement et la qualité de l’éducation."
                : "Support the development and quality of education.",
            ],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl bg-blue-900 p-8">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-4 leading-7 text-blue-100">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/soutenir`}
            className="inline-block rounded-lg bg-orange-500 px-7 py-4 font-bold"
          >
            {isFr ? "Découvrir comment soutenir" : "Discover how to support"}
          </Link>
        </div>
      </div>
    </section>
  );
}