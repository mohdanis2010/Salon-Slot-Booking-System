import { useState } from "react";
import axios from "axios";
import { Slot } from "../types/slot";

export const useSlots = () => {
  const [slots, setSlots] = useState<Slot[]>([]);

  const searchSlots = async (searchTerm: string) => {
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

  return { slots, searchSlots };
};