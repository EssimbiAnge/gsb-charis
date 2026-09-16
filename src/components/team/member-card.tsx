import Image from "next/image";
import type { TeamMember, TeamContact } from "@/lib/team/types";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/news/types";
import { Globe, Mail, Phone } from "lucide-react";
import {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiLinkerd,
  SiTiktok,
} from "react-icons/si";

/** Props for {@link MemberCard}. */
export interface MemberCardProps {
  member: TeamMember;
  locale: Locale;
}

const CONTACT_ICON: Record<
  TeamContact["type"],
  typeof Mail | typeof SiFacebook
> = {
  email: Mail,
  phone: Phone,
  whatsapp: SiWhatsapp,
  facebook: SiFacebook,
  instagram: SiInstagram,
  linkedin: SiLinkerd,
  tiktok: SiTiktok,
  website: Globe,
};

/** Resolves a contact entry to a clickable href based on its type. */
function contactHref(contact: TeamContact): string {
  if (contact.type === "email") return `mailto:${contact.value}`;
  if (contact.type === "phone") return `tel:${contact.value}`;
  if (contact.type === "whatsapp") return `https://wa.me/${contact.value}`;
  return contact.value;
}

/** One team member's profile: photo, name, role, short bio, optional contacts. */
export function MemberCard({ member, locale }: MemberCardProps) {
  return (
    <div>
      <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-[#E8E1D3]">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3">
        <p className="text-lg leading-snug font-bold text-blue-950">
          {member.name}
        </p>
        <p className="mt-0.5 text-sm text-[#4A5D48]">
          {localize(member.roleTitle, locale)}
        </p>
        <p className="mt-0.5 text-sm text-[#4A5D48]">{`${
          locale === "en" ? "Since" : "Depuis"
        } ${member.tenure}`}</p>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {localize(member.bio, locale)}
        </p>

        {member.contacts.length > 0 && (
          <div className="mt-3 flex gap-3">
            {member.contacts.map((contact, idx) => {
              const Icon = CONTACT_ICON[contact.type];
              return (
                <a
                  key={contact.type + idx}
                  href={contactHref(contact)}
                  target={
                    contact.type === "email" || contact.type === "phone"
                      ? undefined
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                  className="text-[#4A5D48] hover:text-[#1E2A3A]"
                  aria-label={contact.type}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
