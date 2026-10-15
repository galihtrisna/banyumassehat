"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { HOURLY_VISITS } from "@/data/dashboardData";

export default function HourlyVisitsPage() {
  const [visitChartFilter, setVisitChartFilter] = useState<"all" | "outpatient" | "emergency" | "inpatient">("all");
  const [hoveredHourIndex, setHoveredHourIndex] = useState<number | null>(null);

  const maxHourlyValue = Math.max(
    ...HOURLY_VISITS.map((h) => h.outpatient + h.emergency + h.inpatient)
  );

  const totalAllVisits = HOURLY_VISITS.reduce(
    (sum, cur) => sum + cur.outpatient + cur.emergency + cur.inpatient,
    0
  );
  const totalOutpatient = HOURLY_VISITS.reduce((sum, cur) => sum + cur.outpatient, 0);
  const totalEmergency = HOURLY_VISITS.reduce((sum, cur) => sum + cur.emergency, 0);
  const totalInpatient = HOURLY_VISITS.reduce((sum, cur) => sum + cur.inpatient, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline mb-1 font-semibold">
          <Link href="/dashboard" className="hover:underline text-on-surface-variant">
            Dashboard
          </Link>
          <span>•</span>
          <span className="text-primary font-bold">Jam Ramai Kunjungan</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">
              Grafik Jam Ramai Kunjungan Pasien
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Analisis kepadatan dan fluktuasi kedatangan pasien per interval 2 jam di Rawat Jalan (Poliklinik), IGD, dan Rawat Inap.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-2xl border border-slate-200">
            <div className="px-3 py-1">
              <span className="text-[10px] text-outline block">Total Rajal</span>
              <span className="text-sm font-extrabold text-blue-600">{totalOutpatient}</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-3 py-1">
              <span className="text-[10px] text-outline block">Total IGD</span>
              <span className="text-sm font-extrabold text-red-600">{totalEmergency}</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-3 py-1">
              <span className="text-[10px] text-outline block">Total Ranap</span>
              <span className="text-sm font-extrabold text-emerald-600">{totalInpatient}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Card */}
      <Card elevation={2} rounded="3xl" className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-on-surface">
              Distribusi Kunjungan per Waktu Kedatangan
            </h3>
            <p className="text-xs text-on-surface-variant">
              Arahkan kursor pada batang grafik untuk melihat rincian pasien per unit
            </p>
          </div>

          {/* Filter Toggle Kategori Layanan */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setVisitChartFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                visitChartFilter === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Semua Layanan (Total)
            </button>
            <button
              onClick={() => setVisitChartFilter("outpatient")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                visitChartFilter === "outpatient"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Rawat Jalan
            </button>
            <button
              onClick={() => setVisitChartFilter("emergency")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                visitChartFilter === "emergency"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              IGD (24 Jam)
            </button>
            <button
              onClick={() => setVisitChartFilter("inpatient")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                visitChartFilter === "inpatient"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Rawat Inap
            </button>
          </div>
        </div>

        {/* Peak Hour Alerts Banner */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-blue-900 block">Puncak Rawat Jalan:</span>
              <span className="text-blue-700">10:00 - 12:00 WIB (188 pasien/jam)</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
            <div>
              <span className="font-bold text-red-900 block">Puncak IGD:</span>
              <span className="text-red-700">18:00 - 20:00 WIB (52 pasien/jam)</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-emerald-900 block">Puncak Admisi Ranap:</span>
              <span className="text-emerald-700">12:00 - 14:00 WIB (42 pasien/jam)</span>
            </div>
          </div>
        </div>

        {/* Interactive Bars Canvas */}
        <div className="h-72 sm:h-80 flex items-end justify-between gap-1 sm:gap-3 pt-6 pb-2 border-b border-slate-200 px-2">
          {HOURLY_VISITS.map((item, idx) => {
            const total = item.outpatient + item.emergency + item.inpatient;
            const isHovered = hoveredHourIndex === idx;

            let heightPct = (total / maxHourlyValue) * 100;
            if (visitChartFilter === "outpatient") heightPct = (item.outpatient / 188) * 100;
            if (visitChartFilter === "emergency") heightPct = (item.emergency / 52) * 100;
            if (visitChartFilter === "inpatient") heightPct = (item.inpatient / 42) * 100;

            return (
              <div
                key={item.time}
                onMouseEnter={() => setHoveredHourIndex(idx)}
                onMouseLeave={() => setHoveredHourIndex(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-24 z-20 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl border border-slate-700 whitespace-nowrap animate-fadeIn pointer-events-none">
                    <div className="font-bold text-white mb-1 border-b border-slate-700 pb-1">
                      Pukul {item.time} WIB • Total: {total} Pasien
                    </div>
                    <div className="text-blue-300">Rawat Jalan: {item.outpatient} pasien</div>
                    <div className="text-red-300">IGD (24 Jam): {item.emergency} pasien</div>
                    <div className="text-emerald-300">Rawat Inap: {item.inpatient} pasien</div>
                  </div>
                )}

                {/* Stacked / Filtered Bar */}
                <div
                  className="w-full max-w-[44px] rounded-t-lg transition-all duration-300 flex flex-col justify-end overflow-hidden group-hover:brightness-110 shadow-sm"
                  style={{ height: `${Math.max(heightPct, 6)}%` }}
                >
                  {visitChartFilter === "all" ? (
                    <>
                      <div
                        style={{ height: `${(item.inpatient / total) * 100}%` }}
                        className="w-full bg-emerald-500"
                        title={`Rawat Inap: ${item.inpatient}`}
                      />
                      <div
                        style={{ height: `${(item.emergency / total) * 100}%` }}
                        className="w-full bg-red-500"
                        title={`IGD: ${item.emergency}`}
                      />
                      <div
                        style={{ height: `${(item.outpatient / total) * 100}%` }}
                        className="w-full bg-blue-600"
                        title={`Rawat Jalan: ${item.outpatient}`}
                      />
                    </>
                  ) : visitChartFilter === "outpatient" ? (
                    <div className="w-full h-full bg-blue-600 rounded-t-lg" />
                  ) : visitChartFilter === "emergency" ? (
                    <div className="w-full h-full bg-red-500 rounded-t-lg" />
                  ) : (
                    <div className="w-full h-full bg-emerald-500 rounded-t-lg" />
                  )}
                </div>

                {/* Hour label */}
                <span className="text-[11px] font-bold text-on-surface-variant mt-2 group-hover:text-primary">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-semibold text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-blue-600" />
            <span>Rawat Jalan (Poliklinik)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-red-500" />
            <span>Instalasi Gawat Darurat (IGD)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
            <span>Rawat Inap (Admisi Pasien Baru)</span>
          </div>
        </div>
      </Card>

      {/* Breakdown Table & Operational Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card elevation={2} rounded="3xl" className="p-6">
            <h3 className="font-bold text-base text-on-surface mb-3">
              Rincian Volume Kunjungan per Waktu
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/60 border-b border-slate-200 text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Interval Jam</th>
                    <th className="py-3 px-4 text-center">Rawat Jalan</th>
                    <th className="py-3 px-4 text-center">IGD</th>
                    <th className="py-3 px-4 text-center">Rawat Inap</th>
                    <th className="py-3 px-4 text-center">Total Kunjungan</th>
                    <th className="py-3 px-4 text-center">Status Beban</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-surface-container-lowest">
                  {HOURLY_VISITS.map((item) => {
                    const total = item.outpatient + item.emergency + item.inpatient;
                    const isPeak = total >= 180;
                    return (
                      <tr key={item.time} className="hover:bg-surface-container-low/50">
                        <td className="py-3 px-4 font-bold text-on-surface">
                          {item.time} WIB
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-blue-600">
                          {item.outpatient}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-red-600">
                          {item.emergency}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-emerald-600">
                          {item.inpatient}
                        </td>
                        <td className="py-3 px-4 text-center font-extrabold text-on-surface">
                          {total}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPeak
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {isPeak ? "Jam Sibuk" : "Normal"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Operational Guidance */}
        <div className="lg:col-span-4 space-y-4">
          <Card elevation={1} rounded="2xl" className="p-5">
            <h4 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2">
              <Icon name="lightbulb" size={18} className="text-amber-500" />
              <span>Rekomendasi Manajemen Antrean</span>
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Berdasarkan pola historis, antrean loket registrasi dan farmasi mengalami lonjakan tajam pada pukul 08:30 - 11:00 WIB. Disarankan memperbanyak staf verifikasi BPJS dan membuka counter obat express.
            </p>
          </Card>

          <Card elevation={1} rounded="2xl" className="p-5">
            <h4 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2">
              <Icon name="emergency" size={18} className="text-red-500" />
              <span>Kesiapan Shift Jaga IGD</span>
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Kunjungan IGD mengalami kenaikan konsisten antara pukul 17:00 - 21:00 WIB (rata-rata 48-52 pasien). Dokter jaga triase dan perawat siaga resusitasi diprioritaskan pada shift sore-malam.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
