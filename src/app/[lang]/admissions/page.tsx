import CharisName from "@/components/CharisName";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function AdmissionsPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  const requiredDocuments = isFr
    ? [
        "Une photocopie de l’acte de naissance de l’enfant.",
        "Un certificat médical pour les enfants de la maternelle, obtenu auprès d’un service d’inspection médico-sanitaire.",
        "Deux photos d’identité 4 × 4.",
        "Le bulletin scolaire de l’année 2025-2026 pour les anciens élèves ou les élèves venant d’un autre établissement.",
        "Une rame de papier par enfant.",
      ]
    : [
        "One photocopy of the child’s birth certificate.",
        "A medical certificate for preschool children, obtained from a medical inspection service.",
        "Two passport-size photographs, 4 × 4.",
        "The 2025-2026 school report for returning pupils or pupils coming from another school.",
        "One ream of paper per child.",
      ];

  const parentCommitments = isFr
    ? [
        "Payer la totalité des frais de scolarité de l’enfant selon les échéances fixées.",
        "Fournir les tenues, livres, cahiers et autres matériels demandés.",
        "Participer aux réunions de parents et répondre aux convocations.",
        "Suivre l’enfant à la maison dans ses exercices et devoirs.",
        "Respecter le règlement intérieur de l’établissement.",
      ]
    : [
        "Pay the child’s full school fees according to the stated deadlines.",
        "Provide uniforms, books, exercise books and other required materials.",
        "Attend parents’ meetings and respond to school invitations.",
        "Support the child at home with exercises and assignments.",
        "Respect the school’s internal rules and regulations.",
      ];

  return (
    <>
      <PageHero
        eyebrow={isFr ? "ADMISSIONS" : "ADMISSIONS"}
        title={
          isFr
            ? "Inscrire votre enfant pour l’année scolaire 2026-2027"
            : "Enrol your child for the 2026-2027 school year"
        }
        description={
          isFr
            ? "Découvrez nos cycles, les documents à fournir, les frais applicables et les informations nécessaires à l’inscription."
            : "Discover our programmes, required documents, applicable fees and the information needed for enrolment."
        }
      />

      {/* PROGRAMMES */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              {isFr ? "Nos cycles" : "Our Programmes"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr ? "Deux sections complètes" : "Two complete sections"}
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {isFr ? (
                <>
                  Le Groupe Scolaire Bilingue <CharisName /> accueille les
                  enfants dans les sections francophone et anglophone.
                </>
              ) : (
                <>
                  Groupe Scolaire Bilingue <CharisName /> welcomes children into
                  both French and English sections.
                </>
              )}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Section francophone" : "French Section"}
              </p>

              <h3 className="mt-3 text-3xl font-bold text-blue-950">
                {isFr ? "Maternelle et Primaire" : "Preschool and Primary"}
              </h3>

              <div className="mt-7 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-blue-950">
                    {isFr ? "Maternelle" : "Preschool"}
                  </h4>

                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>
                      {isFr
                        ? "Petite Section : enfants de plus de 3 ans."
                        : "Petite Section: children above 3 years."}
                    </li>
                    <li>
                      {isFr
                        ? "Moyenne Section : enfants de 3 à 4 ans."
                        : "Moyenne Section: children aged 3 to 4."}
                    </li>
                    <li>
                      {isFr
                        ? "Grande Section : enfants de 5 ans."
                        : "Grande Section: children aged 5."}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-950">
                    {isFr ? "Primaire" : "Primary"}
                  </h4>

                  <p className="mt-3 text-gray-600">
                    {isFr ? "De la SIL au CM2." : "From SIL to CM2."}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <p className="font-bold uppercase tracking-widest text-orange-500">
                English Section
              </p>

              <h3 className="mt-3 text-3xl font-bold text-blue-950">
                Preschool and Primary
              </h3>

              <div className="mt-7 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-blue-950">Preschool</h4>

                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>Pre-Nursery: children above 3 years.</li>
                    <li>Nursery 1: children aged 3 to 4.</li>
                    <li>Nursery 2: children aged 5.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-950">Primary</h4>

                  <p className="mt-3 text-gray-600">Class 1 to Class 6.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              {isFr ? "Modalités d’inscription" : "Admission Requirements"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr ? "Pièces à fournir" : "Documents to Submit"}
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-gray-600">
              {isFr
                ? "Le dossier doit être complet afin de permettre le traitement régulier de l’inscription."
                : "The application file must be complete for the enrolment to be processed properly."}
            </p>
          </div>

          <div className="space-y-4">
            {requiredDocuments.map((document, index) => (
              <div
                key={document}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  {index + 1}
                </div>

                <p className="leading-7 text-gray-700">{document}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <p className="font-bold text-blue-950">
                {isFr
                  ? "Réduction pour les anciens élèves"
                  : "Discount for Returning Pupils"}
              </p>

              <p className="mt-2 leading-7 text-gray-700">
                {isFr
                  ? "Une réduction de 10 % est accordée aux parents des anciens élèves de l’établissement, selon les conditions fixées par l’administration."
                  : "A 10% discount is granted to parents of returning pupils, subject to the conditions established by the administration."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAIS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              {isFr ? "Année scolaire 2026-2027" : "2026-2027 School Year"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr ? "Frais de scolarité" : "School Fees"}
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              {isFr
                ? "Les montants ci-dessous sont ceux indiqués sur le flyer officiel fourni."
                : "The amounts below are those stated on the official flyer provided."}
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-[850px] w-full border-collapse bg-white text-left">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="px-6 py-5">
                    {isFr ? "Échéance" : "Payment Stage"}
                  </th>
                  <th className="px-6 py-5">
                    {isFr ? "Pré-maternelle" : "Pre-Nursery"}
                  </th>
                  <th className="px-6 py-5">
                    {isFr ? "Maternelle" : "Nursery"}
                  </th>
                  <th className="px-6 py-5">{isFr ? "Primaire" : "Primary"}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-5 font-bold text-blue-950">
                    {isFr ? "Inscription" : "Registration"}
                  </th>
                  <td className="px-6 py-5">40 000 FCFA</td>
                  <td className="px-6 py-5">40 000 FCFA</td>
                  <td className="px-6 py-5">40 000 FCFA</td>
                </tr>

                <tr>
                  <th className="px-6 py-5 font-bold text-blue-950">
                    {isFr
                      ? "1ʳᵉ tranche — avant le 14 octobre"
                      : "1st instalment — before 14 October"}
                  </th>
                  <td className="px-6 py-5">20 000 FCFA</td>
                  <td className="px-6 py-5">20 000 FCFA</td>
                  <td className="px-6 py-5">20 000 FCFA</td>
                </tr>

                <tr>
                  <th className="px-6 py-5 font-bold text-blue-950">
                    {isFr
                      ? "2ᵉ tranche — avant le 13 novembre"
                      : "2nd instalment — before 13 November"}
                  </th>
                  <td className="px-6 py-5">20 000 FCFA</td>
                  <td className="px-6 py-5">10 000 FCFA</td>
                  <td className="px-6 py-5">10 000 FCFA</td>
                </tr>

                <tr>
                  <th className="px-6 py-5 font-bold text-blue-950">
                    {isFr
                      ? "3ᵉ tranche — avant le 10 décembre"
                      : "3rd instalment — before 10 December"}
                  </th>
                  <td className="px-6 py-5">10 000 FCFA</td>
                  <td className="px-6 py-5">5 000 FCFA</td>
                  <td className="px-6 py-5">—</td>
                </tr>

                <tr className="bg-orange-50">
                  <th className="px-6 py-5 text-lg font-bold text-blue-950">
                    Total
                  </th>
                  <td className="px-6 py-5 text-lg font-bold text-blue-950">
                    90 000 FCFA
                  </td>
                  <td className="px-6 py-5 text-lg font-bold text-blue-950">
                    75 000 FCFA
                  </td>
                  <td className="px-6 py-5 text-lg font-bold text-blue-950">
                    70 000 FCFA
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-center text-sm leading-6 text-gray-500">
            {isFr
              ? "Les frais d’inscription sont inclus dans les totaux indiqués sur le flyer."
              : "Registration fees are included in the totals shown on the flyer."}
          </p>
        </div>
      </section>

      {/* INFORMATIONS DE PRÉINSCRIPTION */}
      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              {isFr ? "Préinscription" : "Pre-Enrolment"}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-950">
              {isFr ? "Informations à préparer" : "Information to Prepare"}
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              {isFr
                ? "Ces informations correspondent aux principaux éléments de la fiche d’inscription."
                : "This information corresponds to the main sections of the registration form."}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              isFr
                ? "Nom complet, sexe, classe sollicitée, âge, date et lieu de naissance."
                : "Full name, gender, requested class, age, date and place of birth.",
              isFr
                ? "Disponibilité de l’acte de naissance et informations médicales particulières."
                : "Availability of the birth certificate and relevant medical information.",
              isFr
                ? "Statut de nouvel ou ancien élève et lieu d’habitation."
                : "New or returning pupil status and home location.",
              isFr
                ? "Noms, contacts WhatsApp, professions et lieux de service des parents."
                : "Parents’ names, WhatsApp contacts, professions and workplaces.",
              isFr
                ? "Adresse ou domicile de la famille."
                : "Family address or residence.",
              isFr
                ? "Pour la maternelle : identité des personnes autorisées à récupérer l’enfant."
                : "For preschool: identity of persons authorised to collect the child.",
              isFr
                ? "Situation particulière : enfant réfugié, déplacé interne ou appartenant à une communauté vulnérable."
                : "Special situation: refugee, internally displaced child or child from a vulnerable community.",
              isFr
                ? "Observations spécifiques utiles à l’accompagnement de l’enfant."
                : "Specific observations useful for supporting the child.",
              isFr
                ? "Acceptation des engagements du parent et du règlement de l’école."
                : "Acceptance of parental commitments and school rules.",
            ].map((item, index) => (
              <article
                key={item}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <span className="text-3xl font-black text-orange-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-4 leading-7 text-gray-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              {isFr
                ? "Partenariat avec les familles"
                : "Partnership with Families"}
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {isFr
                ? "Les engagements essentiels des parents"
                : "Essential Parental Commitments"}
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-blue-100">
              {isFr
                ? "L’éducation de l’enfant repose sur une collaboration régulière entre l’école et la famille."
                : "A child’s education depends on regular collaboration between the school and the family."}
            </p>
          </div>

          <div className="space-y-4">
            {parentCommitments.map((commitment, index) => (
              <div
                key={commitment}
                className="flex gap-4 rounded-2xl bg-blue-900 p-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold">
                  {index + 1}
                </div>

                <p className="leading-7 text-blue-100">{commitment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT ADMISSIONS */}
      <section className="bg-orange-500 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-950">
              {isFr ? "Les inscriptions sont ouvertes" : "Admissions are open"}
            </h2>

            <p className="mt-3 text-lg text-blue-950">
              {isFr
                ? "Les inscriptions sont reçues tous les jours à partir de 08h30."
                : "Admissions are received every day from 8:30 a.m."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={`/${currentLang}/contact`}
              className="rounded-xl bg-blue-950 px-7 py-4 font-bold text-white transition hover:bg-blue-900"
            >
              {isFr ? "Nous contacter" : "Contact Us"}
            </a>

            <a
              href="https://wa.me/237653844866"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-blue-950 px-7 py-4 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
