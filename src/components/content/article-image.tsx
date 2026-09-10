"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/gallery/lightbox";
import type { MediaItem } from "@/lib/gallery/types";

/**
 * A responsive, optionally-captioned image for use inside article MDX
 * bodies. Clicking it opens the shared lightbox as a single image —
 * no tab/navigation controls, since there's nothing else to move to.
 */
export function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
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
          alt={alt}
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
      />
    </figure>
  );
}
