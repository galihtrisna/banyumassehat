import React from "react";
import { Icon } from "./Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "surface";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: string;
  iconRight?: string;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-container text-on-primary shadow-sm active:scale-[0.98]",
  secondary:
    "bg-secondary hover:bg-secondary-container text-on-secondary shadow-sm active:scale-[0.98]",
  outline:
    "bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary active:scale-[0.98]",
  ghost:
    "bg-transparent hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface",
  danger:
    "bg-error hover:bg-error-container text-on-error hover:text-on-error-container shadow-sm active:scale-[0.98]",
  surface:
    "bg-surface-container-high hover:bg-surface-container-highest text-primary active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs font-semibold px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm font-semibold px-4 py-2 rounded-xl gap-2",
  lg: "text-base font-semibold px-5 py-3 rounded-2xl gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : iconLeft ? (
        <Icon name={iconLeft} size={size === "sm" ? 16 : size === "md" ? 18 : 22} />
      ) : null}
      {children}
      {!isLoading && iconRight && (
        <Icon name={iconRight} size={size === "sm" ? 16 : size === "md" ? 18 : 22} />
      )}
    </button>
  );
}
