"use client";

import Link from "next/link";
import { useUsva } from "@/lib/store";
import type { Key } from "@/lib/i18n";

export type ConsentKind = "guide" | "speech";

type Props = {
  kinds: ConsentKind[];
  onAccept: () => void;
  onDecline: () => void;
  declineKey?: Key;
};

// Kysyy nimenomaisen suostumuksen ennen kuin käyttäjän kertomaa lähetetään
// tekoäly- tai puhepalveluun. Kieltäytyminen on aina yhtä hyvä vastaus.
export function ConsentCard({ kinds, onAccept, onDecline, declineKey = "consentNo" }: Props) {
  const { t, update } = useUsva();

  function accept() {
    const now = new Date().toISOString();
    update((s) => ({
      ...s,
      consent: {
        guide: kinds.includes("guide") ? now : s.consent.guide,
        speech: kinds.includes("speech") ? now : s.consent.speech,
      },
    }));
    onAccept();
  }

  return (
    <div className="card space-y-3 text-left" role="group" aria-label={t("consentTitle")}>
      <p className="serif text-xl">{t("consentTitle")}</p>
      {kinds.includes("guide") && <p className="text-soft">{t("consentGuide")}</p>}
      {kinds.includes("speech") && <p className="text-soft">{t("consentSpeech")}</p>}
      <p>{t("consentAsk")}</p>
      <button type="button" className="btn btn-primary" onClick={accept}>
        {t("consentYes")}
      </button>
      <button type="button" className="btn btn-quiet" onClick={onDecline}>
        {t(declineKey)}
      </button>
      <Link className="block text-center text-sm text-lilac underline" href="/tietosuoja" target="_blank">
        {t("privacyTitle")}
      </Link>
    </div>
  );
}
