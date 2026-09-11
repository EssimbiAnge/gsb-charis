import type { LocalizedString } from "@/lib/gallery/types";
import type { Locale } from "@/lib/news/types";

/** Resolves a {@link LocalizedString} to a plain string for the given locale. */
export function localize(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}