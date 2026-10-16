"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import CharisName from "./CharisName";

type HeaderProps = {
  lang: "fr" | "en";
};

/** A label in both site languages. */
type Label = { fr: string; en: string };

/** A single navigation link. */
type MenuLink = Label & { href: string };

/**
 * A top-level menu entry. With `children` it renders as a dropdown on
 * desktop, listing its own page first (labelled with `overview`, or its
 * own label if omitted), then the children.
 */
type MenuItem = MenuLink & { overview?: Label; children?: MenuLink[] };

const menu: MenuItem[] = [
  { fr: "Accueil", en: "Home", href: "" },
  {
    fr: "À propos",
    en: "About",
    href: "/a-propos",
    overview: { fr: "Présentation", en: "Overview" },
    children: [
      { fr: "Notre équipe", en: "Our team", href: "/equipe" },
      { fr: "Nos partenaires", en: "Our partners", href: "/partners" },
    ],
  },
  { fr: "Admissions", en: "Admissions", href: "/admissions" },
  { fr: "Vie scolaire", en: "School Life", href: "/vie-scolaire" },
  {
    fr: "Actualités & Événements",
    en: "News & Events",
    href: "/actualites",
    overview: { fr: "Actualités", en: "News" },
    children: [{ fr: "Événements", en: "Events", href: "/evenements" }],
  },

  { fr: "Galerie", en: "Gallery", href: "/gallery" },
  { fr: "Contact", en: "Contact", href: "/contact" },
];

/**
 * Overrides shadcn's light-theme trigger/link colours so items read
 * correctly on the navy header, including the open and focus states.
 */
const navItemClass =
  "bg-transparent text-white hover:bg-white/5 hover:text-orange-400 focus:bg-white/5 focus:text-orange-400 data-[state=open]:bg-white/5 data-[state=open]:text-orange-400 data-[state=open]:hover:bg-white/5 data-[state=open]:focus:bg-white/5";

export default function Header({ lang }: HeaderProps) {
  const isFr = lang === "fr";
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-blue-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* IDENTITÉ */}
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-3">
          <div className="rounded-xl bg-white p-1">
            <Image
              src="/logo-charis.png"
              alt="Logo Groupe Scolaire Bilingue CHARIS"
              width={58}
              height={58}
              className="h-14 w-14 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
              {isFr ? "Groupe Scolaire Bilingue" : "Bilingual School"}
            </p>
            <CharisName className="text-xl" />
          </div>
        </Link>

        {/* MENU — desktop */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {menu.map((item) => {
              if (!item.children) {
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), navItemClass)}
                      render={
                        <Link href={`/${lang}${item.href}`}>{item[lang]}</Link>
                      }
                    />
                  </NavigationMenuItem>
                );
              }

              const entries = [
                { label: (item.overview ?? item)[lang], href: item.href },
                ...item.children.map((child) => ({
                  label: child[lang],
                  href: child.href,
                })),
              ];

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger className={navItemClass}>
                    {item[lang]}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-56 gap-1 p-2">
                      {entries.map((entry) => (
                        <li key={entry.href}>
                          <NavigationMenuLink
                            render={
                              <Link
                                href={`/${lang}${entry.href}`}
                                className="block rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-orange-200 hover:text-orange-600"
                              >
                                {entry.label}
                              </Link>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={`/${lang}/soutenir`}
            className="hidden rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold transition hover:bg-orange-600 sm:block"
          >
            {isFr ? "Soutenir" : "Support"}
          </Link>

          <Link
            href={`/${lang}/connexion`}
            className="hidden rounded-lg border border-white px-4 py-2.5 text-sm font-bold transition hover:bg-white hover:text-blue-950 md:block"
          >
            {isFr ? "Connexion" : "Login"}
          </Link>

          {/* LANGUES — desktop */}
          <div className="hidden items-center gap-2 border-l border-white/30 pl-3 text-sm font-bold sm:flex">
            <Link
              href="/fr"
              className={
                isFr ? "text-orange-400" : "text-white hover:text-orange-400"
              }
            >
              FR
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/en"
              className={
                !isFr ? "text-orange-400" : "text-white hover:text-orange-400"
              }
            >
              EN
            </Link>
          </div>

          {/* MENU TRIGGER — mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  className="flex items-center justify-center rounded-lg border border-white/20 p-2 lg:hidden"
                  aria-label={isFr ? "Ouvrir le menu" : "Open menu"}
                >
                  <Menu className="h-5 w-5" />
                </button>
              }
            ></SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] border-white/10 bg-blue-950 p-0 text-white sm:max-w-sm"
              showCloseButton={false}
            >
              <div className="flex h-full flex-col">
                {/* Drawer header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <Link
                    href={`/${lang}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="rounded-xl bg-white p-1">
                      <Image
                        src="/logo-charis.png"
                        alt="Logo Groupe Scolaire Bilingue CHARIS"
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                    <CharisName className="text-lg" />
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/20 p-2"
                    aria-label={isFr ? "Fermer le menu" : "Close menu"}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer nav — children indented under their parent */}
                <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
                  {menu.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={`/${lang}${item.href}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-white transition hover:bg-white/10 hover:text-orange-400"
                      >
                        {item[lang]}
                      </Link>

                      {item.children && (
                        <div className="mb-1 ml-4 flex flex-col border-l border-white/10 pl-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={`/${lang}${child.href}`}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-orange-400"
                            >
                              {child[lang]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Drawer footer */}
                <div className="mt-auto space-y-3 border-t border-white/10 px-6 py-5">
                  <Link
                    href={`/${lang}/soutenir`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-bold transition hover:bg-orange-600"
                  >
                    {isFr ? "Soutenir" : "Support"}
                  </Link>
                  <Link
                    href={`/${lang}/connexion`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-white px-4 py-3 text-center text-sm font-bold transition hover:bg-white hover:text-blue-950"
                  >
                    {isFr ? "Connexion" : "Login"}
                  </Link>

                  <div className="flex items-center justify-center gap-3 pt-2 text-sm font-bold">
                    <Link
                      href="/fr"
                      className={
                        isFr
                          ? "text-orange-400"
                          : "text-white hover:text-orange-400"
                      }
                    >
                      Français
                    </Link>
                    <span className="text-white/40">|</span>
                    <Link
                      href="/en"
                      className={
                        !isFr
                          ? "text-orange-400"
                          : "text-white hover:text-orange-400"
                      }
                    >
                      English
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
