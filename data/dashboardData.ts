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
  { className: "ICU / ICCU / PICU / HCU", totalBeds: 123, filledBeds: 100, rate: 81.3, status: "critical" },
  { className: "Rawat Inap Kelas 1", totalBeds: 139, filledBeds: 111, rate: 79.9, status: "safe" },
  { className: "Rawat Inap Kelas 2", totalBeds: 113, filledBeds: 90, rate: 79.6, status: "safe" },
  { className: "Rawat Inap Kelas 3 (BPJS PBI)", totalBeds: 262, filledBeds: 210, rate: 80.2, status: "warning" },
  { className: "VIP & VVIP Paviliun", totalBeds: 91, filledBeds: 62, rate: 68.1, status: "safe" },
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

export interface PharmacyDepoMonthlyPrescription {
  month: string;
  depoRawatInapRSMS: number;
  depoIgdRSMS: number;
  depoIbsRSMS: number;
  depoRawatJalanRSMS: number;
  depoKemoRSMS: number;
  depoHcuRSMS: number;
  depoIcuRSMS: number;
  depoIccuRSMS: number;
  depoMaternalPerinatalRSMS: number;
  depoRawatJalanAbiyasa: number;
  depoRawatInapAbiyasa: number;
  depoIbsAbiyasa: number;
  depoIntensifAbiyasa: number;
  depoIcuAbiyasa: number;
  totalPrescriptions: number;
}

export const MARGONO_PHARMACY_RECAP_2026: PharmacyDepoMonthlyPrescription[] = [
  {
    month: "Januari",
    depoRawatInapRSMS: 17450,
    depoIgdRSMS: 9035,
    depoIbsRSMS: 1696,
    depoRawatJalanRSMS: 16921,
    depoKemoRSMS: 2133,
    depoHcuRSMS: 1145,
    depoIcuRSMS: 499,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 8999,
    depoRawatInapAbiyasa: 4800,
    depoIbsAbiyasa: 397,
    depoIntensifAbiyasa: 4803,
    depoIcuAbiyasa: 650,
    totalPrescriptions: 68528,
  },
  {
    month: "Februari",
    depoRawatInapRSMS: 15675,
    depoIgdRSMS: 7879,
    depoIbsRSMS: 1475,
    depoRawatJalanRSMS: 15558,
    depoKemoRSMS: 2026,
    depoHcuRSMS: 1060,
    depoIcuRSMS: 438,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 8210,
    depoRawatInapAbiyasa: 3903,
    depoIbsAbiyasa: 315,
    depoIntensifAbiyasa: 4165,
    depoIcuAbiyasa: 634,
    totalPrescriptions: 61338,
  },
  {
    month: "Maret",
    depoRawatInapRSMS: 14374,
    depoIgdRSMS: 8606,
    depoIbsRSMS: 1355,
    depoRawatJalanRSMS: 15213,
    depoKemoRSMS: 2096,
    depoHcuRSMS: 1083,
    depoIcuRSMS: 482,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 8351,
    depoRawatInapAbiyasa: 3761,
    depoIbsAbiyasa: 305,
    depoIntensifAbiyasa: 4510,
    depoIcuAbiyasa: 649,
    totalPrescriptions: 60785,
  },
  {
    month: "April",
    depoRawatInapRSMS: 18467,
    depoIgdRSMS: 8823,
    depoIbsRSMS: 1984,
    depoRawatJalanRSMS: 17547,
    depoKemoRSMS: 2307,
    depoHcuRSMS: 1137,
    depoIcuRSMS: 514,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 8925,
    depoRawatInapAbiyasa: 4792,
    depoIbsAbiyasa: 370,
    depoIntensifAbiyasa: 5056,
    depoIcuAbiyasa: 674,
    totalPrescriptions: 70596,
  },
  {
    month: "Mei",
    depoRawatInapRSMS: 15688,
    depoIgdRSMS: 9267,
    depoIbsRSMS: 1719,
    depoRawatJalanRSMS: 16459,
    depoKemoRSMS: 2113,
    depoHcuRSMS: 1074,
    depoIcuRSMS: 502,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 9248,
    depoRawatInapAbiyasa: 4325,
    depoIbsAbiyasa: 318,
    depoIntensifAbiyasa: 5019,
    depoIcuAbiyasa: 630,
    totalPrescriptions: 66362,
  },
  {
    month: "Juni",
    depoRawatInapRSMS: 17068,
    depoIgdRSMS: 9088,
    depoIbsRSMS: 1721,
    depoRawatJalanRSMS: 17380,
    depoKemoRSMS: 2251,
    depoHcuRSMS: 1030,
    depoIcuRSMS: 403,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 9425,
    depoRawatInapAbiyasa: 4295,
    depoIbsAbiyasa: 344,
    depoIntensifAbiyasa: 4674,
    depoIcuAbiyasa: 639,
    totalPrescriptions: 68318,
  },
  {
    month: "Juli",
    depoRawatInapRSMS: 18304,
    depoIgdRSMS: 8519,
    depoIbsRSMS: 1944,
    depoRawatJalanRSMS: 19206,
    depoKemoRSMS: 2404,
    depoHcuRSMS: 1079,
    depoIcuRSMS: 484,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 10032,
    depoRawatInapAbiyasa: 4960,
    depoIbsAbiyasa: 414,
    depoIntensifAbiyasa: 4964,
    depoIcuAbiyasa: 707,
    totalPrescriptions: 73017,
  },
  {
    month: "Agustus",
    depoRawatInapRSMS: 16447,
    depoIgdRSMS: 9200,
    depoIbsRSMS: 1762,
    depoRawatJalanRSMS: 17731,
    depoKemoRSMS: 2098,
    depoHcuRSMS: 1187,
    depoIcuRSMS: 519,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 8955,
    depoRawatInapAbiyasa: 4309,
    depoIbsAbiyasa: 373,
    depoIntensifAbiyasa: 5039,
    depoIcuAbiyasa: 591,
    totalPrescriptions: 68211,
  },
  {
    month: "September",
    depoRawatInapRSMS: 18423,
    depoIgdRSMS: 9213,
    depoIbsRSMS: 1992,
    depoRawatJalanRSMS: 18857,
    depoKemoRSMS: 2234,
    depoHcuRSMS: 1150,
    depoIcuRSMS: 452,
    depoIccuRSMS: 0,
    depoMaternalPerinatalRSMS: 0,
    depoRawatJalanAbiyasa: 9787,
    depoRawatInapAbiyasa: 5000,
    depoIbsAbiyasa: 381,
    depoIntensifAbiyasa: 4966,
    depoIcuAbiyasa: 685,
    totalPrescriptions: 73140,
  },
];

export interface MedicalSupportVisitsMonthly {
  month: string;
  radiologi: number;
  radiotherapi: number;
  labPK: number;
  labPA: number;
  bankDarah: number;
  rehabilitasiMedik: number;
  haemodialisa: number;
  totalKunjungan: number;
}

export const MARGONO_PENUNJANG_MEDIS_VISITS_2026: MedicalSupportVisitsMonthly[] = [
  {
    month: "Januari",
    radiologi: 8314,
    radiotherapi: 1969,
    labPK: 20696,
    labPA: 1297,
    bankDarah: 3691,
    rehabilitasiMedik: 3812,
    haemodialisa: 2090,
    totalKunjungan: 41869,
  },
  {
    month: "Februari",
    radiologi: 5244,
    radiotherapi: 1712,
    labPK: 16991,
    labPA: 1255,
    bankDarah: 3351,
    rehabilitasiMedik: 3082,
    haemodialisa: 1992,
    totalKunjungan: 33627,
  },
  {
    month: "Maret",
    radiologi: 5014,
    radiotherapi: 1685,
    labPK: 17324,
    labPA: 1072,
    bankDarah: 3461,
    rehabilitasiMedik: 2873,
    haemodialisa: 2206,
    totalKunjungan: 33635,
  },
  {
    month: "April",
    radiologi: 6225,
    radiotherapi: 1986,
    labPK: 19893,
    labPA: 1072,
    bankDarah: 1524,
    rehabilitasiMedik: 3279,
    haemodialisa: 2135,
    totalKunjungan: 36114,
  },
  {
    month: "Mei",
    radiologi: 5619,
    radiotherapi: 1653,
    labPK: 19951,
    labPA: 1244,
    bankDarah: 3454,
    rehabilitasiMedik: 2961,
    haemodialisa: 2146,
    totalKunjungan: 37028,
  },
  {
    month: "Juni",
    radiologi: 5991,
    radiotherapi: 2247,
    labPK: 20463,
    labPA: 1309,
    bankDarah: 3474,
    rehabilitasiMedik: 3086,
    haemodialisa: 2135,
    totalKunjungan: 38705,
  },
  {
    month: "Juli",
    radiologi: 6417,
    radiotherapi: 1707,
    labPK: 21365,
    labPA: 1433,
    bankDarah: 3441,
    rehabilitasiMedik: 3511,
    haemodialisa: 2287,
    totalKunjungan: 40161,
  },
  {
    month: "Agustus",
    radiologi: 6012,
    radiotherapi: 799,
    labPK: 22033,
    labPA: 1366,
    bankDarah: 3556,
    rehabilitasiMedik: 3231,
    haemodialisa: 2198,
    totalKunjungan: 39195,
  },
];

export interface OutpatientClinicVisit {
  clinicName: string;
  newPatients: number;
  repeatPatients: number;
  totalVisits: number;
  isExecutiveEvening?: boolean;
}

export const MARGONO_ABIYASA_OUTPATIENT_SEPTEMBER_2026: OutpatientClinicVisit[] = [
  { clinicName: "Klinik Jantung - Abiyasa", newPatients: 19, repeatPatients: 757, totalVisits: 776 },
  { clinicName: "Klinik Saraf - Abiyasa", newPatients: 12, repeatPatients: 391, totalVisits: 403 },
  { clinicName: "Klinik Gastroentero Hepatologi - Abiyasa", newPatients: 9, repeatPatients: 287, totalVisits: 296 },
  { clinicName: "Klinik Neurologi Intervensi - Abiyasa", newPatients: 0, repeatPatients: 198, totalVisits: 198 },
  { clinicName: "Klinik Neuro Behavior Geriatri - Abiyasa", newPatients: 2, repeatPatients: 186, totalVisits: 188 },
  { clinicName: "Klinik Endokrin dan DM - Abiyasa", newPatients: 2, repeatPatients: 175, totalVisits: 177 },
  { clinicName: "Klinik Penyakit Dalam - Abiyasa", newPatients: 20, repeatPatients: 149, totalVisits: 169 },
  { clinicName: "Klinik Paru-paru - Abiyasa", newPatients: 2, repeatPatients: 129, totalVisits: 131 },
  { clinicName: "Klinik Hipertensi & Ginjal - Abiyasa", newPatients: 2, repeatPatients: 98, totalVisits: 100 },
  { clinicName: "Klinik Bedah Syaraf - Abiyasa", newPatients: 4, repeatPatients: 89, totalVisits: 93 },
  { clinicName: "Klinik Saraf - Eksekutif Sore Non BPJS", newPatients: 11, repeatPatients: 81, totalVisits: 92, isExecutiveEvening: true },
  { clinicName: "Klinik Bedah Urologi - Abiyasa", newPatients: 4, repeatPatients: 70, totalVisits: 74 },
  { clinicName: "Klinik Penyakit Tropik Infeksi - Abiyasa", newPatients: 5, repeatPatients: 52, totalVisits: 57 },
  { clinicName: "Klinik Hematologi Onkologi - Abiyasa", newPatients: 1, repeatPatients: 51, totalVisits: 52 },
  { clinicName: "Klinik Konservasi Gigi - Abiyasa", newPatients: 7, repeatPatients: 36, totalVisits: 43 },
  { clinicName: "Klinik Bedah Onkologi - Abiyasa", newPatients: 1, repeatPatients: 41, totalVisits: 42 },
  { clinicName: "Klinik Kulit dan Kelamin - Abiyasa", newPatients: 5, repeatPatients: 30, totalVisits: 35 },
  { clinicName: "Klinik Kesehatan Jiwa - Abiyasa", newPatients: 2, repeatPatients: 30, totalVisits: 32 },
  { clinicName: "Klinik Neuroonkologi - Abiyasa", newPatients: 0, repeatPatients: 30, totalVisits: 30 },
  { clinicName: "Klinik Sendi Panggul dan Lutut - Abiyasa", newPatients: 1, repeatPatients: 29, totalVisits: 30 },
  { clinicName: "Klinik Mata - Abiyasa", newPatients: 2, repeatPatients: 25, totalVisits: 27 },
  { clinicName: "Klinik Reumatologi - Abiyasa", newPatients: 1, repeatPatients: 26, totalVisits: 27 },
  { clinicName: "Klinik Rehabilitasi Medik - Abiyasa", newPatients: 1, repeatPatients: 23, totalVisits: 24 },
  { clinicName: "Klinik Bedah Digestive - Abiyasa", newPatients: 1, repeatPatients: 23, totalVisits: 24 },
  { clinicName: "Klinik Bedah Orthopedi - Abiyasa", newPatients: 0, repeatPatients: 23, totalVisits: 23 },
  { clinicName: "Klinik Gigi - Abiyasa", newPatients: 1, repeatPatients: 19, totalVisits: 20 },
  { clinicName: "Klinik BTKV (Bedah Torak, Kardiak Vaskular) - Abiyasa", newPatients: 0, repeatPatients: 19, totalVisits: 19 },
  { clinicName: "Klinik Paru dan Medik Kritis - Abiyasa", newPatients: 1, repeatPatients: 18, totalVisits: 19 },
  { clinicName: "Klinik Paru - Eksekutif Sore Non BPJS", newPatients: 2, repeatPatients: 14, totalVisits: 16, isExecutiveEvening: true },
  { clinicName: "Klinik Endokrin dan DM - Eksekutif Sore Non BPJS", newPatients: 2, repeatPatients: 14, totalVisits: 16, isExecutiveEvening: true },
  { clinicName: "Klinik Bedah Mulut - Abiyasa", newPatients: 2, repeatPatients: 8, totalVisits: 10 },
  { clinicName: "Klinik Gizi - Abiyasa", newPatients: 2, repeatPatients: 7, totalVisits: 9 },
  { clinicName: "Klinik THT - Abiyasa", newPatients: 1, repeatPatients: 6, totalVisits: 7 },
  { clinicName: "Klinik Gigi dan Mulut - Eksekutif Sore Non BPJS", newPatients: 0, repeatPatients: 4, totalVisits: 4, isExecutiveEvening: true },
  { clinicName: "Klinik Penyakit Dalam - Eksekutif Sore Non BPJS", newPatients: 0, repeatPatients: 2, totalVisits: 2, isExecutiveEvening: true },
];

export interface IgdSmfVisit {
  smf: string;
  newPatients: number;
  repeatPatients: number;
  totalVisits: number;
}

export const MARGONO_IGD_VISITS_SEPTEMBER_2026: IgdSmfVisit[] = [
  { smf: "Dokter Umum (Triase & Akut)", newPatients: 298, repeatPatients: 253, totalVisits: 551 },
  { smf: "Penyakit Dalam", newPatients: 169, repeatPatients: 360, totalVisits: 529 },
  { smf: "Kesehatan Anak (Pediatri)", newPatients: 165, repeatPatients: 89, totalVisits: 254 },
  { smf: "Saraf (Neurologi)", newPatients: 92, repeatPatients: 133, totalVisits: 225 },
  { smf: "Obstetri & Ginekologi (Obgin)", newPatients: 72, repeatPatients: 86, totalVisits: 158 },
  { smf: "Paru (Pulmonologi)", newPatients: 47, repeatPatients: 108, totalVisits: 155 },
  { smf: "Bedah Saraf", newPatients: 92, repeatPatients: 45, totalVisits: 137 },
  { smf: "Kardiologi (Jantung & Pembuluh Darah)", newPatients: 58, repeatPatients: 74, totalVisits: 132 },
  { smf: "Jiwa (Psikiatri)", newPatients: 24, repeatPatients: 72, totalVisits: 96 },
  { smf: "Hematologi Onkologi", newPatients: 15, repeatPatients: 81, totalVisits: 96 },
  { smf: "Bedah Umum", newPatients: 42, repeatPatients: 53, totalVisits: 95 },
  { smf: "Bedah Orthopedi", newPatients: 48, repeatPatients: 22, totalVisits: 70 },
  { smf: "Bedah Onkologi", newPatients: 3, repeatPatients: 57, totalVisits: 60 },
  { smf: "Bedah Digestive", newPatients: 19, repeatPatients: 24, totalVisits: 43 },
  { smf: "Bedah Thorax", newPatients: 25, repeatPatients: 12, totalVisits: 37 },
  { smf: "Bedah Anak", newPatients: 27, repeatPatients: 8, totalVisits: 35 },
  { smf: "THT (Telinga Hidung Tenggorok)", newPatients: 10, repeatPatients: 25, totalVisits: 35 },
  { smf: "Bedah Mulut", newPatients: 23, repeatPatients: 6, totalVisits: 29 },
  { smf: "Bedah Urologi", newPatients: 10, repeatPatients: 15, totalVisits: 25 },
  { smf: "Anesthesi (Resusitasi & Sedasi)", newPatients: 11, repeatPatients: 12, totalVisits: 23 },
  { smf: "Mata (Oftalmologi)", newPatients: 5, repeatPatients: 2, totalVisits: 7 },
  { smf: "Kulit & Kelamin (Dermatologi)", newPatients: 0, repeatPatients: 3, totalVisits: 3 },
  { smf: "Gizi Medik", newPatients: 0, repeatPatients: 1, totalVisits: 1 },
  { smf: "Bedah Plastik", newPatients: 0, repeatPatients: 0, totalVisits: 0 },
];

export interface InpatientWardVisit {
  wardName: string;
  malePatients: number;
  femalePatients: number;
  totalPatients: number;
  category?: 'intensif' | 'maternal_perinatal' | 'rawat_inap_umum' | 'isolasi';
}

export const MARGONO_INPATIENT_WARD_VISITS_SEPTEMBER_2026: InpatientWardVisit[] = [
  { wardName: "Wijaya Kusuma", malePatients: 237, femalePatients: 398, totalPatients: 635, category: "rawat_inap_umum" },
  { wardName: "Teratai", malePatients: 273, femalePatients: 317, totalPatients: 590, category: "rawat_inap_umum" },
  { wardName: "Seruni", malePatients: 208, femalePatients: 185, totalPatients: 393, category: "rawat_inap_umum" },
  { wardName: "Soeparjo Rustam", malePatients: 142, femalePatients: 168, totalPatients: 310, category: "rawat_inap_umum" },
  { wardName: "Mawar", malePatients: 100, femalePatients: 98, totalPatients: 198, category: "rawat_inap_umum" },
  { wardName: "Flamboyan (Maternal)", malePatients: 0, femalePatients: 193, totalPatients: 193, category: "maternal_perinatal" },
  { wardName: "Cendana", malePatients: 109, femalePatients: 77, totalPatients: 186, category: "rawat_inap_umum" },
  { wardName: "Aster", malePatients: 102, femalePatients: 83, totalPatients: 185, category: "rawat_inap_umum" },
  { wardName: "Kenanga", malePatients: 124, femalePatients: 52, totalPatients: 176, category: "rawat_inap_umum" },
  { wardName: "Asoka", malePatients: 153, femalePatients: 7, totalPatients: 160, category: "rawat_inap_umum" },
  { wardName: "Dahlia", malePatients: 3, femalePatients: 155, totalPatients: 158, category: "rawat_inap_umum" },
  { wardName: "Rosela", malePatients: 2, femalePatients: 133, totalPatients: 135, category: "rawat_inap_umum" },
  { wardName: "Anggrek", malePatients: 53, femalePatients: 45, totalPatients: 98, category: "rawat_inap_umum" },
  { wardName: "Azalea", malePatients: 42, femalePatients: 56, totalPatients: 98, category: "rawat_inap_umum" },
  { wardName: "Melati", malePatients: 54, femalePatients: 33, totalPatients: 87, category: "rawat_inap_umum" },
  { wardName: "HCU", malePatients: 28, femalePatients: 29, totalPatients: 57, category: "intensif" },
  { wardName: "ICU", malePatients: 25, femalePatients: 13, totalPatients: 38, category: "intensif" },
  { wardName: "Bougenvile Isolasi", malePatients: 20, femalePatients: 12, totalPatients: 32, category: "isolasi" },
  { wardName: "Flamboyan (Perinatal)", malePatients: 11, femalePatients: 9, totalPatients: 20, category: "maternal_perinatal" },
  { wardName: "PICU", malePatients: 12, femalePatients: 4, totalPatients: 16, category: "intensif" },
];




