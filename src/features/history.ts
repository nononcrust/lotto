import { Lotto, WinningLotto } from "./lotto";

const STORAGE_KEY = "lottoHistory";

const MAX_HISTORY_COUNT = 100;

/**
 * 로또 히스토리 엔트리
 */
export type LottoHistoryEntry = {
  id: string;
  lottos: Lotto[];
  winningLotto: WinningLotto;
  createdAt: string;
};

/**
 * 전체 로또 히스토리
 */
export type LottoHistory = LottoHistoryEntry[];

export const getLottoHistory = (): LottoHistory => {
  try {
    const storageItem = localStorage.getItem(STORAGE_KEY);
    return storageItem ? JSON.parse(storageItem) : [];
  } catch {
    return [];
  }
};

export const addLottoHistory = (entry: LottoHistoryEntry) => {
  const history = getLottoHistory();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([entry, ...history].slice(0, MAX_HISTORY_COUNT))
  );
};
