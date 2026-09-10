import type { GalleryEventMeta, GalleryEventSummary, GalleryYear } from "./types";
import { fsGalleryRepository } from "./fs";

/**
 * Data-access contract for the gallery. Mirrors the news `ArticleRepository`
 * pattern: pages depend only on this interface, not on how media/metadata
 * are actually stored, so the backend can change without touching UI.
 */
export interface GalleryRepository {
  /** Returns all years with events, newest year first. */
  getAllYears(): Promise<GalleryYear[]>;
  /** Returns full metadata (including media items) for one event. */
  getEvent(year: string, slug: string): Promise<GalleryEventMeta | null>;
  /** Returns `{ year, slug }` pairs for every event — used by `generateStaticParams`. */
  getAllEventParams(): Promise<{ year: string; slug: string }[]>;
}

export const galleryRepository: GalleryRepository = fsGalleryRepository;