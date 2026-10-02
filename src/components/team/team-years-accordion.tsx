"use client";

import { useState, useTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TeamSection } from "./team-section";
import { getTeamForYear } from "@/lib/team/actions";
import type { TeamGroupSection } from "@/lib/team/types";
import type { Locale } from "@/lib/news/types";

/** Props for {@link TeamYearsAccordion}. */
export interface TeamYearsAccordionProps {
  years: string[];
  /** Year to render open by default — its data must already be in `initialData`. */
  initialYear: string;
  /** Preloaded data for `initialYear`, so it renders immediately with no fetch flash. */
  initialData: TeamGroupSection[];
  locale: Locale;
}

/**
 * Collapsible, per-year team listing. The most recent year is open and
 * preloaded on first render; every other year's data is fetched on first
 * expand via a server action, then cached in component state for the
 * rest of the session — collapsing a section never discards its data,
 * only navigating away or refreshing the page does.
 */
export function TeamYearsAccordion({
  years,
  initialYear,
  initialData,
  locale,
}: TeamYearsAccordionProps) {
  const [openYears, setOpenYears] = useState<string[]>([initialYear]);
  const [loadedData, setLoadedData] = useState<
    Record<string, TeamGroupSection[]>
  >({
    [initialYear]: initialData,
  });
  const [loadingYears, setLoadingYears] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();

  function handleValueChange(values: string[]) {
    setOpenYears(values);

    const newlyOpened = values.filter(
      (year) => !(year in loadedData) && !loadingYears.has(year)
    );
    if (newlyOpened.length === 0) return;

    setLoadingYears((prev) => new Set([...prev, ...newlyOpened]));

    for (const year of newlyOpened) {
      startTransition(async () => {
        const data = await getTeamForYear(year);
        setLoadedData((prev) => ({ ...prev, [year]: data }));
        setLoadingYears((prev) => {
          const next = new Set(prev);
          next.delete(year);
          return next;
        });
      });
    }
  }

  return (
    <Accordion
      multiple
      value={openYears}
      onValueChange={handleValueChange}
      className="flex flex-col gap-4"
    >
      {years.map((year) => (
        <AccordionItem key={year} value={year} className="border-b-0">
          <AccordionTrigger className="text-5xl font-bold text-white bg-blue-900 p-2.5 hover:no-underline">
            {year}
          </AccordionTrigger>
          <AccordionContent className="mt-4">
            {loadedData[year] ? (
              <div className="flex flex-col gap-12">
                {loadedData[year].map((section) => (
                  <TeamSection
                    key={section.group}
                    section={section}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-sm bg-[#E8E1D3]"
                  />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
