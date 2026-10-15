"use client";

import React, { useState, useMemo } from "react";
import { Medicine, MedicineCategoryType } from "@/types";
import { MEDICINE_CATEGORIES } from "@/data/medicines";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";

interface MedicineStockSectionProps {
  medicines: Medicine[];
  searchQuery?: string;
}

export function MedicineStockSection({
  medicines,
  searchQuery = "",
}: MedicineStockSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategoryType>("all");
  const [localSearch, setLocalSearch] = useState<string>("");

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      // By category
      if (selectedCategory !== "all" && med.category !== selectedCategory) {
        return false;
      }
      // By local search or global search query
      const activeQuery = (localSearch || searchQuery).trim().toLowerCase();
      if (activeQuery) {
        const matchesName = med.name.toLowerCase().includes(activeQuery);
        const matchesSubname = med.subname.toLowerCase().includes(activeQuery);
        const matchesHosp = med.hospitals.toLowerCase().includes(activeQuery);
        const matchesDepo = med.depo.toLowerCase().includes(activeQuery);
        const matchesCategory = med.categoryBadge.toLowerCase().includes(activeQuery);
        if (!matchesName && !matchesSubname && !matchesHosp && !matchesDepo && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [medicines, selectedCategory, localSearch, searchQuery]);

  const getIconForCategory = (cat: MedicineCategoryType) => {
    switch (cat) {
      case "sabu":
        return "vaccines";
      case "onkologi":
        return "biotech";
      case "kardiovaskular":
        return "cardiology";
      case "kronis":
        return "medication_liquid";
      default:
        return "pill";
    }
  };

  return (
    <section className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" id="obat">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Monitoring Ketersediaan Obat Esensial
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Membantu masyarakat dan dokter faskes pertama mengecek ketersediaan terapi vital, obat Program Rujuk Balik (PRB), serta serum anti-bisa sebelum membuat rujukan.
          </p>
        </div>

        {/* Controls: Category Dropdown + Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2 shrink-0">
            <Icon name="category" size={18} className="text-primary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as MedicineCategoryType)}
              className="bg-transparent border-none text-on-surface text-xs sm:text-sm font-semibold outline-none cursor-pointer"
            >
              {MEDICINE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Medicine Search Bar */}
          <div className="w-full sm:w-72 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
            <Icon name="search" size={18} className="text-primary shrink-0" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Cari nama generik/paten obat..."
              className="bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline w-full focus:ring-0"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="text-outline hover:text-on-surface"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Medicine Data Table */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 text-outline uppercase text-xs font-bold border-b border-slate-200/80">
                <th className="py-4 px-6">Nama Obat &amp; Dosis</th>
                <th className="py-4 px-6">Kategori Obat</th>
                <th className="py-4 px-6">Rumah Sakit Penyedia</th>
                <th className="py-4 px-6">Jumlah Stok</th>
                <th className="py-4 px-6">Kontak Farmasi 24 Jam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-on-surface">
              {filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-outline">
                    <Icon name="medication" size={40} className="mx-auto mb-2 text-outline" />
                    <p className="font-semibold">Tidak ada obat yang cocok dengan pencarian.</p>
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((med) => {
                  return (
                    <tr
                      key={med.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      {/* Name & Dose */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                            <Icon name={getIconForCategory(med.category)} size={22} />
                          </div>
                          <div>
                            <span className="font-bold text-on-surface block text-sm sm:text-base">
                              {med.name}
                            </span>
                            <span className="text-xs text-outline">{med.subname}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            med.category === "sabu"
                              ? "error"
                              : med.category === "onkologi"
                              ? "primary"
                              : "secondary"
                          }
                          size="sm"
                        >
                          {med.categoryBadge}
                        </Badge>
                      </td>

                      {/* Hospitals */}
                      <td className="py-4 px-6">
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold block text-on-surface">
                            {med.hospitals}
                          </span>
                          <span className="text-outline">{med.depo}</span>
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-surface-container-low text-tertiary tabular-nums">
                          {med.stock.toLocaleString("id-ID")} unit
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6">
                        <a
                          href={`tel:${med.phone.replace(/\D/g, "")}`}
                          className="text-primary hover:underline font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5"
                        >
                          <Icon name="call" size={16} />
                          <span>
                            {med.phone} {med.extension ? `Ext. ${med.extension}` : ""}
                          </span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-surface-container-low/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant font-medium">
          <span>
            Menampilkan {filteredMedicines.length} item obat terpantau secara real-time
          </span>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setLocalSearch("");
            }}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>Tampilkan Semua Katalog Obat Banyumas</span>
            <Icon name="arrow_forward" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
