import { getGalleryItem } from "@/lib/gallery/get-items";
import { ArticleImage } from "./article-image";
import { localize } from "@/lib/i18n/localize";
import { Locale } from "@/lib/news/types";

/**
 * Pulls a single image from an existing gallery event's `meta.json` and
 * renders it as an article image — reusing the same file/alt text
 * instead of duplicating them in article MDX.
 */
export async function ArticleImageFromGallery({
  event,
  file,
  caption,
  locale,
}: {
  /** `"<year>/<slug>"` of the gallery event, e.g. "2026/rentree-scolaire-sept-7". */
  event: string;
  /** Filename within that event, e.g. "prep_1.webp". */
  file: string;
  caption?: string;
  locale: Locale;
}) {
  const [year, slug] = event.split("/");
  const item = await getGalleryItem(year, slug, file);

  if (!item) {
    throw new Error(
      `ArticleImageFromGallery: no item found for event "${event}", file "${file}".`
    );
  }
  if (item.type !== "image") {
    throw new Error(
      `ArticleImageFromGallery: "${file}" is a ${item.type}, not an image.`
    );
  }

  return (
    <ArticleImage
      src={item.src}
      alt={item.alt}
      caption={caption}
      locale={locale}
    />
  );
}
