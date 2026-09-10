import { notFound } from "next/navigation";
import { galleryRepository } from "@/lib/gallery/repository";
import { EventGalleryClient } from "@/components/gallery/event-gallery-client";
import { Locale } from "@/lib/news/types";

interface EventGalleryPageProps {
  params: Promise<{ lang: Locale; year: string; event: string }>;
}

export async function generateStaticParams() {
  const events = await galleryRepository.getAllEventParams();
  return events.map(({ year, slug }) => ({ year, event: slug }));
}

export async function generateMetadata({ params }: EventGalleryPageProps) {
  const { year, event } = await params;
  const meta = await galleryRepository.getEvent(year, event);
  if (!meta) return {};
  return {
    title: `${meta.title} — CHARIS Bilingual School Complex`,
    openGraph: { images: [meta.coverImage] },
  };
}

export default async function EventGalleryPage({
  params,
}: EventGalleryPageProps) {
  const { year, event, lang } = await params;
  const meta = await galleryRepository.getEvent(year, event);
  if (!meta) notFound();

  return (
    <EventGalleryClient
      title={meta.title}
      items={meta.items}
      lang={lang}
      date={meta.date}
      itemCount={meta.items.length}
    />
  );
}
