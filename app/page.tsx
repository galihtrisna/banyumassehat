"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HOSPITALS_DATA } from "@/data/hospitals";
import { DOCTORS_DATA } from "@/data/doctors";
import { BLOOD_STOCK_SUMMARY } from "@/data/bloodStock";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    // Smart routing based on keywords
    if (q.includes("kamar") || q.includes("bed") || q.includes("icu") || q.includes("rawat")) {
      router.push(`/kamar?q=${encodeURIComponent(q)}`);
    } else if (q.includes("dokter") || q.includes("poli") || q.includes("sp.")) {
      router.push(`/jadwal-dokter?q=${encodeURIComponent(q)}`);
    } else if (q.includes("obat") || q.includes("insulin") || q.includes("sabu") || q.includes("prb")) {
      router.push(`/info-obat?q=${encodeURIComponent(q)}`);
    } else if (q.includes("darah") || q.includes("pmi") || q.includes("donor") || q.includes("rhesus")) {
      router.push(`/stok-darah?q=${encodeURIComponent(q)}`);
    } else {
      // Default to hospitals directory
      router.push(`/kamar?q=${encodeURIComponent(q)}`);
    }
  };

  const actionCards = [
    {
      title: "Ketersediaan Kamar RS",
      stat: "482 Bed Kosong",
      desc: "Pantau kapasitas ruang rawat inap, ICU, NICU & isolasi di 14 RS rujukan se-Banyumas.",
      icon: "bed",
      badge: "SIRANAP 3.0",
      href: "/kamar",
      accentBg: "bg-primary-fixed",
      accentText: "text-primary",
      btnLabel: "Lihat Kamar Kosong",
    },
    {
      title: "Jadwal & Antrean Dokter",
      stat: "328 Dokter Aktif",
      desc: "Cek jadwal praktek poliklinik hari ini & ambil antrean daring Mobile JKN BPJS.",
      icon: "stethoscope",
      badge: "Mobile JKN BPJS",
      href: "/jadwal-dokter",
      accentBg: "bg-secondary-fixed",
      accentText: "text-secondary",
      btnLabel: "Cek Jadwal & Kuota",
    },
    {
      title: "Stok Obat Esensial",
      stat: "1.482 Jenis Obat",
      desc: "Monitoring obat Program Rujuk Balik (PRB), serum anti-bisa ular & kontak depo 24 jam.",
      icon: "medication",
      badge: "Gudang Farmasi",
      href: "/info-obat",
      accentBg: "bg-tertiary-fixed",
      accentText: "text-tertiary",
      btnLabel: "Cari Stok Obat",
    },
    {
      title: "Pasokan Darah PMI & BDRS",
      stat: "1.240 Kantong",
      desc: "Ketersediaan kantong darah (A, B, O, AB, Rh-) & jadwal bus donor darah minggu ini.",
      icon: "water_drop",
      badge: "UTD PMI Banyumas",
      href: "/stok-darah",
      accentBg: "bg-error-container",
      accentText: "text-error",
      btnLabel: "Pantau Stok Darah",
    },
  ];

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/60 via-cyan-50/30 to-white pt-6 pb-8 sm:pt-12 sm:pb-16 mb-10 sm:mb-12 border border-slate-200/60 shadow-sm">
          {/* Background Network Graphic & Wave */}
          <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-30 sm:opacity-70">
            <Image
              src="/images/hero/hero-bg-network.png"
              alt="Network Background"
              width={1440}
              height={700}
              className="w-full h-full object-cover sm:object-contain object-center"
              priority
            />
          </div>

          {/* Menara Pandang Teratai Purwokerto (Left) */}
          <div className="hidden lg:block absolute left-2 xl:left-6 2xl:left-10 bottom-0 w-[160px] xl:w-[200px] 2xl:w-[230px] pointer-events-none select-none z-10">
            <Image
              src="/images/hero/menara-teratai-clean.png"
              alt="Menara Pandang Teratai Purwokerto"
              width={237}
              height={518}
              className="w-full h-auto drop-shadow-md"
              priority
            />
          </div>

          {/* Hospital & Doctor Cards (Right) */}
          <div className="hidden lg:flex flex-col gap-4 absolute right-4 xl:right-8 2xl:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10">
            {/* Top Card: RSUD Banyumas */}
            <div className="w-[180px] xl:w-[210px] 2xl:w-[230px] transform -rotate-2 drop-shadow-xl transition-transform hover:rotate-0 duration-300">
              <Image
                src="/images/hero/card-rsud-banyumas.png"
                alt="Rumah Sakit Daerah Banyumas"
                width={242}
                height={201}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Bottom Card: Dokter */}
            <div className="w-[140px] xl:w-[160px] 2xl:w-[170px] self-end transform rotate-3 drop-shadow-lg transition-transform hover:rotate-0 duration-300 -mt-2">
              <Image
                src="/images/hero/card-dokter.png"
                alt="Tim Dokter Faskes Banyumas"
                width={177}
                height={125}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Center Content: Headline, Description, Search, Quick Chips */}
          <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center px-4 sm:px-6">
            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface mb-3 sm:mb-4 tracking-tight leading-[1.2] sm:leading-[1.15]">
              Portal Pelayanan Kesehatan Terpadu{" "}
              <span className="text-primary block mt-0.5 sm:mt-1">Kabupaten Banyumas</span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-on-surface-variant max-w-2xl mb-5 sm:mb-8 leading-relaxed px-1">
              Pantau ketersediaan tempat tidur RS, jadwal dokter, stok obat vital, serta persediaan darah dari seluruh faskes jejaring se-Banyumas secara transparan.
            </p>

            {/* Quick Smart Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full bg-white/95 backdrop-blur-sm p-1.5 sm:p-2.5 rounded-2xl sm:rounded-full shadow-xl shadow-cyan-900/5 border border-slate-200/90 mb-4 sm:mb-5"
            >
              <div className="flex flex-col sm:flex-row items-center bg-slate-50/80 rounded-xl sm:rounded-full p-1 gap-2">
                <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 flex-1 w-full">
                  <Icon name="search" size={22} className="text-primary shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari RS, dokter, obat, atau darah..."
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline focus:ring-0"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  iconRight="arrow_forward"
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl sm:rounded-full shrink-0 font-semibold text-xs sm:text-sm"
                >
                  Cari Langsung
                </Button>
              </div>
            </form>

            {/* Quick Search Shortcut Chips (Desktop/Tablet Only) */}
            <div className="w-full max-w-full overflow-hidden hidden sm:block">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center no-scrollbar text-xs">
                <span className="text-slate-500 font-semibold shrink-0">Pintasan Cepat:</span>
                {[
                  { label: "Kamar Rawat Inap", href: "/kamar" },
                  { label: "Jadwal Dokter", href: "/jadwal-dokter" },
                  { label: "Serum Anti Bisa (SABU)", href: "/info-obat" },
                  { label: "Stok Darah PMI", href: "/stok-darah" },
                  { label: "Hotline RS & IGD", href: "/direktori-faskes" },
                ].map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 font-medium shadow-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow shrink-0 whitespace-nowrap"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TASK-ORIENTED ACTION GRID (4 KARTU UTAMA) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                Pilih Layanan Utama
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Akses modul informasi kesehatan secara langsung tanpa hambatan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card) => {
              return (
                <Card
                  key={card.title}
                  elevation={1}
                  rounded="3xl"
                  className="p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl ${card.accentBg} ${card.accentText} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon name={card.icon} size={26} />
                      </div>
                      <Badge variant="neutral" size="sm">
                        {card.badge}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {card.title}
                    </h3>

                    <div className="my-2">
                      <span className="text-2xl font-extrabold text-on-surface block tabular-nums">
                        {card.stat}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                      {card.desc}
                    </p>
                  </div>

                  <Link
                    href={card.href}
                    className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{card.btnLabel}</span>
                    <Icon name="arrow_forward" size={16} />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* LIVE FASKES SNAPSHOT: RINGKASAN DATA HARI INI */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                Ringkasan Cepat Faskes Hari Ini
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Kondisi terkini dari rumah sakit rujukan utama dan jejaring PMI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Snapshot 1: Kapasitas RS Utama */}
            <Card elevation={1} rounded="3xl" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Icon name="apartment" size={18} className="text-primary" />
                  Kapasitas RS Rujukan
                </span>
                <Link
                  href="/kamar"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                >
                  Semua RS <Icon name="chevron_right" size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {HOSPITALS_DATA.slice(0, 3).map((h) => (
                  <div
                    key={h.id}
                    className="p-3 rounded-2xl bg-surface-container-low/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-on-surface block">{h.name}</span>
                      <span className="text-outline">{h.area}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-tertiary tabular-nums block">
                        {h.totalAvailableBeds} Bed Kosong
                      </span>
                      <span className="text-[11px] text-outline">
                        Okupansi {h.occupancyRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Snapshot 2: Dokter Spesialis Hari Ini */}
            <Card elevation={1} rounded="3xl" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Icon name="schedule" size={18} className="text-secondary" />
                  Dokter Praktek Hari Ini
                </span>
                <Link
                  href="/jadwal-dokter"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                >
                  Semua Jadwal <Icon name="chevron_right" size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {DOCTORS_DATA.slice(0, 3).map((d) => (
                  <div
                    key={d.id}
                    className="p-3 rounded-2xl bg-surface-container-low/50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0">
                        <img
                          src={d.photoUrl}
                          alt={d.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-on-surface block truncate max-w-[150px]">
                          {d.name}
                        </span>
                        <span className="text-primary font-medium">{d.specialtyCategory}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-primary block truncate max-w-[130px]">
                        {d.hospitalName
                          .replace("RSUD Prof. Dr. Margono Soekarjo", "RSUD Margono")
                          .replace("RSUD Banyumas", "RSUD Banyumas")
                          .replace("RS Hermina Purwokerto", "RS Hermina")}
                      </span>
                      <span className="text-[11px] text-outline">{d.schedule.split("(")[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Snapshot 3: Stok Darah Real-time */}
            <Card elevation={1} rounded="3xl" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Icon name="water_drop" size={18} className="text-error" />
                  Status Kantong Darah
                </span>
                <Link
                  href="/stok-darah"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                >
                  Detail PMI <Icon name="chevron_right" size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                {BLOOD_STOCK_SUMMARY.slice(0, 3).map((b) => (
                  <div
                    key={b.bloodType}
                    className="p-2.5 rounded-xl bg-surface-container-low/60 border border-slate-100"
                  >
                    <span className="text-xs font-bold text-error block">{b.bloodType}</span>
                    <span className="text-lg font-extrabold text-on-surface tabular-nums">
                      {b.count}
                    </span>
                    <span className="text-[10px] text-outline block">Kantong</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* EMERGENCY 119 BANNER */}
        <div className="w-full bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-lg border border-red-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-error" />

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-md">
              <Icon name="e911_emergency" size={32} filled />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-error-container text-error text-[11px] font-bold uppercase tracking-wider">
                  Bebas Pulsa 24 Jam
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  Brigade Sehat PSC 119 Banyumas
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-on-surface leading-tight">
                Keadaan Gawat Darurat Medis atau Butuh Ambulans?
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                Petugas medis siaga di 27 kecamatan se-Kabupaten Banyumas siap diberangkatkan ke lokasi Anda.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:119"
              className="w-full md:w-auto bg-error hover:bg-error-container hover:text-on-error-container text-on-error font-bold text-sm sm:text-base px-6 py-3 rounded-2xl shadow-xl shadow-error/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Icon name="call" size={20} />
              <span>Telepon 119</span>
            </a>
            <Link
              href="/direktori-faskes"
              className="w-full md:w-auto bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all text-center whitespace-nowrap"
            >
              Cari Faskes Terdekat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
