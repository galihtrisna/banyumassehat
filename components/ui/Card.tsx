import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3;
  rounded?: "xl" | "2xl" | "3xl";
  className?: string;
  hoverable?: boolean;
}

const elevationClasses = {
  0: "bg-surface-container-lowest",
  1: "bg-surface-container-lowest shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] border border-slate-200/80",
  2: "bg-surface-container-lowest shadow-[0_10px_25px_-5px_rgba(2,132,199,0.06),0_8px_10px_-6px_rgba(15,23,42,0.04)] border border-slate-200/70",
  3: "bg-surface-container-lowest shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08),0_8px_10px_-6px_rgba(15,23,42,0.04)]",
};

const roundedClasses = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export function Card({
  children,
  elevation = 1,
  rounded = "3xl",
  hoverable = true,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${elevationClasses[elevation]} ${roundedClasses[rounded]} ${
        hoverable
          ? "hover:shadow-md hover:border-primary/30 transition-all duration-200"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
