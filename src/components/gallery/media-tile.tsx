import Image from "next/image";
import { Play, Film } from "lucide-react";
import type { MediaItem } from "@/lib/gallery/types";
import { cn } from "@/lib/utils";

/** Props for {@link MediaTile}. */
export interface MediaTileProps {
  item: MediaItem;
  onSelect: () => void;
}

/**
 * A single grid tile in an event's media grid. Always renders a static
 * thumbnail only — video and GIF bytes are never requested here, only
 * inside the lightbox after an explicit "play"/"load" click.
 */
export function MediaTile({ item, onSelect }: MediaTileProps) {
  const thumbnailSrc = item.type === "image" ? item.src : item.thumbnail;

  return (
    <button
      onClick={onSelect}
      key={item.src}
      className={cn(
        "group relative overflow-hidden bg-[#E8E1D3]",
        item.orientation === "portrait" && "col-span-2"
      )}
    >
      <Image
        src={thumbnailSrc}
        alt={item.alt}
        width={1200}
        height={800}
        className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {item.type === "video" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/25">
          <Play className="h-8 w-8 fill-white text-white" />
          <span className="rounded-sm bg-black/60 px-1.5 py-0.5 text-xs text-white">
            {item.sizeLabel}
          </span>
        </div>
      )}

      {item.type === "gif" && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-sm bg-black/60 px-1.5 py-0.5 text-xs text-white">
          <Film className="h-3 w-3" /> {item.sizeLabel}
        </div>
      )}
    </button>
  );
}
