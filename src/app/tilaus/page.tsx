"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { useUsva } from "@/lib/store";
import { totalLights } from "@/lib/progress";
import { fetchPlans, openCheckout, openPortal, type Plan } from "@/lib/account-client";

// Tilaussivu. Kokonaishinta ja peruutusehdot näkyvät aina hinnan yhteydessä,
// ja summat luetaan maksupalvelusta, jotta ne ovat täsmälleen ne, jotka veloitetaan.
export default function SubscriptionPage() {
  const { ready, state, t, billing, refreshAccount } = useUsva();
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [returned, setReturned] = useState(false);

  useEffect(() => {
    void fetchPlans().then(setPlans);
    setReturned(new URLSearchParams(window.location.search).get("tila") === "kiitos");
  }, []);

  // Maksun jälkeen vahvistus tulee Stripeltä pienellä viiveellä, joten tilaa kysellään hetki.
  const status = state.account?.status;
  useEffect(() => {
    if (!returned || status === "active") return;
    let tries = 0;
    const id = window.setInterval(() => {
      tries++;
      void refreshAccount();
      if (tries >= 10) window.clearInterval(id);
    }, 2000);
    return () => window.clearInterval(id);
  }, [returned, status, refreshAccount]);

  if (!ready) return <Shell>{null}</Shell>;
  const acc = state.account;
  const money = (amount: number, currency: string) =>
    new Intl.NumberFormat(state.lang, {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: amount % 100 === 0 ? 0 : 2,
    }).format(amount / 100);
  const date = (iso: string) => new Intl.DateTimeFormat(state.lang, { dateStyle: "long" }).format(new Date(iso));

  async function go(open: () => Promise<string | null>) {
    if (busy) return;
    setBusy(true);
    setFailed(false);
    const url = await open();
    if (url) window.location.assign(url);
    else {
      setFailed(true);
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="space-y-5 pt-2">
        <Mist lights={totalLights(state)} size="9rem" />
        <h1 className="serif text-center text-3xl">{t("subTitle")}</h1>

        {acc?.status === "active" && acc.paidUntil ? (
          <>
            <p className="serif text-center text-xl text-aurora">{returned ? t("subThanks") : `${t("accActive")} ${date(acc.paidUntil)}.`}</p>
            {returned && <p className="text-center text-soft">{`${t("accActive")} ${date(acc.paidUntil)}.`}</p>}
            <button className="btn" disabled={busy} onClick={() => void go(openPortal)}>
              {t("subManage")}
            </button>
            <Link className="btn btn-primary" href="/">
              {t("continue")}
            </Link>
          </>
        ) : returned ? (
          <p className="serif text-center text-xl">{t("subPending")}</p>
        ) : !billing || !acc ? (
          <p className="card text-soft">{t(acc ? "obPayNote" : "subSignIn")}</p>
        ) : (
          <>
            <p className="text-center leading-relaxed">{t(acc.status === "expired" ? "subIntro" : "subIntroTrial")}</p>
            {acc.status === "trial" && (
              <p className="text-center text-soft">
                {t("accTrial")} {date(acc.trialEndsAt)}.
              </p>
            )}
            {(plans ?? []).map((p) => (
              <div key={p.id} className={`card space-y-3 text-center ${p.id === "yearly" ? "card-next" : ""}`}>
                <p className="serif text-3xl">
                  {money(p.amount, p.currency)} <span className="text-lg text-soft">{t(p.interval === "year" ? "subYear" : "subMonth")}</span>
                </p>
                {p.interval === "year" && (
                  <p className="text-soft">{t("subPerDay").replace("{x}", money(Math.round(p.amount / 365), p.currency))}</p>
                )}
                <button className="btn btn-primary" disabled={busy} onClick={() => void go(() => openCheckout(p.id))}>
                  {busy ? "…" : t(p.interval === "year" ? "subChooseYear" : "subChooseMonth")}
                </button>
              </div>
            ))}
            <p className="text-sm text-soft">{t("subTerms")}</p>
          </>
        )}

        {failed && <p className="card text-soft">{t("subFail")}</p>}
        <p className="text-center text-sm text-soft">{t("subAlways")}</p>
      </div>
    </Shell>
  );
}
