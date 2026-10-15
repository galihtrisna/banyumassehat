import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicineStockSection } from "@/components/sections/MedicineStockSection";
import { MEDICINES_DATA } from "@/data/medicines";

export const metadata: Metadata = {
  title: "Info Stok Obat Esensial - Banyumas Sehat",
  description:
    "Monitoring ketersediaan obat esensial, Program Rujuk Balik (PRB BPJS), serum anti-bisa (SABU/SAR), dan kontak farmasi 24 jam faskes Banyumas.",
};

export default function InfoObatPage() {
  return (
    <div className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Katalog Obat Esensial" }]} />
      </div>
      <MedicineStockSection medicines={MEDICINES_DATA} />
    </div>
  );
}
