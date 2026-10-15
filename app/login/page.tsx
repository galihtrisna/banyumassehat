"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("198705122011011003");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Authentication states
  const [isLoading, setIsLoading] = useState(false);
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

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);

      const isAdmin =
        username.toLowerCase().includes("admin") ||
        username.toLowerCase().includes("teknis");
      const isDinkes = username.toLowerCase().includes("dinkes");

      if (isAdmin) {
        setLoggedUser({
          name: "Arya Prabowo, S.Kom",
          nip: username || "199108142018021001",
          role: "Admin Sistem (Tim Teknis)",
          unitName: "Pusat Integrasi Data Dinkes Banyumas",
        });
      } else if (isDinkes) {
        setLoggedUser({
          name: "dr. Hendro Siswanto, M.Kes",
          nip: username || "197509122002121004",
          role: "Petugas Dinas Kesehatan",
          unitName: "Dinas Kesehatan Kabupaten Banyumas",
        });
      } else {
        setLoggedUser({
          name: "Budi Santoso, S.Kep., Ners",
          nip: username || "198705122011011003",
          role: "Petugas Pengelola RS",
          unitName: "RSUD Prof. Dr. Margono Soekarjo",
        });
      }
    }, 600);
  };

  const handleQuickDemo = (type: "petugas" | "dinkes" | "admin") => {
    if (type === "petugas") {
      setUsername("198705122011011003");
      setPassword("password123");
    } else if (type === "dinkes") {
      setUsername("petugas.dinkes");
      setPassword("banyumas2025");
    } else {
      setUsername("admin.teknis");
      setPassword("adminpass2025");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Header Bar for Standalone Login */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between pb-4 pt-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform">
            <Icon name="local_hospital" filled size={20} />
          </div>
          <div>
            <span className="font-extrabold text-base text-primary block leading-tight">
              Banyumas Sehat
            </span>
            <span className="text-[10px] text-outline block">
              Portal Integrasi Faskes Banyumas
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <Icon name="arrow_back" size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="max-w-xl mx-auto px-2 w-full my-auto">
        {/* If Already Logged In: Show Management Dashboard Preview */}
        {isLoggedIn && loggedUser ? (
          <Card
            elevation={2}
            rounded="3xl"
            className="p-6 sm:p-8 bg-surface-container-lowest border border-slate-200/80 shadow-xl animate-fadeIn"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md">
                  <Icon name="account_circle" size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Sesi Aktif
                    </span>
                    <span className="text-xs text-outline">{loggedUser.role}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mt-1">
                    {loggedUser.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-medium">
                    {loggedUser.unitName} • ID/NIP: {loggedUser.nip}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                iconRight="logout"
                className="self-start sm:self-auto text-xs"
              >
                Keluar Sesi
              </Button>
            </div>

            {/* Direct Dashboard Link Banners based on Role */}
            <div className="mt-5 space-y-3">
              {loggedUser.role !== "Admin Sistem (Tim Teknis)" && (
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-primary flex items-center gap-1.5">
                      <Icon name="dashboard" size={18} />
                      Dashboard Kinerja &amp; Kapasitas Faskes
                    </span>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Lihat grafik tren kunjungan, BOR tempat tidur, beban dokter, serta defisit obat &amp; darah.
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Buka Dashboard Analitik</span>
                    <Icon name="arrow_forward" size={16} />
                  </Link>
                </div>
              )}

              {loggedUser.role === "Admin Sistem (Tim Teknis)" && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-sky-800 flex items-center gap-1.5">
                      <Icon name="dns" size={18} />
                      Konsol Admin Sistem (Tim Teknis)
                    </span>
                    <p className="text-xs text-sky-700 mt-0.5">
                      Pantau pipeline tarik data, cek kualitas data, dan kelola akun/kredensial API faskes.
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
            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-outline block mb-3">
                Modul Akses Terotorisasi:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/70 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-sm mb-1">
                    <Icon name="hotel" size={18} />
                    <span>Update Kuota Kamar (SIRANAP)</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Sinkronkan status tempat tidur ICU, Isolasi, dan Rawat Inap secara langsung ke sistem SIRANAP.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/70 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2.5 text-secondary font-bold text-sm mb-1">
                    <Icon name="calendar_month" size={18} />
                    <span>Kelola Jadwal & Kuota Dokter</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Atur jam praktek poliklinik spesialis dan kuota pendaftaran antrean faskes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/70 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2.5 text-error font-bold text-sm mb-1">
                    <Icon name="bloodtype" size={18} />
                    <span>Laporan Stok Bank Darah (BDRS)</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Kirim pembaruan stok kantong darah ke server pusat SIMDONDAR PMI Banyumas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-slate-200/70 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2.5 text-tertiary font-bold text-sm mb-1">
                    <Icon name="medication" size={18} />
                    <span>Katalog Stok Obat Esensial</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Pembaruan ketersediaan obat generik & injeksi kritis di instalasi farmasi.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-outline">
              <span className="flex items-center gap-1.5">
                <Icon name="verified_user" size={16} className="text-emerald-600" />
                Koneksi Aman TLS 1.3 Terenkripsi
              </span>
              <Link href="/" className="text-primary font-semibold hover:underline">
                Kembali ke Beranda Publik →
              </Link>
            </div>
          </Card>
        ) : (
          /* Simplified Login Box */
          <Card
            elevation={2}
            rounded="3xl"
            className="p-6 sm:p-8 bg-surface-container-lowest border border-slate-200/80 shadow-xl max-w-md mx-auto"
          >
            {/* Header Brand */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary mx-auto mb-3 shadow-md shadow-primary/20">
                <Icon name="lock" size={30} />
              </div>
              <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">
                Portal Masuk Petugas
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Akses pengelolaan data fasilitas kesehatan &amp; sistem Banyumas Sehat
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username / NIP */}
              <div>
                <label className="text-xs font-bold text-on-surface mb-1.5 block">
                  Username / NIP:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username atau NIP..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-on-surface focus:border-primary outline-none transition-colors"
                  />
                  <Icon
                    name="badge"
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-on-surface">
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
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-on-surface focus:border-primary outline-none transition-colors"
                  />
                  <Icon
                    name="lock"
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} />
                  </button>
                </div>
              </div>

              {/* Remember checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer select-none">
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
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-container shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-4"
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

            {/* Quick Demo Pre-filled Credentials */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider block mb-2.5 text-center">
                Akses Cepat Pengujian (Demo):
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("petugas")}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-xs font-semibold text-primary border border-slate-200 transition-colors"
                >
                  Akun Petugas RS
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("dinkes")}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-xs font-semibold text-secondary border border-slate-200 transition-colors"
                >
                  Akun Petugas Dinkes
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("admin")}
                  className="px-3 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-xs font-semibold text-sky-300 border border-sky-800 transition-colors font-mono"
                >
                  Akun Admin Teknis
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center text-xs text-outline">
              <p>
                Sistem Terpadu Pemerintah Kabupaten Banyumas • Terintegrasi SATUSEHAT Kemenkes RI
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Standalone Minimal Footer */}
      <div className="text-center text-xs text-outline py-4">
        © 2025 Pemerintah Kabupaten Banyumas • Dinas Kesehatan
      </div>
    </div>
  );
}
