import { getGalleryItems } from "@/lib/gallery/get-items";
import { Gallery } from "./gallery";
import { Locale } from "@/lib/news/types";
import { localize } from "@/lib/i18n/localize";

/**
 * Pulls a set of images from an existing gallery event's `meta.json` and
 * renders them as an in-article, tabbable gallery.
 */
export async function GalleryFromEvent({
  event,
  files,
  locale,
}: {
  event: string;
  /** Optional ordered subset of filenames. Omit to include every image in the event. */
  files?: string[];
  locale: Locale;
}) {
  const [year, slug] = event.split("/");
  const items = await getGalleryItems(year, slug, files);
  const imageItems = items.filter((item) => item.type === "image");

  return (
    <Gallery
      locale={locale}
      images={imageItems.map((item) => ({
        src: item.src,
        alt: item.alt,
      }))}
    />
  );
}
