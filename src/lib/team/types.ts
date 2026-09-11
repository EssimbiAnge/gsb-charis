import { z } from "zod";
import { localizedStringSchema } from "@/lib/i18n/localize";

/** Which section of the team page a person appears in. Order here also drives display order. */
export const TEAM_GROUPS = ["administration", "teacher", "staff"] as const;
export type TeamGroup = (typeof TEAM_GROUPS)[number];

const contactTypeSchema = z.enum(["email", "phone", "whatsapp", "facebook", "instagram", "linkedin", "website"]);

/** A single optional contact/social link for a team member. */
export const teamContactSchema = z.object({
  type: contactTypeSchema,
  /** Email address, phone number, or full URL, depending on `type`. */
  value: z.string().min(1),
});
export type TeamContact = z.infer<typeof teamContactSchema>;

export const teamMemberSchema = z.object({
  slug: z.string().min(1),
  /** Full name — not localized, names don't translate. */
  name: z.string().min(1),
  group: z.enum(TEAM_GROUPS),
  /** e.g. "Class 3B Teacher" / "Titulaire Classe 3B". Free text, not structured class/section fields. */
  roleTitle: localizedStringSchema,
  photo: z.string().url(),
  bio: localizedStringSchema,
  contacts: z.array(teamContactSchema).default([]),
  /** Lower numbers sort first within a group. Ties fall back to name order. */
  order: z.number().default(999),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

/** All team members for one group, in display order. */
export interface TeamGroupSection {
  group: TeamGroup;
  members: TeamMember[];
}