import { describe, expect, it } from "vitest";
import { detectCrisis } from "@/lib/safety";

describe("detectCrisis", () => {
  it.each([
    "En jaksa enää elää",
    "olen miettinyt itsemurhaa",
    "haluan kuolla",
    "ajattelin tappaa itseni",
    "I want to die",
    "thinking about suicide",
    "I might kill myself",
    "I keep hurting myself",
  ])("tunnistaa hädän: %s", (text) => {
    expect(detectCrisis(text)).toBe(true);
  });

  it.each(["Mieli on levoton", "Menneisyys painaa", "I feel restless and tired", "Haluan elää paremmin"])(
    "ei hälytä: %s",
    (text) => {
      expect(detectCrisis(text)).toBe(false);
    },
  );
});
