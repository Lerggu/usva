"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useUsva } from "@/lib/store";
import type { Key } from "@/lib/i18n";

// Alavalikon kuvakkeet: kota, tunturit, usva ja sydän.
const ICONS = {
  home: "M12 3 L4 20 H20 Z M12 3 L9.5 0.8 M12 3 L14.5 0.8 M10 20 L12 14 L14 20",
  path: "M2 19 Q7 6 11 13 Q14 5 22 19 Z",
  guide: "M12 12 C13.5 10.5 16 12 15.2 14.3 C14.3 17 10 17.3 8 14.6 C5.8 11.5 8 7 12.4 7 C17 7 19.6 11 18.6 15",
  help: "M12 20 C5 15 3 11.5 3 8.6 C3 6 5 4.2 7.3 4.2 C9.2 4.2 10.9 5.3 12 7 C13.1 5.3 14.8 4.2 16.7 4.2 C19 4.2 21 6 21 8.6 C21 11.5 19 15 12 20 Z",
};

const NAV: { href: string; key: Key; icon: keyof typeof ICONS }[] = [
  { href: "/", key: "navHome", icon: "home" },
  { href: "/polku", key: "navPath", icon: "path" },
  { href: "/opas", key: "navGuide", icon: "guide" },
  { href: "/apu", key: "navHelp", icon: "help" },
];

export function Shell({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  const { t, state } = useUsva();
  const path = usePathname();
  const showNav = nav && state.onboarded;
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="serif text-xl tracking-wide text-lilac">
          Usva
        </Link>
        <div className="flex items-center gap-4 text-sm text-soft">
          {!showNav && (
            <Link href="/apu" className="py-2">
              {t("navHelp")}
            </Link>
          )}
          <Link href="/asetukset" className="py-2">
            {t("settings")}
          </Link>
        </div>
      </header>
      <main key={path} className={`page-in flex-1 ${showNav ? "pb-28" : "pb-10"}`}>
        {children}
      </main>
      {showNav && (
        <nav className="fixed inset-x-0 bottom-0 border-t border-lilac/15 bg-[#0c0920]/80 backdrop-blur-md">
          <ul className="mx-auto flex max-w-md">
            {NAV.map((n) => {
              const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <li key={n.href} className="flex-1">
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-16 flex-col items-center justify-center gap-0.5 text-sm ${
                      active ? "text-aurora" : "text-soft"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={ICONS[n.icon]} />
                    </svg>
                    {t(n.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
