import { VirtualAccount, JournalRecord, DataMode } from "@/types";
import { INITIAL_VIRTUAL_BALANCE } from "./engine";

const ACCOUNT_STORAGE_KEY = "drmz_paper_hands_account_v1";
const JOURNAL_STORAGE_KEY = "drmz_paper_hands_journal_v1";

export function getInitialAccount(mode: DataMode = "LIVE_STRIKE"): VirtualAccount {
  return {
    balanceUsd: INITIAL_VIRTUAL_BALANCE,
    initialBalanceUsd: INITIAL_VIRTUAL_BALANCE,
    activePosition: null,
    xp: 0,
    completedLessonIds: [],
    mode,
    updatedAt: Date.now(),
  };
}

export function loadAccountFromStorage(): VirtualAccount {
  if (typeof window === "undefined") return getInitialAccount();

  try {
    const raw = localStorage.getItem(ACCOUNT_STORAGE_KEY);
    if (!raw) return getInitialAccount();

    const parsed = JSON.parse(raw);
    if (typeof parsed.balanceUsd !== "number" || isNaN(parsed.balanceUsd)) {
      return getInitialAccount();
    }
    return parsed as VirtualAccount;
  } catch (e) {
    console.error("Failed to restore virtual account:", e);
    return getInitialAccount();
  }
}

export function saveAccountToStorage(account: VirtualAccount): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  } catch (e) {
    console.error("Failed to persist virtual account:", e);
  }
}

export function loadJournalFromStorage(): JournalRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as JournalRecord[];
  } catch (e) {
    console.error("Failed to restore journal:", e);
    return [];
  }
}

export function saveJournalToStorage(journal: JournalRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journal));
  } catch (e) {
    console.error("Failed to persist journal:", e);
  }
}

export function exportAccountDataJson(account: VirtualAccount, journal: JournalRecord[]): void {
  if (typeof window === "undefined") return;

  const data = {
    app: "DRMZ Paper Hands",
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    account,
    journal,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `drmz-paper-hands-export-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function resetAccountStorage(mode: DataMode = "LIVE_STRIKE"): { account: VirtualAccount; journal: JournalRecord[] } {
  const account = getInitialAccount(mode);
  const journal: JournalRecord[] = [];
  saveAccountToStorage(account);
  saveJournalToStorage(journal);
  return { account, journal };
}
