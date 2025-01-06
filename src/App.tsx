import { Button } from "./components/button";
import { Input } from "./components/input";
import {
  getLottoPrizeCountByPrize,
  Lotto,
  LOTTO_PRICE,
  LottoPrize,
  useLottoStore,
  WinningLotto,
} from "./features/lotto";
import { useId } from "react";
import { useInput } from "./hooks/use-input";
import { z } from "zod";
import { objectEntries } from "./lib/utils";

export const App = () => {
  const amountInputId = useId();
  const amountInput = useInput();

  const amountInputSchema = z.string().refine((value) => {
    return parseInt(value) % LOTTO_PRICE === 0;
  });

  const {
    purchaseLottoByAmount,
    showResult,
    startOver,
    purchasedLotto,
    winningLotto,
  } = useLottoStore();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    try {
      amountInputSchema.parse(amountInput.value);

      const lottoAmount = Math.floor(parseInt(amountInput.value) / LOTTO_PRICE);

      purchaseLottoByAmount(lottoAmount);
    } catch {
      amountInput.setError("1000원 단위로 입력해주세요.");
    }
  };

  const onStartOverButtonClick = () => {
    startOver();
    amountInput.reset();
  };

  return (
    <div className="min-h-dvh flex justify-center">
      <main className="max-w-md bg-white w-full py-16 border px-6">
        <h1 className="font-bold text-2xl text-center">로또 어플리케이션</h1>
        <div className="mt-12">
          <form onSubmit={onSubmit}>
            <label className="text-sm font-medium" htmlFor={amountInputId}>
              로또 구매 금액
            </label>
            <div className="flex gap-2 mt-1">
              <Input
                {...amountInput.register}
                id={amountInputId}
                className="flex-1"
                placeholder="금액을 입력하세요"
                allowNumberOnly
                data-testid="lotto-amount-input"
                maxLength={7}
              />
              <Button
                type="submit"
                disabled={amountInput.value.length === 0}
                data-testid="lotto-purchase-button"
              >
                구매
              </Button>
            </div>
            {amountInput.error && (
              <p
                className="mt-1 text-sm font-medium text-error"
                data-testid="error-message"
              >
                {amountInput.error}
              </p>
            )}
          </form>
          <ul className="mt-8 flex flex-col gap-2">
            {purchasedLotto.map((lotto, index) => (
              <li
                className="flex gap-1 border rounded-lg h-12 items-center px-3 justify-center"
                key={index}
              >
                <LottoItem lotto={lotto} />
              </li>
            ))}
          </ul>
          <Button
            className="mt-8 w-full"
            onClick={showResult}
            disabled={purchasedLotto.length === 0}
            data-testid="show-result-button"
          >
            결과 확인
          </Button>
          {winningLotto !== null && <Result winningLotto={winningLotto} />}
          <Button
            className="mt-4 w-full"
            onClick={onStartOverButtonClick}
            data-testid="reset-button"
          >
            처음부터 다시하기
          </Button>
        </div>
      </main>
    </div>
  );
};

type LottoItemProps = {
  lotto: Lotto;
  bonusNumber?: number;
};

const LottoItem = ({ lotto, bonusNumber }: LottoItemProps) => {
  return (
    <div className="flex gap-1 items-center" data-testid="lotto-item">
      {lotto.map((number, index) => (
        <span
          key={index}
          className="border bg-gray-400 flex justify-center items-center rounded-full size-8 text-sm text-white"
          data-testid="lotto-number"
        >
          {number}
        </span>
      ))}
      {bonusNumber && (
        <span
          className="border bg-yellow-400 flex justify-center items-center rounded-full size-8 text-sm text-white"
          data-testid="lotto-bonus-number"
        >
          {bonusNumber}
        </span>
      )}
    </div>
  );
};

type ResultProps = {
  winningLotto: WinningLotto;
};

const Result = ({ winningLotto }: ResultProps) => {
  const { purchasedLotto } = useLottoStore();

  const labelByPrize: Record<LottoPrize, string> = {
    1: "1등",
    2: "2등",
    3: "3등",
    4: "4등",
    5: "5등",
    none: "꽝",
  };

  return (
    <div
      className="mt-4 p-3 rounded-lg border border-border"
      data-testid="result"
    >
      <span className="text-lg font-bold">당첨 번호</span>
      <div className="flex gap-1 mt-2">
        <LottoItem
          lotto={winningLotto.numbers}
          bonusNumber={winningLotto.bonusNumber}
        />
      </div>
      <div className="flex flex-col mt-4">
        <span className="text-lg font-bold">당첨 결과</span>
        <div className="mt-2 flex flex-col gap-1">
          {objectEntries(labelByPrize).map(([prize, label]) => (
            <p key={prize} data-testid={`prize-${prize}`}>
              {label}:{" "}
              {getLottoPrizeCountByPrize({
                lotto: purchasedLotto,
                prize: prize,
                winningLotto: winningLotto,
              })}
              개
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
