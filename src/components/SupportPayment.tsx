"use client";

import { FormEvent, useMemo, useState } from "react";

type Lang = "fr" | "en";

type SupportPaymentProps = {
  lang: Lang;
};

type SupportCategory = "child" | "school" | "mission";
type PaymentOperator = "mtn" | "orange" | "";

type SupportOption = {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
};

const supportOptions: Record<SupportCategory, SupportOption[]> = {
  child: [
    {
      id: "child-sponsorship",
      titleFr: "Parrainer un enfant",
      titleEn: "Sponsor a child",
      descriptionFr:
        "Contribuer aux frais de scolarité et au parcours éducatif d’un enfant.",
      descriptionEn:
        "Contribute to a child’s school fees and educational journey.",
    },
    {
      id: "school-materials",
      titleFr: "Offrir des fournitures scolaires",
      titleEn: "Provide school supplies",
      descriptionFr:
        "Financer des manuels, cahiers, uniformes ou autres fournitures.",
      descriptionEn:
        "Fund textbooks, exercise books, uniforms or other supplies.",
    },
    {
      id: "child-meals",
      titleFr: "Soutenir les besoins essentiels",
      titleEn: "Support essential needs",
      descriptionFr:
        "Contribuer aux repas, à l’hygiène ou à l’accompagnement d’un enfant.",
      descriptionEn:
        "Contribute to meals, hygiene or a child’s general support.",
    },
  ],

  school: [
    {
      id: "classroom-equipment",
      titleFr: "Équiper une salle de classe",
      titleEn: "Equip a classroom",
      descriptionFr:
        "Financer du mobilier, du matériel pédagogique ou des équipements numériques.",
      descriptionEn:
        "Fund furniture, teaching materials or digital equipment.",
    },
    {
      id: "school-activities",
      titleFr: "Soutenir une activité scolaire",
      titleEn: "Support a school activity",
      descriptionFr:
        "Contribuer aux activités sportives, culturelles, artistiques ou éducatives.",
      descriptionEn:
        "Support sports, cultural, artistic or educational activities.",
    },
    {
      id: "school-infrastructure",
      titleFr: "Développer les infrastructures",
      titleEn: "Develop school infrastructure",
      descriptionFr:
        "Participer à la construction, la rénovation et l’amélioration du campus.",
      descriptionEn:
        "Contribute to the construction, renovation and improvement of the campus.",
    },
  ],

  mission: [
    {
      id: "discipleship",
      titleFr: "Soutenir le discipolat",
      titleEn: "Support discipleship",
      descriptionFr:
        "Contribuer à la formation spirituelle des enfants, enseignants et familles.",
      descriptionEn:
        "Support the spiritual development of children, teachers and families.",
    },
    {
      id: "leadership-training",
      titleFr: "Former des leaders",
      titleEn: "Train leaders",
      descriptionFr:
        "Financer des formations destinées aux enseignants, éducateurs et jeunes leaders.",
      descriptionEn:
        "Fund training for teachers, educators and young leaders.",
    },
    {
      id: "community-projects",
      titleFr: "Développer les communautés",
      titleEn: "Develop communities",
      descriptionFr:
        "Soutenir les initiatives éducatives, sociales et communautaires de CHARIS.",
      descriptionEn:
        "Support CHARIS educational, social and community initiatives.",
    },
  ],
};

const predefinedAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

export default function SupportPayment({ lang }: SupportPaymentProps) {
  const isFr = lang === "fr";

  const [category, setCategory] = useState<SupportCategory>("child");
  const [selectedCause, setSelectedCause] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [operator, setOperator] = useState<PaymentOperator>("");
  const [submitted, setSubmitted] = useState(false);

  const reference = useMemo(() => {
    const date = new Date();
    const datePart = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("");

    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `CHARIS-${datePart}-${randomPart}`;
  }, []);

  const finalAmount = customAmount
    ? Number(customAmount)
    : selectedAmount ?? 0;

  const currentOptions = supportOptions[category];

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("fr-FR").format(amount);

  function handleCategoryChange(value: SupportCategory) {
    setCategory(value);
    setSelectedCause("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedCause || !operator || finalAmount <= 0) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <div>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Choisissez votre impact" : "Choose Your Impact"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr
                ? "Trois manières de soutenir CHARIS"
                : "Three ways to support CHARIS"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <button
              type="button"
              onClick={() => handleCategoryChange("child")}
              className={`rounded-2xl border-2 p-8 text-left transition ${
                category === "child"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                01
              </p>

              <h3 className="mt-3 text-2xl font-bold text-blue-950">
                {isFr ? "Soutenir un enfant" : "Support a Child"}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {isFr
                  ? "Contribuez à la scolarité, aux fournitures et aux besoins essentiels d’un enfant."
                  : "Contribute to a child’s education, supplies and essential needs."}
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("school")}
              className={`rounded-2xl border-2 p-8 text-left transition ${
                category === "school"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                02
              </p>

              <h3 className="mt-3 text-2xl font-bold text-blue-950">
                {isFr ? "Soutenir l’école" : "Support the School"}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {isFr
                  ? "Participez aux équipements, programmes et infrastructures de l’établissement."
                  : "Contribute to school equipment, programmes and infrastructure."}
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleCategoryChange("mission")}
              className={`rounded-2xl border-2 p-8 text-left transition ${
                category === "mission"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                03
              </p>

              <h3 className="mt-3 text-2xl font-bold text-blue-950">
                {isFr ? "Soutenir la mission" : "Support the Mission"}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {isFr
                  ? "Soutenez le discipolat, le leadership et le développement communautaire."
                  : "Support discipleship, leadership and community development."}
              </p>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr ? "Votre contribution" : "Your Contribution"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr
                ? "Sélectionnez une cause et un montant"
                : "Select a cause and an amount"}
            </h2>

            <div className="mt-8 space-y-4">
              {currentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`block cursor-pointer rounded-2xl border-2 bg-white p-6 transition ${
                    selectedCause === option.id
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="cause"
                      value={option.id}
                      checked={selectedCause === option.id}
                      onChange={(event) =>
                        setSelectedCause(event.target.value)
                      }
                      className="mt-1 h-5 w-5"
                    />

                    <div>
                      <h3 className="text-xl font-bold text-blue-950">
                        {isFr ? option.titleFr : option.titleEn}
                      </h3>

                      <p className="mt-2 leading-7 text-gray-600">
                        {isFr
                          ? option.descriptionFr
                          : option.descriptionEn}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-blue-950">
                {isFr ? "Montant du soutien" : "Support Amount"}
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-xl border-2 px-4 py-4 font-bold transition ${
                      selectedAmount === amount && !customAmount
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-200 bg-white text-blue-950 hover:border-orange-400"
                    }`}
                  >
                    {formatAmount(amount)} FCFA
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="customAmount"
                  className="block font-bold text-blue-950"
                >
                  {isFr ? "Autre montant" : "Other Amount"}
                </label>

                <input
                  id="customAmount"
                  name="customAmount"
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(event) => {
                    setCustomAmount(event.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder={isFr ? "Montant en FCFA" : "Amount in FCFA"}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-8 rounded-2xl bg-blue-950 p-8 text-white">
              <p className="font-bold uppercase tracking-widest text-orange-400">
                {isFr ? "Paiement Mobile Money" : "Mobile Money Payment"}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {isFr
                  ? "Effectuez votre transfert"
                  : "Make Your Transfer"}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setOperator("mtn")}
                  className={`rounded-xl border-2 p-5 text-left transition ${
                    operator === "mtn"
                      ? "border-yellow-400 bg-white text-blue-950"
                      : "border-blue-700 bg-blue-900 text-white"
                  }`}
                >
                  <p className="text-lg font-bold">MTN MoMo</p>
                  <p className="mt-2 text-sm">
                    {isFr ? "Code marchand" : "Merchant Code"}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOperator("orange")}
                  className={`rounded-xl border-2 p-5 text-left transition ${
                    operator === "orange"
                      ? "border-orange-400 bg-white text-blue-950"
                      : "border-blue-700 bg-blue-900 text-white"
                  }`}
                >
                  <p className="text-lg font-bold">Orange Money</p>
                  <p className="mt-2 text-sm">
                    {isFr ? "Code marchand" : "Merchant Code"}
                  </p>
                </button>
              </div>

              <div className="mt-8 space-y-5 rounded-xl bg-blue-900 p-6">
                <div>
                  <p className="text-sm text-blue-200">
                    {isFr ? "Titulaire" : "Account Holder"}
                  </p>

                  <p className="mt-1 font-bold">
                    GROUPE SCOLAIRE BILINGUE CHARIS
                  </p>
                </div>

                <div>
                  <p className="text-sm text-blue-200">
                    {isFr ? "Code marchand" : "Merchant Code"}
                  </p>

                  <p className="mt-1 font-bold text-orange-400">
                    {isFr ? "À renseigner" : "To be provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-blue-200">
                    {isFr ? "Montant" : "Amount"}
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {finalAmount > 0
                      ? `${formatAmount(finalAmount)} FCFA`
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-blue-200">
                    {isFr ? "Référence CHARIS" : "CHARIS Reference"}
                  </p>

                  <p className="mt-1 break-all font-bold text-orange-400">
                    {reference}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-orange-400 bg-orange-400/10 p-5">
                <p className="font-bold text-orange-300">
                  {isFr ? "Consigne importante" : "Important Instruction"}
                </p>

                <p className="mt-2 leading-7 text-blue-100">
                  {isFr
                    ? "Utilisez cette référence lors de votre transfert, puis remplissez le formulaire de déclaration ci-dessous."
                    : "Use this reference when making your transfer, then complete the declaration form below."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              {isFr
                ? "Déclaration de transaction"
                : "Transaction Declaration"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr
                ? "Déclarez votre paiement"
                : "Declare Your Payment"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              {isFr
                ? "Votre soutien sera confirmé après vérification de la transaction dans le compte marchand officiel de CHARIS."
                : "Your support will be confirmed after the transaction has been verified in the official CHARIS merchant account."}
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-8 text-center">
              <h3 className="text-2xl font-bold text-green-800">
                {isFr
                  ? "Déclaration enregistrée"
                  : "Declaration Recorded"}
              </h3>

              <p className="mt-4 leading-7 text-green-700">
                {isFr
                  ? "Merci pour votre soutien. Notre équipe vérifiera le paiement auprès de l’opérateur avant sa validation définitive."
                  : "Thank you for your support. Our team will verify the payment with the operator before final confirmation."}
              </p>

              <p className="mt-4 font-bold text-green-900">
                {reference}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl bg-gray-50 p-8"
            >
              <input type="hidden" name="charisReference" value={reference} />
              <input type="hidden" name="category" value={category} />
              <input type="hidden" name="cause" value={selectedCause} />
              <input type="hidden" name="operator" value={operator} />
              <input type="hidden" name="amount" value={finalAmount} />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block font-bold text-blue-950"
                  >
                    {isFr ? "Prénom" : "First Name"}
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block font-bold text-blue-950"
                  >
                    {isFr ? "Nom" : "Last Name"}
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-blue-950"
                  >
                    {isFr ? "Adresse électronique" : "Email Address"}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-bold text-blue-950"
                  >
                    {isFr ? "Téléphone" : "Phone"}
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="transactionId"
                  className="block font-bold text-blue-950"
                >
                  {isFr
                    ? "Numéro ou référence de la transaction"
                    : "Transaction Number or Reference"}
                </label>

                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block font-bold text-blue-950"
                >
                  {isFr ? "Commentaire facultatif" : "Optional Comment"}
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="font-bold text-red-800">
                  {isFr ? "Sécurité" : "Security"}
                </p>

                <p className="mt-2 leading-7 text-red-700">
                  {isFr
                    ? "Ne communiquez jamais votre code secret MTN MoMo ou Orange Money. CHARIS ne vous demandera jamais ce code."
                    : "Never share your MTN MoMo or Orange Money secret code. CHARIS will never ask you for it."}
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedCause || !operator || finalAmount <= 0}
                className="mt-8 w-full rounded-lg bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isFr
                  ? "Enregistrer ma déclaration"
                  : "Submit My Declaration"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}