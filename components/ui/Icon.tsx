import React from "react";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number | string;
}

export function Icon({ name, className = "", filled = false, size }: IconProps) {
  const style = size ? { fontSize: typeof size === "number" ? `${size}px` : size } : undefined;
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center align-middle ${
        filled ? "fill-1" : ""
      } ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
