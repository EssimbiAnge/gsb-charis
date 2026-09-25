import CharisName from "@/components/CharisName";

const BRAND_MARKER = "{{CharisName}}";
const BRAND_PLAIN = "CHARIS";

/**
 * Renders a plain-text string (article `title`/`excerpt` frontmatter, or
 * any other content string) into React nodes, replacing every
 * `{{CharisName}}` marker with the stylised `<CharisName />` component.
 *
 * Use only where JSX can render — headings, card titles, body text.
 * For plain-text contexts that can't render components (page `<title>`,
 * OG/meta descriptions, alt text), use {@link stripBrandMarker} instead.
 *
 * @example
 * renderBrandText("Welcome to {{CharisName}} School")
 * // → ["Welcome to ", <CharisName />, " School"]
 */
export function renderBrandText(text: string): React.ReactNode[] {
  const parts = text.split(BRAND_MARKER);
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <CharisName key={i} className="inline" />]
      : [part]
  );
}

/**
 * Resolves `{{CharisName}}` markers down to plain text ("CHARIS"), for
 * contexts that can't render components — page titles, OG descriptions,
 * alt text, anything that ends up outside the DOM Claude... er, React controls.
 */
export function stripBrandMarker(text: string): string {
  return text.split(BRAND_MARKER).join(BRAND_PLAIN);
}
