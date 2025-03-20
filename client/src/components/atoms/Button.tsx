// src/components/atoms/Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "reset";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};