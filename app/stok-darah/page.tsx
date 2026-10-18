import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BloodStockSection } from "@/components/sections/BloodStockSection";
import {
  BLOOD_STOCK_SUMMARY,
  BLOOD_LOCATIONS_DATA,
  BLOOD_DONOR_EVENTS,
} from "@/data/bloodStock";

export const metadata: Metadata = {
  title: "Pusat Data Stok Darah Real-time - Priksa",
  description:
    "Pantau persediaan kantong darah PMI Kabupaten Banyumas dan Bank Darah Rumah Sakit (BDRS) serta jadwal bus donor darah minggu ini.",
};

export default function StokDarahPage() {
  return (
    <div className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Pusat Data Stok Darah" }]} />
      </div>
      <BloodStockSection
        bloodStock={BLOOD_STOCK_SUMMARY}
        locations={BLOOD_LOCATIONS_DATA}
        donorEvents={BLOOD_DONOR_EVENTS}
      />
    </div>
  );
}
