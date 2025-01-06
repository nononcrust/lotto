import { describe, test } from "vitest";
import { App } from "../App";
import { act, render, screen } from "@testing-library/react";
import { Lotto, useLottoStore, WinningLotto } from "../features/lotto";
import { userEvent } from "@testing-library/user-event";

const initialState = useLottoStore.getState();

describe("1.3. 보너스 번호", () => {
  beforeEach(() => {
    useLottoStore.setState(initialState);
    render(<App />);
  });

  test("당첨 번호 생성 시, 6개 번호 외에 1개의 보너스 번호를 추가로 생성합니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const purchaseButton = screen.getByTestId("lotto-purchase-button");
    const showResultButton = screen.getByTestId("show-result-button");

    await userEvent.type(input, "1000");
    await userEvent.click(purchaseButton);
    await userEvent.click(showResultButton);

    const bonusNumber = screen.getByTestId("lotto-bonus-number");

    expect(bonusNumber).toBeInTheDocument();
  });

  test("5개 번호가 일치하고 보너스 번호가 일치하면 2등으로 간주합니다.", async () => {
    const mockLotto: Lotto[] = [
      [1, 2, 3, 4, 5, 7], // 2등
    ];

    const mockWinningLotto: WinningLotto = {
      numbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    act(() => {
      useLottoStore.setState({
        purchasedLotto: mockLotto,
        winningLotto: mockWinningLotto,
      });
    });

    const secondPrize = screen.getByTestId("prize-2");

    expect(secondPrize).toHaveTextContent("1개");
  });
});
