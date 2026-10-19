import fs from "node:fs";
import path from "node:path";
import { partnerSchema, type Partner } from "./types";
import type { PartnerRepository } from "./repository";

const PARTNERS_DIR = path.join(process.cwd(), "content", "partners");

/**
 * Reads and validates one partner file.
 * @throws If the file's contents fail schema validation.
 */
function readPartnerFile(filename: string): Partner {
    const raw = JSON.parse(fs.readFileSync(path.join(PARTNERS_DIR, filename), "utf8"));
    const result = partnerSchema.safeParse(raw);
    if (!result.success) {
        throw new Error(
            `Invalid partner in content/partners/${filename}: ${result.error.issues.map((i) => i.message).join(", ")}`
        );
    }
    return { ...result.data, slug: filename.replace(/\.json$/, "") };
}

export const fsPartnerRepository: PartnerRepository = {
    async getAll() {
        if (!fs.existsSync(PARTNERS_DIR)) return [];

        return fs
            .readdirSync(PARTNERS_DIR)
            .filter((f) => f.endsWith(".json"))
            .map(readPartnerFile)
            .sort((a, b) => a.order - b.order || a.name.short.localeCompare(b.name.short));
    },
};