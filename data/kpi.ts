import { KPIMetric } from "@/types";

export const KPI_METRICS: KPIMetric[] = [
  {
    id: "beds",
    title: "Kapasitas Rawat Inap",
    value: "557",
    label: "Bed Kosong",
    subtitle: "Tersedia dari 14 Rumah Sakit Aktif SIRANAP",
    icon: "bed",
    accent: "primary",
  },
  {
    id: "doctors",
    title: "Tenaga Medis Spesialis",
    value: "328",
    label: "Dokter Aktif",
    subtitle: "Jadwal praktek terverifikasi hari ini",
    icon: "stethoscope",
    accent: "secondary",
  },
  {
    id: "blood",
    title: "Ketahanan Pasokan Darah",
    value: "1.240",
    label: "Kantong",
    subtitle: "Total persediaan UTD PMI & 5 BDRS",
    icon: "water_drop",
    accent: "error",
  },
  {
    id: "medicines",
    title: "Ketersediaan Obat Vital",
    value: "1.482",
    label: "Jenis Obat",
    subtitle: "Katalog obat esensial & terapi kronis",
    icon: "medication",
    accent: "tertiary",
  },
];
