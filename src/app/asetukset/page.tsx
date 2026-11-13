"use client";

import { Shell } from "@/components/Shell";
import { useUsva } from "@/lib/store";
import type { Lang } from "@/lib/progress";

export default function SettingsPage() {
  const { state, t, update, reset } = useUsva();

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

        <div className="space-y-2">
          <label htmlFor="mist-name" className="text-sm uppercase tracking-widest text-soft">
            {t("mistNameLabel")}
          </label>
          <input
            id="mist-name"
            className="field"
            maxLength={24}
            value={state.mistName}
            onChange={(e) => update((s) => ({ ...s, mistName: e.target.value }))}
          />
        </div>

        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("aboutTitle")}</h2>
          <p className="text-soft">{t("principle")}</p>
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
