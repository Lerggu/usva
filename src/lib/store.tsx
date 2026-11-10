"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { INITIAL, dayKey, registerVisit, type DayLog, type State } from "./progress";
import { t as translate, type Key } from "./i18n";

const STORAGE_KEY = "usva.v1";

type Ctx = {
  ready: boolean;
  state: State;
  today: string;
  update: (fn: (s: State) => State) => void;
  updateToday: (fn: (d: DayLog) => DayLog) => void;
  reset: () => void;
  t: (key: Key) => string;
};

const UsvaContext = createContext<Ctx | null>(null);

function load(): State {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const parsed = JSON.parse(raw) as Partial<State>;
    if (parsed.version !== 1) return INITIAL;
    return { ...INITIAL, ...parsed };
  } catch {
    return INITIAL;
  }
}

export function UsvaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(INITIAL);
  const [ready, setReady] = useState(false);
  const today = dayKey(new Date());

  useEffect(() => {
    setState(registerVisit(load(), dayKey(new Date())));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Tallennus voi epäonnistua yksityisessä selauksessa; sovellus toimii silti.
    }
    document.documentElement.lang = state.lang;
  }, [state, ready]);

  const update = useCallback((fn: (s: State) => State) => setState(fn), []);
  const updateToday = useCallback(
    (fn: (d: DayLog) => DayLog) =>
      setState((s) => ({ ...s, days: { ...s.days, [today]: fn(s.days[today] ?? {}) } })),
    [today],
  );
  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(INITIAL);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ ready, state, today, update, updateToday, reset, t: (key) => translate(state.lang, key) }),
    [ready, state, today, update, updateToday, reset],
  );

  return <UsvaContext.Provider value={value}>{children}</UsvaContext.Provider>;
}

export function useUsva(): Ctx {
  const ctx = useContext(UsvaContext);
  if (!ctx) throw new Error("useUsva must be used inside UsvaProvider");
  return ctx;
}
