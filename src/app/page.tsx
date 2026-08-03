import Image from "next/image";
import Link from "next/link";
import CharisName from "@/components/CharisName";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-950 px-6 py-12 text-white">
      <div className="w-full max-w-4xl text-center">

        {/* LOGO */}
        <div className="flex justify-center">
          <div className="rounded-3xl bg-white p-4 shadow-2xl">
            <Image
              src="/logo-charis.png"
              alt="Logo Groupe Scolaire Bilingue CHARIS"
              width={160}
              height={160}
              priority
              className="h-auto w-36 md:w-40"
            />
          </div>
        </div>

        {/* NOM */}
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
          Groupe Scolaire Bilingue
        </p>

        <div className="mt-2">
          <CharisName className="text-5xl md:text-7xl" />
        </div>

        {/* MISSION */}
        <h1 className="mx-auto mt-5 max-w-2xl text-xl font-medium md:text-2xl">
          Transformer les communautés par l&apos;éducation
        </h1>

        {/* LANGUE */}
        <p className="mt-10 text-sm uppercase tracking-widest text-blue-200">
          Choisissez votre langue · Choose your language
        </p>

        <div className="mx-auto mt-6 grid max-w-2xl gap-5 sm:grid-cols-2">

          {/* FR */}
          <Link
            href="/fr"
            className="rounded-2xl bg-white p-7 text-left text-blue-950 shadow-xl transition hover:-translate-y-1"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Français
            </span>

            <h2 className="mt-3 text-2xl font-bold">
              Bienvenue à <CharisName />
            </h2>

            <p className="mt-2 text-gray-600">
              Visiter le site en français
            </p>

            <div className="mt-5 text-2xl text-orange-500">→</div>
          </Link>

          {/* EN */}
          <Link
            href="/en"
            className="rounded-2xl bg-white p-7 text-left text-blue-950 shadow-xl transition hover:-translate-y-1"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-orange-600">
              English
            </span>

            <h2 className="mt-3 text-2xl font-bold">
              Welcome to <CharisName />
            </h2>

            <p className="mt-2 text-gray-600">
              Visit our website in English
            </p>

            <div className="mt-5 text-2xl text-orange-500">→</div>
          </Link>
        </div>

        {/* LOCALISATION */}
        <div className="mt-10 text-sm leading-6 text-blue-200">
          <p>Bertoua · Région de l&apos;Est · Cameroun</p>
          <p>Mont Cameroun</p>
        </div>

      </div>
    </main>
  );
}