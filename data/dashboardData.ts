export interface HourlyVisitData {
  time: string;
  outpatient: number; // Rawat Jalan
  emergency: number;  // IGD
  inpatient: number;  // Rawat Inap
}

export interface BedOccupancyTrend {
  day: string;
  date: string;
  rate: number; // BOR percentage
  icuRate: number;
  isolationRate: number;
  wardRate: number;
}

export interface RoomClassOccupancy {
  className: string;
  totalBeds: number;
  filledBeds: number;
  rate: number;
  status: 'safe' | 'warning' | 'critical';
}

export interface DoctorWorkloadData {
  specialty: string;
  doctorCount: number;
  visitCount: number;
  ratio: number; // patients per doctor
  status: 'ideal' | 'high' | 'overload';
  recommendation?: string;
}

export interface CriticalMedicineItem {
  id: string;
  name: string;
  form: string;
  category: string;
  depletionCountMonth: number; // frekuensi habis dalam 30 hari
  currentStock: number;
  minBuffer: number;
  unit: string;
  status: 'kritis' | 'waspada';
  leadTimeDays: number;
}

export interface CriticalBloodItem {
  bloodType: string;
  dailyDemand: number;
  currentStock: number;
  minSafeBuffer: number;
  shortageFrequency: string;
  status: 'kritis' | 'waspada' | 'siaga_khusus';
  urgencyNote: string;
}

export const HOURLY_VISITS: HourlyVisitData[] = [
  { time: "06:00", outpatient: 12, emergency: 16, inpatient: 4 },
  { time: "08:00", outpatient: 145, emergency: 22, inpatient: 18 },
  { time: "10:00", outpatient: 188, emergency: 28, inpatient: 34 },
  { time: "12:00", outpatient: 110, emergency: 35, inpatient: 42 },
  { time: "14:00", outpatient: 85, emergency: 38, inpatient: 30 },
  { time: "16:00", outpatient: 95, emergency: 44, inpatient: 22 },
  { time: "18:00", outpatient: 120, emergency: 52, inpatient: 16 },
  { time: "20:00", outpatient: 65, emergency: 48, inpatient: 14 },
  { time: "22:00", outpatient: 18, emergency: 36, inpatient: 8 },
  { time: "24:00", outpatient: 2, emergency: 24, inpatient: 4 },
];

export const BOR_WEEKLY_TREND: BedOccupancyTrend[] = [
  { day: "Senin", date: "12 Mei", rate: 84.2, icuRate: 92, isolationRate: 48, wardRate: 85 },
  { day: "Selasa", date: "13 Mei", rate: 86.8, icuRate: 95, isolationRate: 50, wardRate: 88 },
  { day: "Rabu", date: "14 Mei", rate: 81.5, icuRate: 88, isolationRate: 44, wardRate: 82 },
  { day: "Kamis", date: "15 Mei", rate: 78.4, icuRate: 85, isolationRate: 42, wardRate: 79 },
  { day: "Jumat", date: "16 Mei", rate: 75.2, icuRate: 82, isolationRate: 40, wardRate: 76 },
  { day: "Sabtu", date: "17 Mei", rate: 71.0, icuRate: 78, isolationRate: 35, wardRate: 72 },
  { day: "Minggu", date: "18 Mei", rate: 68.5, icuRate: 75, isolationRate: 30, wardRate: 70 },
];

export const ROOM_CLASSES_OCCUPANCY: RoomClassOccupancy[] = [
  { className: "ICU / ICCU / PICU", totalBeds: 28, filledBeds: 25, rate: 89.3, status: "critical" },
  { className: "Ruang Isolasi Tekanan Negatif", totalBeds: 20, filledBeds: 9, rate: 45.0, status: "safe" },
  { className: "Rawat Inap Kelas 1", totalBeds: 90, filledBeds: 70, rate: 77.8, status: "safe" },
  { className: "Rawat Inap Kelas 2", totalBeds: 120, filledBeds: 98, rate: 81.7, status: "warning" },
  { className: "Rawat Inap Kelas 3 (BPJS PBI)", totalBeds: 210, filledBeds: 182, rate: 86.7, status: "critical" },
  { className: "VIP & VVIP Paviliun", totalBeds: 45, filledBeds: 29, rate: 64.4, status: "safe" },
];

export const DOCTOR_WORKLOAD_LIST: DoctorWorkloadData[] = [
  {
    specialty: "Poli Penyakit Dalam (Sp.PD)",
    doctorCount: 5,
    visitCount: 185,
    ratio: 37.0,
    status: "overload",
    recommendation: "Antrean padat puncak jam 09:00. Direkomendasikan membuka poli sore atau menambah 1 dokter jaga."
  },
  {
    specialty: "Poli Anak (Sp.A)",
    doctorCount: 4,
    visitCount: 118,
    ratio: 29.5,
    status: "high",
    recommendation: "Beban kerja optimal mendekati batas wajar. Kuota poliklinik perlu diatur bertahap."
  },
  {
    specialty: "Poli Jantung & Pembuluh Darah (Sp.JP)",
    doctorCount: 2,
    visitCount: 68,
    ratio: 34.0,
    status: "overload",
    recommendation: "Tingginya antrean pemeriksaan EKG & Treadmill membutuhkan slot waktu terpisah."
  },
  {
    specialty: "Poli Kebidanan & Kandungan (Sp.OG)",
    doctorCount: 3,
    visitCount: 78,
    ratio: 26.0,
    status: "ideal",
    recommendation: "Rasio pasien seimbang, waktu tunggu USG fetomaternal terjaga di bawah 25 menit."
  },
  {
    specialty: "Poli Saraf (Sp.N)",
    doctorCount: 2,
    visitCount: 56,
    ratio: 28.0,
    status: "high",
    recommendation: "Pasien pasca-stroke mendominasi, disarankan pengalihan kontrol rutin via telekonsultasi."
  },
  {
    specialty: "Poli Bedah Umum (Sp.B)",
    doctorCount: 3,
    visitCount: 48,
    ratio: 16.0,
    status: "ideal",
    recommendation: "Distribusi konsultasi pra-bedah dan ganti verban berjalan teratur."
  },
  {
    specialty: "Poli Mata (Sp.M)",
    doctorCount: 2,
    visitCount: 44,
    ratio: 22.0,
    status: "ideal",
    recommendation: "Waktu pemeriksaan refraksi dan katarak efektif sesuai jadwal."
  },
  {
    specialty: "Poli THT-KL",
    doctorCount: 2,
    visitCount: 36,
    ratio: 18.0,
    status: "ideal",
    recommendation: "Pelayanan endoskopi THT dan audiometri berada dalam ambang batas ideal."
  },
];

export const CRITICAL_MEDICINES_LIST: CriticalMedicineItem[] = [
  {
    id: "med-1",
    name: "Paracetamol Infus 1000 mg / 100 ml",
    form: "Botol Infus Kaca",
    category: "Analgetik & Antipiretik Intravena",
    depletionCountMonth: 7,
    currentStock: 18,
    minBuffer: 80,
    unit: "Botol",
    status: "kritis",
    leadTimeDays: 2,
  },
  {
    id: "med-2",
    name: "Ceftriaxone Sodium Injeksi 1 gr",
    form: "Vial Serbuk Kering",
    category: "Antibiotik Sefalosporin Generasi III",
    depletionCountMonth: 5,
    currentStock: 24,
    minBuffer: 100,
    unit: "Vial",
    status: "kritis",
    leadTimeDays: 3,
  },
  {
    id: "med-3",
    name: "Insulin Glargine Pen 100 IU/ml",
    form: "FlexPen 3 ml",
    category: "Antidiabetes Analog Long-Acting",
    depletionCountMonth: 4,
    currentStock: 8,
    minBuffer: 30,
    unit: "Pen",
    status: "kritis",
    leadTimeDays: 4,
  },
  {
    id: "med-4",
    name: "Omeprazole Injeksi 40 mg",
    form: "Vial + Pelarut",
    category: "Proton Pump Inhibitor (PPI)",
    depletionCountMonth: 4,
    currentStock: 35,
    minBuffer: 90,
    unit: "Vial",
    status: "waspada",
    leadTimeDays: 2,
  },
  {
    id: "med-5",
    name: "Furosemide Injeksi 20 mg / 2 ml",
    form: "Ampul Cair",
    category: "Diuretik Loop - Gawat Jantung/Ginjal",
    depletionCountMonth: 3,
    currentStock: 42,
    minBuffer: 100,
    unit: "Ampul",
    status: "waspada",
    leadTimeDays: 2,
  },
  {
    id: "med-6",
    name: "Ondansetron Injeksi 4 mg / 2 ml",
    form: "Ampul Cair",
    category: "Antiemetik Pasca-Kemoterapi & Bedah",
    depletionCountMonth: 3,
    currentStock: 50,
    minBuffer: 110,
    unit: "Ampul",
    status: "waspada",
    leadTimeDays: 1,
  },
];

export const CRITICAL_BLOOD_LIST: CriticalBloodItem[] = [
  {
    bloodType: "Golongan O Rhesus (+)",
    dailyDemand: 45,
    currentStock: 18,
    minSafeBuffer: 50,
    shortageFrequency: "6 kali / bulan",
    status: "kritis",
    urgencyNote: "Tinggi pemakaian pada pasien trauma KLL, pendarahan obstetri IGD, & rujukan bedah akut.",
  },
  {
    bloodType: "Golongan AB Rhesus (+)",
    dailyDemand: 12,
    currentStock: 6,
    minSafeBuffer: 20,
    shortageFrequency: "4 kali / bulan",
    status: "kritis",
    urgencyNote: "Populasi donor terbatas, stok trombosit konsentrat (TC) sering mendekati nol.",
  },
  {
    bloodType: "Rhesus Negatif (Rh-) [A-, B-, O-, AB-]",
    dailyDemand: 3,
    currentStock: 2,
    minSafeBuffer: 8,
    shortageFrequency: "Rentan Defisit Cito",
    status: "siaga_khusus",
    urgencyNote: "Golongan darah langka. Memerlukan mobilisasi komunitas donor terdaftar PMI Banyumas.",
  },
  {
    bloodType: "Golongan B Rhesus (+)",
    dailyDemand: 30,
    currentStock: 24,
    minSafeBuffer: 40,
    shortageFrequency: "3 kali / bulan",
    status: "waspada",
    urgencyNote: "Kebutuhan rutin pasien thalassemia anak & unit hemodialisa rutin setiap Rabu-Kamis.",
  },
];
