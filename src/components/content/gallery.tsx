"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/gallery/lightbox";
import type { MediaItem } from "@/lib/gallery/types";
import { Locale } from "@/lib/news/types";

/** A single image entry within a {@link Gallery}. */
export interface GalleryImage {
  src: string;
  alt: {
    en: string;
    fr: string;
  };
}

/**
 * A responsive grid of images for use inside article MDX bodies. Clicking
 * any image opens the shared lightbox at that image, with tab/arrow
 * navigation across the full set — unlike {@link ArticleImage}, which
 * opens as a single, non-navigable image.
 */
export function Gallery({
  images,
  locale,
}: {
  images: GalleryImage[];
  locale: Locale;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items: MediaItem[] = images.map((img) => ({ type: "image", ...img }));

  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img, i) => (
        <button
          key={img.src}
          onClick={() => setSelectedIndex(i)}
          className="relative aspect-square overflow-hidden group"
        >
          <Image
            src={img.src}
            alt={img.alt[locale]}
            // width={1200}
            // height={800}
            fill
            className="block h-auto w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </button>
      ))}
      <Lightbox
        items={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
        locale={locale}
      />
    </div>
  );
}
