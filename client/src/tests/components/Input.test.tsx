// src/tests/components/Input.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../../components/atoms/Input";

describe("Input", () => {
  it("renders with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("updates value when typing", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChange={handleChange} />
    );

    const input = getByPlaceholderText("Enter text");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onKeyPress when a key is pressed", async () => {
    const user = userEvent.setup();
    const handleKeyPress = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onKeyPress={handleKeyPress} />
    );

    const input = getByPlaceholderText("Enter text");
    await user.type(input, "{enter}");

    expect(handleKeyPress).toHaveBeenCalled();
  });
});