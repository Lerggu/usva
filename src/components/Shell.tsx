"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useUsva } from "@/lib/store";
import type { Key } from "@/lib/i18n";

const NAV: { href: string; key: Key; icon: string }[] = [
  { href: "/", key: "navHome", icon: "◉" },
  { href: "/polku", key: "navPath", icon: "✦" },
  { href: "/opas", key: "navGuide", icon: "❋" },
  { href: "/apu", key: "navHelp", icon: "♡" },
];

export function Shell({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  const { t, state } = useUsva();
  const path = usePathname();
  const showNav = nav && state.onboarded;
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-lilac">
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
      <main className={`flex-1 ${showNav ? "pb-28" : "pb-10"}`}>{children}</main>
      {showNav && (
        <nav className="fixed inset-x-0 bottom-0 border-t border-lilac/15 bg-night/90 backdrop-blur">
          <ul className="mx-auto flex max-w-md">
            {NAV.map((n) => {
              const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <li key={n.href} className="flex-1">
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-16 flex-col items-center justify-center gap-0.5 text-sm ${
                      active ? "text-glow" : "text-soft"
                    }`}
                  >
                    <span aria-hidden="true" className="text-xl">
                      {n.icon}
                    </span>
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
