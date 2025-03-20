import { renderHook, act } from "@testing-library/react-hooks";
import { usePayment } from "../../hooks/usePayment";
import { PaymentProvider } from "../../context/PaymentContext";

// Mock PaymentContext to provide initial values
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PaymentProvider>{children}</PaymentProvider>
);

describe("usePayment Hook", () => {
  it("returns initial payment message", () => {
    const { result } = renderHook(() => usePayment(), { wrapper });
    expect(result.current.paymentMessage).toBe("");
  });

  it("handles payment successfully", async () => {
    // Mock fetch or axios if used in handlePayment
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Payment Successful" }),
      } as Response)
    );

    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      await result.current.handlePayment({
        cardNumber: "1234 5678 9012 3456",
        expiryDate: "12/26",
        cvv: "456",
      });
    });

    expect(result.current.paymentMessage).toBe("Payment Successful");
  });

  it("handles payment failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Payment Failed" }),
      } as Response)
    );

    const { result } = renderHook(() => usePayment(), { wrapper });

    await act(async () => {
      await result.current.handlePayment({
        cardNumber: "1234 5678 9012 3456",
        expiryDate: "12/26",
        cvv: "456",
      });
    });

    expect(result.current.paymentMessage).toBe("Payment Failed");
  });
});