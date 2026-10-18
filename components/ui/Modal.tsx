"use client";

import React, { useEffect } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg" | "xl";
}

const maxWidthMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth,
  size,
}: ModalProps) {
  const resolvedWidth = size || maxWidth || "md";
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        className={`relative w-full ${maxWidthMap[resolvedWidth]} max-h-[92vh] sm:max-h-[85vh] flex flex-col bg-surface-container-lowest rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 z-10 my-auto overflow-hidden`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header - Fixed at Top */}
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-surface-container-low shrink-0 bg-surface-container-lowest">
          <div className="min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface leading-snug line-clamp-2 sm:line-clamp-none">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 line-clamp-1 sm:line-clamp-none">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer shrink-0"
            aria-label="Tutup dialog"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-on-surface text-xs sm:text-sm leading-relaxed overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
