import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BedAvailabilitySection } from "@/components/sections/BedAvailabilitySection";
import { HOSPITALS_DATA } from "@/data/hospitals";

export const metadata: Metadata = {
  title: "Ketersediaan Kamar RS - Banyumas Sehat",
  description:
    "Pantau ketersediaan tempat tidur rawat inap, ICU, NICU, PICU, dan isolasi real-time di seluruh rumah sakit se-Kabupaten Banyumas.",
};

export default function KamarPage() {
  return (
    <div className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Ketersediaan Kamar Rawat Inap" }]} />
      </div>
      <BedAvailabilitySection hospitals={HOSPITALS_DATA} />
    </div>
  );
}
