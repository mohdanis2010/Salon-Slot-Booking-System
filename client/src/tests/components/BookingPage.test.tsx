// src/tests/components/BookingPage.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingPage } from "../../components/container/BookingPage";

describe("BookingPage", () => {
  const mockProps = {
    searchTerm: "Jane",
    setSearchTerm: jest.fn(),
    onSearch: jest.fn(),
    onVoiceSearch: jest.fn(),
    onReset: jest.fn(),
    onKeyPress: jest.fn(),
    slots: [{ id: 1, stylist: "Jane", time: "10:00 AM", date: "2025-03-20", service: "Haircut" }],
    selectedSlot: null,
    onSlotSelect: jest.fn(),
    paymentInfo: {
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "12/25",
      cvv: "123",
    },
    setPaymentInfo: jest.fn(),
    onPay: jest.fn(),
    paymentMessage: "",
  };

  it("renders without crashing", () => {
    const { getByText, getByPlaceholderText } = render(<BookingPage {...mockProps} />);
    expect(getByText("Salon Booking System")).toBeInTheDocument();
    expect(getByPlaceholderText("Search by Stylist, Service, Date, or Time")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("calls onReset when the reset button is clicked", async () => {
    const user = userEvent.setup();
    const { getByText } = render(<BookingPage {...mockProps} />);
    const resetButton = getByText("Reset");
    await user.click(resetButton);
    expect(mockProps.onReset).toHaveBeenCalled();
  });

  it("passes searchTerm to SearchBar", () => {
    const { getByPlaceholderText } = render(<BookingPage {...mockProps} />);
    const input = getByPlaceholderText("Search by Stylist, Service, Date, or Time");
    expect(input).toHaveValue("Jane");
  });
});