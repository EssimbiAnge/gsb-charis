import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "./article-image";
import { Gallery } from "./gallery";
import { Quote } from "./quote";
import { VideoEmbed } from "./video-embed";
import { Callout } from "./callout";
import { GalleryFromEvent } from "./gallery-from-event";
import { ArticleImageFromGallery } from "./article-image-from-gallery";
import CharisName from "../CharisName";

/**
 * Custom element/component map passed to `<MDXRemote components={...} />`.
 * Registers the controlled content components (`ArticleImage`, `Gallery`,
 * etc.) so article MDX can use them by tag name, and wraps output in
 * Tailwind typography classes for consistent prose styling.
 */
export const mdxComponents: MDXComponents = {
  wrapper: ({ children }) => (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </div>
  ),
  h2: (props) => <h2 className="font-medium" {...props} />,
  // h2: (props) => <h2 className="mt-10 border-t pt-6" {...props} />,
  a: (props) => <a className="text-primary underline" {...props} />,

  ArticleImage,
  Gallery,
  Quote,
  VideoEmbed,
  Callout,
  ArticleImageFromGallery,
  GalleryFromEvent,
  CharisName,
};

{
  /* 
  <ArticleImageFromGallery event="2026/rentree-scolaire-sept-7" file="prep_1.webp" caption="Getting everything ready for the new term." />

<GalleryFromEvent event="2026/rentree-scolaire-sept-7" />

<GalleryFromEvent event="2026/rentree-scolaire-sept-7" files={["prep_1.webp", "prep_3.webp"]} />
 */
}
