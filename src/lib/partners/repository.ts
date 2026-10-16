import type { Partner } from "./types";
import { fsPartnerRepository } from "./fs";

/** Data-access contract for partner organizations. Same abstraction pattern as news, gallery and team. */
export interface PartnerRepository {
    /** Returns every partner, sorted by `order` then name. */
    getAll(): Promise<Partner[]>;
}

export const partnerRepository: PartnerRepository = fsPartnerRepository;