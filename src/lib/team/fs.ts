import fs from "node:fs";
import path from "node:path";
import { teamMemberSchema, TEAM_GROUPS, type TeamMember, type TeamGroupSection } from "./types";
import type { TeamRepository } from "./repository";

const TEAM_DIR = path.join(process.cwd(), "content", "team");

/** Returns the content directory for a given year, e.g. `content/team/2026`. */
function yearDir(year: string): string {
  return path.join(TEAM_DIR, year);
}

/** Lists year folder names, newest first. */
function listYears(): string[] {
  if (!fs.existsSync(TEAM_DIR)) return [];
  return fs
    .readdirSync(TEAM_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

function readMemberFile(year: string, filename: string): TeamMember {
  const raw = JSON.parse(fs.readFileSync(path.join(yearDir(year), filename), "utf8"));
  const result = teamMemberSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `Invalid team profile in content/team/${year}/${filename}: ${result.error.issues.map((i) => i.message).join(", ")}`
    );
  }
  return result.data;
}

/** Reads and validates all memebers for a single year. */
function readYearmembers(year: string): TeamGroupSection[] {
  if (!fs.existsSync(yearDir(year))) return [];

  const members = fs
    .readdirSync(yearDir(year))
    .filter((f) => f.endsWith(".json"))
    .map((filename) => readMemberFile(year, filename));

  return TEAM_GROUPS.map((group) => ({
    group,
    members: members
      .filter((m) => m.group === group)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
  })).filter((section) => section.members.length > 0);
}

export const fsTeamRepository: TeamRepository = {
  async getAllYears() {
    return listYears()
  },

  async getGroupedMembers(year: string) {
    return readYearmembers(year)
  },

};