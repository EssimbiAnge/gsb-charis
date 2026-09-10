import fs from "node:fs";
import path from "node:path";
import { galleryEventSchema, type GalleryEventMeta, type GalleryEventSummary, type GalleryYear } from "./types";
import type { GalleryRepository } from "./repository";

const GALLERY_DIR = path.join(process.cwd(), "content", "gallery");

/** Reads and validates a single event's `meta.json`. */
function readEventMeta(year: string, slug: string): GalleryEventMeta | null {
  const filePath = path.join(GALLERY_DIR, year, slug, "meta.json");
  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const result = galleryEventSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `Invalid meta.json at content/gallery/${year}/${slug}: ${result.error.issues.map((i) => i.message).join(", ")}`
    );
  }
  if (result.data.slug !== slug) {
    throw new Error(`Slug mismatch in content/gallery/${year}/${slug}/meta.json: folder says "${slug}", meta.json says "${result.data.slug}".`);
  }

  return result.data;
}

/** Lists year folder names, newest first. */
function listYears(): string[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  return fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

/** Lists event slugs within a year folder. */
function listEventSlugs(year: string): string[] {
  const yearDir = path.join(GALLERY_DIR, year);
  if (!fs.existsSync(yearDir)) return [];
  return fs
    .readdirSync(yearDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export const fsGalleryRepository: GalleryRepository = {
  async getAllYears() {
    return listYears().map((year) => {
      const events: GalleryEventSummary[] = listEventSlugs(year)
        .map((slug) => readEventMeta(year, slug))
        .filter((meta): meta is GalleryEventMeta => meta !== null)
        .map((meta) => ({ ...meta, year, itemCount: meta.items.length }))
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      return { year, events };
    });
  },

  async getEvent(year, slug) {
    return readEventMeta(year, slug);
  },

  async getAllEventParams() {
    return listYears().flatMap((year) => listEventSlugs(year).map((slug) => ({ year, slug })));
  },
};