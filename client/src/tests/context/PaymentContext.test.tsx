// src/tests/context/PaymentContext.test.tsx
import React from "react";
import { render, act } from "@testing-library/react";
import { PaymentProvider, usePaymentContext } from "../../context/PaymentContext";

// A test component to access the context
const TestComponent: React.FC = () => {
  const { paymentInfo, setPaymentInfo, paymentMessage, setPaymentMessage } = usePaymentContext();
  return (
    <div>
      <span data-testid="payment-message">{paymentMessage}</span>
      <button
        onClick={() =>
          setPaymentInfo({
            cardNumber: "1234 5678 9012 3456",
            expiryDate: "12/26",
            cvv: "456",
          })
        }
      >
        Update Payment Info
      </button>
      <button onClick={() => setPaymentMessage("Payment Successful")}>Set Message</button>
    </div>
  );
};

describe("PaymentContext", () => {
  it("provides default context values", () => {
    const { getByTestId } = render(
      <PaymentProvider>
        <TestComponent />
      </PaymentProvider>
    );

    expect(getByTestId("payment-message")).toHaveTextContent("");
  });

  it("updates payment info when setPaymentInfo is called", async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <PaymentProvider>
        <TestComponent />
      </PaymentProvider>
    );

    const button = getByText("Update Payment Info");
    await user.click(button);

    const { paymentInfo } = usePaymentContext();
    expect(paymentInfo.cardNumber).toBe("1234 5678 9012 3456");
  });

  it("updates payment message when setPaymentMessage is called", async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(
      <PaymentProvider>
        <TestComponent />
      </PaymentProvider>
    );

    const button = getByText("Set Message");
    await user.click(button);

    expect(getByTestId("payment-message")).toHaveTextContent("Payment Successful");
  });
});