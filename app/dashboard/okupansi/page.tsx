"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { BOR_WEEKLY_TREND, ROOM_CLASSES_OCCUPANCY } from "@/data/dashboardData";

export default function BedOccupancyPage() {
  const totalBeds = ROOM_CLASSES_OCCUPANCY.reduce((sum, r) => sum + r.totalBeds, 0);
  const totalFilled = ROOM_CLASSES_OCCUPANCY.reduce((sum, r) => sum + r.filledBeds, 0);
  const currentBOR = ((totalFilled / totalBeds) * 100).toFixed(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline mb-1 font-semibold">
          <Link href="/dashboard" className="hover:underline text-on-surface-variant">
            Dashboard
          </Link>
          <span>•</span>
          <span className="text-primary font-bold">Okupansi Kamar (BOR)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">
              Tren Okupansi Tempat Tidur (BOR) &amp; Kapasitas Ruangan
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Pemantauan tingkat Bed Occupancy Rate mingguan terhadap ambang batas standar Kemenkes RI (60% - 85%).
            </p>
          </div>

          <Link
            href="/kamar"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm self-start sm:self-auto hover:bg-primary-container transition-colors"
          >
            <span>Ketersediaan Kamar Publik</span>
            <Icon name="open_in_new" size={16} />
          </Link>
        </div>
      </div>

      {/* Top 3 Capacity Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            BOR Rata-rata Saat Ini
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface">{currentBOR}%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Ideal (Standar Kemenkes)
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            Total {totalFilled} bed terisi dari {totalBeds} kapasitas terpasang.
          </p>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            Status Ruang Kritis (ICU/NICU)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-error">89.3%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
              Sisa 3 Bed
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            25 bed terisi dari 28 bed ventilator &amp; monitor terpadu.
          </p>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            Rata-rata Lama Rawat (ALOS)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface">3.8</span>
            <span className="text-xs font-bold text-on-surface-variant">Hari / Pasien</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            Turnover tempat tidur (BTO): <b>4.2 kali / bulan</b>.
          </p>
        </Card>
      </div>

      {/* Main Weekly Trend Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Card elevation={2} rounded="3xl" className="p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">
                    Grafik Tren BOR 7 Hari Terakhir
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Garis hijau: Rata-rata harian BOR | Garis merah: Batas waspada 85%
                  </p>
                </div>
              </div>

              {/* SVG Visual Area Chart */}
              <div className="relative pt-4 pb-2">
                <div className="h-64 w-full relative flex items-end">
                  {/* Background threshold lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-outline font-semibold">
                    <div className="border-b border-red-300/60 pb-0.5 flex justify-between text-red-600">
                      <span>Ambang Batas Atas Overload (85%)</span>
                      <span>85%</span>
                    </div>
                    <div className="border-b border-emerald-300/60 pb-0.5 flex justify-between text-emerald-700">
                      <span>Ambang Batas Ideal Rekomendasi Kemenkes RI (60% - 85%)</span>
                      <span>75%</span>
                    </div>
                    <div className="border-b border-slate-200 pb-0.5 flex justify-between">
                      <span>Batas Bawah Efisiensi Biaya (60%)</span>
                      <span>60%</span>
                    </div>
                    <div className="border-b border-slate-200 pb-0.5 flex justify-between">
                      <span>0%</span>
                    </div>
                  </div>

                  {/* SVG Line & Area Plot */}
                  <svg
                    viewBox="0 0 700 200"
                    preserveAspectRatio="none"
                    className="w-full h-full z-10 overflow-visible"
                  >
                    <defs>
                      <linearGradient id="borPageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <polygon
                      points={`
                        0,${200 - (BOR_WEEKLY_TREND[0].rate / 100) * 200}
                        ${BOR_WEEKLY_TREND.map(
                          (d, i) => `${i * 116.6},${200 - (d.rate / 100) * 200}`
                        ).join(" ")}
                        700,200 0,200
                      `}
                      fill="url(#borPageGradient)"
                    />

                    {/* Stroke Line */}
                    <polyline
                      points={BOR_WEEKLY_TREND.map(
                        (d, i) => `${i * 116.6},${200 - (d.rate / 100) * 200}`
                      ).join(" ")}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Point Circles */}
                    {BOR_WEEKLY_TREND.map((d, i) => {
                      const cx = i * 116.6;
                      const cy = 200 - (d.rate / 100) * 200;
                      return (
                        <g key={d.day}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="5"
                            className="fill-white stroke-emerald-600 stroke-2 hover:r-7 transition-all cursor-pointer"
                          />
                          <text
                            x={cx}
                            y={cy - 10}
                            textAnchor="middle"
                            className="text-[11px] font-bold fill-slate-800"
                          >
                            {d.rate}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Day labels below chart */}
                <div className="flex justify-between mt-3 text-xs font-bold text-on-surface-variant px-1">
                  {BOR_WEEKLY_TREND.map((d) => (
                    <div key={d.day} className="text-center">
                      <div>{d.day}</div>
                      <div className="text-[10px] text-outline font-normal">{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <Icon name="verified" size={16} className="text-emerald-600" />
                Data sinkron dengan SIRANAP 3.0 Kementerian Kesehatan RI
              </span>
              <span className="text-emerald-700 font-semibold">Tingkat Okupansi Stabil</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Room Classes Occupancy */}
        <div className="lg:col-span-5">
          <Card elevation={2} rounded="3xl" className="p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">
                    Kapasitas per Kelas Rawat Inap
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Rincian tempat tidur terisi vs kapasitas terpasang
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {ROOM_CLASSES_OCCUPANCY.map((room) => {
                  return (
                    <div
                      key={room.className}
                      className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-slate-200/70 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-on-surface">{room.className}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                            room.status === "critical"
                              ? "bg-red-100 text-red-800"
                              : room.status === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {room.rate}% ({room.filledBeds}/{room.totalBeds})
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            room.status === "critical"
                              ? "bg-error"
                              : room.status === "warning"
                              ? "bg-amber-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${room.rate}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-outline mt-1.5">
                        <span>Sisa Kosong: {room.totalBeds - room.filledBeds} Bed</span>
                        <span>
                          {room.status === "critical"
                            ? "⚠️ Kapasitas Terbatas"
                            : room.status === "warning"
                            ? "Perlu Pemantauan"
                            : "Tersedia Aman"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-outline text-center">
              Pembaruan otomatis tiap pergantian shift perawat
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
