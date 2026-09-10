import Link from "next/link";
import Image from "next/image";
import type { GalleryEventSummary } from "@/lib/gallery/types";
import type { Locale } from "@/lib/news/types";

/** Props for {@link FolderCard}. */
export interface FolderCardProps {
  event: GalleryEventSummary;
  locale: Locale;
}

/**
 * A gallery event rendered as a photo-stack "folder": the cover image sits
 * atop 1–2 offset, rotated cards suggesting more photos behind it. On
 * hover, the stack settles flat, revealing the pages beneath the cover.
 */
export function FolderCard({ event, locale }: FolderCardProps) {
  const dateLabel = new Date(event.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/${locale}/gallery/${event.year}/${event.slug}`} className="group block shrink-0">
      <div className="relative h-64">
        <div className="absolute inset-0 origin-bottom-left -rotate-2 rounded-sm bg-blue-950 shadow-sm transition-transform duration-300 group-hover:rotate-[-6deg]" />
        <div className="absolute inset-0 origin-bottom-right rotate-1 rounded-sm bg-orange-500 shadow-sm transition-transform duration-300 group-hover:rotate-[4deg]" />
        <div className="absolute inset-0 overflow-hidden rounded-sm shadow-md transition-transform duration-300 group-hover:-translate-y-1">
          <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold leading-snug text-blue-950">{event.title}</p>
        <p className="mt-1 text-sm text-[#4A5D48]">
          {event.itemCount} {event.itemCount === 1 ? "item" : "items"} · {dateLabel}
        </p>
      </div>
    </Link>
  );
}