import React, { createContext, useContext, useState } from "react";
import { Slot } from "../types/slot";

interface SlotContextType {
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot | null) => void;
}

const SlotContext = createContext<SlotContextType | undefined>(undefined);

export const SlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  return (
    <SlotContext.Provider value={{ slots, setSlots, selectedSlot, setSelectedSlot }}>
      {children}
    </SlotContext.Provider>
  );
};

export const useSlotContext = () => {
  const context = useContext(SlotContext);
  if (!context) throw new Error("useSlotContext must be used within SlotProvider");
  return context;
};