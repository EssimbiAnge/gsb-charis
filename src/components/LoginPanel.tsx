"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import CharisName from "./CharisName";

type LoginPanelProps = {
  lang: "fr" | "en";
};

type UserRole = "parent" | "staff";

export default function LoginPanel({ lang }: LoginPanelProps) {
  const isFr = lang === "fr";

  const [role, setRole] = useState<UserRole>("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-gray-100 px-6 py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="bg-blue-950 p-10 text-white lg:p-14">
          <p className="font-bold uppercase tracking-widest text-orange-400">
            {isFr ? "Votre espace" : "Your Portal"}
          </p>

          <div className="mt-4">
            <CharisName className="text-4xl" />
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight">
            {isFr
              ? "Accédez aux informations qui vous concernent"
              : "Access the information that matters to you"}
          </h2>

          <p className="mt-6 leading-8 text-blue-100">
            {isFr
              ? "L’espace sécurisé permettra aux parents et au personnel d’accéder progressivement aux informations scolaires, administratives et pédagogiques."
              : "The secure portal will progressively allow parents and staff to access school, administrative and academic information."}
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-2xl bg-blue-900 p-6">
              <h3 className="text-xl font-bold">
                {isFr ? "Espace Parent" : "Parent Portal"}
              </h3>

              <p className="mt-2 leading-7 text-blue-100">
                {isFr
                  ? "Suivi des inscriptions, informations scolaires, paiements, résultats et communications."
                  : "Admissions tracking, school information, payments, results and communication."}
              </p>
            </div>

            <div className="rounded-2xl bg-blue-900 p-6">
              <h3 className="text-xl font-bold">
                {isFr ? "Espace Personnel" : "Staff Portal"}
              </h3>

              <p className="mt-2 leading-7 text-blue-100">
                {isFr
                  ? "Accès aux outils pédagogiques, documents internes, rapports et informations administratives."
                  : "Access to teaching tools, internal documents, reports and administrative information."}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-orange-400 bg-orange-400/10 p-6">
            <p className="font-bold text-orange-300">
              {isFr ? "Sécurité" : "Security"}
            </p>

            <p className="mt-2 leading-7 text-blue-100">
              {isFr
                ? "Ne communiquez jamais votre mot de passe. CHARIS ne vous demandera jamais votre mot de passe par téléphone, SMS ou WhatsApp."
                : "Never share your password. CHARIS will never ask for your password by phone, SMS or WhatsApp."}
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-14">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            {isFr ? "Connexion" : "Sign In"}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {isFr
              ? "Bienvenue dans votre espace"
              : "Welcome to your portal"}
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            {isFr
              ? "Sélectionnez votre profil puis renseignez vos informations de connexion."
              : "Select your profile and enter your login information."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setRole("parent");
                setSubmitted(false);
              }}
              className={`rounded-xl border-2 px-4 py-4 font-bold transition ${
                role === "parent"
                  ? "border-orange-500 bg-orange-50 text-blue-950"
                  : "border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {isFr ? "Parent" : "Parent"}
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("staff");
                setSubmitted(false);
              }}
              className={`rounded-xl border-2 px-4 py-4 font-bold transition ${
                role === "staff"
                  ? "border-orange-500 bg-orange-50 text-blue-950"
                  : "border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {isFr ? "Personnel" : "Staff"}
            </button>
          </div>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-7">
              <h2 className="text-xl font-bold text-blue-950">
                {isFr
                  ? "Connexion bientôt disponible"
                  : "Login Coming Soon"}
              </h2>

              <p className="mt-3 leading-7 text-gray-700">
                {isFr
                  ? "Le formulaire est prêt, mais l’authentification n’est pas encore connectée à la base de données."
                  : "The form is ready, but authentication is not yet connected to the database."}
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 font-bold text-orange-600 hover:text-orange-700"
              >
                {isFr ? "Retour au formulaire" : "Back to the form"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <input type="hidden" name="role" value={role} />

              <div>
                <label
                  htmlFor="identifier"
                  className="block font-bold text-blue-950"
                >
                  {isFr
                    ? "Adresse électronique ou téléphone"
                    : "Email Address or Phone Number"}
                </label>

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder={
                    isFr
                      ? "exemple@email.com ou +237..."
                      : "example@email.com or +237..."
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block font-bold text-blue-950"
                >
                  {isFr ? "Mot de passe" : "Password"}
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-28 text-gray-900 outline-none transition focus:border-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-600"
                  >
                    {showPassword
                      ? isFr
                        ? "Masquer"
                        : "Hide"
                      : isFr
                        ? "Afficher"
                        : "Show"}
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-gray-600">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4"
                  />

                  <span>
                    {isFr ? "Se souvenir de moi" : "Remember me"}
                  </span>
                </label>

                <button
                  type="button"
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  {isFr ? "Mot de passe oublié ?" : "Forgot Password?"}
                </button>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                {role === "parent"
                  ? isFr
                    ? "Accéder à l’espace Parent"
                    : "Access Parent Portal"
                  : isFr
                    ? "Accéder à l’espace Personnel"
                    : "Access Staff Portal"}
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-gray-200 pt-7 text-center">
            <p className="text-gray-600">
              {isFr
                ? "Vous n’avez pas encore de compte ?"
                : "Do not have an account yet?"}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {isFr
                ? "Les comptes seront créés ou autorisés par l’administration."
                : "Accounts will be created or authorised by the administration."}
            </p>

            <Link
              href={`/${lang}/contact`}
              className="mt-4 inline-block font-bold text-orange-600 hover:text-orange-700"
            >
              {isFr ? "Contacter l’administration" : "Contact Administration"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}