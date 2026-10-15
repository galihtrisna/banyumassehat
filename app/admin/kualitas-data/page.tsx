"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  DATA_QUALITY_DIMENSIONS,
  DATA_ANOMALIES,
  DataAnomalyItem,
  AnomalyCategory,
  AnomalyResolution,
} from "@/data/adminData";

export default function CekKualitasDataPage() {
  const [anomalies, setAnomalies] = useState<DataAnomalyItem[]>(DATA_ANOMALIES);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | AnomalyCategory>("ALL");
  const [selectedResolution, setSelectedResolution] = useState<"ALL" | AnomalyResolution>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Profiler scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [scanToast, setScanToast] = useState<string | null>(null);

  // Send Notification to Faskes Modal
  const [selectedAnomalyForNotify, setSelectedAnomalyForNotify] = useState<DataAnomalyItem | null>(null);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyNotes, setNotifyNotes] = useState("");
  const [isSendingNotice, setIsSendingNotice] = useState(false);

  // Filter anomalies
  const filteredAnomalies = anomalies.filter((a) => {
    const matchesCategory = selectedCategory === "ALL" || a.category === selectedCategory;
    const matchesResolution = selectedResolution === "ALL" || a.status === selectedResolution;
    const matchesSearch =
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sampleValue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesResolution && matchesSearch;
  });

  const handleResolveAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "resolved" } : item
      )
    );
    setScanToast("Data anomali berhasil ditandai sebagai 'Terselesaikan'!");
    setTimeout(() => setScanToast(null), 4000);
  };

  const handleQuarantineAnomaly = (id: string, description: string) => {
    setAnomalies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "investigating" } : item
      )
    );
    setScanToast("Baris data bermasalah berhasil dipindahkan ke Sandbox Karantina!");
    setTimeout(() => setScanToast(null), 4000);
  };

  const handleSendNotificationSubmit = () => {
    setIsSendingNotice(true);
    setTimeout(() => {
      setIsSendingNotice(false);
      setIsNotifyModalOpen(false);
      if (selectedAnomalyForNotify) {
        setAnomalies((prev) =>
          prev.map((item) =>
            item.id === selectedAnomalyForNotify.id
              ? { ...item, status: "investigating" }
              : item
          )
        );
      }
      setScanToast(`Tiket teguran berhasil dikirimkan ke kontak IT ${selectedAnomalyForNotify?.sourceName}!`);
      setTimeout(() => setScanToast(null), 4000);
    }, 1000);
  };

  const handleRunFullAudit = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanToast("Pemindaian kualitas 58.420 baris data selesai! Ditemukan 10 isu data.");
      setTimeout(() => setScanToast(null), 4000);
    }, 1500);
  };

  const countKosong = anomalies.filter((a) => a.category === "KOSONG").length;
  const countGanda = anomalies.filter((a) => a.category === "GANDA").length;
  const countTidakWajar = anomalies.filter((a) => a.category === "TIDAK_WAJAR").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {scanToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Icon name="verified" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Audit Mutu Data Selesai</p>
            <p className="text-xs text-slate-300">{scanToast}</p>
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
            <span className="text-outline">Kualitas Data &amp; Peringatan</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            Cek Kualitas Data &amp; Mitigasi Anomali
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Validasi kepatuhan data klinis faskes terhadap integritas integritas: deteksi data kosong (null), data ganda (duplicate), dan nilai tidak wajar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isScanning}
            onClick={handleRunFullAudit}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Icon
              name="fact_check"
              className={isScanning ? "animate-spin" : ""}
              size={16}
            />
            <span>{isScanning ? "Memindai Data..." : "Jalankan Audit Kualitas"}</span>
          </button>
        </div>
      </div>

      {/* 4 Data Quality Dimensions Card Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 font-mono">
          <span className="text-xs font-bold text-outline uppercase tracking-wider">
            Indeks 4 Dimensi Kualitas Data (DWH Banyumas Sehat)
          </span>
          <span className="text-xs text-primary font-bold">
            Skor Gabungan: 96.2% (Grade A)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_QUALITY_DIMENSIONS.map((dim) => (
            <Card
              key={dim.dimension}
              elevation={1}
              rounded="2xl"
              className="p-5 font-mono flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface block">
                    {dim.dimension.split(" ")[0]}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      dim.status === "good"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    Target {dim.target}%
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`text-3xl font-black ${
                      dim.score >= dim.target ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {dim.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className={`h-full ${
                      dim.score >= dim.target ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
                  {dim.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-outline">
                {dim.details}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ANOMALY ALERTS SECTION */}
      <div className="space-y-4">
        {/* Filter Tabs by Category */}
        <Card elevation={1} rounded="2xl" className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-primary text-white font-bold shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Semua Peringatan ({anomalies.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("KOSONG")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "KOSONG"
                  ? "bg-rose-700 text-white font-bold shadow-sm"
                  : "bg-rose-50 text-error border border-rose-200 hover:bg-rose-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Data Kosong ({countKosong})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("GANDA")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "GANDA"
                  ? "bg-amber-600 text-white font-bold shadow-sm"
                  : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Data Ganda ({countGanda})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("TIDAK_WAJAR")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "TIDAK_WAJAR"
                  ? "bg-purple-700 text-white font-bold shadow-sm"
                  : "bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Data Tidak Wajar ({countTidakWajar})</span>
            </button>
          </div>

          {/* Search bar inside anomaly section */}
          <div className="relative w-full md:w-72">
            <Icon
              name="search"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari deskripsi, RS, field..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-on-surface placeholder:text-outline outline-none focus:border-primary font-mono"
            />
          </div>
        </Card>

        {/* List of Flagged Data Anomalies */}
        <div className="space-y-3">
          {filteredAnomalies.length === 0 ? (
            <Card elevation={1} rounded="2xl" className="p-8 text-center">
              <Icon name="check_circle" size={36} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-on-surface">Tidak ada peringatan data pada filter ini</p>
              <p className="text-xs text-on-surface-variant">Seluruh data lolos parameter integritas klinis.</p>
            </Card>
          ) : (
            filteredAnomalies.map((anom) => (
              <Card
                key={anom.id}
                elevation={1}
                rounded="2xl"
                className="p-5 hover:border-primary/40 transition-all font-mono"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {anom.category === "KOSONG" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-error font-bold text-[10px] border border-rose-200">
                          DATA KOSONG (NULL)
                        </span>
                      )}
                      {anom.category === "GANDA" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px] border border-amber-200">
                          DATA GANDA (DUPLICATE)
                        </span>
                      )}
                      {anom.category === "TIDAK_WAJAR" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold text-[10px] border border-purple-200">
                          DATA TIDAK WAJAR (ANOMALI)
                        </span>
                      )}

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          anom.severity === "CRITICAL"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : anom.severity === "HIGH"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {anom.severity}
                      </span>

                      <span className="text-on-surface font-bold text-xs">
                        {anom.sourceName}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-primary text-xs font-semibold">
                        Modul: {anom.module}
                      </span>
                    </div>

                    <p className="text-sm font-sans text-on-surface leading-relaxed font-medium">
                      {anom.description}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-outline block text-[10px] uppercase font-bold">
                          Nilai Bermasalah Terdeteksi (Sample):
                        </span>
                        <code className="text-error font-bold block mt-0.5 break-all">
                          {anom.sampleValue}
                        </code>
                      </div>
                      <div>
                        <span className="text-outline block text-[10px] uppercase font-bold">
                          Format / Nilai Ekspektasi Valid:
                        </span>
                        <code className="text-emerald-700 font-bold block mt-0.5 break-all">
                          {anom.expectedValue}
                        </code>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-on-surface-variant pt-1">
                      <span>Waktu Terdeteksi: <b className="text-on-surface">{anom.detectedAt}</b></span>
                      <span>•</span>
                      <span>Kontak Teknis: <b className="text-on-surface">{anom.faskesContact}</b></span>
                    </div>
                  </div>

                  {/* Right Action Panel */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2 shrink-0">
                    {anom.status === "resolved" ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <Icon name="check" size={16} />
                        <span>Terselesaikan</span>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleResolveAnomaly(anom.id)}
                          className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <Icon name="check_circle" size={14} />
                          <span>Tandai Diperbaiki</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuarantineAnomaly(anom.id, anom.description)}
                          className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-800 border border-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Icon name="shield" size={14} />
                          <span>Karantina Baris</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAnomalyForNotify(anom);
                            setIsNotifyModalOpen(true);
                          }}
                          className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <Icon name="send" size={14} />
                          <span>Kirim Peringatan ke RS</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* MODAL: NOTIFIKASI KE FASKES */}
      {selectedAnomalyForNotify && (
        <Modal
          isOpen={isNotifyModalOpen}
          onClose={() => setIsNotifyModalOpen(false)}
          title={`Kirim Notifikasi Peringatan: ${selectedAnomalyForNotify.sourceName}`}
          size="md"
        >
          <div className="space-y-4 font-mono text-xs text-on-surface">
            <p className="font-sans text-on-surface-variant">
              Sistem akan mengirimkan pesan instruksi perbaikan data otomatis melalui Webhook &amp; Telegram Bot resmi ke PIC IT SIMRS rumah sakit.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div>
                <span className="text-outline text-[10px] block">KATEGORI PELANGGARAN:</span>
                <span className="font-bold text-error">
                  {selectedAnomalyForNotify.category} — {selectedAnomalyForNotify.fieldName}
                </span>
              </div>
              <div>
                <span className="text-outline text-[10px] block">TUJUAN DISPATCH:</span>
                <span className="font-bold text-on-surface">{selectedAnomalyForNotify.faskesContact}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Catatan Teknis Tambahan (Opsional):
              </label>
              <textarea
                rows={3}
                value={notifyNotes}
                onChange={(e) => setNotifyNotes(e.target.value)}
                placeholder="Contoh: Mohon lakukan re-indexing pada field NIK admisi sebelum pukul 12.00 WIB."
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-on-surface placeholder:text-outline outline-none focus:border-primary font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNotifyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSendingNotice}
                onClick={handleSendNotificationSubmit}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Icon name="send" size={14} />
                <span>{isSendingNotice ? "Mengirim..." : "Kirimkan Notifikasi Peringatan"}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
