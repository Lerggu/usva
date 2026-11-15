"use client";

import Link from "next/link";
import { Shell } from "./Shell";
import { useUsva } from "@/lib/store";
import { CONTROLLER, LEGAL_UPDATED, type Section } from "@/lib/legal";
import type { Key } from "@/lib/i18n";

export function LegalPage({ title, sections }: { title: Key; sections: Section[] }) {
  const { state, t } = useUsva();
  const lang = state.lang;
  const updated = new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(`${LEGAL_UPDATED}T12:00:00`));
  const who = [CONTROLLER.name, CONTROLLER.businessId, CONTROLLER.address, CONTROLLER.email].filter(Boolean);

  return (
    <Shell nav={false}>
      <article className="space-y-6 pb-6 pt-2">
        <header className="space-y-1">
          <h1 className="serif text-3xl">{t(title)}</h1>
          <p className="text-sm text-soft">
            {t("legalUpdated")} {updated}
          </p>
        </header>

        {sections.map((s) => (
          <section key={s.title.fi} className="space-y-2">
            <h2 className="serif text-xl text-lilac">{s.title[lang]}</h2>
            {s.body.map((p) => (
              <p key={p.fi.slice(0, 40)} className="leading-relaxed text-glow/90">
                {p[lang]}
              </p>
            ))}
          </section>
        ))}

        <section className="card space-y-1">
          <h2 className="serif text-xl text-lilac">{t("legalContact")}</h2>
          {who.length > 0 ? (
            who.map((line) => (
              <p key={line} className="text-soft">
                {line}
              </p>
            ))
          ) : (
            <p className="text-soft">{t("legalContactPending")}</p>
          )}
        </section>

        <Link className="btn" href="/asetukset">
          {t("back")}
        </Link>
      </article>
    </Shell>
  );
}
