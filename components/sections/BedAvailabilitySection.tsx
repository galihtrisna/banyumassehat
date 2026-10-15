"use client";

import React, { useState, useMemo } from "react";
import { Hospital } from "@/types";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface BedAvailabilitySectionProps {
  hospitals: Hospital[];
  searchQuery?: string;
}

export function BedAvailabilitySection({
  hospitals,
  searchQuery = "",
}: BedAvailabilitySectionProps) {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("all");
  const [selectedRoomClass, setSelectedRoomClass] = useState<string>("all");
  const [activeModalHospital, setActiveModalHospital] = useState<Hospital | null>(null);

  // Filter logic
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      // By hospital dropdown
      if (selectedHospitalId !== "all" && hospital.id !== selectedHospitalId) {
        return false;
      }
      // By search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = hospital.name.toLowerCase().includes(query);
        const matchesArea = hospital.area.toLowerCase().includes(query);
        const matchesService = hospital.services.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesRoom = hospital.rooms.some((r) =>
          r.label.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesArea && !matchesService && !matchesRoom) {
          return false;
        }
      }
      // By room class filter
      if (selectedRoomClass !== "all") {
        const hasRoomType = hospital.rooms.some((r) => {
          if (selectedRoomClass === "icu") return r.id.includes("icu") || r.id.includes("picu") || r.id.includes("nicu");
          if (selectedRoomClass === "isolasi") return r.id.includes("isolasi");
          if (selectedRoomClass === "k3") return r.id.includes("k3");
          if (selectedRoomClass === "k2") return r.id.includes("k2");
          if (selectedRoomClass === "k1_vip") return r.id.includes("k1") || r.id.includes("vip");
          return true;
        });
        if (!hasRoomType) return false;
      }
      return true;
    });
  }, [hospitals, selectedHospitalId, selectedRoomClass, searchQuery]);

  return (
    <section className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" id="kamar">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Data Ketersediaan Tempat Tidur Rumah Sakit
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Informasi kapasitas ruang intensif dan rawat inap diperbarui langsung oleh
            operator SIMRS masing-masing faskes rujukan di Banyumas.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Select Hospital */}
          <div className="bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
            <Icon name="local_hospital" size={18} className="text-primary" />
            <select
              value={selectedHospitalId}
              onChange={(e) => setSelectedHospitalId(e.target.value)}
              className="bg-transparent border-none text-on-surface text-xs sm:text-sm font-medium outline-none cursor-pointer"
            >
              <option value="all">Semua Rumah Sakit ({hospitals.length} RS)</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Room Class */}
          <div className="bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
            <Icon name="hotel" size={18} className="text-primary" />
            <select
              value={selectedRoomClass}
              onChange={(e) => setSelectedRoomClass(e.target.value)}
              className="bg-transparent border-none text-on-surface text-xs sm:text-sm font-medium outline-none cursor-pointer"
            >
              <option value="all">Semua Kelas Kamar</option>
              <option value="icu">ICU / ICCU / NICU / PICU</option>
              <option value="isolasi">Isolasi Tekanan Negatif</option>
              <option value="k3">Kelas 3 (BPJS PBI &amp; Non-PBI)</option>
              <option value="k2">Kelas 2</option>
              <option value="k1_vip">Kelas 1 &amp; VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hospital Bed Cards Grid */}
      {filteredHospitals.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 text-center rounded-3xl border border-dashed border-slate-300">
          <Icon name="search_off" size={48} className="text-outline mx-auto mb-2" />
          <h3 className="text-lg font-bold text-on-surface">Data Tidak Ditemukan</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Tidak ada rumah sakit yang cocok dengan filter atau kata kunci yang dipilih.
          </p>
          <Button
            variant="surface"
            size="sm"
            onClick={() => {
              setSelectedHospitalId("all");
              setSelectedRoomClass("all");
            }}
            className="mt-4"
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => {
            return (
              <Card
                key={hospital.id}
                elevation={1}
                rounded="3xl"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div>
                      <Badge variant="primary" size="sm">
                        {hospital.typeBadge}
                      </Badge>
                      <h3 className="text-lg font-bold text-on-surface mt-2 leading-snug">
                        {hospital.name}
                      </h3>
                      <p className="text-xs text-outline mt-0.5">
                        {hospital.area} • {hospital.phone}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-3xl font-extrabold text-tertiary block leading-none tabular-nums">
                        {hospital.totalAvailableBeds}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        Bed Kosong
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar Indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-medium">
                      <span>Okupansi Ruang Rawat</span>
                      <span className="font-bold text-on-surface tabular-nums">
                        {hospital.occupancyRate}% Terisi
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-low overflow-hidden flex">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          hospital.occupancyRate > 85
                            ? "bg-error"
                            : hospital.occupancyRate > 70
                            ? "bg-primary"
                            : "bg-tertiary"
                        }`}
                        style={{ width: `${hospital.occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Detail Room Breakdown */}
                  <div className="space-y-2 bg-surface-container-low/50 p-4 rounded-2xl mb-4 border border-slate-100">
                    {hospital.rooms.slice(0, 5).map((room) => {
                      const isFull = room.available === 0 || room.status === "full";
                      return (
                        <div
                          key={room.id}
                          className="flex items-center justify-between text-xs font-medium"
                        >
                          <span className="text-on-surface-variant flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isFull
                                  ? "bg-error"
                                  : room.available < 5
                                  ? "bg-amber-500"
                                  : "bg-tertiary"
                              }`}
                            />
                            {room.label}
                          </span>
                          <span
                            className={`font-bold tabular-nums ${
                              isFull ? "text-error" : "text-on-surface"
                            }`}
                          >
                            {isFull ? "Penuh (0)" : `${room.available} Tersedia`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <a
                    href={`tel:${hospital.emergencyPhone.replace(/\D/g, "")}`}
                    className="text-xs font-bold text-error hover:underline flex items-center gap-1"
                  >
                    <Icon name="phone" size={16} />
                    <span>IGD: {hospital.emergencyPhone}</span>
                  </a>

                  <Button
                    variant="surface"
                    size="sm"
                    iconRight="chevron_right"
                    onClick={() => setActiveModalHospital(hospital)}
                  >
                    Detail Kamar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail Kamar Modal */}
      {activeModalHospital && (
        <Modal
          isOpen={!!activeModalHospital}
          onClose={() => setActiveModalHospital(null)}
          title={activeModalHospital.name}
          subtitle={`${activeModalHospital.typeBadge} • ${activeModalHospital.area}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Summary stat in modal */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface-container-low p-4 rounded-2xl">
              <div>
                <span className="text-xs text-outline block">Total Bed Kosong</span>
                <span className="text-2xl font-bold text-tertiary tabular-nums">
                  {activeModalHospital.totalAvailableBeds} Bed
                </span>
              </div>
              <div>
                <span className="text-xs text-outline block">Tingkat Okupansi</span>
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {activeModalHospital.occupancyRate}%
                </span>
              </div>
              <div>
                <span className="text-xs text-outline block">Layanan IGD</span>
                <span className="text-base font-bold text-error flex items-center gap-1 mt-1">
                  <Icon name="e911_emergency" size={18} /> Siaga 24 Jam
                </span>
              </div>
            </div>

            {/* Complete Breakdown Table */}
            <div>
              <h4 className="text-sm font-bold text-on-surface mb-2">
                Rincian Kapasitas Tempat Tidur Real-time
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {activeModalHospital.rooms.map((room) => {
                  const isFull = room.available === 0 || room.status === "full";
                  return (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-3.5 bg-white text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isFull
                              ? "bg-error"
                              : room.available < 5
                              ? "bg-amber-500"
                              : "bg-tertiary"
                          }`}
                        />
                        <span className="font-medium text-on-surface">{room.label}</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold tabular-nums ${
                            isFull ? "text-error" : "text-tertiary"
                          }`}
                        >
                          {isFull ? "Penuh (0)" : `${room.available} Bed Tersedia`}
                        </span>
                        {room.total && (
                          <span className="text-xs text-outline block tabular-nums">
                            dari {room.total} kapasitas
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hospital Contact & Directions in Modal */}
            <div className="bg-surface-container-low/40 p-4 rounded-2xl space-y-2 text-xs sm:text-sm text-on-surface-variant">
              <p>
                <strong>Alamat:</strong> {activeModalHospital.address}
              </p>
              <p>
                <strong>Layanan Unggulan:</strong>{" "}
                {activeModalHospital.services.join(", ")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={activeModalHospital.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <Icon name="directions" size={18} />
                <span>Petunjuk Arah</span>
              </a>
              <a
                href={`tel:${activeModalHospital.emergencyPhone.replace(/\D/g, "")}`}
                className="px-4 py-2 rounded-xl bg-error hover:bg-error-container text-on-error hover:text-on-error-container font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <Icon name="call" size={18} />
                <span>Hubungi IGD</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
