"use client";

import React, { useState } from "react";
import { Hospital, Puskesmas } from "@/types";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";

interface DirectorySectionProps {
  hospitals: Hospital[];
  puskesmasList: Puskesmas[];
}

export function DirectorySection({
  hospitals,
  puskesmasList,
}: DirectorySectionProps) {
  const [activeTab, setActiveTab] = useState<"rs" | "pusk">("rs");

  return (
    <section className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" id="direktori">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Direktori Rumah Sakit &amp; Faskes Rujukan
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Akses langsung nomor darurat IGD, navigasi peta faskes terdekat, dan layanan ambulans gawat darurat di seluruh wilayah Banyumas.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-outline">Tampilkan:</span>
          <button
            onClick={() => setActiveTab("rs")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "rs"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low hover:bg-surface-container-high text-on-surface"
            }`}
          >
            Daftar RS ({hospitals.length})
          </button>
          <button
            onClick={() => setActiveTab("pusk")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "pusk"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low hover:bg-surface-container-high text-on-surface"
            }`}
          >
            Puskesmas Banyumas ({puskesmasList.length})
          </button>
        </div>
      </div>

      {/* Hospital Cards View */}
      {activeTab === "rs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hospitals.map((hospital) => {
            return (
              <Card
                key={hospital.id}
                elevation={1}
                rounded="3xl"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="primary" size="sm">
                      {hospital.typeBadge}
                    </Badge>
                    <span className="text-xs font-bold text-tertiary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-tertiary" />
                      IGD Buka 24 Jam
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-on-surface leading-snug">
                    {hospital.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 mb-4 leading-relaxed">
                    {hospital.address}
                  </p>

                  <div className="space-y-2.5 bg-surface-container-low/50 p-4 rounded-2xl mb-4 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-outline">Hotline IGD Darurat:</span>
                      <a
                        href={`tel:${hospital.emergencyPhone.replace(/\D/g, "")}`}
                        className="text-error font-bold hover:underline"
                      >
                        {hospital.emergencyPhone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline">Sentral Telepon RS:</span>
                      <span className="text-on-surface font-medium">{hospital.phone}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-outline shrink-0">Layanan Unggulan:</span>
                      <span className="text-primary font-medium text-right">
                        {hospital.services.slice(0, 3).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <a
                    href={hospital.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-semibold text-xs py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Icon name="directions" size={18} />
                    <span>Petunjuk Rute</span>
                  </a>
                  <a
                    href={`tel:${hospital.emergencyPhone.replace(/\D/g, "")}`}
                    className="px-3.5 py-2.5 rounded-xl bg-error text-on-error hover:bg-error-container hover:text-on-error-container transition-all flex items-center justify-center shrink-0"
                    title="Panggil IGD Sekarang"
                  >
                    <Icon name="call" size={18} />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Puskesmas Cards View */}
      {activeTab === "pusk" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {puskesmasList.map((pusk) => {
            return (
              <Card
                key={pusk.id}
                elevation={1}
                rounded="2xl"
                className="p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                      Kec. {pusk.kecamatan}
                    </span>
                    <Badge variant={pusk.hasInpatient ? "tertiary" : "neutral"} size="sm">
                      {pusk.hasInpatient ? "Rawat Inap" : "Non-Rawat Inap"}
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-on-surface mt-1">
                    {pusk.name}
                  </h4>
                  <p className="text-xs text-outline mt-1 mb-3">
                    {pusk.address}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${pusk.phone.replace(/\D/g, "")}`}
                    className="text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <Icon name="call" size={16} />
                    <span>{pusk.phone}</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Interactive Map Preview Element */}
      <div className="w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <Icon name="map" size={24} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                Peta Persebaran Faskes Rujukan Terdekat
              </h3>
              <p className="text-xs text-outline">
                Kabupaten Banyumas (Purwokerto &amp; Sekitarnya)
              </p>
            </div>
          </div>
          <span className="text-xs bg-surface-container-low px-3 py-1.5 rounded-full text-on-surface-variant font-medium self-start sm:self-auto">
            Peta Geospasial Dinkes Banyumas
          </span>
        </div>

        {/* Map Canvas with Pin Overlay */}
        <div
          className="relative w-full h-80 rounded-2xl bg-cover bg-center shadow-inner flex items-end p-4 overflow-hidden border border-slate-200"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAL_X09OnPTrDPxgkRF6Mhf721RhGSROloLTgdu7WH2uLpxxSpBMo_1rOgEM4gfyD5V3_VBES3U0YUJ9Jy7ihaTRVJNGZgYG48PWvnnxlJKTBbF7moZUxmYvzlhBaEtxZpGr7u6i5gHRvlDz8uST5ozE_c709kC5Z3NnfXCryxbcgsiVrNW6yHfQCUxE1xQhGrP2buFgMzV2-1c2gs8BWcjokigaeHsev3P6SvBH2uFnlZmXvQns7G9')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Ping Pins */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            <Icon name="location_on" size={16} filled />
            <span>RSUD Margono Soekarjo</span>
          </div>

          <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <Icon name="location_on" size={16} filled />
            <span>RSUD Banyumas</span>
          </div>

          <div className="relative z-10 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-2 border border-white/60">
            <Icon name="pin_drop" size={18} className="text-primary" />
            <span>Titik Faskes Banyumas Siaga: 14 RS &amp; 40 Puskesmas Terhubung</span>
          </div>
        </div>
      </div>

      {/* Emergency Callout Banner: Banyumas Siaga 119 */}
      <div className="w-full bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-lg border border-red-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-error" />

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-md">
            <Icon name="e911_emergency" size={32} filled />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-error-container text-error text-[11px] font-bold uppercase tracking-wider">
                Layanan Bebas Pulsa 24 Jam
              </span>
              <span className="text-outline-variant">•</span>
              <span className="text-xs text-on-surface-variant font-medium">
                Public Safety Center (PSC) Banyumas
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-on-surface leading-tight">
              Butuh Pertolongan Medis Gawat Darurat atau Ambulans Segera?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Hubungi Brigade Sehat PSC 119 Banyumas. Petugas medis terlatih dan armada ambulans siaga di seluruh kecamatan akan segera diberangkatkan ke lokasi Anda.
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
          <a
            href="tel:0281621119"
            className="w-full md:w-auto bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all text-center whitespace-nowrap"
          >
            Hotline (0281) 621119
          </a>
        </div>
      </div>
    </section>
  );
}
