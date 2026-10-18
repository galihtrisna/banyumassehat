"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Manual Ingestion Sync Modal State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [selectedSyncTarget, setSelectedSyncTarget] = useState("all");
  const [syncMode, setSyncMode] = useState<"incremental" | "full">("incremental");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [syncSuccessToast, setSyncSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navMenuItems = [
    {
      group: "Manajemen Data & Integrasi",
      items: [
        {
          label: "Ringkasan Konsol",
          href: "/admin",
          icon: "terminal",
          exact: true,
        },
        {
          label: "Pantau Tarik Data",
          href: "/admin/tarik-data",
          icon: "sync",
        },
        {
          label: "Cek Kualitas Data",
          href: "/admin/kualitas-data",
          icon: "fact_check",
        },
        {
          label: "Kelola Sumber & Akun",
          href: "/admin/sumber-data",
          icon: "hub",
        },
      ],
    },
  ];

  const handleStartManualSync = () => {
    setIsSyncing(true);
    setSyncStep(1);

    setTimeout(() => {
      setSyncStep(2);
      setTimeout(() => {
        setSyncStep(3);
        setTimeout(() => {
          setSyncStep(4);
          setTimeout(() => {
            setIsSyncing(false);
            setIsSyncModalOpen(false);
            setSyncStep(0);
            setToastMessage(
              selectedSyncTarget === "all"
                ? "Tarik data 9 faskes selesai! 4.820 record berhasil disinkronkan."
                : `Tarik data ${selectedSyncTarget} selesai! Payload berhasil di-ingest.`
            );
            setSyncSuccessToast(true);
            setTimeout(() => setSyncSuccessToast(false), 5000);
          }, 700);
        }, 700);
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-slate-50/70 text-on-surface">
      {/* Toast Notification */}
      {syncSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Icon name="check_circle" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Sinkronisasi Data Berhasil!</p>
            <p className="text-xs text-slate-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR BACKDROP */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* DEDICATED SYSTEM ADMIN SIDEBAR (LIGHT THEME) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-slate-200/90 flex flex-col justify-between shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Icon name="dns" size={22} />
              </div>
              <div>
                <span className="font-extrabold text-base text-primary block leading-tight tracking-tight">
                  Priksa
                </span>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
                  Konsol Admin Sistem
                </span>
              </div>
            </Link>

            {/* Close button for mobile */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-outline hover:bg-slate-100"
              aria-label="Tutup navigasi"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="mt-4 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-sky-800">
                Pipeline Ingest Aktif
              </span>
            </div>
            <span className="text-[10px] text-sky-600 font-mono font-semibold">v4.1.0</span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navMenuItems.map((group) => (
            <div key={group.group}>
              <span className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-outline block mb-2 font-mono">
                {group.group}
              </span>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-primary text-on-primary shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                      }`}
                    >
                      <Icon name={item.icon} size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* Quick Action: Trigger Sync */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-slate-200/80">
            <span className="text-xs font-bold text-on-surface block mb-1">
              Aksi Cepat Data Hub
            </span>
            <p className="text-[11px] text-on-surface-variant mb-3">
              Jalankan pipeline tarikan data faskes secara manual on-demand.
            </p>
            <button
              type="button"
              onClick={() => {
                setMobileSidebarOpen(false);
                setIsSyncModalOpen(true);
              }}
              className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Icon name="cloud_sync" size={16} />
              <span>Tarik Data Sekarang</span>
            </button>
          </div>

          {/* Group: Navigasi Eksternal */}
          <div>
            <span className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-outline block mb-2 font-mono">
              Portal Publik
            </span>
            <nav className="space-y-1">
              <Link
                href="/"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Icon name="home" size={18} />
                <span>Kembali ke Beranda Utama</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 border-t border-slate-100 bg-surface-container-low/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Icon name="terminal" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">
                  Arya Prabowo, S.Kom
                </p>
                <p className="text-[11px] text-primary font-medium truncate">
                  Lead Data Engineer Dinkes
                </p>
              </div>
            </div>

            <Link
              href="/login"
              title="Keluar Sesi Admin"
              className="p-2 rounded-xl text-outline hover:text-error hover:bg-slate-100 transition-colors"
              aria-label="Keluar sesi"
            >
              <Icon name="logout" size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* TOP STATUS BAR & ACTIONS */}
        <header className="sticky top-0 z-30 bg-surface-container-lowest/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-on-surface-variant hover:text-on-surface hover:bg-slate-200 transition-colors"
              aria-label="Buka menu navigasi"
            >
              <Icon name="menu" size={22} />
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-slate-600">Sync Ingest:</span>
                <span className="text-emerald-700 font-bold">AKTIF</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-on-surface-variant font-mono">
                9 Faskes Terdaftar (8 Online, 1 Error)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs text-on-surface-variant font-mono">
              <Icon name="timer" size={14} className="text-outline" />
              <span>Cron Polling: <b className="text-on-surface">5 Menit</b></span>
            </div>

            <button
              type="button"
              onClick={() => setIsSyncModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Icon name="cloud_sync" size={16} />
              <span className="hidden sm:inline">Tarik Data Sekarang</span>
              <span className="sm:hidden">Sync</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* MODAL: TARIK DATA SEKARANG (TRIGGER MANUAL INGEST) */}
      <Modal
        isOpen={isSyncModalOpen}
        onClose={() => {
          if (!isSyncing) setIsSyncModalOpen(false);
        }}
        title="Trigger Eksekusi Tarik Data (Manual Ingest)"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Menjalankan proses tarik data langsung (*on-demand*) dari API SIMRS rumah sakit dan gateway SatuSehat Kemenkes ke data warehouse Priksa.
          </p>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-on-surface">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Pilih Target Sumber Data:
              </label>
              <select
                disabled={isSyncing}
                value={selectedSyncTarget}
                onChange={(e) => setSelectedSyncTarget(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
              >
                <option value="all">Semua Faskes (9 Sumber Data Terhubung)</option>
                <option value="RSUD Margono">RSUD Prof. Dr. Margono Soekarjo</option>
                <option value="RSUD Banyumas">RSUD Banyumas</option>
                <option value="RS Hermina">RS Hermina Purwokerto</option>
                <option value="RS Wijayakusuma">RS Wijayakusuma (DKT) - [Retry Failed]</option>
                <option value="RSI Purwokerto">RS Islam Purwokerto</option>
                <option value="RSU Siaga Medika">RSU Siaga Medika Banyumas</option>
                <option value="PMI SIMDONDAR">UDD PMI Kabupaten Banyumas</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Mode Sinkronisasi:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={() => setSyncMode("incremental")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    syncMode === "incremental"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-slate-200 bg-white text-on-surface-variant"
                  }`}
                >
                  <span className="text-xs block">Inkremental (Cepat)</span>
                  <span className="text-[10px] text-outline block font-normal">
                    Tarik data delta 1 jam terakhir
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={() => setSyncMode("full")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    syncMode === "full"
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-slate-200 bg-white text-on-surface-variant"
                  }`}
                >
                  <span className="text-xs block">Full Re-index</span>
                  <span className="text-[10px] text-outline block font-normal">
                    Validasi menyeluruh 24 jam
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Progress Animation when Syncing */}
          {isSyncing && (
            <div className="p-4 rounded-2xl bg-white border border-primary/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="text-primary font-mono font-bold flex items-center gap-2">
                  <Icon name="sync" className="animate-spin text-primary" size={16} />
                  Memproses Tarikan Data...
                </span>
                <span className="text-on-surface-variant font-mono">Langkah {syncStep}/4</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(syncStep / 4) * 100}%` }}
                />
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className={`flex items-center gap-2 ${syncStep >= 1 ? "text-emerald-700" : "text-slate-400"}`}>
                  <Icon name={syncStep >= 1 ? "check" : "radio_button_unchecked"} size={14} />
                  <span>1. Handshake & Autentikasi OAuth2 / API Key faskes</span>
                </div>
                <div className={`flex items-center gap-2 ${syncStep >= 2 ? "text-emerald-700" : "text-slate-400"}`}>
                  <Icon name={syncStep >= 2 ? "check" : "radio_button_unchecked"} size={14} />
                  <span>2. Mengambil resource FHIR & REST payloads (Kamar, Dokter, Darah)</span>
                </div>
                <div className={`flex items-center gap-2 ${syncStep >= 3 ? "text-emerald-700" : "text-slate-400"}`}>
                  <Icon name={syncStep >= 3 ? "check" : "radio_button_unchecked"} size={14} />
                  <span>3. Audit kualitas data: Filter kosong, deduplikasi, & uji anomali</span>
                </div>
                <div className={`flex items-center gap-2 ${syncStep >= 4 ? "text-emerald-700" : "text-slate-400"}`}>
                  <Icon name={syncStep >= 4 ? "check" : "radio_button_unchecked"} size={14} />
                  <span>4. Menyimpan data bersih ke Data Warehouse & menyegarkan cache</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              disabled={isSyncing}
              onClick={() => setIsSyncModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSyncing}
              onClick={handleStartManualSync}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-primary/20 disabled:opacity-50 cursor-pointer"
            >
              <Icon name="play_arrow" size={16} />
              <span>{isSyncing ? "Menjalankan..." : "Mulai Tarik Data"}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
