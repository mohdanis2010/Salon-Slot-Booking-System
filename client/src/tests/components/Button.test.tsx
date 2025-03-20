// src/tests/components/Button.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../components/atoms/Button";

describe("Button", () => {
  it("renders with the correct text", () => {
    const { getByText } = render(<Button variant="primary">Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button variant="primary" onClick={handleClick}>
        Click Me
      </Button>
    );

    const button = getByText("Click Me");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant class", () => {
    const { getByText } = render(<Button variant="secondary">Click Me</Button>);
    const button = getByText("Click Me");
    expect(button).toHaveClass("secondary");
  });
});