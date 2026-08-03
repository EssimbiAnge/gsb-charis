import Image from "next/image";
import Link from "next/link";
import CharisName from "./CharisName";

type HeaderProps = {
  lang: "fr" | "en";
};

export default function Header({ lang }: HeaderProps) {
  const isFr = lang === "fr";

  const menu = [
    { fr: "Accueil", en: "Home", href: "" },
    { fr: "À propos", en: "About", href: "/a-propos" },
    { fr: "Admissions", en: "Admissions", href: "/admissions" },
    { fr: "Vie scolaire", en: "School Life", href: "/vie-scolaire" },
    { fr: "Événements", en: "Events", href: "/evenements" },
    { fr: "Galerie", en: "Gallery", href: "/galerie" },
    { fr: "Contact", en: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-white/10 bg-blue-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

        {/* IDENTITÉ */}
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-3">
          <div className="rounded-xl bg-white p-1">
            <Image
              src="/logo-charis.png"
              alt="Logo Groupe Scolaire Bilingue CHARIS"
              width={58}
              height={58}
              className="h-14 w-14 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
              {isFr ? "Groupe Scolaire Bilingue" : "Bilingual School"}
            </p>

            <CharisName className="text-xl" />
          </div>
        </Link>

        {/* MENU */}
        <nav className="hidden items-center gap-5 lg:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className="text-sm font-medium text-white transition hover:text-orange-400"
            >
              {isFr ? item.fr : item.en}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={`/${lang}/soutenir`}
            className="hidden rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold transition hover:bg-orange-600 sm:block"
          >
            {isFr ? "Soutenir" : "Support"}
          </Link>

          <Link
            href={`/${lang}/connexion`}
            className="hidden rounded-lg border border-white px-4 py-2.5 text-sm font-bold transition hover:bg-white hover:text-blue-950 md:block"
          >
            {isFr ? "Connexion" : "Login"}
          </Link>

          {/* LANGUES */}
          <div className="flex items-center gap-2 border-l border-white/30 pl-3 text-sm font-bold">
            <Link
              href="/fr"
              className={
                isFr
                  ? "text-orange-400"
                  : "text-white hover:text-orange-400"
              }
            >
              FR
            </Link>

            <span className="text-white/40">|</span>

            <Link
              href="/en"
              className={
                !isFr
                  ? "text-orange-400"
                  : "text-white hover:text-orange-400"
              }
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}