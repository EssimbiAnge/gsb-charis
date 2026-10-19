import { partnerRepository } from "@/lib/partners/repository";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";

type PartnersSectionProps = {
  lang: "fr" | "en";
};

export default async function PartnersSection({ lang }: PartnersSectionProps) {
  const isFr = lang === "fr";
  const partners = await partnerRepository.getAll();

  return (
    <section className="bg-gray-100 px-6 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-bold uppercase tracking-widest text-orange-500">
          {isFr ? "Nos partenaires" : "Our Partners"}
        </p>

        <h2 className="mt-3 text-3xl font-bold text-blue-950">
          {isFr
            ? "Ensemble pour une éducation qui transforme"
            : "Together for transformative education"}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
          {isFr
            ? "Nous collaborons avec des organisations et des personnes qui partagent notre conviction que l’éducation peut transformer durablement les communautés."
            : "We collaborate with organisations and individuals who share our conviction that education can transform communities sustainably."}
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-6 py-10"
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem
                key={partner.slug}
                className="basis-1/2 lg:basis-1/3"
              >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"inset-y-0 -left-6 my-auto"} />
          <CarouselNext className={"inset-y-0 -right-6 my-auto"} />
        </Carousel>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/partners`}
            className="inline-block rounded-lg bg-blue-950 px-6 py-3 font-bold text-white transition hover:bg-blue-900"
          >
            {isFr ? "Nos partenaires" : "Our Partners"}{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}
