// src/tests/context/SlotContext.test.tsx
import React from "react";
import { render, act } from "@testing-library/react";
import { SlotProvider, useSlotContext } from "../../context/SlotContext";

// A test component to access the context
const TestComponent: React.FC = () => {
  const { selectedSlot, setSelectedSlot } = useSlotContext();
  return (
    <div>
      <span data-testid="selected-slot">{selectedSlot ? selectedSlot.time : "None"}</span>
      <button
        onClick={() =>
          setSelectedSlot({
            id: 1,
            stylist: "Jane",
            time: "10:00 AM",
            date: "2025-03-20",
            service: "Haircut",
          })
        }
      >
        Select Slot
      </button>
    </div>
  );
};

describe("SlotContext", () => {
  it("provides default context values", () => {
    const { getByTestId } = render(
      <SlotProvider>
        <TestComponent />
      </SlotProvider>
    );

    expect(getByTestId("selected-slot")).toHaveTextContent("None");
  });

  it("updates selected slot when setSelectedSlot is called", async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(
      <SlotProvider>
        <TestComponent />
      </SlotProvider>
    );

    const button = getByText("Select Slot");
    await user.click(button);

    expect(getByTestId("selected-slot")).toHaveTextContent("10:00 AM");
  });
});