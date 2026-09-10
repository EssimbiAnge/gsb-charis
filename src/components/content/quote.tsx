/**
 * A pull-quote for use inside article MDX bodies,
 * e.g. `<Quote attribution="Mrs. Tatiana, Director">...</Quote>`.
 */
export function Quote({ attribution, children }: { attribution?: string; children: React.ReactNode }) {
    return (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
        <p>{children}</p>
        {attribution ? <footer className="mt-2 text-sm not-italic">— {attribution}</footer> : null}
      </blockquote>
    );
  }