import React from "react";
import { Slot } from "../../types/slot";
import styles from "./SlotCard.module.css";

interface SlotCardProps {
  slot: Slot;
  isSelected: boolean;
  onSelect: (slot: Slot) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, isSelected, onSelect }) => {
  return (
    <div
      className={`${styles.slotCard} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(slot)}
    >
      <p>
        <strong>{slot.stylist}</strong> - {slot.service}
        <br />
        {slot.date} at {slot.time}
      </p>
    </div>
  );
};