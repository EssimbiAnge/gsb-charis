"use client";

import { useState } from "react";
import { MediaTile } from "./media-tile";
import { Lightbox } from "./lightbox";
import type { MediaItem } from "@/lib/gallery/types";
import { Locale } from "@/lib/news/types";
import Header from "../Header";
import PageHero from "../PageHero";

/** Props for {@link EventGalleryClient}. */
export interface EventGalleryClientProps {
  title: string;
  items: MediaItem[];
  lang: Locale;
  date: string;
  itemCount: number;
}

/**
 * Client-side interactive gallery grid for one event: renders thumbnails
 * and manages which item (if any) is open in the lightbox. Receives
 * already-fetched data from the server page — does no fetching itself.
 */
export function EventGalleryClient({
  title,
  items,
  lang,
  date,
  itemCount,
}: EventGalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isFr = lang === "fr";

  const dateLabel = new Date(date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-GB",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <>
      <Header lang={lang} />

      <main>
        <PageHero
          eyebrow={`${itemCount} ${
            itemCount === 1 ? "item" : "items"
          } · ${dateLabel}`}
          title={title}
        />

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item, i) => (
              <MediaTile
                key={i}
                item={item}
                onSelect={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          <Lightbox
            items={items}
            selectedIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={setSelectedIndex}
          />
        </section>
      </main>
    </>
  );
}
