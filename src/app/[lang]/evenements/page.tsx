import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

type CalendarItem = {
  date?: string;
  title: string;
  description?: string;
  type: "school" | "payment" | "holiday" | "assessment" | "charis";
};

export default async function EventsPage({ params }: PageProps) {
  const { lang } = await params;

  const currentLang: "fr" | "en" = lang === "en" ? "en" : "fr";
  const isFr = currentLang === "fr";

  const months = isFr
    ? [
        {
          month: "Août 2026",
          items: [
            {
              date: "22 août 2026",
              title: "Consécration de l’année académique",
              description:
                "Culte de consécration et lancement spirituel de l’année scolaire.",
              type: "charis" as const,
            },
            {
              date: "31 août 2026 — 07h30",
              title: "Rentrée administrative",
              description: "Reprise du personnel administratif.",
              type: "school" as const,
            },
          ],
        },
        {
          month: "Septembre 2026",
          items: [
            {
              date: "2 septembre 2026",
              title: "Pré-rentrée pédagogique",
              description:
                "Accueil des enseignants et préparation pédagogique.",
              type: "school" as const,
            },
            {
              date: "7 septembre 2026 — 07h30",
              title: "Rentrée effective des élèves",
              description: "Début officiel des cours.",
              type: "school" as const,
            },
          ],
        },
        {
          month: "Octobre 2026",
          items: [
            {
              date: "5 octobre 2026",
              title: "Journée mondiale des enseignants",
              description: "Célébration des enseignants.",
              type: "charis" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
            {
              date: "14 octobre 2026",
              title: "Date limite de paiement de la 1ʳᵉ tranche",
              description:
                "Pré-maternelle : 20 000 FCFA • Maternelle : 20 000 FCFA • Primaire : 20 000 FCFA",
              type: "payment" as const,
            },
          ],
        },
        {
          month: "Novembre 2026",
          items: [
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
            {
              date: "13 novembre 2026",
              title: "Date limite de paiement de la 2ᵉ tranche",
              description:
                "Pré-maternelle : 20 000 FCFA • Maternelle : 10 000 FCFA • Primaire : 10 000 FCFA",
              type: "payment" as const,
            },
          ],
        },
        {
          month: "Décembre 2026",
          items: [
            {
              date: "10 décembre 2026",
              title: "Date limite de paiement de la 3ᵉ tranche",
              description:
                "Pré-maternelle : 10 000 FCFA • Maternelle : 5 000 FCFA • Primaire : aucune 3ᵉ tranche",
              type: "payment" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
            {
              date: "Mi-décembre 2026",
              title: "Congés de Noël",
              description:
                "Début prévisionnel des congés de Noël. La date précise sera communiquée selon le calendrier scolaire.",
              type: "holiday" as const,
            },
            {
              date: "19 décembre 2026",
              title: "Action de grâce de l’année",
              description: "Événement institutionnel CHARIS.",
              type: "charis" as const,
            },
          ],
        },
        {
          month: "Janvier 2027",
          items: [
            {
              date: "Début janvier 2027",
              title: "Reprise après les congés de Noël",
              description:
                "La date précise de reprise sera communiquée selon le calendrier scolaire.",
              type: "school" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "Février 2027",
          items: [
            {
              date: "11 février 2027",
              title: "Fête de la Jeunesse",
              description: "Jour férié.",
              type: "holiday" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "Mars 2027",
          items: [
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
            {
              date: "26 mars 2027",
              title: "Vendredi Saint",
              description: "Jour férié.",
              type: "holiday" as const,
            },
            {
              date: "Fin mars 2027",
              title: "Congés de Pâques",
              description:
                "Début prévisionnel des congés de Pâques. La date précise sera communiquée selon le calendrier scolaire.",
              type: "holiday" as const,
            },
          ],
        },
        {
          month: "Avril 2027",
          items: [
            {
              date: "Début avril 2027",
              title: "Reprise après les congés de Pâques",
              description:
                "La date précise sera communiquée selon le calendrier scolaire.",
              type: "school" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "Mai 2027",
          items: [
            {
              date: "1er mai 2027",
              title: "Fête du Travail",
              description: "Jour férié.",
              type: "holiday" as const,
            },
            {
              date: "6 mai 2027",
              title: "Ascension",
              description: "Jour férié.",
              type: "holiday" as const,
            },
            {
              date: "20 mai 2027",
              title: "Fête Nationale",
              description: "Jour férié.",
              type: "holiday" as const,
            },
            {
              date: "Date variable",
              title: "Aïd al-Fitr",
              description:
                "Fête religieuse mobile fixée selon le calendrier lunaire.",
              type: "holiday" as const,
            },
            {
              date: "Date variable",
              title: "Aïd al-Adha",
              description:
                "Fête religieuse mobile fixée selon le calendrier lunaire.",
              type: "holiday" as const,
            },
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "Juin 2027",
          items: [
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Les compositions sont prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "Juillet 2027",
          items: [
            {
              date: "Avant-dernière semaine",
              title: "Compositions mensuelles",
              description:
                "Dernières compositions prévues le lundi et le mardi de l’avant-dernière semaine du mois.",
              type: "assessment" as const,
            },
            {
              date: "Fin juillet 2027",
              title: "Grandes vacances",
              description: "Fin prévisionnelle de l’année scolaire.",
              type: "holiday" as const,
            },
          ],
        },
      ]
    : [
        {
          month: "August 2026",
          items: [
            {
              date: "22 August 2026",
              title: "Academic Year Consecration",
              description:
                "Consecration service and spiritual launch of the school year.",
              type: "charis" as const,
            },
            {
              date: "31 August 2026 — 7:30 a.m.",
              title: "Administrative Reopening",
              description: "Return of administrative staff.",
              type: "school" as const,
            },
          ],
        },
        {
          month: "September 2026",
          items: [
            {
              date: "2 September 2026",
              title: "Teachers’ Pre-Reopening",
              description: "Teachers’ welcome and pedagogical preparation.",
              type: "school" as const,
            },
            {
              date: "7 September 2026 — 7:30 a.m.",
              title: "Students’ Reopening",
              description: "Official beginning of classes.",
              type: "school" as const,
            },
          ],
        },
        {
          month: "October 2026",
          items: [
            {
              date: "5 October 2026",
              title: "World Teachers’ Day",
              description: "Celebration of teachers.",
              type: "charis" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
            {
              date: "14 October 2026",
              title: "First Instalment Payment Deadline",
              description:
                "Pre-Nursery: 20,000 FCFA • Nursery: 20,000 FCFA • Primary: 20,000 FCFA",
              type: "payment" as const,
            },
          ],
        },
        {
          month: "November 2026",
          items: [
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
            {
              date: "13 November 2026",
              title: "Second Instalment Payment Deadline",
              description:
                "Pre-Nursery: 20,000 FCFA • Nursery: 10,000 FCFA • Primary: 10,000 FCFA",
              type: "payment" as const,
            },
          ],
        },
        {
          month: "December 2026",
          items: [
            {
              date: "10 December 2026",
              title: "Third Instalment Payment Deadline",
              description:
                "Pre-Nursery: 10,000 FCFA • Nursery: 5,000 FCFA • Primary: no third instalment",
              type: "payment" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
            {
              date: "Mid-December 2026",
              title: "Christmas Break",
              description:
                "Expected beginning of the Christmas break. The exact date will be communicated according to the school calendar.",
              type: "holiday" as const,
            },
            {
              date: "19 December 2026",
              title: "Year-End Thanksgiving",
              description: "CHARIS institutional event.",
              type: "charis" as const,
            },
          ],
        },
        {
          month: "January 2027",
          items: [
            {
              date: "Early January 2027",
              title: "Classes Resume",
              description:
                "The exact reopening date will be communicated according to the school calendar.",
              type: "school" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "February 2027",
          items: [
            {
              date: "11 February 2027",
              title: "Youth Day",
              description: "Public holiday.",
              type: "holiday" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "March 2027",
          items: [
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
            {
              date: "26 March 2027",
              title: "Good Friday",
              description: "Public holiday.",
              type: "holiday" as const,
            },
            {
              date: "Late March 2027",
              title: "Easter Break",
              description:
                "Expected beginning of the Easter break. The exact date will be communicated according to the school calendar.",
              type: "holiday" as const,
            },
          ],
        },
        {
          month: "April 2027",
          items: [
            {
              date: "Early April 2027",
              title: "Classes Resume",
              description:
                "The exact date will be communicated according to the school calendar.",
              type: "school" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "May 2027",
          items: [
            {
              date: "1 May 2027",
              title: "Labour Day",
              description: "Public holiday.",
              type: "holiday" as const,
            },
            {
              date: "6 May 2027",
              title: "Ascension Day",
              description: "Public holiday.",
              type: "holiday" as const,
            },
            {
              date: "20 May 2027",
              title: "National Day",
              description: "Public holiday.",
              type: "holiday" as const,
            },
            {
              date: "Variable date",
              title: "Eid al-Fitr",
              description:
                "Mobile religious holiday determined according to the lunar calendar.",
              type: "holiday" as const,
            },
            {
              date: "Variable date",
              title: "Eid al-Adha",
              description:
                "Mobile religious holiday determined according to the lunar calendar.",
              type: "holiday" as const,
            },
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "June 2027",
          items: [
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
          ],
        },
        {
          month: "July 2027",
          items: [
            {
              date: "Penultimate week",
              title: "Monthly Assessments",
              description:
                "Final assessments are scheduled for Monday and Tuesday of the penultimate week of the month.",
              type: "assessment" as const,
            },
            {
              date: "Late July 2027",
              title: "Long Holiday",
              description: "Expected end of the school year.",
              type: "holiday" as const,
            },
          ],
        },
      ];

  const legend = isFr
    ? [
        { label: "Vie scolaire", type: "school" as const },
        { label: "CHARIS", type: "charis" as const },
        { label: "Compositions", type: "assessment" as const },
        { label: "Paiements", type: "payment" as const },
        { label: "Congés / jours fériés", type: "holiday" as const },
      ]
    : [
        { label: "School Life", type: "school" as const },
        { label: "CHARIS", type: "charis" as const },
        { label: "Assessments", type: "assessment" as const },
        { label: "Payments", type: "payment" as const },
        { label: "Breaks / Public Holidays", type: "holiday" as const },
      ];

  function getTypeClasses(type: CalendarItem["type"]) {
    switch (type) {
      case "payment":
        return "border-orange-300 bg-orange-50";
      case "holiday":
        return "border-green-200 bg-green-50";
      case "assessment":
        return "border-purple-200 bg-purple-50";
      case "charis":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  }

  function getBadgeClasses(type: CalendarItem["type"]) {
    switch (type) {
      case "payment":
        return "bg-orange-500 text-white";
      case "holiday":
        return "bg-green-700 text-white";
      case "assessment":
        return "bg-purple-700 text-white";
      case "charis":
        return "bg-yellow-500 text-blue-950";
      default:
        return "bg-blue-950 text-white";
    }
  }

  function getTypeLabel(type: CalendarItem["type"]) {
    if (isFr) {
      switch (type) {
        case "payment":
          return "Paiement";
        case "holiday":
          return "Congé / férié";
        case "assessment":
          return "Composition";
        case "charis":
          return "CHARIS";
        default:
          return "Vie scolaire";
      }
    }

    switch (type) {
      case "payment":
        return "Payment";
      case "holiday":
        return "Break / Holiday";
      case "assessment":
        return "Assessment";
      case "charis":
        return "CHARIS";
      default:
        return "School Life";
    }
  }

  return (
    <>
      <PageHero
        eyebrow={isFr ? "ÉVÉNEMENTS" : "EVENTS"}
        title={
          isFr ? "Calendrier scolaire 2026-2027" : "2026-2027 School Calendar"
        }
        description={
          isFr
            ? "Retrouvez les principales dates de l’année scolaire : rentrée, compositions, échéances de paiement, événements CHARIS, congés et jours fériés."
            : "Find the key dates of the school year: reopening, assessments, payment deadlines, CHARIS events, breaks and public holidays."
        }
      />

      {/* INFORMATIONS PRATIQUES */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Inscriptions" : "Admissions"}
              </p>

              <h2 className="mt-3 text-2xl font-bold text-blue-950">
                {isFr ? "Inscriptions tous les jours" : "Admissions Every Day"}
              </h2>

              <p className="mt-3 text-gray-700">
                {isFr ? "À partir de 08h30" : "From 8:30 a.m."}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Frais d’inscription" : "Registration Fee"}
              </p>

              <h2 className="mt-3 text-2xl font-bold text-blue-950">
                40 000 FCFA
              </h2>

              <p className="mt-3 text-gray-700">
                {isFr
                  ? "Pré-maternelle, Maternelle et Primaire"
                  : "Pre-Nursery, Nursery and Primary"}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                {isFr ? "Scolarité totale" : "Total Tuition"}
              </p>

              <div className="mt-3 space-y-2 text-gray-700">
                <p>
                  <strong>{isFr ? "Pré-maternelle :" : "Pre-Nursery:"}</strong>{" "}
                  90 000 FCFA
                </p>
                <p>
                  <strong>{isFr ? "Maternelle :" : "Nursery:"}</strong> 75 000
                  FCFA
                </p>
                <p>
                  <strong>{isFr ? "Primaire :" : "Primary:"}</strong> 70 000
                  FCFA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LÉGENDE */}
      <section className="bg-gray-50 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {legend.map((item) => (
              <span
                key={item.label}
                className={`rounded-full px-4 py-2 text-sm font-bold ${getBadgeClasses(
                  item.type
                )}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDRIER */}
      <section className="bg-gray-50 px-6 pb-20 pt-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {months.map((month) => (
            <section
              key={month.month}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="bg-blue-950 px-7 py-5">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  {month.month}
                </h2>
              </div>

              <div className="grid gap-5 p-6 md:p-8">
                {month.items.map((item, index) => (
                  <article
                    key={`${month.month}-${index}-${item.title}`}
                    className={`rounded-2xl border p-6 ${getTypeClasses(
                      item.type
                    )}`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getBadgeClasses(
                            item.type
                          )}`}
                        >
                          {getTypeLabel(item.type)}
                        </span>

                        <h3 className="mt-3 text-xl font-bold text-blue-950 md:text-2xl">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-3 leading-7 text-gray-700">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {item.date && (
                        <div className="shrink-0 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-950 shadow-sm md:max-w-[240px] md:text-right">
                          {item.date}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* NOTE */}
      <section className="bg-blue-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            {isFr ? "À retenir" : "Please Note"}
          </h2>

          <p className="mt-5 leading-8 text-blue-100">
            {isFr
              ? "Certaines dates de congés et les fêtes religieuses mobiles sont indiquées à titre prévisionnel. Les dates définitives communiquées par les autorités compétentes et par l’administration de CHARIS prévaudront."
              : "Some holiday dates and mobile religious celebrations are provisional. Final dates communicated by the competent authorities and the CHARIS administration will prevail."}
          </p>
        </div>
      </section>
    </>
  );
}
