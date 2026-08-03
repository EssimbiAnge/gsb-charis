import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  return (
    <>
      <Header lang={currentLang} />

      <main>
        <PageHero
          eyebrow={isFr ? "Nous contacter" : "Contact Us"}
          title={
            isFr
              ? "Nous sommes disponibles pour vous accompagner"
              : "We are available to assist you"
          }
          description={
            isFr
              ? "Pour toute question concernant les admissions, les programmes, les partenariats ou la vie scolaire, contactez l’équipe du Groupe Scolaire Bilingue CHARIS."
              : "For enquiries about admissions, programmes, partnerships or school life, contact the Groupe Scolaire Bilingue CHARIS team."
          }
        />

        <section className="bg-white px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                1
              </div>

              <h2 className="mt-5 text-2xl font-bold text-blue-950">
                {isFr ? "Téléphone" : "Phone"}
              </h2>

              <div className="mt-5 space-y-3 text-gray-600">
                <p>
                  <a
                    href="tel:+237653844866"
                    className="transition hover:text-orange-600"
                  >
                    +237 653 844 866
                  </a>
                </p>

                <p>
                  <a
                    href="tel:+237672087991"
                    className="transition hover:text-orange-600"
                  >
                    +237 672 087 991
                  </a>
                </p>

                <p>
                  <a
                    href="tel:+237697028411"
                    className="transition hover:text-orange-600"
                  >
                    +237 697 028 411
                  </a>
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                2
              </div>

              <h2 className="mt-5 text-2xl font-bold text-blue-950">
                {isFr ? "Adresse électronique" : "Email"}
              </h2>

              <p className="mt-5 break-words text-gray-600">
                <a
                  href="mailto:gsbcharis2024@gmail.com"
                  className="transition hover:text-orange-600"
                >
                  gsbcharis2024@gmail.com
                </a>
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                3
              </div>

              <h2 className="mt-5 text-2xl font-bold text-blue-950">
                {isFr ? "Localisation" : "Location"}
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                {isFr
                  ? "Quartier Mont Cameroun, à environ 500 mètres de la Délégation Régionale du Tourisme, Bertoua, Cameroun."
                  : "Mont Cameroun neighbourhood, approximately 500 metres from the Regional Delegation of Tourism, Bertoua, Cameroon."}
              </p>
            </article>
          </div>
        </section>

        <section className="bg-gray-100 px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Écrivez-nous" : "Send Us a Message"}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {isFr
                  ? "Comment pouvons-nous vous aider ?"
                  : "How can we help you?"}
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-gray-600">
                {isFr
                  ? "Remplissez ce formulaire pour nous adresser votre demande. L’équipe de CHARIS vous répondra dès que possible."
                  : "Complete this form to send us your enquiry. The CHARIS team will respond as soon as possible."}
              </p>

              <div className="mt-8 rounded-2xl bg-blue-950 p-7 text-white">
                <h3 className="text-xl font-bold">
                  {isFr ? "Horaires d’ouverture" : "Opening Hours"}
                </h3>

                <p className="mt-3 text-blue-100">
                  {isFr
                    ? "Jours ouvrables : 7h30 à 15h30"
                    : "Working days: 7:30 a.m. to 3:30 p.m."}
                </p>
              </div>
            </div>

            <form className="rounded-2xl bg-white p-8 shadow-sm">
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
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
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
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6">
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
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                />
              </div>

              <div className="mt-6">
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
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="block font-bold text-blue-950"
                >
                  {isFr ? "Objet de la demande" : "Subject"}
                </label>

                <select
                  id="subject"
                  name="subject"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                >
                  <option value="">
                    {isFr ? "Sélectionnez une option" : "Select an option"}
                  </option>

                  <option value="admissions">
                    {isFr ? "Admissions" : "Admissions"}
                  </option>

                  <option value="programmes">
                    {isFr
                      ? "Programmes scolaires"
                      : "Academic Programmes"}
                  </option>

                  <option value="partenariat">
                    {isFr ? "Partenariat" : "Partnership"}
                  </option>

                  <option value="soutien">
                    {isFr ? "Soutenir CHARIS" : "Support CHARIS"}
                  </option>

                  <option value="autre">
                    {isFr ? "Autre demande" : "Other Enquiry"}
                  </option>
                </select>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block font-bold text-blue-950"
                >
                  {isFr ? "Message" : "Message"}
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                {isFr ? "Envoyer le message" : "Send Message"}
              </button>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                {isFr
                  ? "Le formulaire sera connecté à notre système de réception des messages lors de l’intégration de la base de données."
                  : "The form will be connected to our message management system when the database is integrated."}
              </p>
            </form>
          </div>
        </section>

        <section className="bg-white px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Nous rendre visite" : "Visit Us"}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-950">
                {isFr
                  ? "Retrouvez-nous à Bertoua"
                  : "Find us in Bertoua"}
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                {isFr
                  ? "Le Groupe Scolaire Bilingue CHARIS est situé au quartier Mont Cameroun, à environ 500 mètres de la Délégation Régionale du Tourisme."
                  : "Groupe Scolaire Bilingue CHARIS is located in the Mont Cameroun neighbourhood, approximately 500 metres from the Regional Delegation of Tourism."}
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps?q=4.565200,13.69698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-950 px-6 py-3 font-bold text-white transition hover:bg-blue-900"
                >
                  {isFr ? "Ouvrir dans Google Maps" : "Open in Google Maps"}
                </a>

                <a
                  href="https://wa.me/237653844866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-blue-950 px-6 py-3 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-blue-50 p-8 text-center">
              <div>
                <p className="text-lg font-bold text-blue-950">
                  Groupe Scolaire Bilingue CHARIS
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Mont Cameroun
                  <br />
                  Bertoua, Cameroun
                </p>

                <p className="mt-5 font-semibold text-orange-600">
                  4.565200, 13.69698
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={currentLang} />
    </>
  );
}