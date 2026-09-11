import fs from "node:fs";
import path from "node:path";
import { teamMemberSchema, TEAM_GROUPS, type TeamMember, type TeamGroupSection } from "./types";
import type { TeamRepository } from "./repository";

const TEAM_DIR = path.join(process.cwd(), "content", "team");

function readMemberFile(filename: string): TeamMember {
  const raw = JSON.parse(fs.readFileSync(path.join(TEAM_DIR, filename), "utf8"));
  const result = teamMemberSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `Invalid team profile in content/team/${filename}: ${result.error.issues.map((i) => i.message).join(", ")}`
    );
  }
  return result.data;
}

export const fsTeamRepository: TeamRepository = {
  async getGroupedMembers() {
    if (!fs.existsSync(TEAM_DIR)) return [];

    const members = fs
      .readdirSync(TEAM_DIR)
      .filter((f) => f.endsWith(".json"))
      .map(readMemberFile);

    return TEAM_GROUPS.map((group) => ({
      group,
      members: members
        .filter((m) => m.group === group)
        .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
    })).filter((section) => section.members.length > 0);
  },
};