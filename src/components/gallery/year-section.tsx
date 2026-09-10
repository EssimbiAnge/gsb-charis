import type { GalleryYear } from "@/lib/gallery/types";
import type { Locale } from "@/lib/news/types";
import { FolderCard } from "./folder-card";

/** Props for {@link YearSection}. */
export interface YearSectionProps {
  yearData: GalleryYear;
  locale: Locale;
}

/**
 * One year's worth of gallery events, rendered as a spine-labeled section
 * with events laid out as a horizontally scrollable row of folder cards.
 */
export function YearSection({ yearData, locale }: YearSectionProps) {
  return (
    <section className="flex flex-col gap-12">
      <div className="w-20 shrink-0">
        <p className="text-8xl leading-none font-bold text-blue-950 ">{yearData.year}</p>
      </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-2">
        {yearData.events.map((event) => (
          <FolderCard key={event.slug} event={event} locale={locale} />
        ))}
      </div>
    </section>
  );
}