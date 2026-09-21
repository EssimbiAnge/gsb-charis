"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, AlertTriangle, Info, AlertOctagon } from "lucide-react";
import type { ArticleSummary, Locale } from "@/lib/news/types";

export interface AnnouncementBannerProps {
  announcements: ArticleSummary[];
  locale: Locale;
}

const SEVERITY_STYLE = {
  info: { bg: "bg-blue-900", icon: Info },
  warning: { bg: "bg-amber-500 text-blue-950", icon: AlertTriangle },
  urgent: { bg: "bg-red-600", icon: AlertOctagon },
} as const;

const DISMISSED_KEY = "charis-dismissed-announcements";

export function AnnouncementBanner({
  announcements,
  locale,
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DISMISSED_KEY);
      if (stored) setDismissed(JSON.parse(stored));
    } catch {
      // localStorage unavailable — banner just always shows
    }
  }, []);

  const visible = announcements.filter((a) => !dismissed.includes(a.slug));
  if (visible.length === 0) return null;

  const current = visible[Math.min(index, visible.length - 1)];
  const { bg, icon: Icon } = SEVERITY_STYLE[current.announcement!.severity];
  const text = current.announcement!.bannerText ?? current.excerpt;

  const dismiss = () => {
    const next = [...dismissed, current.slug];
    setDismissed(next);
    try {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
    } catch {
      // best-effort persistence only
    }
  };

  return (
    <div className={`${bg} text-white`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 text-sm sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        {/* Text — mobile: truncates within its own column, min-w-0 is what actually allows the shrink.
            desktop: centered in the middle grid column, capped so very long text still truncates. */}
        <Link
          href={`/${locale}/actualites/${current.slug}`}
          className="col-start-1 flex min-w-0 items-center gap-2 truncate font-medium hover:underline sm:col-start-2 sm:mx-auto sm:max-w-xl sm:justify-center"
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{text}</span>
        </Link>

        {/* Dots + close — right column on both breakpoints, never shrinks */}
        <div className="col-start-2 flex shrink-0 items-center justify-end gap-3 sm:col-start-3">
          {visible.length > 1 && (
            <div className="flex shrink-0 gap-1">
              {visible.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`${
                    locale === "fr" ? "Annonce" : "Announcement"
                  } ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}

          <button
            onClick={dismiss}
            aria-label={locale === "fr" ? "Fermer" : "Dismiss"}
            className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
