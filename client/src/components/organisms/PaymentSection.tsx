import React, { useState, useEffect } from "react";
import { PaymentForm } from "../molecules/PaymentForm";
import { PaymentInfo } from "../../types/payment";
import { Slot } from "../../types/slot";
import styles from "./PaymentSection.module.css";

interface PaymentSectionProps {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onPay: () => void;
  selectedSlot: Slot | null;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentInfo,
  setPaymentInfo,
  onPay,
  selectedSlot,
}) => {
  const [displayMessage, setDisplayMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");

  const handlePay = () => {
    setDisplayMessage("Awaiting payment status...");
    setMessageStyle(styles.success);
    
    setTimeout(() => {
      setDisplayMessage("Payment Success");
      setMessageStyle(styles.success);
      
      setTimeout(() => {
        setDisplayMessage("");
      }, 3000);
    }, 2000);

    onPay();
  };

  return (
    <div className={styles.paymentSection}>
      <h2>Payment Information</h2>
      <PaymentForm
        paymentInfo={paymentInfo}
        setPaymentInfo={setPaymentInfo}
        onPay={handlePay}
        selectedSlot={selectedSlot}
      />
      {displayMessage && (
        <p className={`${styles.message} ${messageStyle}`} data-testid="payment-message">
          {displayMessage}
        </p>
      )}
    </div>
  );
};
