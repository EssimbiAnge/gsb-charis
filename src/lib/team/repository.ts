import type { TeamGroupSection } from "./types";
import { fsTeamRepository } from "./fs";

/** Data-access contract for team/staff profiles. Same abstraction pattern as news and gallery. */
export interface TeamRepository {
  /** Returns all years names, newest year first. */
  getAllYears(): Promise<string[]>;
  /** Returns all members, grouped and sorted, ready to render section by section. */
  getGroupedMembers(year: string): Promise<TeamGroupSection[]>;
}

export const teamRepository: TeamRepository = fsTeamRepository;