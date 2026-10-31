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
export function DraftArticleImage({
  src,
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

  return (
    <figure className="my-6">
      <button
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden group"
      >
        <Image
          src={src}
          alt={"#"}
          width={1200}
          height={800}
          className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      <Lightbox
        items={[
          {
            type: "image",
            src,
            alt: { en: "#", fr: "#" },
          },
        ]}
        selectedIndex={open ? 0 : null}
        onClose={() => setOpen(false)}
        onNavigate={() => {}}
        locale={"en"}
      />
    </figure>
  );
}
