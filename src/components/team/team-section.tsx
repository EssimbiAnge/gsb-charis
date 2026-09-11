import type { TeamGroupSection } from "@/lib/team/types";
import type { Locale } from "@/lib/news/types";
import { MemberCard } from "./member-card";

const GROUP_LABEL: Record<
  TeamGroupSection["group"],
  { en: string; fr: string }
> = {
  administration: { en: "Administration", fr: "Administration" },
  teacher: { en: "Teachers", fr: "Enseignants" },
  staff: { en: "Staff", fr: "Personnel" },
};

/** Props for {@link TeamSection}. */
export interface TeamSectionProps {
  section: TeamGroupSection;
  locale: Locale;
}

/** One role group on the team page: a heading and a grid of member cards. */
export function TeamSection({ section, locale }: TeamSectionProps) {
  return (
    <section className="border-t border-[#1E2A3A]/10 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-5xl font-bold text-blue-950">
        {GROUP_LABEL[section.group][locale]}
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {section.members.map((member) => (
          <MemberCard key={member.slug} member={member} locale={locale} />
        ))}
      </div>
    </section>
  );
}
