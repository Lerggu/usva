import type { L } from "./program";

// Tutustuminen: muutama kysymys elämäntilanteesta, jotta opas osaa kulkea juuri
// tämän ihmisen kanssa. Jokaisen kysymyksen voi ohittaa. Vastaukset pysyvät
// laitteella ja lähtevät oppaalle taustatiedoksi vain suostumuksella.
//
// Sukupuolta ja seksuaalista suuntautumista ei kysytä valintalistana: opas ei
// tarvitse niitä ohjatakseen, ja käyttäjä voi kertoa ne itse avoimessa kysymyksessä.

export type Profile = {
  age?: string;
  home?: string;
  day?: string;
  focus?: string[];
  duration?: string;
  support?: string[];
  steps?: string;
  pace?: string;
  country?: string;
  note?: string;
};

export type ProfileId = keyof Profile;

// `prompt` on englanninkielinen ilmaus, jolla vastaus kerrotaan oppaalle.
export type Option = { key: string; label: L; prompt: string };

export type Question =
  | { id: Exclude<ProfileId, "focus" | "support" | "note">; kind: "one"; q: L; options: Option[] }
  | { id: "focus" | "support"; kind: "many"; q: L; options: Option[] }
  | { id: "note"; kind: "text"; q: L };

const o = (key: string, fi: string, en: string, prompt: string): Option => ({ key, label: { fi, en }, prompt });

export const QUESTIONS: Question[] = [
  {
    id: "focus",
    kind: "many",
    q: { fi: "Mihin toivot eniten apua? Voit valita useamman.", en: "What do you most hope for help with? You can choose several." },
    options: [
      o("substances", "Päihteet", "Alcohol or drugs", "their own use of alcohol or drugs"),
      o("addiction", "Jokin muu riippuvuus", "Another addiction", "another addiction or compulsive habit of their own"),
      o("lovedone", "Läheisen tilanne", "A loved one's situation", "the addiction or difficult situation of someone close to them"),
      o("relationships", "Ihmissuhteet", "Relationships", "difficulties in relationships"),
      o("anxiety", "Ahdistus tai levottomuus", "Anxiety or restlessness", "anxiety or a restless mind"),
      o("loneliness", "Yksinäisyys", "Loneliness", "loneliness"),
      o("grief", "Suru tai menetys", "Grief or loss", "grief or a loss"),
      o("other", "Jokin muu", "Something else", "something else they have not yet named"),
    ],
  },
  {
    id: "duration",
    kind: "one",
    q: { fi: "Kuinka kauan tämä on painanut sinua?", en: "How long has this weighed on you?" },
    options: [
      o("under1", "Alle vuoden", "Less than a year", "less than a year"),
      o("1to5", "Muutaman vuoden", "A few years", "a few years"),
      o("over5", "Yli viisi vuotta", "More than five years", "more than five years"),
      o("life", "Suurimman osan elämästäni", "Most of my life", "most of their life"),
    ],
  },
  {
    id: "support",
    kind: "many",
    q: { fi: "Onko sinulla nyt tukea? Voit valita useamman.", en: "Do you have support right now? You can choose several." },
    options: [
      o("peer", "Vertaisryhmä", "A peer group", "a peer support group"),
      o("care", "Hoitokontakti tai ammattilainen", "Care or a professional", "professional care or a therapist"),
      o("close", "Läheinen ihminen", "Someone close", "a close person they can talk to"),
      o("none", "Ei vielä ketään", "No one yet", "no one yet"),
    ],
  },
  {
    id: "steps",
    kind: "one",
    q: {
      fi: "Onko kahdentoista askeleen työ sinulle ennestään tuttua?",
      en: "Is twelve-step work familiar to you from before?",
    },
    options: [
      o("new", "Ei, tämä on uutta", "No, this is new", "new to twelve-step work"),
      o("some", "Olen kuullut tai käynyt ryhmissä", "I have heard of it or been to groups", "somewhat familiar with twelve-step work from groups or reading"),
      o("done", "Olen tehnyt askelia aiemmin", "I have worked the steps before", "experienced: they have worked the steps before"),
    ],
  },
  {
    id: "age",
    kind: "one",
    q: { fi: "Minkä ikäinen olet?", en: "How old are you?" },
    options: [
      o("18-29", "18–29", "18–29", "18 to 29"),
      o("30-44", "30–44", "30–44", "30 to 44"),
      o("45-59", "45–59", "45–59", "45 to 59"),
      o("60+", "60 tai yli", "60 or over", "60 or over"),
    ],
  },
  {
    id: "home",
    kind: "one",
    q: { fi: "Kenen kanssa asut?", en: "Whom do you live with?" },
    options: [
      o("alone", "Yksin", "Alone", "alone"),
      o("partner", "Kumppanin kanssa", "With a partner", "with a partner"),
      o("family", "Kumppanin ja lasten kanssa", "With a partner and children", "with a partner and children"),
      o("children", "Lasten kanssa", "With children", "with their children, without a partner"),
      o("relatives", "Vanhempien tai sukulaisten kanssa", "With parents or relatives", "with parents or relatives"),
      o("other", "Jotenkin muuten", "In some other way", "in some other arrangement"),
    ],
  },
  {
    id: "day",
    kind: "one",
    q: { fi: "Mitä päiviisi nyt kuuluu?", en: "What do your days consist of now?" },
    options: [
      o("work", "Työ", "Work", "working"),
      o("study", "Opiskelu", "Studying", "studying"),
      o("unemployed", "Olen työtön", "I am unemployed", "unemployed"),
      o("retired", "Olen eläkkeellä", "I am retired", "retired"),
      o("sick", "Sairausloma tai kuntoutus", "Sick leave or rehabilitation", "on sick leave or in rehabilitation"),
      o("home", "Olen kotona perheen kanssa", "I am at home with family", "at home caring for family"),
      o("other", "Jotain muuta", "Something else", "occupied in some other way"),
    ],
  },
  {
    id: "pace",
    kind: "one",
    q: { fi: "Millainen opas olisi sinulle paras?", en: "What kind of guide would suit you best?" },
    options: [
      o("gentle", "Lempeä ja kiireetön", "Gentle and unhurried", "gentle"),
      o("direct", "Suora ja asiaan menevä", "Direct and to the point", "direct"),
    ],
  },
  {
    id: "country",
    kind: "one",
    q: { fi: "Asutko Suomessa?", en: "Do you live in Finland?" },
    options: [
      o("fi", "Kyllä", "Yes", "in Finland"),
      o("other", "En, asun muualla", "No, I live elsewhere", "outside Finland"),
    ],
  },
  {
    id: "note",
    kind: "text",
    q: {
      fi: "Onko jotain, mitä minun olisi hyvä tietää sinusta? Voit kertoa mitä tahansa, tai jättää tämän tyhjäksi.",
      en: "Is there something it would be good for me to know about you? You can tell me anything, or leave this empty.",
    },
  },
];

export const MAX_PROFILE_CHARS = 2000;
export const MAX_NOTE_CHARS = 800;

function prompts(id: ProfileId, keys: string[]): string[] {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q || q.kind === "text") return [];
  return keys.map((k) => q.options.find((opt) => opt.key === k)?.prompt).filter((p): p is string => !!p);
}

const one = (profile: Profile, id: Exclude<ProfileId, "focus" | "support" | "note">) => {
  const value = profile[id];
  return value ? prompts(id, [value])[0] : undefined;
};

// Kokoaa vastaukset oppaalle lyhyeksi englanninkieliseksi taustatiedoksi.
export function profileContext(profile: Profile): string {
  const lines: string[] = [];
  const focus = prompts("focus", profile.focus ?? []);
  if (focus.length) lines.push(`They are seeking help with: ${focus.join("; ")}.`);
  const duration = one(profile, "duration");
  if (duration) lines.push(`This has weighed on them for ${duration}.`);
  const support = prompts("support", profile.support ?? []);
  if (support.length) lines.push(`Support they have now: ${support.join("; ")}.`);
  const steps = one(profile, "steps");
  if (steps) lines.push(`Twelve-step work: ${steps}.`);
  const age = one(profile, "age");
  if (age) lines.push(`Age: ${age}.`);
  const home = one(profile, "home");
  if (home) lines.push(`They live ${home}.`);
  const day = one(profile, "day");
  if (day) lines.push(`Their days: ${day}.`);
  const country = one(profile, "country");
  if (country) lines.push(`They live ${country}.`);
  if (profile.pace === "gentle") lines.push("They asked for a gentle, unhurried guide.");
  if (profile.pace === "direct") lines.push("They asked for a direct guide who gets to the point; stay kind, but be plain.");
  const note = profile.note?.trim();
  if (note) lines.push(`In their own words, what they want you to know: ${note.slice(0, MAX_NOTE_CHARS)}`);
  return lines.join("\n");
}

export function answered(profile: Profile): number {
  return QUESTIONS.filter((q) => {
    const v = profile[q.id];
    return Array.isArray(v) ? v.length > 0 : !!v?.trim();
  }).length;
}
