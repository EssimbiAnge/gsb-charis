"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/gallery/lightbox";
import type { MediaItem } from "@/lib/gallery/types";
import { Locale } from "@/lib/news/types";

/**
 * A responsive, optionally-captioned image for use inside article MDX
 * bodies. Clicking it opens the shared lightbox as a single image —
 * no tab/navigation controls, since there's nothing else to move to.
 */
export function ArticleImage({
  src,
  alt,
  caption,
  locale,
}: {
  src: string;
  alt: {
    en: string;
    fr: string;
  };
  caption?: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const item: MediaItem = { type: "image", src, alt };

  return (
    <figure className="my-6">
      <button
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden group"
      >
        <Image
          src={src}
          alt={alt[locale]}
          width={1200}
          height={800}
          className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
      <Lightbox
        items={[item]}
        selectedIndex={open ? 0 : null}
        onClose={() => setOpen(false)}
        onNavigate={() => {}}
        locale={locale}
      />
    </figure>
  );
}
