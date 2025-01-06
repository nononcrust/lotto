import { WinningLotto } from "./lotto";

/**
 * 당첨 번호로부터 가장 많이 출현한 로또 번호를 구합니다.
 */
export const getMostFrequentWinningLottoNumber = (
  winningLottos: WinningLotto[]
): number => {
  const allWinningLottoNumbers = winningLottos.flatMap(
    (winningLotto) => winningLotto.numbers
  );
  const allBonusNumbers = winningLottos.map(
    (winningLotto) => winningLotto.bonusNumber
  );
  const allNumbers = [...allWinningLottoNumbers, ...allBonusNumbers];

  const numberCountMap = allNumbers.reduce<Record<number, number>>(
    (acc, lotto) => {
      if (acc[lotto]) {
        acc[lotto] += 1;
      } else {
        acc[lotto] = 1;
      }

      return acc;
    },
    {}
  );

  const sorted = Object.entries(numberCountMap).sort(
    ([, countA], [, countB]) => countB - countA
  );

  return Number(sorted[0][0]);
};
