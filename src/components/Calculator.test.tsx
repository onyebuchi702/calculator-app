import { fireEvent, render, screen } from "@testing-library/react";
import { calculateExpression } from "../helper";
import Calculator from "./Calculator";

const mockHandleMemoryStoreFn = jest.fn();
const mockHandleMemoryRecallFn = jest.fn();
const mockSetValFn = jest.fn();

const defaultProps = {
  handleMemoryStore: mockHandleMemoryStoreFn,
  handleMemoryRecall: mockHandleMemoryRecallFn,
  setValue: mockSetValFn,
  value: "",
};

describe("<Calculator />", () => {
  const placeholderText = "type in your values";

  it("shows available numbers", () => {
    render(<Calculator {...defaultProps} />);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((n) => {
      expect(screen.getByText(n.toString())).toBeInTheDocument();
    });
  });

  it("shows 4 rows", () => {
    render(<Calculator {...defaultProps} />);
    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(4);
  });

  it("shows calculation operators", () => {
    const calcOperators = ["+", "-", "×", "÷"];

    calcOperators.forEach((operator) => {
      expect(screen.getByText(operator.toString())).toBeInTheDocument();
    });
  });

  it("renders equal", () => {
    render(<Calculator {...defaultProps} />);
    const equalSign = "=";
    expect(screen.getByText(equalSign)).toBeInTheDocument();
  });

  it("renders clear sign", () => {
    render(<Calculator {...defaultProps} />);
    const clear = "C";
    expect(screen.getByText(clear)).toBeInTheDocument();
  });

  it("renders an input", () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it("calculator input is disabled", () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeDisabled();
  });

  it("displays users inputs", async () => {
    render(<Calculator {...defaultProps} />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);

    const result = await screen.findByPlaceholderText(placeholderText);
    // @ts-ignore
    expect(result.value).toBe("1+2");
  });

  it("displays multiple users inputs", async () => {
    render(<Calculator {...defaultProps} />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const three = screen.getByText("3");
    const five = screen.getByText("5");
    const divide = screen.getByText("÷");
    const mul = screen.getByText("×");
    const minus = screen.getByText("-");
    fireEvent.click(three);
    fireEvent.click(mul);
    fireEvent.click(two);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(divide);
    fireEvent.click(five);

    const result = await screen.findByPlaceholderText(placeholderText);
    // @ts-ignore
    expect(result.value).toBe("3×2-1÷5");
  });

  it("calculate based on users inputs", async () => {
    render(<Calculator {...defaultProps} />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    const equal = screen.getByText("=");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(equal);

    const result = await screen.findByPlaceholderText(placeholderText);

    expect(
      (
        result as HTMLElement & {
          value: string;
        }
      ).value
    ).toBe("3");
  });

  it("calculate based on multiple users inputs", async () => {
    render(<Calculator {...defaultProps} />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const three = screen.getByText("3");
    const five = screen.getByText("5");
    const divide = screen.getByText("÷");
    const mul = screen.getByText("×");
    const minus = screen.getByText("-");
    const equal = screen.getByText("=");

    fireEvent.click(three);
    fireEvent.click(mul);
    fireEvent.click(two);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(divide);
    fireEvent.click(five);
    fireEvent.click(equal);

    const result = await screen.findByPlaceholderText(placeholderText);
    expect(
      (
        result as HTMLElement & {
          value: string;
        }
      ).value
    ).toBe("5.8");
  });

  it("can clear results", async () => {
    render(<Calculator {...defaultProps} />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    const clear = screen.getByText("C");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);

    fireEvent.click(clear);

    const result = await screen.findByPlaceholderText(placeholderText);
    expect(
      (
        result as HTMLElement & {
          value: string;
        }
      ).value
    ).toBe("");
  });
});

// it("calls the memory store function", async () => {
//   render(<Calculator {...defaultProps} value="20" setValue={mockSetValFn} />);
//   const ms = screen.getByText("MS");
//   fireEvent.click(ms);

//   expect(mockHandleMemoryStoreFn).toHaveBeenCalledTimes(1);
// });

// it("calls the memory recall function", async () => {
//   const value = "20";
//   render(
//     <Calculator {...defaultProps} value={value} setValue={mockSetValFn} />
//   );
//   const mr = screen.getByText("MR");
//   const ms = screen.getByText("MS");
//   fireEvent.click(ms);
//   fireEvent.click(mr);

//   expect(mockHandleMemoryStoreFn).toHaveBeenCalled();
//   expect(mockHandleMemoryRecallFn).toHaveBeenCalledTimes(1);

//   expect(value).toBe("20");
// });

describe("calculateExpression", () => {
  it("correctly computes for 2 numbers with +", () => {
    expect(calculateExpression("1+1")).toBe(2);
    expect(calculateExpression("10+10")).toBe(20);
    expect(calculateExpression("11+345")).toBe(356);
  });

  it("correctly substracts 2 numbers", () => {
    expect(calculateExpression("1-1")).toBe(0);
    expect(calculateExpression("10-1")).toBe(9);
    expect(calculateExpression("11-12")).toBe(-1);
  });

  it("correctly multiples 2 numbers", () => {
    expect(calculateExpression("1×1")).toBe(1);
    expect(calculateExpression("10×0")).toBe(0);
    expect(calculateExpression("11×-12")).toBe(-132);
  });

  it("correctly divides 2 numbers", () => {
    expect(calculateExpression("1÷1")).toBe(1);
    expect(calculateExpression("10÷2")).toBe(5);
    expect(calculateExpression("144÷12")).toBe(12);
  });

  it("division by 0 returns undefined and logs exception", () => {
    const errorSpy = jest.spyOn(console, "error");
    expect(calculateExpression("1÷0")).toBe(undefined);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("handles multiple operations", () => {
    expect(calculateExpression("1÷1×2×2+3×22")).toBe(70);
  });
});
