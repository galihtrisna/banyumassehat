"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import {
  DATA_SOURCES,
  DATA_QUALITY_DIMENSIONS,
  DATA_ANOMALIES,
  PIPELINE_LOGS,
} from "@/data/adminData";

export default function AdminOverviewPage() {
  const successSources = DATA_SOURCES.filter((s) => s.status === "success").length;
  const failedSources = DATA_SOURCES.filter((s) => s.status === "failed").length;
  const warningSources = DATA_SOURCES.filter((s) => s.status === "warning").length;

  const unresolvedAnomalies = DATA_ANOMALIES.filter((a) => a.status !== "resolved").length;
  const criticalAnomalies = DATA_ANOMALIES.filter((a) => a.severity === "CRITICAL").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1 font-semibold">
            <span>Konsol Admin Sistem</span>
            <span>/</span>
            <span className="text-outline">Ringkasan Integrasi &amp; Pipeline</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            Pusat Kendali Data Faskes Banyumas
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Monitoring kesehatan tarik data, indeks kualitas rekonsiliasi, serta mitigasi anomali klinis faskes real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Auto-Sync Active (5m)
          </span>
        </div>
      </div>

      {/* 4 Technical KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Status Sumber Data */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider font-mono">
              Status Sumber Data
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Icon name="dns" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-on-surface tracking-tight font-mono">
              {successSources}/{DATA_SOURCES.length}
            </span>
            <span className="text-xs text-emerald-700 font-bold font-mono">
              Berhasil
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-error font-semibold">{failedSources} Gagal (Timeout)</span>
            <span className="text-amber-700">{warningSources} Degradasi</span>
          </div>
        </Card>

        {/* KPI 2: Tarikan Terakhir & Throughput */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider font-mono">
              Tarikan Terakhir
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Icon name="history" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface tracking-tight font-mono">
              45 detik lalu
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-on-surface-variant">
            <span>RSUD Margono</span>
            <span className="text-primary font-bold">142 ms</span>
          </div>
        </Card>

        {/* KPI 3: Indeks Kualitas Data */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider font-mono">
              Indeks Kualitas Data
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Icon name="fact_check" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-700 tracking-tight font-mono">
              96.2%
            </span>
            <span className="text-xs text-indigo-600 font-bold">Grade A</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-on-surface-variant">
            <span>Kelengkapan: <b className="text-on-surface">97.8%</b></span>
            <span>Target: <b className="text-on-surface">&gt;95%</b></span>
          </div>
        </Card>

        {/* KPI 4: Peringatan Data Bermasalah */}
        <Card elevation={1} rounded="2xl" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider font-mono">
              Peringatan Data Bermasalah
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Icon name="warning" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-error tracking-tight font-mono">
              {unresolvedAnomalies}
            </span>
            <span className="text-xs text-on-surface-variant">Kasus Aktif</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-error font-bold">{criticalAnomalies} Butuh Tindakan</span>
            <Link
              href="/admin/kualitas-data"
              className="text-primary hover:underline flex items-center gap-0.5"
            >
              <span>Periksa</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
          </div>
        </Card>
      </div>

      {/* 3 Domain Modules Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Module 1: Pantau Tarik Data */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon name="sync" size={24} />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-primary text-[11px] font-mono font-bold">
                9 Endpoint
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1.5">
              Pantau Tarik Data
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Monitoring status berhasil atau gagal ditarik dari SIMRS, waktu pembaruan terkini, dan latensi response time per faskes.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline font-mono">8 Berhasil • 1 Gagal</span>
            <Link
              href="/admin/tarik-data"
              className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1"
            >
              <span>Buka Pipeline Tarik Data</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>

        {/* Module 2: Cek Kualitas Data */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon name="fact_check" size={24} />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-indigo-700 text-[11px] font-mono font-bold">
                4 Dimensi Mutu
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1.5">
              Cek Kualitas &amp; Peringatan Data
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Audit otomatis pendeteksi data kosong (null), data ganda (duplicate), serta nilai tidak wajar (anomali) sebelum dipublikasi.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-error font-mono font-semibold">10 Peringatan Terdeteksi</span>
            <Link
              href="/admin/kualitas-data"
              className="text-xs font-bold text-indigo-700 group-hover:underline flex items-center gap-1"
            >
              <span>Buka Audit Kualitas</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>

        {/* Module 3: Kelola Sumber & Akun */}
        <Card elevation={2} rounded="3xl" className="p-6 flex flex-col justify-between hover:border-primary/40 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon name="hub" size={24} />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-purple-700 text-[11px] font-mono font-bold">
                API &amp; Kredensial
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1.5">
              Kelola Sumber &amp; Akun
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Konfigurasi API Endpoint, integrasi FHIR SatuSehat, manajemen API Keys, IP Whitelist, serta hak akses teknisi SIMRS faskes.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-outline font-mono">5 Akun Teknis Aktif</span>
            <Link
              href="/admin/sumber-data"
              className="text-xs font-bold text-purple-700 group-hover:underline flex items-center gap-1"
            >
              <span>Kelola Konfigurasi</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
        </Card>
      </div>

      {/* 2-Columns: Live Data Sources Snapshot & Critical Data Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Live Status Sumber Data (Faskes) */}
        <Card elevation={2} rounded="3xl" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-primary flex items-center justify-center">
                <Icon name="wifi_tethering" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-on-surface">
                  Status Sumber Data Faskes
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Status koneksi dan waktu pembaruan langsung dari RS
                </p>
              </div>
            </div>

            <Link
              href="/admin/tarik-data"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-mono"
            >
              <span>Lihat Semua (9)</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {DATA_SOURCES.slice(0, 5).map((source) => (
              <div key={source.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface truncate block">
                      {source.shortName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {source.protocol}
                    </span>
                  </div>
                  <span className="text-[11px] text-outline block font-mono mt-0.5">
                    Terakhir: {source.lastSync} • {source.responseTimeMs}ms
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  {source.status === "success" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Berhasil
                    </span>
                  )}
                  {source.status === "failed" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-error font-mono text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      Gagal ditarik
                    </span>
                  )}
                  {source.status === "warning" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Degradasi
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Peringatan Data Bermasalah Terkini */}
        <Card elevation={2} rounded="3xl" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-error flex items-center justify-center">
                <Icon name="report" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-on-surface">
                  Peringatan Data Bermasalah Terkini
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Data kosong, ganda, dan anomali tidak wajar
                </p>
              </div>
            </div>

            <Link
              href="/admin/kualitas-data"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-mono"
            >
              <span>Audit Penuh</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {DATA_ANOMALIES.filter((a) => a.severity === "CRITICAL").slice(0, 3).map((anom) => (
              <div
                key={anom.id}
                className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {anom.category === "KOSONG" && (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold text-[10px]">
                        DATA KOSONG
                      </span>
                    )}
                    {anom.category === "GANDA" && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">
                        DATA GANDA
                      </span>
                    )}
                    {anom.category === "TIDAK_WAJAR" && (
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[10px]">
                        TIDAK WAJAR
                      </span>
                    )}
                    <span className="text-xs font-bold text-on-surface">
                      {anom.sourceName}
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-mono">
                    {anom.detectedAt.split(" ")[2]}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {anom.description}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-outline">
                    Nilai: <code className="text-error bg-white px-1 py-0.5 rounded border border-slate-200">{anom.sampleValue}</code>
                  </span>
                  <Link
                    href="/admin/kualitas-data"
                    className="text-primary hover:underline font-bold"
                  >
                    Tindak Lanjut →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Real-time Ingestion Stream Activity Log */}
      <Card elevation={2} rounded="3xl" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Icon name="terminal" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">
                Log Aliran Tarikan Data (Pipeline Stream)
              </h3>
              <p className="text-xs text-on-surface-variant">
                Aktivitas transmisi paket data per modul faskes se-Banyumas
              </p>
            </div>
          </div>
          <span className="text-xs text-outline font-mono">
            Protokol: SATUSEHAT FHIR &amp; REST v2.1
          </span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
          {PIPELINE_LOGS.map((log) => (
            <div key={log.id} className="flex items-start gap-3 py-1 text-slate-300">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span
                className={`font-bold shrink-0 px-1.5 py-0.2 rounded text-[10px] ${
                  log.status === "SUCCESS"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : log.status === "FAILED"
                    ? "bg-rose-500/20 text-rose-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {log.status}
              </span>
              <span className="text-sky-400 font-bold shrink-0">{log.sourceName}:</span>
              <span className="text-slate-400 shrink-0">[{log.module}]</span>
              <span className="text-slate-300">{log.details}</span>
              <span className="text-slate-500 ml-auto shrink-0 font-mono">
                {log.durationMs}ms
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
