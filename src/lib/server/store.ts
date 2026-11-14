import { TableClient } from "@azure/data-tables";
import type { Account } from "./account";

export type CodeRecord = { hash: string; expiresAt: number; attempts: number; sentAt: number };

export interface Store {
  getAccount(email: string): Promise<Account | null>;
  putAccount(account: Account): Promise<void>;
  getCode(email: string): Promise<CodeRecord | null>;
  putCode(email: string, record: CodeRecord): Promise<void>;
  deleteCode(email: string): Promise<void>;
}

// Muistinvarainen tallennus kehitykseen ja testeihin. Tyhjenee, kun palvelin käynnistyy uudelleen.
export class MemoryStore implements Store {
  private accounts = new Map<string, Account>();
  private codes = new Map<string, CodeRecord>();
  async getAccount(email: string) {
    return this.accounts.get(email) ?? null;
  }
  async putAccount(account: Account) {
    this.accounts.set(account.email, account);
  }
  async getCode(email: string) {
    return this.codes.get(email) ?? null;
  }
  async putCode(email: string, record: CodeRecord) {
    this.codes.set(email, record);
  }
  async deleteCode(email: string) {
    this.codes.delete(email);
  }
}

const PARTITION = "usva";
// Taulun avaimissa ei saa olla kaikkia sähköpostiosoitteen merkkejä.
const key = (email: string) => Buffer.from(email).toString("base64url");

function notFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { statusCode?: number }).statusCode === 404;
}

// Azure Table Storage: kaksi taulua, tilit ja kirjautumiskoodit.
export class TableStore implements Store {
  private accounts: TableClient;
  private codes: TableClient;
  private ready: Promise<void> | null = null;

  constructor(connectionString: string) {
    this.accounts = TableClient.fromConnectionString(connectionString, "usvaAccounts");
    this.codes = TableClient.fromConnectionString(connectionString, "usvaCodes");
  }

  private ensure(): Promise<void> {
    this.ready ??= Promise.all([this.accounts.createTable(), this.codes.createTable()]).then(() => undefined);
    return this.ready;
  }

  async getAccount(email: string): Promise<Account | null> {
    await this.ensure();
    try {
      const e = await this.accounts.getEntity<Record<string, unknown>>(PARTITION, key(email));
      return {
        email,
        name: String(e.name ?? ""),
        mistName: String(e.mistName ?? "Usva"),
        lang: e.lang === "en" ? "en" : "fi",
        createdAt: String(e.createdAt),
        trialEndsAt: String(e.trialEndsAt),
        paidUntil: e.paidUntil ? String(e.paidUntil) : null,
      };
    } catch (error) {
      if (notFound(error)) return null;
      throw error;
    }
  }

  async putAccount(a: Account): Promise<void> {
    await this.ensure();
    await this.accounts.upsertEntity(
      {
        partitionKey: PARTITION,
        rowKey: key(a.email),
        email: a.email,
        name: a.name,
        mistName: a.mistName,
        lang: a.lang,
        createdAt: a.createdAt,
        trialEndsAt: a.trialEndsAt,
        paidUntil: a.paidUntil ?? "",
      },
      "Replace",
    );
  }

  async getCode(email: string): Promise<CodeRecord | null> {
    await this.ensure();
    try {
      const e = await this.codes.getEntity<Record<string, unknown>>(PARTITION, key(email));
      return {
        hash: String(e.hash),
        expiresAt: Number(e.expiresAt),
        attempts: Number(e.attempts),
        sentAt: Number(e.sentAt),
      };
    } catch (error) {
      if (notFound(error)) return null;
      throw error;
    }
  }

  async putCode(email: string, r: CodeRecord): Promise<void> {
    await this.ensure();
    // Luvut tallennetaan merkkijonoina, koska aikaleimat eivät mahdu taulun 32-bittiseen kokonaislukuun.
    await this.codes.upsertEntity(
      {
        partitionKey: PARTITION,
        rowKey: key(email),
        hash: r.hash,
        expiresAt: String(r.expiresAt),
        attempts: String(r.attempts),
        sentAt: String(r.sentAt),
      },
      "Replace",
    );
  }

  async deleteCode(email: string): Promise<void> {
    await this.ensure();
    try {
      await this.codes.deleteEntity(PARTITION, key(email));
    } catch (error) {
      if (!notFound(error)) throw error;
    }
  }
}
