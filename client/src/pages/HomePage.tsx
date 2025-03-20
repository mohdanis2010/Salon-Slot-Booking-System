import React from "react";
import { BookingPage } from "../components/container/BookingPage";
import { SlotProvider, useSlotContext } from "../context/SlotContext";
import { PaymentProvider, usePaymentContext } from "../context/PaymentContext"; // Correct import
import { useSlots } from "../hooks/useSlots";
import { useVoiceSearch } from "../hooks/useVoiceSearch";
import { usePayment } from "../hooks/usePayment";

export const HomePageInner: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { slots, searchSlots } = useSlots();
  const { selectedSlot, setSelectedSlot } = useSlotContext();
  const { paymentInfo, setPaymentInfo, paymentMessage, setPaymentMessage } = usePaymentContext();
  const { resetTranscript, startVoiceSearch, browserSupportsSpeechRecognition } = useVoiceSearch(setSearchTerm);
  const { handlePayment } = usePayment();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchSlots(searchTerm);
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
    setPaymentInfo({
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "12/25",
      cvv: "123",
    });
  };

  const handlePay = () => {
    handlePayment(paymentInfo).then(() => setPaymentMessage(paymentMessage));
  };

  const handleReset = () => {
    resetTranscript(); // Reset voice transcript
    setSearchTerm(""); // Clear the input field
  };

  return (
    <BookingPage
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={() => searchSlots(searchTerm)}
      onVoiceSearch={startVoiceSearch}
      onReset={handleReset}
      onKeyPress={handleKeyPress}
      slots={slots}
      selectedSlot={selectedSlot}
      onSlotSelect={handleSlotSelect}
      paymentInfo={paymentInfo}
      setPaymentInfo={setPaymentInfo}
      onPay={handlePay}
      paymentMessage={paymentMessage}
    />
  );
};

export const HomePage: React.FC = () => {
  return (
    <SlotProvider>
      <PaymentProvider> {/* Correct usage */}
        <HomePageInner />
      </PaymentProvider>
    </SlotProvider>
  );
};