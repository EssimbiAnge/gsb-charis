import type { LocalizedString } from "@/lib/gallery/types";
import type { Locale } from "@/lib/news/types";
import z from "zod";

/** A string with both required language versions. */
export const localizedStringSchema = z.object({
  en: z.string().min(1),
  fr: z.string().min(1),
});

/** Resolves a {@link LocalizedString} to a plain string for the given locale. */
export function localize(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}