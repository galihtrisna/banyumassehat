"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global filters in dashboard header
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "7d" | "30d" | "month">("today");

  // Download Report Modal States
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState<"pdf" | "xlsx" | "csv">("pdf");
  const [includeSections, setIncludeSections] = useState({
    visits: true,
    occupancy: true,
    doctors: true,
    medicines: true,
    blood: true,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const hospitalLabels: Record<string, string> = {
    all: "Semua Faskes (Konsolidasi Pemkab Banyumas)",
    margono: "RSUD Prof. Dr. Margono Soekarjo",
    banyumas: "RSUD Banyumas",
    hermina: "RS Hermina Purwokerto",
    wijayakusuma: "RS Wijayakusuma (DKT)",
    islam: "RS Islam Purwokerto",
    siaga: "RSU Siaga Medika Banyumas",
  };

  const navMenuItems = [
    {
      group: "Monitoring Operasional",
      items: [
        {
          label: "Ringkasan Eksekutif",
          href: "/dashboard",
          icon: "dashboard",
          exact: true,
        },
        {
          label: "Jam Ramai Kunjungan",
          href: "/dashboard/kunjungan",
          icon: "schedule",
        },
        {
          label: "Okupansi Kamar (BOR)",
          href: "/dashboard/okupansi",
          icon: "hotel",
        },
        {
          label: "Rasio Beban Dokter",
          href: "/dashboard/dokter",
          icon: "badge",
        },
      ],
    },
    {
      group: "Logistik & Rantai Pasok",
      items: [
        {
          label: "Logistik Obat & Darah",
          href: "/dashboard/logistik",
          icon: "medication",
        },
      ],
    },
  ];

  // Handle simulated report download
  const handleStartDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloadModalOpen(false);
      setDownloadSuccessToast(true);
      setTimeout(() => setDownloadSuccessToast(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-slate-50/70 text-on-surface">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Icon name="check_circle" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Laporan Berhasil Diunduh!</p>
            <p className="text-xs text-slate-300">
              Format: {reportFormat.toUpperCase()} • {hospitalLabels[selectedHospital]}
            </p>
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

      {/* DEDICATED MANAGEMENT SIDEBAR */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-slate-200/90 flex flex-col justify-between shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform">
                <Icon name="local_hospital" filled size={22} />
              </div>
              <div>
                <span className="font-extrabold text-base text-primary block leading-tight tracking-tight">
                  Priksa
                </span>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
                  Panel Pengelola Faskes
                </span>
              </div>
            </Link>

            {/* Close button for mobile */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-outline hover:bg-slate-100"
              aria-label="Tutup menu navigasi"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <div className="mt-4 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
            <span className="text-[11px] font-bold text-primary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sesi Operator Aktif
            </span>
            <span className="text-[10px] text-outline font-mono">SIMRS v3.2</span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navMenuItems.map((group) => (
            <div key={group.group}>
              <span className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-outline block mb-2">
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

          {/* Group: Pelaporan & Navigasi Eksternal */}
          <div>
            <span className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-outline block mb-2">
              Laporan &amp; Publik
            </span>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors text-left cursor-pointer"
              >
                <Icon name="download" size={18} />
                <span>Unduh Laporan Eksekutif</span>
              </button>

              <Link
                href="/kamar"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Icon name="open_in_new" size={18} />
                <span>Data Kamar Publik</span>
              </Link>

              <Link
                href="/"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
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
                <Icon name="person" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">
                  Budi Santoso, S.Kep.
                </p>
                <p className="text-[11px] text-outline truncate">
                  Operator RSUD Margono
                </p>
              </div>
            </div>

            <Link
              href="/login"
              className="p-2 rounded-xl text-outline hover:text-error hover:bg-red-50 transition-colors shrink-0"
              title="Keluar Sesi"
            >
              <Icon name="logout" size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Workspace Bar */}
        <header className="sticky top-0 z-30 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
                aria-label="Buka menu navigasi sidebar"
              >
                <Icon name="menu" size={24} />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-on-surface tracking-tight flex items-center gap-2">
                  <span>Dashboard Kinerja &amp; Kapasitas Faskes</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SIMRS &amp; SATUSEHAT Terhubung
                  </span>
                </h1>
                <p className="text-[11px] text-on-surface-variant hidden md:block">
                  Sistem Informasi Pemantauan Operasional Faskes &amp; Logistik Se-Kabupaten Banyumas.
                </p>
              </div>
            </div>

            {/* Right: Hospital Filter & Unduh Laporan CTA */}
            <div className="flex items-center gap-2.5">
              {/* Hospital Selector */}
              <div className="relative hidden md:block w-64 lg:w-72">
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-on-surface bg-surface-container-low focus:border-primary outline-none appearance-none"
                >
                  <option value="all">Semua Faskes (Konsolidasi Pemkab)</option>
                  <option value="margono">RSUD Prof. Dr. Margono Soekarjo</option>
                  <option value="banyumas">RSUD Banyumas</option>
                  <option value="hermina">RS Hermina Purwokerto</option>
                  <option value="wijayakusuma">RS Wijayakusuma (DKT)</option>
                  <option value="islam">RS Islam Purwokerto</option>
                  <option value="siaga">RSU Siaga Medika Banyumas</option>
                </select>
                <Icon
                  name="expand_more"
                  size={16}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
                />
              </div>

              {/* Unduh Laporan Button */}
              <Button
                variant="primary"
                onClick={() => setIsDownloadModalOpen(true)}
                iconLeft="download"
                className="shadow-sm text-xs py-2 px-3.5"
              >
                <span className="hidden sm:inline">Unduh Laporan</span>
                <span className="sm:hidden">Unduh</span>
              </Button>
            </div>
          </div>

          {/* Sub bar on mobile for hospital selector & period filter */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {/* Hospital selector on mobile */}
            <div className="relative md:hidden w-full">
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-on-surface bg-surface-container-low focus:border-primary outline-none appearance-none"
              >
                <option value="all">Semua Faskes (Konsolidasi Pemkab)</option>
                <option value="margono">RSUD Prof. Dr. Margono Soekarjo</option>
                <option value="banyumas">RSUD Banyumas</option>
                <option value="hermina">RS Hermina Purwokerto</option>
                <option value="wijayakusuma">RS Wijayakusuma (DKT)</option>
                <option value="islam">RS Islam Purwokerto</option>
                <option value="siaga">RSU Siaga Medika Banyumas</option>
              </select>
              <Icon
                name="expand_more"
                size={16}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
            </div>

            {/* Time Period Filter Pills */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-slate-200/80">
              {(
                [
                  { id: "today", label: "Hari Ini" },
                  { id: "7d", label: "7 Hari" },
                  { id: "30d", label: "30 Hari" },
                  { id: "month", label: "Bulan Ini" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeriod(p.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedPeriod === p.id
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-outline hidden sm:block">
              Pembaruan Data Otomatis: Tiap 5 Menit
            </div>
          </div>
        </header>

        {/* Sub-page Specific Content Slot */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {children}

          {/* Minimalist Dashboard Workspace Footer */}
          <footer className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-outline">
            <p>© 2025 Pemerintah Kabupaten Banyumas • Sistem Informasi Manajemen Terpadu Pelayanan Kesehatan</p>
            <div className="flex items-center gap-4">
              <span>Status Server: Online 99.98%</span>
              <span>•</span>
              <span>TLS 1.3 Terenkripsi</span>
            </div>
          </footer>
        </main>
      </div>

      {/* MODAL UNDUH LAPORAN EKSEKUTIF */}
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        title="Unduh Laporan Eksekutif Faskes"
        subtitle="Ekspor ringkasan analisis operasional, tren okupansi, rasio dokter, dan logistik ke dalam berkas resmi."
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Format Pilihan */}
          <div>
            <label className="text-xs font-bold text-on-surface block mb-2.5">
              Pilih Format Berkas:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "pdf",
                  title: "Dokumen PDF",
                  desc: "Ringkasan Eksekutif Lengkap dengan Visual Grafik",
                  icon: "picture_as_pdf",
                },
                {
                  id: "xlsx",
                  title: "Excel (.XLSX)",
                  desc: "Data Mentah Multi-Sheet Siap Analisis Lanjutan",
                  icon: "table_view",
                },
                {
                  id: "csv",
                  title: "Berkas CSV",
                  desc: "Format Data Standar Terintegrasi SATUSEHAT",
                  icon: "data_object",
                },
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setReportFormat(fmt.id as "pdf" | "xlsx" | "csv")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    reportFormat === fmt.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-surface-container-low/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      name={fmt.icon}
                      size={20}
                      className={reportFormat === fmt.id ? "text-primary" : "text-outline"}
                    />
                    <span className="font-bold text-xs sm:text-sm text-on-surface">
                      {fmt.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-tight">
                    {fmt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cakupan Data Laporan */}
          <div>
            <label className="text-xs font-bold text-on-surface block mb-2">
              Sertakan Bagian Analisis:
            </label>
            <div className="space-y-2 bg-surface-container-low/50 p-4 rounded-2xl border border-slate-200/80">
              {[
                { key: "visits", label: "Grafik Jam Ramai Kunjungan (Rawat Jalan, Rawat Inap, IGD)" },
                { key: "occupancy", label: "Grafik Tren Okupansi BOR & Kapasitas per Kelas Kamar" },
                { key: "doctors", label: "Analisis Rasio Beban Kerja Dokter Praktik vs Pasien" },
                { key: "medicines", label: "Daftar Obat Sering Habis & Indikator Buffer Stok" },
                { key: "blood", label: "Daftar Golongan Darah Defisit & Kebutuhan Darurat BDRS" },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2.5 text-xs text-on-surface cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={includeSections[item.key as keyof typeof includeSections]}
                    onChange={(e) =>
                      setIncludeSections({
                        ...includeSections,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-0"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsDownloadModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleStartDownload}
              disabled={isDownloading}
              iconLeft={isDownloading ? undefined : "download"}
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menyiapkan Berkas...</span>
                </div>
              ) : (
                `Unduh Berkas ${reportFormat.toUpperCase()}`
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
