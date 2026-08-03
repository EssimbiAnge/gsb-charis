import Link from "next/link";
import CharisName from "./CharisName";

type FooterProps = {
  lang: "fr" | "en";
};

export default function Footer({ lang }: FooterProps) {
  const isFr = lang === "fr";

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        {/* Identité */}
        <div>
          <p className="text-sm uppercase tracking-widest text-orange-400">
            {isFr ? "Groupe Scolaire Bilingue" : "Bilingual School"}
          </p>

          <div className="mt-2">
            <CharisName className="text-2xl" />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            {isFr
              ? "Transformer les communautés par l'éducation."
              : "Transforming communities through education."}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-bold">
            {isFr ? "Navigation" : "Navigation"}
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li><Link href={`/${lang}`}>{isFr ? "Accueil" : "Home"}</Link></li>
            <li><Link href={`/${lang}/a-propos`}>{isFr ? "À propos" : "About"}</Link></li>
            <li><Link href={`/${lang}/admissions`}>Admissions</Link></li>
            <li><Link href={`/${lang}/contact`}>{isFr ? "Contact" : "Contact"}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-bold">
            {isFr ? "Contact" : "Contact"}
          </h3>

          <p className="text-slate-300">gsbcharis2024@gmail.com</p>
          <p className="text-slate-300">+237 653 844 866</p>
          <p className="text-slate-300">+237 672 087 991</p>
          <p className="text-slate-300">+237 697 028 411</p>
        </div>

        {/* Localisation */}
        <div>
          <h3 className="mb-4 font-bold">
            {isFr ? "Adresse" : "Location"}
          </h3>

          <p className="text-slate-300">
            Mont Cameroun
            <br />
            Bertoua
            <br />
            Cameroun
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Groupe Scolaire Bilingue CHARIS.{" "}
        {isFr
          ? "Tous droits réservés."
          : "All rights reserved."}
      </div>
    </footer>
  );
}