import { z } from "zod";
import { localizedStringSchema } from "@/lib/i18n/localize";


/** A photo. Lazy-loaded natively by `next/image` — no special gating needed. */
const imageItemSchema = z.object({
  type: z.literal("image"),
  src: z.url(),
  alt: localizedStringSchema,
  orientation: z.enum(["landscape", "portrait"]).optional(),
});

/** An animated GIF. Treated like video for data reasons — gated behind a thumbnail + explicit load. */
const gifItemSchema = z.object({
  type: z.literal("gif"),
  src: z.url(),
  /** Static preview frame, shown until the person opts to load the animated version. */
  thumbnail: z.url(),
  /** Human-readable file size, e.g. "6.2 MB" — shown on the load button. */
  sizeLabel: z.string().min(1),
  alt: localizedStringSchema,
    orientation: z.enum(["landscape", "portrait"]).default('landscape'),

});

/** A video clip. Never auto-downloaded — shows a poster frame and size until explicitly played. */
const videoItemSchema = z.object({
  type: z.literal("video"),
  src: z.url(),
  /** Poster frame extracted with ffmpeg and uploaded alongside the video. */
  thumbnail: z.url(),
  /** Human-readable file size, e.g. "24 MB" — shown on the load button. */
  sizeLabel: z.string().min(1),
  alt: localizedStringSchema,
    orientation: z.enum(["landscape", "portrait"]).default('landscape'),

});

export const mediaItemSchema = z.discriminatedUnion("type", [
  imageItemSchema,
  gifItemSchema,
  videoItemSchema,
]);

export type MediaItem = z.infer<typeof mediaItemSchema>;

export const galleryEventSchema = z.object({
  title: localizedStringSchema,
  slug: z.string().min(1),
   /** Accepts loosely-formatted dates ("2026-9-4", "9/4/2026", a Date) and normalizes to YYYY-MM-DD. */
 date: z.preprocess((val) => {
   if (val instanceof Date) return val.toISOString().slice(0, 10);
   if (typeof val === "string") {
     const parsed = new Date(val);
     if (!isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
   }
   return val;
 }, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")),
  category: z.string().default("General"),
  coverImage: z.url(),
  items: z.array(mediaItemSchema).min(1),
});

export type GalleryEventMeta = z.infer<typeof galleryEventSchema>;

export interface GalleryEventSummary extends GalleryEventMeta {
  year: string;
  itemCount: number;
}

export interface GalleryYear {
  year: string;
  events: GalleryEventSummary[];
}


export type LocalizedString = z.infer<typeof localizedStringSchema>;