import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("renders calculator successfully", () => {
    render(<App />);
    const elem = screen.getByText(/calculator app/i);
    expect(elem).toBeInTheDocument();
  });
});
