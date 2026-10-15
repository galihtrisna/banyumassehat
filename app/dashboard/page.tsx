"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import {
  HOURLY_VISITS,
  BOR_WEEKLY_TREND,
  DOCTOR_WORKLOAD_LIST,
  CRITICAL_MEDICINES_LIST,
  CRITICAL_BLOOD_LIST,
} from "@/data/dashboardData";

export default function DashboardOverviewPage() {
  const peakVisit = HOURLY_VISITS.reduce(
    (max, cur) =>
      cur.outpatient + cur.emergency + cur.inpatient >
      max.outpatient + max.emergency + max.inpatient
        ? cur
        : max,
    HOURLY_VISITS[0]
  );

  const overloadDoctors = DOCTOR_WORKLOAD_LIST.filter(
    (d) => d.status === "overload"
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-outline mb-1 font-semibold">
          <span>Panel Pengelola</span>
          <span>•</span>
          <span className="text-primary">Ringkasan Eksekutif</span>
        </div>
        <h2 className="text-2xl font-black text-on-surface tracking-tight">
          Ringkasan Eksekutif Operasional Faskes
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Ikhtisar terpadu indikator pelayanan, BOR kamar, rasio tenaga medis, dan ketahanan rantai pasok se-Banyumas.
        </p>
      </div>

      {/* 4 Executive KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Kunjungan */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Total Kunjungan Pasien
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Icon name="groups" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">
              1.248
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <Icon name="arrow_upward" size={14} /> +8.4%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Rajal: <b className="text-on-surface">840</b></span>
            <span>IGD: <b className="text-on-surface">216</b></span>
            <span>Ranap: <b className="text-on-surface">192</b></span>
          </div>
        </Card>

        {/* KPI 2: BOR Tempat Tidur */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              BOR Tempat Tidur
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon name="hotel" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">
              78.4%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Ideal (60-85%)
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Terisi: <b className="text-on-surface">468 Bed</b></span>
            <span>Total: <b className="text-on-surface">597 Bed</b></span>
          </div>
        </Card>

        {/* KPI 3: Rasio Dokter : Pasien */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Rasio Dokter : Pasien
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Icon name="medical_services" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">
              1 : 26
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center">
              <Icon name="warning" size={14} /> Beban Tinggi
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Dokter Praktik: <b className="text-on-surface">48 Dokter</b></span>
            <span>Spesialis: <b className="text-on-surface">18 Poli</b></span>
          </div>
        </Card>

        {/* KPI 4: Alert Stok Kritis */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">
              Peringatan Defisit Logistik
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Icon name="error" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-error tracking-tight">
              3 Obat • 2 Darah
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
            <span className="text-error font-semibold">Butuh Re-order Cito</span>
            <Link
              href="/dashboard/logistik"
              className="text-xs text-primary font-bold hover:underline"
            >
              Tinjau Logistik →
            </Link>
          </div>
        </Card>
      </div>

      {/* 4 Dedicated Module Highlight Cards with Direct Drill-Down Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Jam Ramai Kunjungan Snapshot */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Icon name="schedule" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    Jam Ramai Kunjungan Pasien
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Puncak kedatangan Rawat Jalan, IGD, dan Admisi Ranap
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                Puncak: {peakVisit.time} WIB
              </span>
            </div>

            {/* Mini visual bars preview */}
            <div className="h-28 flex items-end justify-between gap-1.5 pt-4 pb-2 border-b border-slate-100 px-2">
              {HOURLY_VISITS.map((h) => {
                const total = h.outpatient + h.emergency + h.inpatient;
                const hPct = (total / 250) * 100;
                return (
                  <div key={h.time} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full max-w-[24px] bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors"
                      style={{ height: `${hPct}%` }}
                      title={`${h.time}: ${total} pasien`}
                    />
                    <span className="text-[9px] text-outline mt-1">{h.time.split(":")[0]}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-on-surface-variant mt-3">
              Puncak kunjungan terjadi pukul <b>10:00 - 12:00 WIB</b> dengan total <b>250 pasien/jam</b>. Alur triase IGD terpantau stabil pada malam hari.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline">10 Interval Waktu</span>
            <Link
              href="/dashboard/kunjungan"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Buka Halaman Jam Kunjungan</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>

        {/* Module 2: Okupansi Kamar BOR Snapshot */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Icon name="hotel" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    Tren Okupansi Kamar (BOR)
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Rata-rata okupansi 7 hari terhadap standar Kemenkes
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                BOR 78.4% (Aman)
              </span>
            </div>

            {/* Mini Progress bars */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface font-semibold">ICU / ICCU / PICU</span>
                <span className="text-red-700 font-bold">89.3% (Sisa 3 Bed)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: "89.3%" }} />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-on-surface font-semibold">Kelas 3 BPJS PBI</span>
                <span className="text-amber-700 font-bold">86.7% (Sisa 28 Bed)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "86.7%" }} />
              </div>
            </div>

            <p className="text-xs text-on-surface-variant mt-4">
              Kapasitas ICU tergolong ketat. Diperlukan koordinasi percepatan transfer pasien stabil ke ruang rawat inap reguler.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline">6 Kelas Perawatan</span>
            <Link
              href="/dashboard/okupansi"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Buka Halaman Okupansi BOR</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>

        {/* Module 3: Rasio Beban Dokter Snapshot */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Icon name="badge" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    Rasio Beban Dokter Praktik
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Distribusi jumlah pasien per dokter poliklinik
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {overloadDoctors.length} Poli Overload
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {overloadDoctors.map((doc) => (
                <div
                  key={doc.specialty}
                  className="p-3 rounded-xl bg-surface-container-low/80 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-on-surface">{doc.specialty}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-outline">{doc.doctorCount} Dr : {doc.visitCount} Pasien</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-extrabold text-[11px]">
                      {doc.ratio.toFixed(1)} /dr
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
              Poli Penyakit Dalam dan Poli Jantung berada di ambang beban tinggi. Direkomendasikan membuka poli sore atau menambah jam praktik.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline">8 Poliklinik Terpantau</span>
            <Link
              href="/dashboard/dokter"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Buka Halaman Beban Dokter</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>

        {/* Module 4: Ketahanan Logistik Obat & Darah Snapshot */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                  <Icon name="medication" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    Ketahanan Logistik Obat &amp; Darah
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Deteksi dini defisit stok farmasi dan kantong BDRS
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                Siaga Re-Order
              </span>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-surface-container-low/80 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-on-surface block">Paracetamol Infus 1000mg</span>
                  <span className="text-[11px] text-outline">Sisa 18 Botol (Min. 80)</span>
                </div>
                <span className="font-bold text-error">Defisit -77%</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low/80 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-on-surface block">Darah O+ (BDRS)</span>
                  <span className="text-[11px] text-outline">Sisa 18 Kantong (Kebutuhan: 45/hari)</span>
                </div>
                <span className="font-bold text-error">Defisit Cito</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
              Terdapat 3 item obat kritis yang memerlukan pengadaan E-Katalog serta 2 golongan darah dengan cadangan menipis di BDRS.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline">Katalog Terintegrasi SIPNAP</span>
            <Link
              href="/dashboard/logistik"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Buka Halaman Logistik</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>
      </div>

      {/* Real-time Incident & Operational Log Feed */}
      <Card elevation={1} rounded="2xl" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="history" size={20} className="text-primary" />
            <h3 className="font-bold text-base text-on-surface">
              Log Aktivitas &amp; Notifikasi Pelayanan Terkini
            </h3>
          </div>
          <span className="text-xs text-outline">Pembaruan otomatis tiap 5 menit</span>
        </div>

        <div className="space-y-3">
          {[
            {
              time: "10:45 WIB",
              type: "warning",
              title: "Penumpukan Antrean di Poli Penyakit Dalam RSUD Margono",
              desc: "Jumlah antrean mencapai 42 pasien. Direkomendasikan pengaktifan ruang konsultasi tambahan.",
            },
            {
              time: "10:12 WIB",
              type: "info",
              title: "Penerimaan Suplai 15 Kantong Darah Golongan O+ dari PMI Sokaraja",
              desc: "Bank Darah RSUD Banyumas telah mengonfirmasi penerimaan komponen darah Packed Red Cell (PRC).",
            },
            {
              time: "09:30 WIB",
              type: "success",
              title: "Sinkronisasi Ketersediaan Kamar SIRANAP 3.0 Berhasil",
              desc: "Sebanyak 14 rumah sakit di Kabupaten Banyumas berhasil memperbarui data kapasitas tempat tidur real-time.",
            },
          ].map((log) => (
            <div
              key={log.title}
              className="p-3.5 rounded-xl bg-surface-container-low/60 border border-slate-200/70 flex items-start gap-3 text-xs"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  log.type === "warning"
                    ? "bg-amber-100 text-amber-800"
                    : log.type === "success"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <Icon
                  name={
                    log.type === "warning"
                      ? "warning"
                      : log.type === "success"
                      ? "check_circle"
                      : "info"
                  }
                  size={16}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface">{log.title}</span>
                  <span className="text-[11px] text-outline">{log.time}</span>
                </div>
                <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                  {log.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
