import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { App } from "../App";
import { useLottoStore } from "../features/lotto";

const initialState = useLottoStore.getState();

describe("1.1. 로또 구매하기", () => {
  beforeEach(() => {
    useLottoStore.setState(initialState);
    render(<App />);
  });

  test("로또는 1장에 1000원이며, 사용자가 1,000원으로 나누어 떨어지는 값을 입력하지 않은 경우에는 적절한 에러메시지를 보여줍니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const button = screen.getByTestId("lotto-purchase-button");

    await userEvent.type(input, "1001");
    await userEvent.click(button);

    expect(screen.getByTestId("error-message")).toBeInTheDocument();

    await userEvent.clear(input);

    await userEvent.type(input, "1000");
    await userEvent.click(button);

    expect(screen.getAllByTestId("lotto-item")).toHaveLength(1);
  });

  test("사용자가 로또를 구매할 금액을 입력하고 구매 버튼을 클릭하면, 해당 금액에 해당하는 개수만큼 로또 번호를 랜덤하게 생성하여 사용자에게 제공합니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");

    await userEvent.type(input, "10000");
    await userEvent.click(screen.getByTestId("lotto-purchase-button"));

    expect(screen.getAllByTestId("lotto-item")).toHaveLength(10);
  });

  test("로또 번호는 1부터 45까지의 숫자 중 6개를 랜덤하게 생성합니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const button = screen.getByTestId("lotto-purchase-button");

    await userEvent.type(input, "1000");
    await userEvent.click(button);

    const lottoNumbers = screen.getAllByTestId("lotto-number");

    expect(lottoNumbers).toHaveLength(6);

    lottoNumbers.forEach((lottoNumber) => {
      const number = Number(lottoNumber.textContent);

      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test("번호는 중복되지 않아야 하며, 오름차순으로 정렬합니다.", async () => {
    const input = screen.getByTestId("lotto-amount-input");
    const button = screen.getByTestId("lotto-purchase-button");

    await userEvent.type(input, "1000");
    await userEvent.click(button);

    const lottoNumbers = screen.getAllByTestId("lotto-number");

    const numbers = lottoNumbers.map((lottoNumber) =>
      Number(lottoNumber.textContent)
    );

    expect(new Set(numbers).size).toBe(6);
    expect(numbers).toEqual(numbers.sort((a, b) => a - b));
  });
});
