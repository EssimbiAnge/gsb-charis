import { galleryRepository } from "./repository";
import type { MediaItem } from "./types";

/**
 * Finds a single media item within a gallery event by its filename
 * (matched against the end of the item's `src` URL).
 *
 * @param year - Gallery event year, e.g. "2026".
 * @param slug - Gallery event slug, e.g. "rentree-scolaire-sept-7".
 * @param filename - The file's own name, e.g. "prep_1.webp".
 * @returns The matching item, or `null` if the event or file isn't found.
 */
export async function getGalleryItem(year: string, slug: string, filename: string): Promise<MediaItem | null> {
  const meta = await galleryRepository.getEvent(year, slug);
  if (!meta) return null;
  return meta.items.find((item) => item.src.endsWith(`/${filename}`)) ?? null;
}

/**
 * Returns media items from a gallery event, optionally filtered to a
 * specific ordered subset of filenames.
 *
 * @param year - Gallery event year.
 * @param slug - Gallery event slug.
 * @param filenames - Optional ordered filenames to include. Omit to return every item.
 */
export async function getGalleryItems(year: string, slug: string, filenames?: string[]): Promise<MediaItem[]> {
  const meta = await galleryRepository.getEvent(year, slug);
  if (!meta) return [];
  if (!filenames) return meta.items;
  return filenames
    .map((filename) => meta.items.find((item) => item.src.endsWith(`/${filename}`)))
    .filter((item): item is MediaItem => item !== undefined);
}