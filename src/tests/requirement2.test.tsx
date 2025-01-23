import { screen } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";
import { App } from "../App";
import { Lotto, useLottoStore, WinningLotto } from "../features/lotto";
import { act, render } from "@testing-library/react";

const initialState = useLottoStore.getState();

describe("1.2. 당첨 번호와 비교", () => {
  beforeEach(() => {
    useLottoStore.setState(initialState);
    render(<App />);
  });

  test("결과 확인 버튼을 클릭하면 생성된 로또 번호와 사용자가 입력한 번호를 비교하여 당첨 결과를 보여줍니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const purchaseButton = screen.getByTestId("lotto-purchase-button");
    const showResultButton = screen.getByTestId("show-result-button");

    await userEvent.type(input, "1000");
    await userEvent.click(purchaseButton);
    await userEvent.click(showResultButton);

    const result = screen.getByTestId("result");
    expect(result).toBeInTheDocument();
  });

  test("매칭된 숫자의 개수에 따라 당첨 결과를 출력합니다.", async () => {
    const mockLotto: Lotto[] = [
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 3, 4, 5, 7], // 2등
      [1, 2, 3, 4, 5, 45], // 3등
      [1, 2, 3, 4, 44, 45], // 4등
      [1, 2, 3, 43, 44, 45], // 5등
      [1, 2, 42, 43, 44, 45], // 꽝
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

    const firstPrize = screen.getByTestId("prize-1");
    const secondPrize = screen.getByTestId("prize-2");
    const thirdPrize = screen.getByTestId("prize-3");
    const fourthPrize = screen.getByTestId("prize-4");
    const fifthPrize = screen.getByTestId("prize-5");
    const nonePrize = screen.getByTestId("prize-none");

    expect(firstPrize).toHaveTextContent("1개");
    expect(secondPrize).toHaveTextContent("1개");
    expect(thirdPrize).toHaveTextContent("1개");
    expect(fourthPrize).toHaveTextContent("1개");
    expect(fifthPrize).toHaveTextContent("1개");
    expect(nonePrize).toHaveTextContent("1개");
  });
});
