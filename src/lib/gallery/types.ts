import { z } from "zod";

/** A photo. Lazy-loaded natively by `next/image` — no special gating needed. */
const imageItemSchema = z.object({
  type: z.literal("image"),
  src: z.url(),
  alt: z.string().min(1),
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
  alt: z.string().min(1),
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
  alt: z.string().min(1),
    orientation: z.enum(["landscape", "portrait"]).default('landscape'),

});

export const mediaItemSchema = z.discriminatedUnion("type", [
  imageItemSchema,
  gifItemSchema,
  videoItemSchema,
]);

export type MediaItem = z.infer<typeof mediaItemSchema>;

export const galleryEventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
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