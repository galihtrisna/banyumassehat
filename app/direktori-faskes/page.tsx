import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DirectorySection } from "@/components/sections/DirectorySection";
import { HOSPITALS_DATA, PUSKESMAS_DATA } from "@/data/hospitals";

export const metadata: Metadata = {
  title: "Direktori Faskes & IGD Banyumas - Banyumas Sehat",
  description:
    "Akses direktori rumah sakit rujukan, 40 Puskesmas, nomor darurat IGD 24 jam, dan navigasi faskes di Kabupaten Banyumas.",
};

export default function DirektoriFaskesPage() {
  return (
    <div className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Direktori Rumah Sakit & Puskesmas" }]} />
      </div>
      <DirectorySection
        hospitals={HOSPITALS_DATA}
        puskesmasList={PUSKESMAS_DATA}
      />
    </div>
  );
}
