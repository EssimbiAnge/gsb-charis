import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
};

export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-blue-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="font-bold uppercase tracking-widest text-orange-400">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
