import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { useLottoStore } from "../features/lotto";

const initialState = useLottoStore.getState();

describe("1.4. 초기화", () => {
  beforeEach(() => {
    useLottoStore.setState(initialState);
    render(<App />);
  });

  test("처음부터 다시하기 버튼을 클릭하면 로또 어플리케이션의 처음 상태로 돌아갑니다. 모든 데이터가 초기화되어야 합니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const purchaseButton = screen.getByTestId("lotto-purchase-button");
    const showResultButton = screen.getByTestId("show-result-button");
    const resetButton = screen.getByTestId("reset-button");

    await userEvent.type(input, "1000");
    await userEvent.click(purchaseButton);
    await userEvent.click(showResultButton);
    await userEvent.click(resetButton);

    const result = screen.queryByTestId("result");
    const lottoItems = screen.queryAllByTestId("lotto-item");

    expect(result).not.toBeInTheDocument();
    expect(lottoItems).toHaveLength(0);
    expect(input).toHaveValue("");
  });
});
