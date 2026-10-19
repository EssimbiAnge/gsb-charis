import Image from "next/image";
import type { Partner } from "@/lib/partners/types";
import { localize } from "@/lib/i18n/localize";
import type { Locale } from "@/lib/news/types";

/** Props for {@link PartnerCard}. */
export interface PartnerCardProps {
  partner: Partner;
  locale: Locale;
}

/**
 * One partner organization: logo above, then a card with the name and a
 * short description. If the partner has a `website`, the whole card is a
 * link that opens in a new tab.
 */
export function PartnerCard({ partner, locale }: PartnerCardProps) {
  const content = (
    <>
      <div className="relative mx-auto h-50 w-full max-w-75">
        {/* Decorative: the organization's name appears right below as the heading. */}
        <Image
          src={partner.logo}
          alt=""
          fill
          // sizes="300px"
          className="object-contain"
        />
      </div>
      <div className="mt-8 border-t-4 border-blue-950 bg-white p-5">
        <h2 className="text-lg font-semibold text-blue-950">
          <a
            href={partner.website ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {partner.name[locale]}{" "}
            {partner.order !== 1 ? `(${partner.name.short})` : ""}
          </a>
        </h2>
        <p className="mt-2 leading-relaxed">
          {localize(partner.description, locale)}
        </p>

        <p className="mt-2 leading-relaxed">
          {locale == "fr" ? "En savoir plus sur" : "Learn more about"}
          <a
            href={partner.website ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-950 underline"
          >
            {partner.name.short}
          </a>
        </p>
      </div>
    </>
  );

  return <div className="group">{content}</div>;
}
