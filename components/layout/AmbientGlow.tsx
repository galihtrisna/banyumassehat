import React from "react";

export function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 max-w-full"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
      aria-hidden="true"
    >
      {/* Top Center Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[min(100vw,800px)] h-[400px] bg-gradient-to-b from-primary-fixed/30 via-surface-container-high/20 to-transparent blur-3xl opacity-70" />
      {/* Mid Left Glow */}
      <div className="absolute top-96 -left-20 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl opacity-40" />
      {/* Bottom Right Glow */}
      <div className="absolute top-[1400px] -right-20 w-72 h-72 bg-primary-fixed-dim/20 rounded-full blur-3xl opacity-30" />
    </div>
  );
}
