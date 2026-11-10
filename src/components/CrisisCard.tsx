"use client";

import { useUsva } from "@/lib/store";

export function CrisisCard() {
  const { t } = useUsva();
  return (
    <div className="card space-y-3" role="region" aria-label={t("helpTitle")}>
      <p className="text-lg font-semibold">{t("helpTitle")}</p>
      <p className="text-soft">{t("helpIntro")}</p>
      <a className="btn btn-primary" href="tel:112">
        {t("helpEmergency")}
        <span className="block text-sm font-normal">{t("helpEmergencySub")}</span>
      </a>
      <a className="btn" href="tel:+358925250111">
        {t("helpCrisis")}
        <span className="block text-sm text-soft">{t("helpCrisisSub")}</span>
      </a>
      <p className="text-sm text-soft">{t("helpAbroad")}</p>
    </div>
  );
}
