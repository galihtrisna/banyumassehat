"use client";

import React, { useState, useMemo } from "react";
import { Doctor } from "@/types";
import { SPECIALTY_CATEGORIES } from "@/data/doctors";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface DoctorScheduleSectionProps {
  doctors: Doctor[];
  searchQuery?: string;
}

const HOSPITAL_REGISTRATION_MAP: Record<
  string,
  {
    systemName: string;
    shortName: string;
    portalUrl: string;
    description: string;
  }
> = {
  margono: {
    systemName: "e-Reservasi RSUD Prof. Dr. Margono Soekarjo",
    shortName: "RSUD Margono",
    portalUrl: "https://ereservasi.rsmargono.go.id/",
    description: "Sistem e-Reservasi resmi rawat jalan RSUD Margono untuk pasien BPJS Kesehatan maupun umum.",
  },
  banyumas: {
    systemName: "SIMRS Pendaftaran Online RSUD Banyumas",
    shortName: "RSUD Banyumas",
    portalUrl: "https://rsudbms.banyumaskab.go.id/",
    description: "Aplikasi registrasi mandiri rawat jalan dan poliklinik spesialis RSUD Banyumas.",
  },
  hermina: {
    systemName: "Halo Hermina / Portal Hermina Hospitals",
    shortName: "RS Hermina",
    portalUrl: "https://www.herminahospitals.com/id/branch/hermina-purwokerto",
    description: "Portal resmi reservasi jadwal dokter spesialis RS Hermina Purwokerto.",
  },
  wijayakusuma: {
    systemName: "Pendaftaran Online RS Wijayakusuma",
    shortName: "RS Wijayakusuma",
    portalUrl: "https://rswijayakusuma.co.id/",
    description: "Sistem reservasi poliklinik rawat jalan RS Wijayakusuma (DKT) Purwokerto.",
  },
  islam: {
    systemName: "Pendaftaran Online RS Islam Purwokerto",
    shortName: "RS Islam Purwokerto",
    portalUrl: "https://rshipurwokerto.com/",
    description: "Layanan pendaftaran poliklinik spesialis rawat jalan RS Islam Purwokerto.",
  },
  siaga: {
    systemName: "SIMRS Pendaftaran RSU Siaga Medika",
    shortName: "RSU Siaga Medika",
    portalUrl: "https://siagamedika.co.id/",
    description: "Portal registrasi poliklinik spesialis dan traumatologi RSU Siaga Medika Banyumas.",
  },
};

export function DoctorScheduleSection({
  doctors,
  searchQuery = "",
}: DoctorScheduleSectionProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedHospital, setSelectedHospital] = useState<string>("all");
  const [doctorSearchName, setDoctorSearchName] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedModalHospitalId, setSelectedModalHospitalId] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleOpenDoctorDetail = (doc: Doctor) => {
    setSelectedDoctor(doc);
    if (
      selectedHospital !== "all" &&
      doc.hospitals?.some((h) => h.hospitalId === selectedHospital)
    ) {
      setSelectedModalHospitalId(selectedHospital);
    } else {
      setSelectedModalHospitalId(doc.hospitals?.[0]?.hospitalId || doc.hospitalId);
    }
  };

  // Filter logic with multi-hospital support
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // By specialty
      if (selectedSpecialty !== "all" && doc.specialtyCategory !== selectedSpecialty) {
        return false;
      }
      // By hospital (check primary or any practice hospitals)
      if (selectedHospital !== "all") {
        const worksAtHospital =
          doc.hospitalId === selectedHospital ||
          doc.hospitals?.some((h) => h.hospitalId === selectedHospital);
        if (!worksAtHospital) {
          return false;
        }
      }
      // By doctor name search input
      if (doctorSearchName.trim()) {
        const nameQ = doctorSearchName.toLowerCase();
        if (
          !doc.name.toLowerCase().includes(nameQ) &&
          !doc.specialty.toLowerCase().includes(nameQ)
        ) {
          return false;
        }
      }
      // By global search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(query);
        const matchesHospital =
          doc.hospitalName.toLowerCase().includes(query) ||
          doc.hospitals?.some((h) => h.hospitalName.toLowerCase().includes(query));
        if (!matchesName && !matchesSpecialty && !matchesHospital) {
          return false;
        }
      }
      return true;
    });
  }, [doctors, selectedSpecialty, selectedHospital, doctorSearchName, searchQuery]);

  return (
    <section className="py-12 bg-surface-container-low/40 border-y border-slate-100" id="jadwal">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Jadwal Praktek Dokter Spesialis Hari Ini
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl mt-1 leading-relaxed">
              Pantau jadwal dokter yang sedang praktek, sisa kuota antrean poli, dan registrasi pendaftaran daring secara cepat.
            </p>
          </div>

          {/* Desktop Controls (1 Baris Utuh di Bawah Teks Deskripsi) */}
          <div className="hidden lg:flex items-center gap-3 mt-5">
            {/* Search Doctor by Name */}
            <div className="flex-1 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
              <Icon name="search" size={18} className="text-outline shrink-0" />
              <input
                type="text"
                value={doctorSearchName}
                onChange={(e) => setDoctorSearchName(e.target.value)}
                placeholder="Cari nama dokter..."
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline w-full focus:ring-0"
              />
              {doctorSearchName && (
                <button
                  onClick={() => setDoctorSearchName("")}
                  className="text-outline hover:text-on-surface"
                  title="Hapus pencarian"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>

            {/* Filter by Hospital */}
            <div className="w-64 bg-surface-container-lowest px-3.5 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2 shrink-0">
              <Icon name="local_hospital" size={18} className="text-primary shrink-0" />
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="bg-transparent border-none text-on-surface text-xs sm:text-sm font-semibold outline-none cursor-pointer w-full"
              >
                <option value="all">Semua Rumah Sakit</option>
                <option value="margono">RSUD Prof. Dr. Margono</option>
                <option value="banyumas">RSUD Banyumas</option>
                <option value="hermina">RS Hermina</option>
                <option value="wijayakusuma">RS Wijayakusuma (DKT)</option>
                <option value="islam">RS Islam Purwokerto</option>
                <option value="siaga">RSU Siaga Medika</option>
              </select>
            </div>

            {/* Filter by Specialty */}
            <div className="w-64 bg-surface-container-lowest px-3.5 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2 shrink-0">
              <Icon name="medical_services" size={18} className="text-secondary shrink-0" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-transparent border-none text-on-surface text-xs sm:text-sm font-semibold outline-none cursor-pointer w-full"
              >
                {SPECIALTY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Controls: Search Bar + Filter Button in 1 compact line */}
          <div className="flex lg:hidden items-center gap-2 mt-4">
            <div className="flex-1 min-w-0 bg-surface-container-lowest px-3 py-2.5 rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
              <Icon name="search" size={18} className="text-outline shrink-0" />
              <input
                type="text"
                value={doctorSearchName}
                onChange={(e) => setDoctorSearchName(e.target.value)}
                placeholder="Cari nama dokter..."
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline w-full focus:ring-0 min-w-0"
              />
              {doctorSearchName && (
                <button
                  onClick={() => setDoctorSearchName("")}
                  className="text-outline hover:text-on-surface shrink-0"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>

            {/* Filter button opening popup modal */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm shrink-0 ${
                selectedHospital !== "all" || selectedSpecialty !== "all"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest text-on-surface border-slate-200/80 hover:bg-surface-container-low"
              }`}
            >
              <Icon name="tune" size={18} />
              <span>Filter</span>
              {(selectedHospital !== "all" || selectedSpecialty !== "all") && (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed" />
              )}
            </button>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 text-center rounded-3xl border border-dashed border-slate-300">
            <Icon name="person_search" size={48} className="text-outline mx-auto mb-2" />
            <h3 className="text-lg font-bold text-on-surface">Dokter Tidak Ditemukan</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Tidak ada jadwal praktek dokter yang sesuai dengan kriteria filter saat ini.
            </p>
            <Button
              variant="surface"
              size="sm"
              onClick={() => setSelectedSpecialty("all")}
              className="mt-4"
            >
              Tampilkan Semua Poli
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => {
              // Active hospital schedule depending on current filter
              const activeHosp =
                (selectedHospital !== "all"
                  ? doc.hospitals?.find((h) => h.hospitalId === selectedHospital)
                  : doc.hospitals?.[0]) || {
                  hospitalId: doc.hospitalId,
                  hospitalName: doc.hospitalName,
                  schedule: doc.schedule,
                  clinicRoom: doc.clinicRoom,
                  quotaRemaining: doc.quotaRemaining,
                  quotaTotal: doc.quotaTotal,
                };

              const otherHospitals =
                doc.hospitals?.filter((h) => h.hospitalId !== activeHosp.hospitalId) || [];

              return (
                <Card
                  key={doc.id}
                  elevation={1}
                  rounded="3xl"
                  onClick={() => handleOpenDoctorDetail(doc)}
                  className="p-5 sm:p-6 flex flex-col justify-between cursor-pointer group hover:border-primary/50 hover:shadow-lg transition-all duration-200 active:scale-[0.99]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenDoctorDetail(doc);
                    }
                  }}
                >
                  <div>
                    {/* Header: Photo & Name */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-200">
                        {/* Doctor Photo */}
                        <img
                          src={doc.photoUrl}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-xs font-semibold text-primary mt-0.5">
                          {doc.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Meta info box */}
                    <div className="space-y-2 bg-surface-container-low/50 p-3.5 rounded-2xl mb-4 border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <Icon name="apartment" size={16} className="text-outline shrink-0" />
                          <span className="truncate font-semibold text-on-surface">
                            {activeHosp.hospitalName}
                          </span>
                        </div>
                        {otherHospitals.length > 0 && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary shrink-0"
                            title={`Juga praktek di ${otherHospitals.map((h) => h.hospitalName).join(", ")}`}
                          >
                            +{otherHospitals.length} RS Lain
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                        <Icon name="schedule" size={16} className="text-outline shrink-0" />
                        <span>{activeHosp.schedule}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text CTA explaining clickable card */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors">
                    <span>Lihat detail dokter &amp; jadwal</span>
                    <Icon
                      name="arrow_forward"
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Doctor Schedule Detail Modal with Multi-Hospital Switcher & External Hospital Portal Link */}
      {selectedDoctor && (
        <Modal
          isOpen={!!selectedDoctor}
          onClose={() => {
            setSelectedDoctor(null);
            setSelectedModalHospitalId(null);
          }}
          title="Detail Jadwal Dokter Spesialis"
          subtitle={
            selectedDoctor.hospitals && selectedDoctor.hospitals.length > 1
              ? `Praktek di ${selectedDoctor.hospitals.length} Rumah Sakit di Banyumas`
              : selectedDoctor.hospitalName
          }
          maxWidth="md"
        >
          {(() => {
            const hospitalsList =
              selectedDoctor.hospitals && selectedDoctor.hospitals.length > 0
                ? selectedDoctor.hospitals
                : [
                    {
                      hospitalId: selectedDoctor.hospitalId,
                      hospitalName: selectedDoctor.hospitalName,
                      schedule: selectedDoctor.schedule,
                      clinicRoom: selectedDoctor.clinicRoom,
                      quotaTotal: selectedDoctor.quotaTotal,
                      quotaRemaining: selectedDoctor.quotaRemaining,
                      isQueueOpen: selectedDoctor.isQueueOpen,
                      days: "Hari Kerja",
                    },
                  ];

            const currentHospitalId =
              selectedModalHospitalId || hospitalsList[0].hospitalId;

            const activeHospSchedule =
              hospitalsList.find((h) => h.hospitalId === currentHospitalId) ||
              hospitalsList[0];

            const regInfo =
              HOSPITAL_REGISTRATION_MAP[activeHospSchedule.hospitalId] || {
                systemName: `SIMRS ${activeHospSchedule.hospitalName}`,
                shortName: activeHospSchedule.hospitalName,
                portalUrl: "https://banyumaskab.go.id",
                description: `Sistem reservasi dan pendaftaran resmi ${activeHospSchedule.hospitalName}.`,
              };

            return (
              <div className="space-y-5">
                {/* Doctor Profile Banner */}
                <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shrink-0 shadow-sm border border-slate-200">
                    <img
                      src={selectedDoctor.photoUrl}
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-on-surface">
                      {selectedDoctor.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-primary font-semibold">
                      {selectedDoctor.specialty}
                    </p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-1 font-medium">
                      <Icon name="verified" size={14} className="text-primary" />
                      <span>Surat Izin Praktik (SIP) Terverifikasi</span>
                    </p>
                  </div>
                </div>

                {/* Multi-Hospital Practice Location Switcher Tabs */}
                {hospitalsList.length > 1 && (
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5 mb-2">
                      <Icon name="apartment" size={15} className="text-primary" />
                      <span>Pilih Rumah Sakit Tempat Praktek:</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-slate-200/80">
                      {hospitalsList.map((h) => {
                        const isSelected = h.hospitalId === activeHospSchedule.hospitalId;
                        return (
                          <button
                            key={h.hospitalId}
                            type="button"
                            onClick={() => setSelectedModalHospitalId(h.hospitalId)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? "bg-primary text-on-primary shadow-sm"
                                : "text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            <span className="truncate">
                              {h.hospitalName
                                .replace("RSUD Prof. Dr. Margono Soekarjo", "RSUD Margono")
                                .replace("RSUD Banyumas", "RSUD Banyumas")
                                .replace("RS Hermina Purwokerto", "RS Hermina")
                                .replace("RS Wijayakusuma (DKT)", "RS Wijayakusuma")
                                .replace("RS Islam Purwokerto", "RS Islam")
                                .replace("RSU Siaga Medika Banyumas", "RSU Siaga Medika")}
                            </span>
                            {isSelected && <Icon name="check" size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Details Grid for Active Hospital */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-outline text-xs mb-1 font-medium">
                      <Icon name="schedule" size={16} className="text-primary" />
                      <span>Waktu &amp; Hari Praktek</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">
                      {activeHospSchedule.schedule}
                    </p>
                    {activeHospSchedule.days && (
                      <span className="text-[11px] text-outline block mt-0.5">
                        {activeHospSchedule.days}
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-outline text-xs mb-1 font-medium">
                      <Icon name="meeting_room" size={16} className="text-secondary" />
                      <span>Ruang Poliklinik</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">
                      {activeHospSchedule.clinicRoom}
                    </p>
                    <span className="text-[11px] text-outline block mt-0.5 truncate">
                      {activeHospSchedule.hospitalName}
                    </span>
                  </div>

                  <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-outline text-xs mb-1 font-medium">
                      <Icon name="confirmation_number" size={16} className="text-tertiary" />
                      <span>Sisa Kuota Hari Ini</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-on-surface">
                        {activeHospSchedule.quotaRemaining} Pasien
                      </p>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Pendaftaran Buka
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-outline text-xs mb-1 font-medium">
                      <Icon name="verified_user" size={16} className="text-primary" />
                      <span>Jaminan Pelayanan</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">
                      BPJS Kesehatan &amp; Pasien Umum
                    </p>
                  </div>
                </div>

                {/* Direct Hospital Registration Notice */}
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/15 text-xs text-on-surface leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-primary mb-1 text-sm">
                    <Icon name="info" size={18} />
                    <span>Pendaftaran di {activeHospSchedule.hospitalName}</span>
                  </div>
                  <p className="text-on-surface-variant">
                    Pendaftaran antrean dan verifikasi rujukan diproses langsung melalui sistem resmi <strong>{regInfo.systemName}</strong>. Klik tombol daftar di bawah untuk diarahkan langsung ke portal pendaftaran rumah sakit ini.
                  </p>
                </div>

                {/* Actions: Close button & External Hospital Registration Link */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => {
                      setSelectedDoctor(null);
                      setSelectedModalHospitalId(null);
                    }}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Tutup
                  </Button>

                  <a
                    href={regInfo.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary-container shadow-md shadow-primary/20 transition-all active:scale-95"
                  >
                    <span>Daftar di Sistem {regInfo.shortName}</span>
                    <Icon name="open_in_new" size={16} />
                  </a>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Mobile Filter Popup Modal */}
      {mobileFilterOpen && (
        <Modal
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          title="Filter Jadwal Dokter"
          subtitle="Pilih rumah sakit dan spesialisasi poliklinik"
          maxWidth="sm"
        >
          <div className="space-y-4">
            {/* Rumah Sakit Filter */}
            <div>
              <label className="text-xs font-bold text-on-surface mb-1.5 flex items-center gap-1.5">
                <Icon name="local_hospital" size={16} className="text-primary" />
                <span>Pilih Rumah Sakit</span>
              </label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-primary outline-none bg-surface-container-lowest"
              >
                <option value="all">Semua Rumah Sakit</option>
                <option value="margono">RSUD Prof. Dr. Margono</option>
                <option value="banyumas">RSUD Banyumas</option>
                <option value="hermina">RS Hermina</option>
                <option value="wijayakusuma">RS Wijayakusuma (DKT)</option>
                <option value="islam">RS Islam Purwokerto</option>
                <option value="siaga">RSU Siaga Medika</option>
              </select>
            </div>

            {/* Spesialisasi Filter */}
            <div>
              <label className="text-xs font-bold text-on-surface mb-1.5 flex items-center gap-1.5">
                <Icon name="medical_services" size={16} className="text-secondary" />
                <span>Pilih Poliklinik / Spesialisasi</span>
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-primary outline-none bg-surface-container-lowest"
              >
                {SPECIALTY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedHospital("all");
                  setSelectedSpecialty("all");
                }}
                className="text-xs"
              >
                Reset Filter
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setMobileFilterOpen(false)}
                className="text-xs"
              >
                Terapkan Filter
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
