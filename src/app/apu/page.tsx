"use client";

import { Shell } from "@/components/Shell";
import { CrisisCard } from "@/components/CrisisCard";
import { useUsva } from "@/lib/store";

export default function HelpPage() {
  const { t } = useUsva();
  return (
    <Shell>
      <div className="space-y-4 pt-2">
        <CrisisCard />
        <p className="card text-soft">{t("helpPeer")}</p>
      </div>
    </Shell>
  );
}
