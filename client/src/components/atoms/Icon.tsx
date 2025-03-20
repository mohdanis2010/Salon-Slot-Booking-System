import React from "react";
import { MicrophoneIcon, SearchIcon, CreditCardIcon } from "@heroicons/react/solid";
import styles from "./Icon.module.css";

export const Icon: React.FC<{ type: "mic" | "search" | "credit"; className?: string; onClick?: () => void }> = ({
  type,
  className,
  onClick,
}) => {
  const icons = {
    mic: <MicrophoneIcon className={`${styles.icon} ${styles.mic} ${className || ""}`} onClick={onClick} />,
    search: <SearchIcon className={`${styles.icon} ${styles.search} ${className || ""}`} onClick={onClick} />,
    credit: <CreditCardIcon className={`${styles.icon} ${styles.credit} ${className || ""}`} onClick={onClick} />,
  };
  return icons[type];
};