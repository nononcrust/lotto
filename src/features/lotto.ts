import { create } from "zustand";

/**
 * 로또 번호
 */
export type Lotto = [number, number, number, number, number, number];

/**
 * 당첨 로또 번호와 보너스 번호
 */
export type WinningLotto = {
  numbers: Lotto;
  bonusNumber: number;
};

/**
 * 로또 당첨 결과
 */
export type LottoPrize = "1" | "2" | "3" | "4" | "5" | "none";

/**
 * 로또 한 장의 가격
 */
export const LOTTO_PRICE = 1000;

/**
 * 1~45 사이의 로또 번호 하나를 뽑습니다.
 */
export const pickLottoNumber = (): Lotto[number] => {
  return Math.floor(Math.random() * 45) + 1;
};

/**
 * 6자리 로또 번호를 생성합니다.
 */
export const generateLottoNumbers = (): Lotto => {
  const numbers: Set<number> = new Set();

  while (numbers.size < 6) {
    numbers.add(pickLottoNumber());
  }

  const array = Array.from(numbers).sort((a, b) => a - b);

  return [array[0], array[1], array[2], array[3], array[4], array[5]];
};

/**
 * 일치하는 로또 번호의 개수와 보너스 번호에 따라 로또 당첨 결과를 반환합니다.
 */
export const getLottoPrize = (
  lotto: Lotto,
  winningLotto: WinningLotto
): LottoPrize => {
  const hasBonusNumber = lotto.includes(winningLotto.bonusNumber);

  const matchedCount = lotto.filter((number) =>
    winningLotto.numbers.includes(number)
  ).length;

  switch (matchedCount) {
    case 6:
      return "1";
    case 5:
      return hasBonusNumber ? "2" : "3";
    case 4:
      return "4";
    case 3:
      return "5";
    default:
      return "none";
  }
};

/**
 * 모든 로또에 대해 특정 등수의 당첨 개수를 반환합니다.
 */
export const getLottoPrizeCountByPrize = ({
  lotto,
  winningLotto,
  prize,
}: {
  lotto: Lotto[];
  winningLotto: WinningLotto;
  prize: LottoPrize;
}): number => {
  return lotto.filter((lotto) => {
    return getLottoPrize(lotto, winningLotto) === prize;
  }).length;
};

type LottoState = {
  purchasedLotto: Lotto[];
  winningLotto: WinningLotto | null;
};

type LottoAction = {
  purchaseLottoByAmount: (amount: number) => void;
  startOver: () => void;
  showResult: () => void;
};

const defaultState: LottoState = {
  purchasedLotto: [],
  winningLotto: null,
};

export const useLottoStore = create<LottoState & LottoAction>((set) => ({
  ...defaultState,
  /**
   * 로또 구매
   */
  purchaseLottoByAmount: (amount: number) => {
    const newLotto = Array(amount)
      .fill(0)
      .map(() => generateLottoNumbers());

    set((state) => ({
      purchasedLotto: [...state.purchasedLotto, ...newLotto],
    }));
  },
  /**
   * 결과 확인
   */
  showResult: () => {
    set(() => ({
      winningLotto: {
        numbers: generateLottoNumbers(),
        bonusNumber: pickLottoNumber(),
      },
    }));
  },
  /**
   * 처음부터 다시하기
   */
  startOver: () => {
    set(defaultState);
  },
}));
