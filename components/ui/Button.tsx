"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: "bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold",
  secondary: "bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold",
  ghost: "bg-transparent hover:bg-[#F2F2F2] text-[#1877F2] font-semibold",
  danger: "bg-[#FA3E3E] hover:bg-[#e03535] text-white font-semibold",
  outline: "bg-transparent border border-[#1877F2] hover:bg-[#E7F3FF] text-[#1877F2] font-semibold",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "inline-flex items-center justify-center gap-2 transition-all duration-150 " +
        variantClasses[variant] +
        " " +
        sizeClasses[size] +
        (fullWidth ? " w-full" : "") +
        (disabled ? " opacity-50 cursor-not-allowed" : " cursor-pointer") +
        " " +
        className
      }
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
