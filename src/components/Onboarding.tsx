"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mist } from "./Mist";
import { CrisisCard } from "./CrisisCard";
import { VoiceField } from "./VoiceField";
import { useUsva } from "@/lib/store";
import { detectCrisis } from "@/lib/safety";
import { fetchMe, saveProfile, startSignIn, toInfo, verifyCode, type AuthError } from "@/lib/account-client";
import type { AccountInfo } from "@/lib/progress";
import type { Key } from "@/lib/i18n";

type Stage = "reason" | "doing" | "year" | "ask" | "offer" | "email" | "code" | "names" | "later" | "crisis";

const QUESTIONS: Record<"reason" | "doing" | "year", { q: Key; options: Key[]; next: Stage }> = {
  reason: { q: "obHello", options: ["obR1", "obR2", "obR3", "obR5", "obR4"], next: "doing" },
  doing: { q: "obDone", options: ["obD1", "obD2", "obD3"], next: "year" },
  year: { q: "obYear", options: ["obY1", "obY2", "obY3"], next: "ask" },
};

const ERRORS: Record<AuthError, Key> = {
  email: "accBadEmail",
  wrong: "accWrong",
  expired: "accExpired",
  wait: "accWait",
  fail: "accFail",
};

// Alkukeskustelu ennen tilausta. Mitään ei käsketä: jokainen kohta tarjoaa
// vaihtoehtoja, ja "palaan myöhemmin" on aina yhtä arvokas valinta.
export function Onboarding() {
  const { t, update, today, state } = useUsva();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("reason");
  const [text, setText] = useState("");
  const [userName, setUserName] = useState(state.userName);
  const [mistName, setMistName] = useState(state.mistName);
  // Tilit ovat käytössä vasta, kun palvelimella on niiden asetukset.
  const [accounts, setAccounts] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchMe().then((me) => {
      if (cancelled) return;
      setAccounts(me.enabled);
      // Jo kirjautunut käyttäjä uudella laitteella tai tyhjennetyn selaimen jälkeen.
      if (me.account) {
        setAccount(toInfo(me.account));
        setUserName(me.account.name);
        setMistName(me.account.mistName);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function answer(stageNow: "reason" | "doing" | "year", value: string, free: boolean) {
    if (free && detectCrisis(value)) {
      setStage("crisis");
      return;
    }
    if (stageNow === "reason") update((s) => ({ ...s, reason: value }));
    setText("");
    setStage(QUESTIONS[stageNow].next);
  }

  async function sendCode() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const res = await startSignIn(email, state.lang);
    setBusy(false);
    if (res.ok) {
      setCode("");
      setStage("code");
    } else setError(res.error);
  }

  async function checkCode() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const res = await verifyCode(email, code, state.lang);
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    const acc = res.data.account;
    setAccount(toInfo(acc));
    if (res.data.isNew) {
      setStage("names");
    } else {
      // Palaava käyttäjä: nimet tulevat tililtä, eikä niitä kysytä uudelleen.
      setReturning(true);
      setUserName(acc.name);
      setMistName(acc.mistName);
      finish(acc.name, acc.mistName, toInfo(acc), "/");
    }
  }

  function finish(name: string, mist: string, acc: AccountInfo | null, to: string) {
    update((s) => ({
      ...s,
      onboarded: true,
      startDate: s.startDate ?? today,
      lastVisit: today,
      userName: name.trim(),
      mistName: mist.trim() || "Usva",
      account: acc,
    }));
    router.push(to);
  }

  async function begin() {
    if (account) {
      setBusy(true);
      await saveProfile({ name: userName.trim(), mistName: mistName.trim() || "Usva", lang: state.lang });
      setBusy(false);
    }
    finish(userName, mistName, account, "/tutustu");
  }

  // Tilauksen aloittaminen: tili ensin, jos tilit ovat käytössä eikä käyttäjä ole jo kirjautunut.
  const afterOffer: Stage = accounts && !account ? "email" : "names";

  return (
    <div className="space-y-6">
      <Mist mood={stage === "crisis" ? "soft" : "listening"} />

      {(stage === "reason" || stage === "doing" || stage === "year") && (
        <section className="space-y-4" key={stage}>
          <p className="serif text-center text-2xl leading-relaxed">{t(QUESTIONS[stage].q)}</p>
          <div className="space-y-2">
            {QUESTIONS[stage].options.map((o) => (
              <button key={o} className="btn" onClick={() => answer(stage, t(o), false)}>
                {t(o)}
              </button>
            ))}
          </div>
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) answer(stage, text.trim(), true);
            }}
          >
            <label className="block text-sm text-soft" htmlFor="own">
              {t("orWrite")}
            </label>
            <VoiceField id="own" rows={2} value={text} onChange={setText} />
            {text.trim() && (
              <button className="btn" type="submit">
                {t("continue")}
              </button>
            )}
          </form>
          {stage === "reason" && accounts && (
            <button
              className="btn btn-quiet"
              onClick={() => {
                setReturning(true);
                setStage(account ? "names" : "email");
              }}
            >
              {t("obHaveAccount")}
            </button>
          )}
        </section>
      )}

      {stage === "ask" && (
        <section className="space-y-4">
          <p className="serif text-center text-2xl leading-relaxed">{t("obAsk")}</p>
          <button className="btn btn-primary" onClick={() => setStage("offer")}>
            {t("obAskYes")}
          </button>
          <Link className="btn" href="/hetki">
            {t("obAskLater")}
          </Link>
        </section>
      )}

      {stage === "offer" && (
        <section className="space-y-4">
          <p className="text-lg leading-relaxed">{t("obOffer")}</p>
          <div className="card space-y-2 text-center">
            <p className="text-2xl font-semibold">{t("obPrice")}</p>
            <p className="text-sm text-soft">{t("obTerms")}</p>
            <p className="text-sm text-lilac">{t("obPayNote")}</p>
          </div>
          <p className="text-sm text-soft">{t("principle")}</p>
          <p className="text-center text-lg">{t("obInvite")}</p>
          <button className="btn btn-primary" onClick={() => setStage(afterOffer)}>
            {t("obStart")}
          </button>
          <button className="btn btn-quiet" onClick={() => setStage("later")}>
            {t("obNotNow")}
          </button>
        </section>
      )}

      {stage === "email" && (
        <form
          // Selaimen oma tarkistus pois: kelvottomasta osoitteesta kertoo usva omalla äänellään.
          noValidate
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void sendCode();
          }}
        >
          <label className="serif block text-center text-2xl leading-relaxed" htmlFor="email">
            {t("accEmailQ")}
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="field text-center"
            placeholder={t("accEmailPh")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-center text-sm text-soft">{t("accEmailSub")}</p>
          {error && <p className="card text-soft">{t(ERRORS[error])}</p>}
          <button className="btn btn-primary" type="submit" disabled={busy || !email.trim()}>
            {busy ? "…" : t("accSend")}
          </button>
          <button className="btn btn-quiet" type="button" onClick={() => setStage(returning ? "reason" : "offer")}>
            {t("back")}
          </button>
        </form>
      )}

      {stage === "code" && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void checkCode();
          }}
        >
          <label className="serif block text-center text-2xl leading-relaxed" htmlFor="code">
            {t("accCodeQ")}
          </label>
          <p className="text-center text-soft">{email}</p>
          <input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className="field text-center text-3xl tracking-[0.4em]"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
          {error && <p className="card text-soft">{t(ERRORS[error])}</p>}
          <button className="btn btn-primary" type="submit" disabled={busy || code.length !== 6}>
            {busy ? "…" : t("continue")}
          </button>
          <button className="btn btn-quiet" type="button" disabled={busy} onClick={() => void sendCode()}>
            {t("accResend")}
          </button>
          <button className="btn btn-quiet" type="button" onClick={() => setStage("email")}>
            {t("accChange")}
          </button>
        </form>
      )}

      {stage === "names" && (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            void begin();
          }}
        >
          {returning && <p className="card text-soft">{t("accReturnNote")}</p>}
          <div className="space-y-2">
            <label className="serif block text-center text-2xl" htmlFor="user-name">
              {t("obUserName")}
            </label>
            <VoiceField id="user-name" single center value={userName} maxLength={24} onChange={setUserName} />
            <p className="text-center text-sm text-soft">{t("obUserNameSub")}</p>
          </div>
          <div className="space-y-2">
            <label className="serif block text-center text-2xl" htmlFor="mist-name">
              {t("obName")}
            </label>
            <VoiceField id="mist-name" single center value={mistName} maxLength={24} onChange={setMistName} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {t("continue")}
          </button>
        </form>
      )}

      {stage === "later" && (
        <section className="space-y-4">
          <p className="serif text-center text-2xl leading-relaxed">{t("obLaterMsg")}</p>
          <Link className="btn" href="/hetki">
            {t("presentBtn")}
          </Link>
          <button className="btn btn-quiet" onClick={() => setStage("offer")}>
            {t("back")}
          </button>
        </section>
      )}

      {stage === "crisis" && (
        <section className="space-y-4">
          <p className="serif text-center text-2xl leading-relaxed">{t("obCrisis")}</p>
          <CrisisCard />
          <Link className="btn" href="/hetki">
            {t("presentBtn")}
          </Link>
        </section>
      )}
    </div>
  );
}
