import React from "react";
import { Slot } from "../../types/slot";
import { SlotCard } from "../molecules/SlotCard";
import styles from "./SlotList.module.css";

interface SlotListProps {
  slots: Slot[];
  selectedSlot: Slot | null;
  onSlotSelect: (slot: Slot) => void;
}

const exampleNames = ["Jane", "Emily", "Chris", "John"];

export const SlotList: React.FC<SlotListProps> = ({ slots, selectedSlot, onSlotSelect }) => {
  const randomExample = exampleNames[Math.floor(Math.random() * exampleNames.length)]; 

  if (slots.length === 0) {
    return (
      <div className={styles.empty}>
        No slots available. Try searching for <strong>{randomExample}</strong>.
      </div>
    );
  }
  return (
    <div className={styles.slotList}>
      <h2>Available Slots</h2>
      <div className={styles.grid}>
        {slots.length > 0 ? (
          slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              isSelected={selectedSlot?.id === slot.id}
              onSelect={onSlotSelect}
            />
          ))
        ) : (
          <div className={styles.empty}>No slots available. Try a to search like Jane</div>
        )}
      </div>
    </div>
  );
};