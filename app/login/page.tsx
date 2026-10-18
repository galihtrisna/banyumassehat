"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface RoleOption {
  id: "petugas" | "dinkes" | "admin";
  name: string;
  nip: string;
  role: string;
  unitName: string;
  category: string;
  scope: string;
  icon: string;
  targetPath: string;
  targetLabel: string;
}

const AVAILABLE_ROLES: RoleOption[] = [
  {
    id: "petugas",
    name: "Budi Santoso, S.Kep., Ners",
    nip: "198705122011011003",
    role: "Petugas Pengelola RS",
    unitName: "RSUD Prof. Dr. Margono Soekarjo",
    category: "Faskes Rujukan",
    scope: "Update Kuota Kamar (SIRANAP), Antrean Dokter JKN, dan Bank Darah RS",
    icon: "local_hospital",
    targetPath: "/dashboard",
    targetLabel: "Buka Dashboard RS",
  },
  {
    id: "dinkes",
    name: "dr. Hendro Siswanto, M.Kes",
    nip: "197509122002121004",
    role: "Petugas Dinas Kesehatan",
    unitName: "Dinas Kesehatan Kabupaten Banyumas",
    category: "Pengawas Mutu",
    scope: "Monitoring Agregat Wilayah, Kinerja Layanan, Defisit Obat & Darah",
    icon: "analytics",
    targetPath: "/dashboard",
    targetLabel: "Buka Dashboard Dinkes",
  },
  {
    id: "admin",
    name: "Arya Prabowo, S.Kom",
    nip: "199108142018021001",
    role: "Administrator Sistem (IT)",
    unitName: "Pusat Integrasi Data Dinkes Banyumas",
    category: "Tim Teknis",
    scope: "Pipeline Tarik Data API, Audit Kualitas Data, dan Kredensial Faskes",
    icon: "terminal",
    targetPath: "/admin",
    targetLabel: "Buka Konsol Admin",
  },
];

export default function LoginPage() {
  const router = useRouter();

  // Form input states (langsung terisi rapi & kredibel)
  const [username, setUsername] = useState("198705122011011003");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Authentication & Step states
  const [step, setStep] = useState<"login" | "select_role">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<{
    name: string;
    nip: string;
    role: string;
    unitName: string;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi verifikasi cepat tanpa jeda lambat
    setTimeout(() => {
      setIsLoading(false);
      setStep("select_role");
    }, 400);
  };

  const handleSelectRole = (selectedRole: RoleOption, directNav: boolean = true) => {
    setLoggedUser({
      name: selectedRole.name,
      nip: selectedRole.nip,
      role: selectedRole.role,
      unitName: selectedRole.unitName,
    });
    setIsLoggedIn(true);

    if (directNav) {
      setIsRedirecting(selectedRole.id);
      setTimeout(() => {
        router.push(selectedRole.targetPath);
      }, 350);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
    setStep("login");
    setIsRedirecting(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-5 px-4 sm:px-6 bg-slate-50/60 font-sans">
      {/* Top Header Bar Terpadu Pemkab Banyumas */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-3 pt-1">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/logo.png"
              alt="Logo Priksa"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 leading-tight">
                Priksa
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 uppercase tracking-wider">
                Banyumas
              </span>
            </div>
            <span className="text-xs text-slate-500 block">
              Portal Integrasi Satu Data Fasilitas Kesehatan
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
        >
          <Icon name="arrow_back" size={15} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-2 w-full my-auto">
        {/* VIEW 1: SESI AKTIF (JIKA USER MEMBUKA RINGKASAN SESI) */}
        {isLoggedIn && loggedUser && !isRedirecting ? (
          <Card
            elevation={2}
            rounded="3xl"
            className="p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xl animate-fadeIn"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md">
                  <Icon name="account_circle" size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Sesi Aktif
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{loggedUser.role}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {loggedUser.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {loggedUser.unitName} • ID/NIP: {loggedUser.nip}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("select_role")}
                  iconRight="swap_horiz"
                  className="text-xs"
                >
                  Ganti Peran
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  iconRight="logout"
                  className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                >
                  Keluar
                </Button>
              </div>
            </div>

            {/* Direct Dashboard Link Banners */}
            <div className="mt-5 space-y-3">
              {loggedUser.role !== "Administrator Sistem (IT)" && (
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-primary flex items-center gap-1.5">
                      <Icon name="dashboard" size={18} />
                      Dashboard Kinerja &amp; Kapasitas Faskes
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Pantau tren kunjungan, keterisian tempat tidur, kuota dokter, serta defisit darah &amp; obat.
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Buka Dashboard Analitik</span>
                    <Icon name="arrow_forward" size={16} />
                  </Link>
                </div>
              )}

              {loggedUser.role === "Administrator Sistem (IT)" && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-sky-800 flex items-center gap-1.5">
                      <Icon name="dns" size={18} />
                      Konsol Admin Sistem (Tim Teknis)
                    </span>
                    <p className="text-xs text-sky-700 mt-0.5">
                      Pantau pipeline integrasi data, cek kualitas data faskes, dan kelola kredensial API.
                    </p>
                  </div>
                  <Link
                    href="/admin"
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center justify-center gap-1.5 transition-all shrink-0 font-mono"
                  >
                    <span>Buka Konsol Admin</span>
                    <Icon name="terminal" size={16} />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Management Modules */}
            <div className="mt-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Modul Akses Terotorisasi:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1">
                    <Icon name="hotel" size={16} />
                    <span>Update Kuota Kamar (SIRANAP)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Sinkronisasi status tempat tidur ICU &amp; Rawat Inap secara langsung.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1">
                    <Icon name="calendar_month" size={16} />
                    <span>Kelola Jadwal &amp; Kuota Dokter</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Atur jam praktek poliklinik spesialis dan kuota antrean faskes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs mb-1">
                    <Icon name="bloodtype" size={16} />
                    <span>Laporan Stok Bank Darah (BDRS)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Sinkronkan ketersediaan kantong darah ke SIMDONDAR PMI Banyumas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-1">
                    <Icon name="medication" size={16} />
                    <span>Katalog Stok Obat Esensial</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Pembaruan ketersediaan obat generik &amp; injeksi kritis di farmasi.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Icon name="verified_user" size={15} className="text-emerald-600" />
                Koneksi Aman TLS 1.3 Terenkripsi
              </span>
              <Link href="/" className="text-primary font-semibold hover:underline">
                Kembali ke Beranda Publik →
              </Link>
            </div>
          </Card>
        ) : step === "select_role" ? (
          /* VIEW 2: PILIH PERAN & UNIT KERJA (SELEPAS KLIK MASUK) */
          <Card
            elevation={2}
            rounded="3xl"
            className="p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xl max-w-2xl mx-auto animate-fadeIn"
          >
            {/* Header Informasi Verifikasi */}
            <div className="pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2">
                <Icon name="verified_user" size={14} className="text-emerald-600" />
                <span>Kredensial ASN / Pegawai Terverifikasi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Pilih Hak Akses &amp; Unit Kerja
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Akun NIP <span className="font-mono font-bold text-slate-900">{username || "198705122011011003"}</span> terdaftar pada unit kerja terpadu. Tentukan peran aktif untuk melanjutkan sesi:
              </p>
            </div>

            {/* List 3 Peran Resmi */}
            <div className="mt-4 space-y-3">
              {AVAILABLE_ROLES.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-primary/70 hover:shadow-md transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.id === "admin"
                          ? "bg-sky-100 text-sky-800"
                          : item.id === "dinkes"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">
                          {item.role}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                        {item.unitName}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {item.scope}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      type="button"
                      disabled={isRedirecting !== null}
                      onClick={() => handleSelectRole(item, true)}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        item.id === "admin"
                          ? "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20"
                          : "bg-primary hover:bg-primary-container shadow-primary/20"
                      }`}
                    >
                      {isRedirecting === item.id ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mengarahkan...</span>
                        </>
                      ) : (
                        <>
                          <span>{item.targetLabel}</span>
                          <Icon name="arrow_forward" size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Navigasi */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setStep("login")}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-primary font-semibold transition-colors cursor-pointer"
              >
                <Icon name="arrow_back" size={15} />
                <span>Gunakan Kredensial Lain</span>
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                Layanan Terpadu Single Sign-On Pemkab Banyumas
              </span>
            </div>
          </Card>
        ) : (
          /* VIEW 3: FORM LOGIN AWAL (BERSIH, RESMI & TERISI OTOMATIS) */
          <Card
            elevation={2}
            rounded="3xl"
            className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-xl max-w-md mx-auto"
          >
            {/* Header Brand */}
            <div className="text-center mb-6">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-primary/20">
                <Icon name="lock" size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Portal Masuk Petugas
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Akses pengelolaan data fasilitas kesehatan &amp; sistem Priksa
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username / NIP */}
              <div>
                <label className="text-xs font-bold text-slate-800 mb-1.5 block">
                  Username / NIP:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username atau NIP..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-primary outline-none transition-colors bg-white font-mono"
                  />
                  <Icon
                    name="badge"
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Kata Sandi:
                  </label>
                  <a href="#" className="text-[11px] text-primary hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-primary outline-none transition-colors bg-white"
                  />
                  <Icon
                    name="lock"
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} />
                  </button>
                </div>
              </div>

              {/* Remember checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0"
                  />
                  <span>Ingat sesi masuk di perangkat ini</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-container shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-3"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <Icon name="login" size={18} />
                    <span>Masuk ke Sistem</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Notice Footnote (Resmi & Bersih) */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-1">
              <p className="flex items-center justify-center gap-1.5 font-medium text-slate-600">
                <Icon name="verified_user" size={15} className="text-emerald-600" />
                <span>Koneksi Aman TLS 1.3 Terenkripsi</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Pemerintah Kabupaten Banyumas • Terintegrasi Kemenkes SATUSEHAT
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Standalone Minimal Footer */}
      <div className="text-center text-xs text-slate-400 py-3">
        © 2025 Pemerintah Kabupaten Banyumas • Dinas Kesehatan
      </div>
    </div>
  );
}
