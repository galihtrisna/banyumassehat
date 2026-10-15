"use client";

import React, { useState, useMemo } from "react";
import { BloodStockItem, BloodLocationStock, BloodDonorEvent } from "@/types";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface BloodStockSectionProps {
  bloodStock: BloodStockItem[];
  locations: BloodLocationStock[];
  donorEvents: BloodDonorEvent[];
}

export function BloodStockSection({
  bloodStock,
  locations,
  donorEvents,
}: BloodStockSectionProps) {
  const [donorModalOpen, setDonorModalOpen] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [bloodFilter, setBloodFilter] = useState<string>("all");

  const totalStock = bloodStock.reduce((acc, curr) => acc + curr.count, 0);

  // Filter faskes berdasarkan golongan darah yang dicari
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (bloodFilter === "all") return true;
      if (!loc.breakdown) return true;
      if (bloodFilter === "a") return (loc.breakdown.a ?? 0) > 0;
      if (bloodFilter === "b") return (loc.breakdown.b ?? 0) > 0;
      if (bloodFilter === "o") return (loc.breakdown.o ?? 0) > 0;
      if (bloodFilter === "ab") return (loc.breakdown.ab ?? 0) > 0;
      if (bloodFilter === "rhNeg") return (loc.breakdown.rhNeg ?? 0) > 0;
      return true;
    });
  }, [locations, bloodFilter]);

  return (
    <section className="py-12 bg-surface-container-low/40 border-y border-slate-100" id="darah">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Pusat Data Stok Darah Real-time
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Informasi ketersediaan whole blood (WB), Packed Red Cell (PRC), trombosit (TC), dan rhesus langka untuk pasien darurat dan persiapan operasi.
            </p>
          </div>

          {/* Total Aggregation Badge */}
          <div className="bg-surface-container-lowest px-5 py-3 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error">
              <Icon name="water_drop" size={24} filled />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-on-surface block leading-tight tabular-nums">
                {totalStock.toLocaleString("id-ID")} Kantong
              </span>
              <span className="text-xs text-outline font-medium">
                Total Stok Aman Hari Ini
              </span>
            </div>
          </div>
        </div>

        {/* Blood Type Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {bloodStock.map((item) => {
            const isRare = item.bloodType.includes("Rh");
            const filterKey = item.bloodType.includes("A+")
              ? "a"
              : item.bloodType.includes("B+")
              ? "b"
              : item.bloodType.includes("O+")
              ? "o"
              : item.bloodType.includes("AB+")
              ? "ab"
              : "rhNeg";
            const isSelected = bloodFilter === filterKey;

            return (
              <Card
                key={item.bloodType}
                elevation={isSelected ? 2 : 1}
                rounded="2xl"
                onClick={() => setBloodFilter(isSelected ? "all" : filterKey)}
                className={`p-5 text-center flex flex-col items-center justify-between cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                  isSelected
                    ? "ring-2 ring-primary border-primary bg-primary-fixed/20 shadow-md"
                    : "hover:shadow-md"
                }`}
                role="button"
                tabIndex={0}
                title={`Klik untuk mencari faskes dengan stok ${item.bloodType}`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center transition-transform ${
                    isSelected ? "scale-110" : ""
                  } ${
                    isRare
                      ? "bg-surface-container-high text-primary"
                      : "bg-error-container/50 text-error"
                  }`}
                >
                  <span
                    className={
                      item.bloodType.includes("Rh")
                        ? "text-xs font-extrabold tracking-tight"
                        : "text-lg font-bold"
                    }
                  >
                    {item.bloodType}
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold block leading-tight tabular-nums text-on-surface">
                    {item.count}
                  </span>
                  <span className="text-xs text-on-surface-variant block font-medium mt-1">
                    {item.subtitle}
                  </span>
                </div>
                {isSelected && (
                  <span className="mt-2 text-[10px] font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded-full border border-primary/30">
                    Dipilih
                  </span>
                )}
              </Card>
            );
          })}
        </div>

        {/* Bank Darah Faskes Data Table (Sesuai Gaya Halaman Info Obat) */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden mb-8">
          {/* Table Header & Blood Filter Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                Distribusi Penyimpanan Bank Darah Faskes
              </h3>
              <p className="text-xs sm:text-sm text-outline mt-0.5">
                {bloodFilter === "all"
                  ? "Rincian ketersediaan kantong darah di UTD PMI & Bank Darah Rumah Sakit (BDRS) se-Banyumas"
                  : `Menampilkan faskes dengan ketersediaan stok ${
                      bloodFilter === "a"
                        ? "Golongan A"
                        : bloodFilter === "b"
                        ? "Golongan B"
                        : bloodFilter === "o"
                        ? "Golongan O"
                        : bloodFilter === "ab"
                        ? "Golongan AB"
                        : "Rhesus Negatif Rh(-)"
                    }`}
              </p>
            </div>

            {/* Filter Dropdown */}
            <div className="bg-surface-container-low px-3.5 py-2 rounded-xl border border-slate-200/80 flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <Icon name="search" size={18} className="text-error shrink-0" />
              <select
                value={bloodFilter}
                onChange={(e) => setBloodFilter(e.target.value)}
                className="bg-transparent border-none text-xs sm:text-sm font-semibold text-on-surface outline-none cursor-pointer"
              >
                <option value="all">Semua Golongan Darah</option>
                <option value="a">Cari Golongan A</option>
                <option value="b">Cari Golongan B</option>
                <option value="o">Cari Golongan O</option>
                <option value="ab">Cari Golongan AB</option>
                <option value="rhNeg">Cari Rhesus Negatif Rh(-)</option>
              </select>
              {bloodFilter !== "all" && (
                <button
                  type="button"
                  onClick={() => setBloodFilter("all")}
                  className="text-xs font-bold text-error hover:underline ml-1"
                  title="Tampilkan semua faskes"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/60 text-outline uppercase text-xs font-bold border-b border-slate-200/80">
                  <th className="py-4 px-6 min-w-[220px]">Nama Faskes / Bank Darah</th>
                  <th
                    className={`py-4 px-4 text-center ${
                      bloodFilter === "a"
                        ? "text-error bg-error-container/40"
                        : ""
                    }`}
                  >
                    Gol. A
                  </th>
                  <th
                    className={`py-4 px-4 text-center ${
                      bloodFilter === "b"
                        ? "text-error bg-error-container/40"
                        : ""
                    }`}
                  >
                    Gol. B
                  </th>
                  <th
                    className={`py-4 px-4 text-center ${
                      bloodFilter === "o"
                        ? "text-error bg-error-container/40"
                        : ""
                    }`}
                  >
                    Gol. O
                  </th>
                  <th
                    className={`py-4 px-4 text-center ${
                      bloodFilter === "ab"
                        ? "text-primary bg-primary-fixed/40"
                        : ""
                    }`}
                  >
                    Gol. AB
                  </th>
                  <th
                    className={`py-4 px-4 text-center ${
                      bloodFilter === "rhNeg"
                        ? "text-error bg-error-container/40"
                        : ""
                    }`}
                  >
                    Rh (-)
                  </th>
                  <th className="py-4 px-5 text-center">Total Stok</th>
                  <th className="py-4 px-6 text-right">Kontak Layanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-on-surface">
                {filteredLocations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-outline">
                      <Icon
                        name="search_off"
                        size={40}
                        className="mx-auto mb-2 text-outline"
                      />
                      <p className="font-semibold text-on-surface">
                        Stok Darah Tidak Ditemukan
                      </p>
                      <p className="text-xs text-outline mt-1">
                        Tidak ada faskes yang memiliki stok golongan darah yang dipilih.
                      </p>
                      <button
                        onClick={() => setBloodFilter("all")}
                        className="mt-3 text-xs font-bold text-primary hover:underline"
                      >
                        Tampilkan Semua Faskes
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredLocations.map((loc) => {
                    return (
                      <tr
                        key={loc.id}
                        className="hover:bg-surface-container-low/40 transition-colors"
                      >
                        {/* Name & Address */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-error-container/40 text-error flex items-center justify-center shrink-0">
                              <Icon
                                name={
                                  loc.id === "utd-pmi"
                                    ? "bloodtype"
                                    : "local_hospital"
                                }
                                size={22}
                              />
                            </div>
                            <div>
                              <span className="font-bold text-on-surface block text-sm sm:text-base leading-snug">
                                {loc.name}
                              </span>
                              <span className="text-xs text-outline">
                                {loc.address}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Gol. A */}
                        <td
                          className={`py-4 px-4 text-center font-extrabold tabular-nums text-sm ${
                            bloodFilter === "a"
                              ? "bg-error-container/20 text-error font-black"
                              : "text-on-surface"
                          }`}
                        >
                          {loc.breakdown?.a ?? "-"}{" "}
                          <span className="text-[11px] text-outline font-normal">
                            kntg
                          </span>
                        </td>

                        {/* Gol. B */}
                        <td
                          className={`py-4 px-4 text-center font-extrabold tabular-nums text-sm ${
                            bloodFilter === "b"
                              ? "bg-error-container/20 text-error font-black"
                              : "text-on-surface"
                          }`}
                        >
                          {loc.breakdown?.b ?? "-"}{" "}
                          <span className="text-[11px] text-outline font-normal">
                            kntg
                          </span>
                        </td>

                        {/* Gol. O */}
                        <td
                          className={`py-4 px-4 text-center font-extrabold tabular-nums text-sm ${
                            bloodFilter === "o"
                              ? "bg-error-container/20 text-error font-black"
                              : "text-on-surface"
                          }`}
                        >
                          {loc.breakdown?.o ?? "-"}{" "}
                          <span className="text-[11px] text-outline font-normal">
                            kntg
                          </span>
                        </td>

                        {/* Gol. AB */}
                        <td
                          className={`py-4 px-4 text-center font-extrabold tabular-nums text-sm ${
                            bloodFilter === "ab"
                              ? "bg-primary-fixed/20 text-primary font-black"
                              : "text-on-surface"
                          }`}
                        >
                          {loc.breakdown?.ab ?? "-"}{" "}
                          <span className="text-[11px] text-outline font-normal">
                            kntg
                          </span>
                        </td>

                        {/* Rh (-) */}
                        <td
                          className={`py-4 px-4 text-center font-extrabold tabular-nums text-sm ${
                            bloodFilter === "rhNeg"
                              ? "bg-error-container/20 text-error font-black"
                              : "text-error"
                          }`}
                        >
                          {loc.breakdown?.rhNeg ?? "-"}{" "}
                          <span className="text-[11px] text-outline font-normal">
                            kntg
                          </span>
                        </td>

                        {/* Total Stok */}
                        <td className="py-4 px-5 text-center tabular-nums">
                          <span className="inline-block px-3 py-1 rounded-xl bg-primary-fixed/30 text-primary text-xs font-extrabold">
                            {loc.stockCount} kntg
                          </span>
                        </td>

                        {/* Kontak */}
                        <td className="py-4 px-6 text-right">
                          <a
                            href={`tel:${
                              loc.id === "utd-pmi" ? "02816844514" : "119"
                            }`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
                          >
                            <Icon name="call" size={15} />
                            <span>
                              {loc.id === "utd-pmi"
                                ? "(0281) 6844514"
                                : "IGD 24 Jam"}
                            </span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Jadwal Mobil Unit Donor Darah (Full Banner Responsif) */}
        <div className="bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-6 sm:p-8 rounded-3xl shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-ping" />
                <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider">
                  Jadwal Mobil Unit Donor Darah
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-on-primary">
                Aksi Donor Darah Banyumas Minggu Ini
              </h3>
              <p className="text-xs sm:text-sm text-on-primary-container mt-1 max-w-2xl leading-relaxed">
                Setetes darah Anda menyelamatkan nyawa saudara kita di rumah sakit Banyumas.
                Kunjungi lokasi mobile unit PMI terdekat atau kantor UTD PMI Sokaraja.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setDonorModalOpen(true);
                  setRegisteredSuccess(false);
                }}
                className="bg-surface-container-lowest text-primary hover:bg-surface-container-high text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Daftar Donor Darah Mandiri
              </button>
              <a
                href="tel:02816844514"
                className="px-4 py-3 rounded-xl bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 text-on-primary flex items-center justify-center transition-all"
                title="Hubungi UTD PMI Banyumas"
              >
                <Icon name="call" size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {donorEvents.map((evt) => {
              return (
                <div
                  key={evt.id}
                  className="bg-surface-container-lowest/15 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-primary-fixed font-bold mb-1.5">
                      <span>{evt.date}</span>
                      <span>{evt.time}</span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-on-primary block mb-1">
                      {evt.location}
                    </span>
                    <span className="text-xs text-on-primary-container">
                      {evt.unit} {evt.notes ? `• ${evt.notes}` : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Donor Registration Modal */}
      {donorModalOpen && (
        <Modal
          isOpen={donorModalOpen}
          onClose={() => setDonorModalOpen(false)}
          title="Pendaftaran Donor Darah Mandiri"
          subtitle="UTD PMI Kabupaten Banyumas • Siaga Kemanusiaan"
          maxWidth="md"
        >
          {registeredSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Icon name="check_circle" size={36} filled />
              </div>
              <h4 className="text-xl font-bold text-on-surface">
                Pendaftaran Berhasil!
              </h4>
              <p className="text-sm text-on-surface-variant mt-2">
                Terima kasih telah bersedia mendonorkan darah. Silakan tunjukkan QR Code / bukti registrasi ini ke petugas mobile unit donor PMI Banyumas.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => setDonorModalOpen(false)}
                className="mt-6"
              >
                Tutup
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Nama Pendonor:
                </label>
                <input
                  type="text"
                  placeholder="Nama sesuai KTP"
                  defaultValue="Warga Peduli Banyumas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Golongan Darah:
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary outline-none bg-white">
                  <option>Golongan Darah A</option>
                  <option>Golongan Darah B</option>
                  <option>Golongan Darah O</option>
                  <option>Golongan Darah AB</option>
                  <option>Rhesus Negatif</option>
                  <option>Belum Tahu (Cek di Lokasi)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Pilih Lokasi Aksi:
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary outline-none bg-white">
                  <option>Alun-Alun Purwokerto (Kamis, 15 Mei)</option>
                  <option>Rita SuperMall GF (Sabtu, 17 Mei)</option>
                  <option>CFD GOR Satria (Minggu, 18 Mei)</option>
                  <option>Langsung di Kantor UTD PMI Sokaraja (24 Jam)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setDonorModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setRegisteredSuccess(true)}
                  iconRight="check"
                >
                  Kirim Pendaftaran
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}
