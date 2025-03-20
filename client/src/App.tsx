import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { MicrophoneIcon, SearchIcon, CreditCardIcon } from "@heroicons/react/solid";
import { HomePage } from "./pages/HomePage";
import "./styles/App.css";

interface Slot {
  id: number;
  stylist: string;
  service: string;
  date: string;
  time: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentMessage, setPaymentMessage] = useState<string>("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript]);

  const searchSlots = async () => {
    if (!searchTerm.trim()) {
      setSlots([]);
      return;
    }

    try {
      const response = await axios.get<Slot[]>("http://localhost:5000/api/slots");
      const filteredSlots = response.data.filter(
        (slot) =>
          slot.stylist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slot.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slot.date.includes(searchTerm) ||
          slot.time.includes(searchTerm)
      );
      setSlots(filteredSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchSlots();
    }
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setPaymentInfo({
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "12/25",
      cvv: "123",
    });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post<{ success: boolean; message: string }>(
        "http://localhost:5000/api/payment",
        paymentInfo
      );
      setPaymentMessage(response.data.message);
    } catch (error) {
      setPaymentMessage("Payment failed: An error occurred");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="container">
      <HomePage />
    </div>
    
  );
};

export default App;
