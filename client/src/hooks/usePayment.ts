// src/hooks/usePayment.ts
import { usePaymentContext } from "../context/PaymentContext";
import { PaymentInfo } from "../types/payment";

export const usePayment = () => {
  const { setPaymentMessage } = usePaymentContext();

  const handlePayment = async (paymentInfo: PaymentInfo) => {
    try {
      // Mock payment processing
      if (
        paymentInfo.cardNumber &&
        paymentInfo.expiryDate &&
        paymentInfo.cvv &&
        paymentInfo.cardNumber.length >= 16 &&
        paymentInfo.expiryDate.match(/^\d{2}\/\d{2}$/) &&
        paymentInfo.cvv.length >= 3
      ) {
        // Simulate successful payment
        setPaymentMessage("Payment successful");
        return Promise.resolve();
      } else {
        throw new Error("Invalid payment details");
      }
    } catch (error) {
      setPaymentMessage("Payment failed: " + (error as Error).message);
      throw error;
    }
  };

  return { handlePayment };
};