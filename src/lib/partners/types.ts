import { z } from "zod";
import { localizedStringSchema } from "@/lib/i18n/localize";

/**
 * Schema for one partner file in `content/partners/`. The slug is derived
 * from the filename by the repository, not stored in the file.
 */
export const partnerSchema = z.object({
    /** Organization name. Not localized. */
    name: z.object({
        en: z.string().min(1),
        fr: z.string().min(1),
        short: z.string().min(1),
    }),
    /** Public URL of the logo, e.g. in the R2 bucket. PNG/WebP/JPG recommended. */
    logo: z.url(),
    /** One or two sentences about the organization, in both languages. */
    description: localizedStringSchema,
    /** Optional link to the organization's site; makes the whole card clickable. */
    website: z.url().optional(),
    /** Lower numbers sort first. Ties fall back to name order. */
    order: z.number().default(999),
});

/** A validated partner, plus the slug derived from its filename. */
export type Partner = z.infer<typeof partnerSchema> & { slug: string };