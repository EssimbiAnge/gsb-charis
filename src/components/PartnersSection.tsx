type PartnersSectionProps = {
  lang: "fr" | "en";
};

export default function PartnersSection({
  lang,
}: PartnersSectionProps) {
  const isFr = lang === "fr";

  return (
    <section className="bg-gray-100 px-6 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-bold uppercase tracking-widest text-orange-500">
          {isFr ? "Nos partenaires" : "Our Partners"}
        </p>

        <h2 className="mt-3 text-3xl font-bold text-blue-950">
          {isFr
            ? "Ensemble pour une éducation qui transforme"
            : "Together for transformative education"}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
          {isFr
            ? "Nous collaborons avec des organisations et des personnes qui partagent notre conviction que l’éducation peut transformer durablement les communautés."
            : "We collaborate with organisations and individuals who share our conviction that education can transform communities sustainably."}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex min-h-28 items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-gray-500">
              {isFr ? "Partenaire à présenter" : "Partner to be displayed"}
            </p>
          </div>

          <div className="flex min-h-28 items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-gray-500">
              {isFr ? "Partenaire à présenter" : "Partner to be displayed"}
            </p>
          </div>

          <div className="flex min-h-28 items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-gray-500">
              {isFr ? "Partenaire à présenter" : "Partner to be displayed"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}