"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { DATA_SOURCES, DataSourceItem } from "@/data/adminData";

export default function PantauTarikDataPage() {
  const [sources, setSources] = useState<DataSourceItem[]>(DATA_SOURCES);
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failed" | "warning">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedSourceForPayload, setSelectedSourceForPayload] = useState<DataSourceItem | null>(null);
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Filter sources
  const filteredSources = sources.filter((s) => {
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.protocol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSyncSingleSource = (id: string, name: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                status: "success",
                lastSync: "Baru saja",
                lastSyncExact: "16 Okt 2026 01:46:00 WIB",
                recordsSynced: s.recordsSynced === 0 ? 450 : s.recordsSynced + 12,
                errorMessage: undefined,
              }
            : s
        )
      );
      setSyncingId(null);
      setActionToast(`Tarik data ${name} berhasil disinkronkan ulang!`);
      setTimeout(() => setActionToast(null), 4000);
    }, 1200);
  };

  const successCount = sources.filter((s) => s.status === "success").length;
  const failedCount = sources.filter((s) => s.status === "failed").length;
  const warningCount = sources.filter((s) => s.status === "warning").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Icon name="check_circle" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Sinkronisasi Selesai!</p>
            <p className="text-xs text-slate-300">{actionToast}</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1 font-semibold">
            <Link href="/admin" className="hover:underline">
              Konsol Admin Sistem
            </Link>
            <span>/</span>
            <span className="text-outline">Pantau Tarik Data</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            Monitoring Pipeline Tarik Data Faskes
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Status ketersambungan data real-time, tingkat keberhasilan tarikan, kapan terakhir diperbarui, serta pemantauan waktu latensi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSyncingId("all");
              setTimeout(() => {
                setSources((prev) =>
                  prev.map((s) => ({
                    ...s,
                    status: "success",
                    lastSync: "Baru saja",
                    recordsSynced: s.recordsSynced === 0 ? 512 : s.recordsSynced + 5,
                    errorMessage: undefined,
                  }))
                );
                setSyncingId(null);
                setActionToast("Semua 9 faskes berhasil ditarik ulang secara massal!");
                setTimeout(() => setActionToast(null), 4000);
              }, 1800);
            }}
            disabled={syncingId !== null}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Icon
              name="sync"
              className={syncingId === "all" ? "animate-spin" : ""}
              size={16}
            />
            <span>{syncingId === "all" ? "Menarik Data..." : "Tarik Ulang Semua Faskes"}</span>
          </button>
        </div>
      </div>

      {/* 4 Pipeline Stat Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card elevation={1} rounded="2xl" className="p-4 font-mono">
          <span className="text-[11px] text-outline block mb-1">Total Sumber Data</span>
          <span className="text-2xl font-black text-on-surface">{sources.length} Faskes</span>
          <span className="text-[10px] text-primary block mt-1 font-semibold">100% Terintegrasi</span>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-4 font-mono">
          <span className="text-[11px] text-outline block mb-1">Berhasil Ditarik</span>
          <span className="text-2xl font-black text-emerald-700">{successCount} Faskes</span>
          <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">Status Normal</span>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-4 font-mono">
          <span className="text-[11px] text-outline block mb-1">Gagal Ditarik</span>
          <span className="text-2xl font-black text-error">{failedCount} Faskes</span>
          <span className="text-[10px] text-error block mt-1 font-semibold">Butuh Perbaikan VPN</span>
        </Card>

        <Card elevation={1} rounded="2xl" className="p-4 font-mono">
          <span className="text-[11px] text-outline block mb-1">Degradasi / Warning</span>
          <span className="text-2xl font-black text-amber-700">{warningCount} Faskes</span>
          <span className="text-[10px] text-amber-600 block mt-1 font-semibold">Validasi Payload</span>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card elevation={1} rounded="2xl" className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Icon
            name="search"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari faskes, endpoint, protokol..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-on-surface placeholder:text-outline outline-none focus:border-primary font-mono"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-primary text-white font-bold shadow-sm"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Semua ({sources.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("success")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterStatus === "success"
                ? "bg-emerald-700 text-white font-bold shadow-sm"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            Berhasil ({successCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("failed")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterStatus === "failed"
                ? "bg-error text-white font-bold shadow-sm"
                : "bg-rose-50 text-error border border-rose-200 hover:bg-rose-100"
            }`}
          >
            Gagal ({failedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("warning")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterStatus === "warning"
                ? "bg-amber-600 text-white font-bold shadow-sm"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            Degradasi ({warningCount})
          </button>
        </div>
      </Card>

      {/* Main Table: Status Sumber Data: Berhasil/Gagal & Kapan Terakhir Diperbarui */}
      <Card elevation={2} rounded="2xl" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="database" size={18} className="text-primary" />
            <h2 className="text-sm font-bold text-on-surface font-mono">
              Status Koneksi Sumber Data Terintegrasi
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">
            Menampilkan {filteredSources.length} dari {sources.length} faskes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Nama Sumber Data &amp; Endpoint</th>
                <th className="py-3 px-4">Protokol &amp; Modul</th>
                <th className="py-3 px-4">Status Tarik Data</th>
                <th className="py-3 px-4">Kapan Terakhir Diperbarui</th>
                <th className="py-3 px-4">Latensi &amp; Volume</th>
                <th className="py-3 px-4 text-right">Aksi Tarik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-on-surface">
              {filteredSources.map((source) => {
                const isItemSyncing = syncingId === source.id || syncingId === "all";

                return (
                  <tr
                    key={source.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Source Name & Endpoint */}
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-bold text-on-surface text-sm block">
                          {source.name}
                        </span>
                        <div className="flex items-center gap-2 text-outline text-[11px] mt-0.5">
                          <span className="text-primary font-semibold">{source.faskesType}</span>
                          <span>•</span>
                          <span className="text-slate-500 truncate max-w-xs" title={source.endpoint}>
                            {source.endpoint}
                          </span>
                        </div>
                        {source.errorMessage && (
                          <div className="mt-1.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-error text-[11px] leading-tight">
                            <span className="font-bold block">Penyebab Gagal:</span>
                            {source.errorMessage}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Protocol & Modules */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold block w-fit mb-1 border border-slate-200">
                        {source.protocol}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {source.dataModules.slice(0, 2).map((mod) => (
                          <span
                            key={mod}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant"
                          >
                            {mod}
                          </span>
                        ))}
                        {source.dataModules.length > 2 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-low text-outline">
                            +{source.dataModules.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Sumber Data */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {source.status === "success" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Berhasil Ditarik
                        </span>
                      )}
                      {source.status === "failed" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-error text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-error" />
                          Gagal Ditarik
                        </span>
                      )}
                      {source.status === "warning" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          Degradasi
                        </span>
                      )}
                    </td>

                    {/* Kapan Terakhir Diperbarui */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-on-surface font-bold block">
                        {source.lastSync}
                      </span>
                      <span className="text-[10px] text-on-surface-variant block">
                        {source.lastSyncExact}
                      </span>
                      <span className="text-[9px] text-outline block">
                        Frekuensi: {source.syncFrequency}
                      </span>
                    </td>

                    {/* Response Time & Volume */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            source.responseTimeMs > 2000
                              ? "text-error"
                              : source.responseTimeMs > 500
                              ? "text-amber-700"
                              : "text-primary"
                          }`}
                        >
                          {source.responseTimeMs} ms
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-on-surface-variant">{source.recordsSynced} records</span>
                      </div>
                      <span className="text-[10px] text-outline block mt-0.5">
                        Success Rate: {source.successRate}%
                      </span>
                    </td>

                    {/* Action: Trigger sync or inspect */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSourceForPayload(source);
                            setIsPayloadModalOpen(true);
                          }}
                          title="Inspeksi Payload JSON"
                          className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          <Icon name="code" size={16} />
                        </button>

                        <button
                          type="button"
                          disabled={isItemSyncing}
                          onClick={() => handleSyncSingleSource(source.id, source.shortName)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            source.status === "failed"
                              ? "bg-error hover:bg-red-700 text-white shadow-sm"
                              : "bg-primary hover:bg-primary-container text-white shadow-sm"
                          } disabled:opacity-50`}
                        >
                          <Icon
                            name="sync"
                            size={14}
                            className={isItemSyncing ? "animate-spin" : ""}
                          />
                          <span>{isItemSyncing ? "Menarik..." : "Tarik Sekarang"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Scheduler Configuration Card */}
      <Card elevation={1} rounded="2xl" className="p-6 font-mono text-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="schedule" size={18} className="text-primary" />
            <h3 className="font-bold text-sm text-on-surface">
              Konfigurasi Penjadwalan Sinkronisasi (Cron Ingestion Engine)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
            Scheduler Running: OK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-on-surface-variant">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-outline block uppercase">Frekuensi Ingest Default</span>
            <span className="text-sm font-bold text-on-surface block mt-1">Setiap 5 Menit</span>
            <span className="text-[11px] text-on-surface-variant mt-1 block">
              Auto-fetch kamar SIRANAP, jadwal dokter poliklinik, dan bank darah PMI.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-outline block uppercase">Retry Policy Otomatis</span>
            <span className="text-sm font-bold text-amber-700 block mt-1">3 Kali Percobaan (Backoff 30s)</span>
            <span className="text-[11px] text-on-surface-variant mt-1 block">
              Jika HTTP 504 / timeout, sistem otomatis mencoba 3x sebelum trigger alert.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-outline block uppercase">Webhook Receiver</span>
            <span className="text-sm font-bold text-emerald-700 block mt-1">Real-time Event Listener</span>
            <span className="text-[11px] text-on-surface-variant mt-1 block">
              Menerima push-notification seketika saat terjadi pembaruan kuota bed kritis.
            </span>
          </div>
        </div>
      </Card>

      {/* MODAL: PAYLOAD INSPECTOR */}
      {selectedSourceForPayload && (
        <Modal
          isOpen={isPayloadModalOpen}
          onClose={() => setIsPayloadModalOpen(false)}
          title={`Inspeksi Skema Payload: ${selectedSourceForPayload.shortName}`}
          size="lg"
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-outline block text-[10px]">ENDPOINT AKTIF</span>
                <span className="text-primary font-bold">{selectedSourceForPayload.endpoint}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                {selectedSourceForPayload.protocol}
              </span>
            </div>

            <div>
              <span className="text-on-surface-variant text-[11px] block mb-1">
                Sampel Data Ingest Terakhir (JSON Response):
              </span>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 text-[11px] overflow-x-auto max-h-72">
{`{
  "source_id": "${selectedSourceForPayload.id}",
  "faskes_name": "${selectedSourceForPayload.name}",
  "timestamp": "${selectedSourceForPayload.lastSyncExact}",
  "status": "${selectedSourceForPayload.status.toUpperCase()}",
  "response_time_ms": ${selectedSourceForPayload.responseTimeMs},
  "records_count": ${selectedSourceForPayload.recordsSynced},
  "modules": ${JSON.stringify(selectedSourceForPayload.dataModules)},
  "meta": {
    "version": "fhir-v4.0.1",
    "validator": "banyumas-health-gateway",
    "signature": "SHA256:9f8e...442b"
  }
}`}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPayloadModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-on-surface text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
