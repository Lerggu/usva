import { EmailClient } from "@azure/communication-email";
import type { Lang } from "../progress";

const TEXT: Record<Lang, { subject: string; body: (code: string) => string }> = {
  fi: {
    subject: "Kirjautumiskoodisi Usvaan",
    body: (code) =>
      `Hei,\n\nkirjautumiskoodisi on ${code}\n\nKoodi on voimassa kymmenen minuuttia. Jos et pyytänyt koodia, voit jättää tämän viestin huomiotta.\n\nLämmöllä,\nUsva`,
  },
  en: {
    subject: "Your sign-in code for Usva",
    body: (code) =>
      `Hello,\n\nyour sign-in code is ${code}\n\nThe code is valid for ten minutes. If you did not ask for it, you can simply ignore this message.\n\nWarmly,\nUsva`,
  },
};

export function mailConfigured(): boolean {
  return !!process.env.ACS_CONNECTION_STRING && !!process.env.ACS_SENDER;
}

// Lähettää kirjautumiskoodin Azure Communication Services -sähköpostilla.
export async function sendCode(email: string, code: string, lang: Lang): Promise<void> {
  if (!mailConfigured()) {
    // Vain paikallisessa kehityksessä: koodi tulostetaan palvelimen konsoliin.
    if (process.env.USVA_DEV_AUTH === "1") {
      console.log(`[dev] sign-in code for ${email}: ${code}`);
      return;
    }
    throw new Error("mail not configured");
  }
  const client = new EmailClient(process.env.ACS_CONNECTION_STRING!);
  const poller = await client.beginSend({
    senderAddress: process.env.ACS_SENDER!,
    content: { subject: TEXT[lang].subject, plainText: TEXT[lang].body(code) },
    recipients: { to: [{ address: email }] },
  });
  const result = await poller.pollUntilDone();
  if (result.status !== "Succeeded") throw new Error("mail send failed");
}
