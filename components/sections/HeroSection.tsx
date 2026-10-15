"use client";

import React, { useState } from "react";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeroSectionProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Live Sync Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-6 text-primary border border-slate-200/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-on-surface">
            Diperbarui tiap 5 mnt
          </span>
          <span className="text-outline-variant">•</span>
          <span className="text-xs sm:text-sm font-medium text-on-surface-variant hidden sm:inline">
            Terintegrasi SATUSEHAT Kemenkes RI &amp; Dinkes Banyumas
          </span>
          <span className="text-xs font-medium text-on-surface-variant sm:hidden">
            SATUSEHAT Kemenkes RI
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface mb-4 tracking-tight leading-[1.15]">
          Akses Transparan &amp; Terpadu Layanan Kesehatan{" "}
          <span className="text-primary block mt-1">Kabupaten Banyumas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
          Pantau ketersediaan tempat tidur rawat inap, jadwal dokter spesialis poliklinik,
          stok obat esensial, serta pasokan kantong darah secara real-time dari seluruh rumah
          sakit rujukan dan jejaring faskes se-Kabupaten Banyumas.
        </p>

        {/* Universal Integrated Search Panel */}
        <div className="w-full bg-surface-container-lowest p-2 sm:p-3 rounded-3xl shadow-xl shadow-primary/5 mb-4 border border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center bg-surface-container-low rounded-2xl p-1.5 gap-2 focus-within:bg-surface-container-lowest focus-within:shadow-md transition-all">
            <div className="flex items-center gap-2 px-3 py-2 flex-1 w-full">
              <Icon name="search" size={24} className="text-primary shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cari RS (mis. Margono, RSUD Banyumas), poli spesialis, obat, atau darah..."
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-on-surface placeholder:text-outline focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="p-1 text-outline hover:text-on-surface rounded-full transition-colors"
                >
                  <Icon name="close" size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end px-1">
              <button
                type="button"
                onClick={() => setFilterOpen(!filterOpen)}
                className={`font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 ${
                  filterOpen
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-lowest hover:bg-surface-container-high text-primary"
                }`}
              >
                <Icon name="tune" size={18} />
                <span>Filter Cepat</span>
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={onSearchSubmit}
                iconRight="arrow_forward"
                className="shrink-0 w-full md:w-auto py-2.5"
              >
                Cari Data
              </Button>
            </div>
          </div>

          {/* Quick Filter Drawer */}
          {filterOpen && (
            <div className="pt-3 pb-1 px-3 border-t border-slate-100 mt-2 text-left animate-fadeIn">
              <span className="text-xs font-semibold text-outline block mb-2">
                Pintasan Kategori Pencarian:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "ICU Tersedia",
                  "Kelas 3 BPJS",
                  "Penyakit Dalam (Sp.PD)",
                  "Dokter Anak",
                  "Insulin PRB",
                  "Serum Anti Bisa (SABU)",
                  "Golongan Darah O+",
                  "IGD 24 Jam",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onSearchChange(item);
                      if (onSearchSubmit) onSearchSubmit();
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
