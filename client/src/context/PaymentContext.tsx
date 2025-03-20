import React, { createContext, useContext, useState } from "react";
import { PaymentInfo } from "../types/payment";

interface PaymentContextType {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  paymentMessage: string;
  setPaymentMessage: (message: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentMessage, setPaymentMessage] = useState<string>("");

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo, paymentMessage, setPaymentMessage }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePaymentContext must be used within PaymentProvider");
  return context;
};