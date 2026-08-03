import Link from "next/link";

type ContactCTAProps = {
  lang: "fr" | "en";
};

export default function ContactCTA({ lang }: ContactCTAProps) {
  const isFr = lang === "fr";

  return (
    <section className="bg-orange-500 px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-blue-950">
            {isFr ? "Prêt à rejoindre CHARIS ?" : "Ready to join CHARIS?"}
          </h2>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-blue-950">
            {isFr
              ? "Découvrez nos conditions d’admission ou contactez directement notre équipe."
              : "Discover our admission requirements or contact our team directly."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${lang}/admissions`}
            className="rounded-lg bg-blue-950 px-7 py-4 font-bold text-white transition hover:bg-blue-900"
          >
            {isFr ? "Voir les admissions" : "View admissions"}
          </Link>

          <a
            href="https://wa.me/237653844866"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-blue-950 px-7 py-4 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}