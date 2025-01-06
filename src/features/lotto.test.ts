import { describe, expect, test } from "vitest";
import {
  generateLottoNumbers,
  getLottoPrize,
  getLottoPrizeCountByPrize,
  Lotto,
  pickLottoNumber,
  WinningLotto,
} from "../features/lotto";

describe("pickLottoNumber", () => {
  test("1~45 사이의 로또 번호 하나를 뽑습니다.", () => {
    const lottoNumbers = Array.from({ length: 1000 }, () => pickLottoNumber());

    const isAllNumbersValid = lottoNumbers.every(
      (number) => number >= 1 && number <= 45
    );

    expect(isAllNumbersValid).toBe(true);
  });
});

describe("generateLotto", () => {
  test("6자리 로또 번호를 생성합니다.", () => {
    const lotto = generateLottoNumbers();
    expect(lotto).toHaveLength(6);
  });

  test("각 로또 번호가 중복되지 않습니다.", () => {
    const lottos = Array.from({ length: 1000 }, () => generateLottoNumbers());

    const isAllNumbersUnique = lottos.every((lotto) => {
      const numberSet = new Set(lotto);
      return numberSet.size === 6;
    });

    expect(isAllNumbersUnique).toBe(true);
  });
});

describe("getLottoPrize", () => {
  const lotto: Lotto = [1, 2, 3, 4, 5, 6];

  const winningLotto: WinningLotto = {
    numbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  test('6개 번호가 일치하면 "1"을 반환합니다.', () => {
    expect(getLottoPrize(lotto, winningLotto)).toBe("1");
  });

  test('5개 번호가 일치하고 보너스 번호가 일치하면 "2"를 반환합니다.', () => {
    expect(getLottoPrize([1, 2, 3, 4, 5, 7], winningLotto)).toBe("2");
  });

  test('5개 번호가 일치하고 보너스 번호가 일치하지 않으면 "3"을 반환합니다.', () => {
    expect(getLottoPrize([1, 2, 3, 4, 5, 8], winningLotto)).toBe("3");
  });

  test('4개 번호가 일치하면 "4"를 반환합니다.', () => {
    expect(getLottoPrize([1, 2, 3, 4, 7, 8], winningLotto)).toBe("4");
  });

  test('3개 번호가 일치하면 "5"를 반환합니다.', () => {
    expect(getLottoPrize([1, 2, 3, 7, 8, 9], winningLotto)).toBe("5");
  });

  test('일치하는 번호가 없으면 "none"을 반환합니다.', () => {
    expect(getLottoPrize([7, 8, 9, 10, 11, 12], winningLotto)).toBe("none");
  });
});

describe("getLottoPrizeCountByPrize", () => {
  const lottos: Lotto[] = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [1, 2, 3, 4, 5, 8],
    [1, 2, 3, 4, 7, 8],
    [1, 2, 3, 7, 8, 9],
    [7, 8, 9, 10, 11, 12],
  ];

  const winningLotto: WinningLotto = {
    numbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  test("특정 등수의 당첨 개수를 반환합니다.", () => {
    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "1" })
    ).toBe(1);

    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "2" })
    ).toBe(1);

    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "3" })
    ).toBe(1);

    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "4" })
    ).toBe(1);

    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "5" })
    ).toBe(1);

    expect(
      getLottoPrizeCountByPrize({ lottos, winningLotto, prize: "none" })
    ).toBe(1);
  });
});
