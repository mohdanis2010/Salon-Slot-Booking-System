// src/components/molecules/PaymentForm.tsx
import React from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { PaymentInfo } from "../../types/payment";
import { Slot } from "../../types/slot";
import styles from "./PaymentForm.module.css";

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onPay: () => void;
  selectedSlot: Slot | null;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentInfo,
  setPaymentInfo,
  onPay,
  selectedSlot,
}) => {
  return (
    <div className={styles.paymentForm}>
      <Input
        placeholder="Card Number"
        value={paymentInfo.cardNumber}
        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
        className={styles.input}
      />
      <Input
        placeholder="Expiry Date"
        value={paymentInfo.expiryDate}
        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
        className={styles.input}
      />
      <Input
        placeholder="CVV"
        value={paymentInfo.cvv}
        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
        className={styles.input}
      />
      <Button
        variant="pay"
        onClick={onPay}
        disabled={!selectedSlot}
        className={styles.payButton}
      >
        <Icon type="credit" className={styles.creditIcon} />
        Pay
      </Button>
    </div>
  );
};