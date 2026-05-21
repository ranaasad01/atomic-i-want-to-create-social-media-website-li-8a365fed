"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconRight, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#050505] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={
              "w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-lg py-2.5 text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " +
              (icon ? "pl-10 " : "pl-4 ") +
              (iconRight ? "pr-10 " : "pr-4 ") +
              (error ? "border-red-500 focus:ring-red-500 " : "") +
              className
            }
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65676B]">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
