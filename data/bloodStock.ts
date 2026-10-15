import { BloodStockItem, BloodLocationStock, BloodDonorEvent } from "@/types";

export const BLOOD_STOCK_SUMMARY: BloodStockItem[] = [
  {
    bloodType: "A+",
    count: 342,
    status: "safe",
    subtitle: "Kantong Darah",
  },
  {
    bloodType: "B+",
    count: 415,
    status: "safe",
    subtitle: "Kantong Darah",
  },
  {
    bloodType: "O+",
    count: 520,
    status: "safe",
    subtitle: "Kantong Darah",
  },
  {
    bloodType: "AB+",
    count: 98,
    status: "safe",
    subtitle: "Kantong Darah",
  },
  {
    bloodType: "Rh (-)",
    count: 18,
    status: "safe",
    subtitle: "A-, B-, O-, AB-",
  },
];

export const BLOOD_LOCATIONS_DATA: BloodLocationStock[] = [
  {
    id: "pmi-sokaraja",
    name: "UTD PMI Kabupaten Banyumas (Sokaraja)",
    address: "Pusat Pengolahan Komponen Darah • Jl. Raya Kaliori No. 2, Sokaraja",
    stockCount: 764,
    statusText: "Siaga Distribusi 24 Jam",
    breakdown: {
      a: 210,
      b: 255,
      o: 240,
      ab: 50,
      rhNeg: 9,
    },
  },
  {
    id: "bdrs-margono",
    name: "BDRS RSUD Margono Soekarjo",
    address: "Instalasi Bank Darah Pasien Operasi, Hemodialisa & ICU",
    stockCount: 248,
    statusText: "PRC & Trombosit Ready",
    breakdown: {
      a: 68,
      b: 84,
      o: 76,
      ab: 16,
      rhNeg: 4,
    },
  },
  {
    id: "bdrs-banyumas",
    name: "BDRS RSUD Banyumas",
    address: "Unit Pelayanan Transfusi & Bank Darah Regional Selatan",
    stockCount: 126,
    statusText: "Stok Stabil",
    breakdown: {
      a: 34,
      b: 42,
      o: 38,
      ab: 10,
      rhNeg: 2,
    },
  },
  {
    id: "bdrs-hermina-dkt",
    name: "BDRS RS Hermina & RS Wijayakusuma",
    address: "Penyimpanan Terintegrasi Layanan Trauma & Maternal",
    stockCount: 102,
    statusText: "Cukup",
    breakdown: {
      a: 30,
      b: 34,
      o: 28,
      ab: 8,
      rhNeg: 2,
    },
  },
];

export const BLOOD_DONOR_EVENTS: BloodDonorEvent[] = [
  {
    id: "event-1",
    date: "Kamis, 15 Mei 2025",
    time: "08.30 - 13.00 WIB",
    location: "Alun-Alun Purwokerto (Depan Pendopo SiPanji)",
    unit: "Bus Donor 1 UTD PMI Banyumas",
    notes: "Tersedia merchandise & suplemen penambah darah",
  },
  {
    id: "event-2",
    date: "Sabtu, 17 Mei 2025",
    time: "10.00 - 16.00 WIB",
    location: "Rita SuperMall Purwokerto (Lantai GF)",
    unit: "Gerai Sehat & Aksi Komunitas Kemanusiaan",
    notes: "Pemeriksaan gula darah dan tensi gratis",
  },
  {
    id: "event-3",
    date: "Minggu, 18 Mei 2025",
    time: "07.00 - 11.00 WIB",
    location: "Car Free Day (CFD) GOR Satria Purwokerto",
    unit: "Bus Donor 2 UTD PMI Banyumas",
    notes: "Pemeriksaan Hb & golongan darah gratis",
  },
];
