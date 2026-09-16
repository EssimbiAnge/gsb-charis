"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { MediaItem } from "@/lib/gallery/types";
import { Locale } from "@/lib/news/types";
import { localize } from "@/lib/i18n/localize";

/** Props for {@link Lightbox}. */
export interface LightboxProps {
  /** Full ordered list of items in the current gallery — enables tabbing through. */
  items: MediaItem[];
  /** Index into `items` currently open, or `null` if the lightbox is closed. */
  selectedIndex: number | null;
  onClose: () => void;
  /** Called with the new index when the person navigates prev/next. */
  onNavigate: (index: number) => void;
  locale: Locale;
}

const ZOOM_STEP = 1;
const MAX_ZOOM = 3;

/**
 * Full-screen lightbox with keyboard/button navigation between items and
 * basic click-to-zoom-and-pan on images. Video/GIF items keep the
 * load-gate behavior — nothing is fetched until explicitly played.
 */
export function Lightbox({
  items,
  selectedIndex,
  onClose,
  onNavigate,
  locale,
}: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);

  const isOpen = selectedIndex !== null;
  const item: MediaItem | null = isOpen ? items[selectedIndex] : null;

  const resetView = () => {
    setLoaded(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goTo = (index: number) => {
    if (index < 0 || index >= items.length) return;
    resetView();
    onNavigate(index);
  };

  // Keyboard navigation: arrows to move, Escape to close (Radix already
  // handles Escape for the Dialog itself, but arrows need wiring here).
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(selectedIndex! + 1);
      if (e.key === "ArrowLeft") goTo(selectedIndex! - 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex]);

  const toggleZoom = () => {
    setZoom((z) => (z > 1 ? 1 : 2));
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="h-screen w-screen max-w-none translate-x-0 translate-y-0 top-0 left-0 rounded-none border-none bg-black/95 p-0 sm:h-screen sm:w-screen sm:max-w-none"
      >
        <div className="group relative flex h-full w-full items-center justify-center overflow-hidden">
          {/* Close button — always visible, top-right */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          + {/* Item counter — only meaningful with more than one item */}
          {items.length > 1 && (
            <div className="absolute left-4 top-4 z-20 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {selectedIndex! + 1} / {items.length}
            </div>
          )}
          {/* Desktop side arrows — only when there's something to navigate to */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => goTo(selectedIndex! - 1)}
                disabled={selectedIndex === 0}
                className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 disabled:opacity-20 group-hover:opacity-100 sm:block"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => goTo(selectedIndex! + 1)}
                disabled={selectedIndex === items.length - 1}
                className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 disabled:opacity-20 group-hover:opacity-100 sm:block"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          {/* Media content */}
          <div
            className="flex h-full w-full items-center justify-center"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {item?.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={localize(item.alt, locale)}
                onClick={toggleZoom}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  cursor: zoom > 1 ? "grab" : "zoom-in",
                }}
                className="max-h-full max-w-full select-none object-contain transition-transform duration-150"
                draggable={false}
              />
            )}

            {(item?.type === "video" || item?.type === "gif") && !loaded && (
              <div className="relative flex h-full w-full items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail}
                  alt={localize(item.alt, locale)}
                  className="max-h-full max-w-full object-contain opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={() => setLoaded(true)}
                    size="lg"
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {item.type === "video" ? "Play video" : "Load GIF"} (
                    {item.sizeLabel})
                  </Button>
                </div>
              </div>
            )}

            {item?.type === "video" && loaded && (
              <video
                src={item.src}
                controls
                autoPlay
                className="max-h-full max-w-full"
              />
            )}

            {item?.type === "gif" && loaded && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={localize(item.alt, locale)}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>
          {/* Zoom controls — only meaningful for images */}
          {item?.type === "image" &&
            +(
              <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-2 sm:bottom-24">
                <button
                  onClick={() =>
                    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))
                  }
                  className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setZoom((z) => Math.max(1, z - ZOOM_STEP));
                    setPan({ x: 0, y: 0 });
                  }}
                  className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
              </div>
            )}
          {/* Caption — same alt text used for accessibility, shown as the description */}
          {/* {item && (
            <div
              className={`absolute inset-x-0 z-20 px-4 text-center ${
                items.length > 1 ? "bottom-20 sm:bottom-6" : "bottom-6"
              }`}
            >
              {" "}
              <p className="mx-auto max-w-2xl rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {localize(item.alt, locale)}
              </p>
            </div>
          )} */}
          {/* Mobile bottom nav bar — only when there's something to navigate to */}
          {items.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-6 bg-black/60 py-4 sm:hidden">
              <button
                onClick={() => goTo(selectedIndex! - 1)}
                disabled={selectedIndex === 0}
                className="rounded-full bg-white/10 p-3 text-white disabled:opacity-30"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => goTo(selectedIndex! + 1)}
                disabled={selectedIndex === items.length - 1}
                className="rounded-full bg-white/10 p-3 text-white disabled:opacity-30"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
