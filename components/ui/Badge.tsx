import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "warning"
  | "error"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
  pulsing?: boolean;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dotColor: string }> = {
  primary: {
    bg: "bg-primary-fixed/80",
    text: "text-primary",
    dotColor: "bg-primary",
  },
  secondary: {
    bg: "bg-secondary-fixed/80",
    text: "text-secondary",
    dotColor: "bg-secondary",
  },
  tertiary: {
    bg: "bg-surface-container-low",
    text: "text-tertiary",
    dotColor: "bg-tertiary",
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    dotColor: "bg-amber-500",
  },
  error: {
    bg: "bg-error-container",
    text: "text-error",
    dotColor: "bg-error",
  },
  neutral: {
    bg: "bg-surface-container-high",
    text: "text-on-surface-variant",
    dotColor: "bg-outline",
  },
};

export function Badge({
  children,
  variant = "primary",
  className = "",
  dot = false,
  pulsing = false,
  size = "md",
}: BadgeProps) {
  const styles = variantStyles[variant];
  const sizeClasses =
    size === "sm"
      ? "text-[11px] leading-[14px] px-2 py-0.5 tracking-wide"
      : "text-xs font-semibold px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${styles.bg} ${styles.text} ${sizeClasses} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulsing && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.dotColor}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dotColor}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
