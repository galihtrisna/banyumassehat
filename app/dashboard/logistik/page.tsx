"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { CRITICAL_MEDICINES_LIST, CRITICAL_BLOOD_LIST } from "@/data/dashboardData";

export default function LogisticsManagementPage() {
  const [activeTab, setActiveTab] = useState<"all" | "medicines" | "blood">("all");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline mb-1 font-semibold">
          <Link href="/dashboard" className="hover:underline text-on-surface-variant">
            Dashboard
          </Link>
          <span>•</span>
          <span className="text-primary font-bold">Logistik Obat &amp; Darah</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">
              Daftar Obat Sering Habis &amp; Golongan Darah Sering Kurang
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Pemantauan ketahanan buffer stok farmasi dan cadangan kantong darah BDRS untuk mencegah kekosongan obat vital dan darah cito.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Semua (Obat &amp; Darah)
            </button>
            <button
              onClick={() => setActiveTab("medicines")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "medicines"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Obat High Depletion
            </button>
            <button
              onClick={() => setActiveTab("blood")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "blood"
                  ? "bg-error text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Bank Darah Defisit
            </button>
          </div>
        </div>
      </div>

      {/* Top Warning Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Icon name="medication" size={24} />
            </div>
            <div>
              <span className="font-bold text-sm text-amber-900 block">
                3 Item Obat dalam Status Kritis
              </span>
              <span className="text-xs text-amber-700">
                Sisa stok di bawah 30% dari buffer minimum pengadaan
              </span>
            </div>
          </div>
          <Link
            href="/info-obat"
            className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
          >
            <span>Katalog</span>
            <Icon name="arrow_forward" size={14} />
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-800 flex items-center justify-center shrink-0">
              <Icon name="bloodtype" size={24} />
            </div>
            <div>
              <span className="font-bold text-sm text-red-900 block">
                2 Golongan Darah Defisit Cito
              </span>
              <span className="text-xs text-red-700">
                Golongan O+ dan AB+ mendekati batas kritis transfusi harian
              </span>
            </div>
          </div>
          <Link
            href="/stok-darah"
            className="text-xs font-bold text-red-900 hover:underline flex items-center gap-1"
          >
            <span>Stok PMI</span>
            <Icon name="arrow_forward" size={14} />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Obat & Darah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Obat Sering Habis */}
        {(activeTab === "all" || activeTab === "medicines") && (
          <Card elevation={2} rounded="3xl" className={`p-6 sm:p-8 flex flex-col justify-between ${
            activeTab === "medicines" ? "lg:col-span-2" : ""
          }`}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Icon name="medication" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">
                      Obat Sering Habis (High Depletion)
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Katalog farmasi kritis dengan frekuensi kekosongan stok tertinggi 30 hari terakhir.
                    </p>
                  </div>
                </div>

                <Link
                  href="/info-obat"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Lihat Semua Obat</span>
                  <Icon name="arrow_forward" size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {CRITICAL_MEDICINES_LIST.map((med) => {
                  const deficitPct = Math.round(
                    ((med.minBuffer - med.currentStock) / med.minBuffer) * 100
                  );

                  return (
                    <div
                      key={med.id}
                      className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-on-surface">
                            {med.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              med.status === "kritis"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {med.status === "kritis" ? "Kritis" : "Waspada"}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {med.category} • Bentuk: {med.form}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-outline mt-2">
                          <span>
                            Habis dlm 30 hari: <b className="text-red-600">{med.depletionCountMonth}x</b>
                          </span>
                          <span>•</span>
                          <span>Lead Time: <b>{med.leadTimeDays} Hari</b></span>
                        </div>
                      </div>

                      {/* Stock Info & Deficit */}
                      <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 shrink-0">
                        <div className="text-xs text-on-surface-variant">Sisa Stok Saat Ini:</div>
                        <div className="text-lg font-extrabold text-on-surface">
                          {med.currentStock} <span className="text-xs font-normal text-outline">{med.unit}</span>
                        </div>
                        <div className="text-[11px] font-semibold text-error">
                          Defisit -{deficitPct}% (Min {med.minBuffer})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button for Medicines */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-outline">
                Sumber: Integrasi SIPNAP &amp; Gudang Farmasi
              </span>
              <button
                type="button"
                onClick={() => alert("Permintaan RKO Darurat berhasil diteruskan ke Dinas Kesehatan Kabupaten Banyumas.")}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Kirim RKO Cepat ke E-Katalog
              </button>
            </div>
          </Card>
        )}

        {/* Column 2: Golongan Darah yang Sering Kurang */}
        {(activeTab === "all" || activeTab === "blood") && (
          <Card elevation={2} rounded="3xl" className={`p-6 sm:p-8 flex flex-col justify-between ${
            activeTab === "blood" ? "lg:col-span-2" : ""
          }`}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center">
                    <Icon name="bloodtype" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">
                      Golongan Darah Sering Kurang
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Ketahanan buffer stok bank darah rumah sakit (BDRS) terhadap lonjakan permintaan darurat.
                    </p>
                  </div>
                </div>

                <Link
                  href="/stok-darah"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Bank Darah Faskes</span>
                  <Icon name="arrow_forward" size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {CRITICAL_BLOOD_LIST.map((item) => {
                  return (
                    <div
                      key={item.bloodType}
                      className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/80 hover:border-red-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-on-surface">
                            {item.bloodType}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === "kritis"
                                ? "bg-red-100 text-red-800"
                                : item.status === "siaga_khusus"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.status === "kritis"
                              ? "Defisit Cito"
                              : item.status === "siaga_khusus"
                              ? "Siaga Khusus"
                              : "Waspada"}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          {item.urgencyNote}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-outline mt-2">
                          <span>Kebutuhan: <b>{item.dailyDemand} Ktg / Hari</b></span>
                          <span>•</span>
                          <span>Riwayat: <b className="text-error">{item.shortageFrequency}</b></span>
                        </div>
                      </div>

                      {/* Stock Count */}
                      <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 shrink-0">
                        <div className="text-xs text-on-surface-variant">Sisa Kantong Darah:</div>
                        <div className="text-2xl font-black text-error">
                          {item.currentStock} <span className="text-xs font-medium text-outline">Ktg</span>
                        </div>
                        <div className="text-[11px] text-outline font-semibold">
                          Batas Aman: {item.minSafeBuffer} Ktg
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button for Blood */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-outline">
                Terhubung SIMDONDAR PMI Banyumas
              </span>
              <button
                type="button"
                onClick={() => alert("Permintaan Darurat Cito telah diteruskan ke UTD PMI Sokaraja.")}
                className="px-4 py-2 rounded-xl bg-error hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Panggilan Donor Darurat PMI
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
