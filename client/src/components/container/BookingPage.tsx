// src/components/container/BookingPage.tsx
import React from "react";
import { SearchBar } from "../molecules/SearchBar";
import { SlotList } from "../organisms/SlotList";
import { PaymentSection } from "../organisms/PaymentSection";
import { Slot } from "../../types/slot";
import { PaymentInfo } from "../../types/payment";
import styles from "./BookingPage.module.css";

interface BookingPageProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
  onVoiceSearch: () => void;
  onReset: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  slots: Slot[];
  selectedSlot: Slot | null;
  onSlotSelect: (slot: Slot) => void;
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onPay: () => void;
  paymentMessage: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onVoiceSearch,
  onReset,
  onKeyPress,
  slots,
  selectedSlot,
  onSlotSelect,
  paymentInfo,
  setPaymentInfo,
  onPay,
  paymentMessage,
}) => {
  return (
    <div className={styles.bookingPage}>
      <h1>Salon Booking System</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={onSearch}
        onVoiceSearch={onVoiceSearch}
        onKeyPress={onKeyPress}
      />
      <button onClick={onReset}>Reset</button>
      <SlotList slots={slots} selectedSlot={selectedSlot} onSlotSelect={onSlotSelect} />
      <PaymentSection
        paymentInfo={paymentInfo}
        setPaymentInfo={setPaymentInfo}
        onPay={onPay}
        paymentMessage={paymentMessage}
        selectedSlot={selectedSlot} // Pass the selectedSlot prop
      />
    </div>
  );
};