"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { DOCTOR_WORKLOAD_LIST } from "@/data/dashboardData";

export default function DoctorWorkloadPage() {
  const totalDoctors = DOCTOR_WORKLOAD_LIST.reduce((sum, d) => sum + d.doctorCount, 0);
  const totalVisits = DOCTOR_WORKLOAD_LIST.reduce((sum, d) => sum + d.visitCount, 0);
  const averageRatio = (totalVisits / totalDoctors).toFixed(1);

  const overloadClinics = DOCTOR_WORKLOAD_LIST.filter((d) => d.status === "overload");
  const idealClinics = DOCTOR_WORKLOAD_LIST.filter((d) => d.status === "ideal");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline mb-1 font-semibold">
          <Link href="/dashboard" className="hover:underline text-on-surface-variant">
            Dashboard
          </Link>
          <span>•</span>
          <span className="text-primary font-bold">Rasio Beban Dokter</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">
              Perbandingan Dokter Praktik vs Jumlah Kunjungan
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Analisis beban kerja dokter spesialis berdasarkan rasio pasien per dokter untuk mengantisipasi penumpukan antrean dan kelelahan tenaga medis.
            </p>
          </div>

          <Link
            href="/jadwal-dokter"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm self-start sm:self-auto hover:bg-primary-container transition-colors"
          >
            <span>Jadwal Dokter Publik</span>
            <Icon name="open_in_new" size={16} />
          </Link>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            Total Dokter Bertugas
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface">{totalDoctors}</span>
            <span className="text-xs font-semibold text-on-surface-variant">Dokter Spesialis</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            Melayani {totalVisits} pasien rawat jalan hari ini.
          </p>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            Rata-rata Rasio Beban
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">1 : {averageRatio}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Batas Waspada
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            Standar IDI: Maksimal 25 pasien per dokter per shift 4 jam.
          </p>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-5">
          <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
            Status Poliklinik Overload
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-error">{overloadClinics.length}</span>
            <span className="text-xs font-semibold text-on-surface-variant">dari 8 Poliklinik</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            {idealClinics.length} poli beroperasi dalam batas ideal (≤ 25 pasien).
          </p>
        </Card>
      </div>

      {/* Full Comparison Table Card */}
      <Card elevation={2} rounded="3xl" className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-on-surface">
              Matriks Beban Kerja per Poliklinik Spesialis
            </h3>
            <p className="text-xs text-on-surface-variant">
              Rasio dihitung dari perbandingan volume pasien terdaftar terhadap jumlah dokter jaga aktif
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Klasifikasi Beban:</span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold">
              ≤ 25 (Ideal)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-bold">
              26-32 (Tinggi)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold">
              &gt; 32 (Overload)
            </span>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-high/60 border-b border-slate-200 text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Poliklinik Spesialis</th>
                <th className="py-3 px-4 text-center">Dokter Jaga</th>
                <th className="py-3 px-4 text-center">Kunjungan Pasien</th>
                <th className="py-3 px-4">Rasio Pasien / Dokter</th>
                <th className="py-3 px-4 text-center">Status Beban</th>
                <th className="py-3 px-4">Rekomendasi Operasional SIMRS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-surface-container-lowest">
              {DOCTOR_WORKLOAD_LIST.map((item) => {
                return (
                  <tr
                    key={item.specialty}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-on-surface">
                      {item.specialty}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-on-surface">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high">
                        <Icon name="person" size={14} className="text-primary" />
                        {item.doctorCount} Dokter
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-on-surface">
                      {item.visitCount} Pasien
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm w-12 text-on-surface">
                          {item.ratio.toFixed(1)}
                        </span>
                        <div className="w-28 h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.status === "overload"
                                ? "bg-error"
                                : item.status === "high"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${Math.min((item.ratio / 40) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          item.status === "overload"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : item.status === "high"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        <Icon
                          name={
                            item.status === "overload"
                              ? "error"
                              : item.status === "high"
                              ? "warning"
                              : "check_circle"
                          }
                          size={14}
                        />
                        {item.status === "overload"
                          ? "Overload"
                          : item.status === "high"
                          ? "Padat"
                          : "Ideal"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-on-surface-variant max-w-sm leading-relaxed">
                      {item.recommendation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
