import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DoctorScheduleSection } from "@/components/sections/DoctorScheduleSection";
import { DOCTORS_DATA } from "@/data/doctors";

export const metadata: Metadata = {
  title: "Jadwal & Antrean Dokter Spesialis - Banyumas Sehat",
  description:
    "Cek jadwal praktek dokter spesialis di poliklinik rumah sakit se-Kabupaten Banyumas dan ambil nomor antrean Mobile JKN online.",
};

export default function JadwalDokterPage() {
  return (
    <div className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Jadwal Dokter & Poliklinik" }]} />
      </div>
      <DoctorScheduleSection doctors={DOCTORS_DATA} />
    </div>
  );
}
