// src/tests/pages/HomePage.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePageInner } from "../../pages/HomePage";
import { SlotProvider, useSlotContext } from "../../context/SlotContext";
import { PaymentProvider, usePaymentContext } from "../../context/PaymentContext";
import * as useSlotsHook from "../../hooks/useSlots";
import * as useVoiceSearchHook from "../../hooks/useVoiceSearch";
import * as usePaymentHook from "../../hooks/usePayment";

jest.mock("../../hooks/useSlots");
jest.mock("../../hooks/useVoiceSearch");
jest.mock("../../hooks/usePayment");

const mockUseSlots = useSlotsHook as jest.Mocked<typeof useSlotsHook>;
const mockUseVoiceSearch = useVoiceSearchHook as jest.Mocked<typeof useVoiceSearchHook>;
const mockUsePayment = usePaymentHook as jest.Mocked<typeof usePaymentHook>;

const mockSlots = [
  { id: 1, stylist: "Jane", time: "10:00 AM", date: "2025-03-20", service: "Haircut" },
];
const mockPaymentInfo = {
  cardNumber: "4242 4242 4242 4242",
  expiryDate: "12/25",
  cvv: "123",
};

describe("HomePageInner", () => {
  beforeEach(() => {
    mockUseSlots.useSlots.mockReturnValue({
      slots: mockSlots,
      searchSlots: jest.fn(),
    });

    mockUseVoiceSearch.useVoiceSearch.mockReturnValue({
      transcript: "",
      resetTranscript: jest.fn(),
      startVoiceSearch: jest.fn(),
      browserSupportsSpeechRecognition: true,
    });

    mockUsePayment.usePayment.mockReturnValue({
      paymentMessage: "",
      handlePayment: jest.fn().mockResolvedValue(undefined),
    });

    (useSlotContext as jest.Mock).mockReturnValue({
      selectedSlot: null,
      setSelectedSlot: jest.fn(),
    });

    (usePaymentContext as jest.Mock).mockReturnValue({
      paymentInfo: mockPaymentInfo,
      setPaymentInfo: jest.fn(),
      paymentMessage: "",
      setPaymentMessage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <SlotProvider>
        <PaymentProvider>
          <HomePageInner />
        </PaymentProvider>
      </SlotProvider>
    );

    expect(getByText("Salon Booking System")).toBeInTheDocument();
  });

  it("resets the search term when the reset button is clicked", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText } = render(
      <SlotProvider>
        <PaymentProvider>
          <HomePageInner />
        </PaymentProvider>
      </SlotProvider>
    );

    const input = getByPlaceholderText("Search by Stylist, Service, Date, or Time");
    const resetButton = getByText("Reset");

    await user.type(input, "Jane");
    expect(input).toHaveValue("Jane");

    await user.click(resetButton);
    expect(input).toHaveValue("");
  });

  it("updates payment info when a slot is selected", async () => {
    const user = userEvent.setup();
    const setPaymentInfo = jest.fn();
    (usePaymentContext as jest.Mock).mockReturnValue({
      paymentInfo: mockPaymentInfo,
      setPaymentInfo,
      paymentMessage: "",
      setPaymentMessage: jest.fn(),
    });

    const { getByText } = render(
      <SlotProvider>
        <PaymentProvider>
          <HomePageInner />
        </PaymentProvider>
      </SlotProvider>
    );

    const slotButton = getByText("10:00 AM");
    await user.click(slotButton);

    expect(setPaymentInfo).toHaveBeenCalledWith({
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "12/25",
      cvv: "123",
    });
  });

  it("displays speech recognition error when browser does not support it", () => {
    mockUseVoiceSearch.useVoiceSearch.mockReturnValue({
      transcript: "",
      resetTranscript: jest.fn(),
      startVoiceSearch: jest.fn(),
      browserSupportsSpeechRecognition: false,
    });

    const { getByText } = render(
      <SlotProvider>
        <PaymentProvider>
          <HomePageInner />
        </PaymentProvider>
      </SlotProvider>
    );

    expect(getByText("Browser does not support speech recognition.")).toBeInTheDocument();
  });
});