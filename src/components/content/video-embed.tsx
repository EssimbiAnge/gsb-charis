/**
 * Embeds a YouTube video responsively inside article MDX bodies,
 * e.g. `<VideoEmbed youtubeId="dQw4w9WgXcQ" title="..." />`.
 */
export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
    return (
      <div className="relative my-6 aspect-video overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }