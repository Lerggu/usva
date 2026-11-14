"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Shell } from "@/components/Shell";
import { VoiceField } from "@/components/VoiceField";
import { useUsva } from "@/lib/store";
import type { Lang } from "@/lib/progress";
import { fetchMe, saveProfile, signOut, toInfo } from "@/lib/account-client";

export default function SettingsPage() {
  const { state, t, update, reset } = useUsva();

  // Tilin tila haetaan palvelimelta, jotta kokeilun ja tilauksen päivät ovat ajan tasalla.
  useEffect(() => {
    let cancelled = false;
    void fetchMe().then((me) => {
      if (cancelled || !me.enabled) return;
      update((s) => ({ ...s, account: me.account ? toInfo(me.account) : null }));
    });
    return () => {
      cancelled = true;
    };
  }, [update]);

  const date = (iso: string) => new Intl.DateTimeFormat(state.lang, { dateStyle: "long" }).format(new Date(iso));
  const acc = state.account;

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usva.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell>
      <div className="space-y-6 pt-2">
        <h1 className="text-2xl">{t("settings")}</h1>

        <fieldset className="space-y-2">
          <legend className="text-sm uppercase tracking-widest text-soft">{t("language")}</legend>
          <div className="flex gap-2">
            {(["fi", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                className={`btn ${state.lang === l ? "btn-primary" : ""}`}
                aria-pressed={state.lang === l}
                onClick={() => update((s) => ({ ...s, lang: l }))}
              >
                {l === "fi" ? "Suomi" : "English"}
              </button>
            ))}
          </div>
        </fieldset>

        {acc && (
          <section className="card space-y-2">
            <h2 className="text-sm uppercase tracking-widest text-soft">{t("accountTitle")}</h2>
            <p>{acc.email}</p>
            <p className="text-soft">
              {acc.status === "active" && acc.paidUntil && `${t("accActive")} ${date(acc.paidUntil)}.`}
              {acc.status === "trial" && `${t("accTrial")} ${date(acc.trialEndsAt)}.`}
              {acc.status === "expired" && t("accExpiredInfo")}
            </p>
            <button
              className="btn btn-quiet"
              onClick={() => void signOut().then(() => update((s) => ({ ...s, account: null })))}
            >
              {t("logout")}
            </button>
          </section>
        )}

        <div className="space-y-2">
          <label htmlFor="user-name" className="text-sm uppercase tracking-widest text-soft">
            {t("userNameLabel")}
          </label>
          <VoiceField
            id="user-name"
            single
            maxLength={24}
            value={state.userName}
            onChange={(v) => {
              update((s) => ({ ...s, userName: v }));
              if (acc) void saveProfile({ name: v.trim() });
            }}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mist-name" className="text-sm uppercase tracking-widest text-soft">
            {t("mistNameLabel")}
          </label>
          <VoiceField
            id="mist-name"
            single
            maxLength={24}
            value={state.mistName}
            onChange={(v) => {
              update((s) => ({ ...s, mistName: v }));
              if (acc) void saveProfile({ mistName: v.trim() || "Usva" });
            }}
          />
        </div>

        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("aboutTitle")}</h2>
          <p className="text-soft">{t("principle")}</p>
          <Link className="btn" href="/tutustu">
            {t("tutLink")}
          </Link>
          <p className="text-sm text-soft">
            {t("version")} {process.env.NEXT_PUBLIC_BUILD}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("dataTitle")}</h2>
          <p className="text-soft">{t("dataInfo")}</p>
          <button className="btn" onClick={exportData}>
            {t("exportData")}
          </button>
          <button
            className="btn btn-quiet"
            onClick={() => {
              if (window.confirm(t("deleteConfirm"))) reset();
            }}
          >
            {t("deleteData")}
          </button>
        </section>
      </div>
    </Shell>
  );
}
