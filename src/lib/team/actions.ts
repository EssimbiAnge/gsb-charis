"use server";

import { teamRepository } from "./repository";
import type { TeamGroupSection } from "./types";

/**
 * Server action: fetches a single year's team lineup on demand. Used by
 * the team page's accordion to lazy-load a year only when its section
 * is expanded, rather than fetching every year up front.
 */
export async function getTeamForYear(year: string): Promise<TeamGroupSection[]> {
    return teamRepository.getGroupedMembers(year);
}