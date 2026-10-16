export type DataSourceStatus = 'success' | 'failed' | 'warning' | 'syncing';
export type ProtocolType = 'FHIR SATUSEHAT' | 'REST API' | 'HL7 v2' | 'Database Bridge';
export type AnomalyCategory = 'KOSONG' | 'GANDA' | 'TIDAK_WAJAR';
export type AnomalySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM';
export type AnomalyResolution = 'unresolved' | 'investigating' | 'resolved';

export interface DataSourceItem {
  id: string;
  name: string;
  shortName: string;
  faskesType: 'RS Tipe A' | 'RS Tipe B' | 'RS Tipe C' | 'RS Khusus' | 'BDRS PMI' | 'Puskesmas' | 'Dinkes';
  endpoint: string;
  protocol: ProtocolType;
  status: DataSourceStatus;
  lastSync: string;
  lastSyncExact: string;
  syncFrequency: string;
  recordsSynced: number;
  responseTimeMs: number;
  successRate: number;
  errorMessage?: string;
  apiKeyPreview: string;
  ipWhitelist: string;
  dataModules: string[];
}

export interface PipelineLogItem {
  id: string;
  timestamp: string;
  sourceId: string;
  sourceName: string;
  module: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
  durationMs: number;
  recordsIngested: number;
  details: string;
  httpStatus: number;
}

export interface DataQualityDimension {
  dimension: string;
  score: number;
  target: number;
  description: string;
  status: 'good' | 'warning' | 'critical';
  details: string;
}

export interface DataAnomalyItem {
  id: string;
  sourceId: string;
  sourceName: string;
  module: string;
  category: AnomalyCategory;
  severity: AnomalySeverity;
  fieldName: string;
  detectedAt: string;
  description: string;
  sampleValue: string;
  expectedValue: string;
  status: AnomalyResolution;
  faskesContact: string;
  impactScore: number;
}

export interface TechnicalAccountItem {
  id: string;
  name: string;
  faskesName: string;
  role: 'Super Admin Dinkes' | 'Teknisi SIMRS RS' | 'Operator BDRS' | 'System Connector Service';
  email: string;
  clientId: string;
  apiKeyMasked: string;
  rateLimit: string;
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  createdDate: string;
}

// 9 DATA SOURCES (Faskes di Banyumas)
export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: "ds-margono",
    name: "RSUD Prof. Dr. Margono Soekarjo",
    shortName: "RSUD Margono",
    faskesType: "RS Tipe A",
    endpoint: "https://simrs.margono.jatengprov.go.id/api/v2/fhir",
    protocol: "FHIR SATUSEHAT",
    status: "success",
    lastSync: "45 detik lalu",
    lastSyncExact: "16 Okt 2026 01:32:15 WIB",
    syncFrequency: "Tiap 5 Menit",
    recordsSynced: 1420,
    responseTimeMs: 142,
    successRate: 99.8,
    apiKeyPreview: "by_live_948a...e72b",
    ipWhitelist: "103.145.22.10/28",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter", "Stok Obat", "Kunjungan Pasien"],
  },
  {
    id: "ds-banyumas",
    name: "RSUD Banyumas",
    shortName: "RSUD Banyumas",
    faskesType: "RS Tipe B",
    endpoint: "https://simrs.banyumaskab.go.id/api/v1/integrasi",
    protocol: "REST API",
    status: "success",
    lastSync: "3 menit lalu",
    lastSyncExact: "16 Okt 2026 01:29:40 WIB",
    syncFrequency: "Tiap 5 Menit",
    recordsSynced: 890,
    responseTimeMs: 210,
    successRate: 99.1,
    apiKeyPreview: "by_live_612c...31fa",
    ipWhitelist: "103.111.45.18/32",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter", "Stok Obat", "Kunjungan Pasien"],
  },
  {
    id: "ds-hermina",
    name: "RS Hermina Purwokerto",
    shortName: "RS Hermina",
    faskesType: "RS Tipe C",
    endpoint: "https://api-gateway.herminahospitals.com/banyumas/v1",
    protocol: "REST API",
    status: "success",
    lastSync: "5 menit lalu",
    lastSyncExact: "16 Okt 2026 01:27:12 WIB",
    syncFrequency: "Tiap 10 Menit",
    recordsSynced: 640,
    responseTimeMs: 185,
    successRate: 98.6,
    apiKeyPreview: "by_live_550d...88aa",
    ipWhitelist: "182.253.110.5/30",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter", "Kunjungan Pasien"],
  },
  {
    id: "ds-wijayakusuma",
    name: "RS Wijayakusuma (DKT)",
    shortName: "RS DKT Wijayakusuma",
    faskesType: "RS Tipe C",
    endpoint: "https://simrs.rswijayakusuma.mil.id/connector/v1",
    protocol: "Database Bridge",
    status: "failed",
    lastSync: "42 menit lalu (Gagal)",
    lastSyncExact: "16 Okt 2026 00:50:18 WIB",
    syncFrequency: "Tiap 15 Menit",
    recordsSynced: 0,
    responseTimeMs: 5120,
    successRate: 74.2,
    errorMessage: "HTTP 504 Gateway Timeout: SIMRS Socket Hang Up (Koneksi VPN Server Terputus)",
    apiKeyPreview: "by_live_771f...99bc",
    ipWhitelist: "114.125.80.12/32",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter"],
  },
  {
    id: "ds-islam",
    name: "RS Islam Purwokerto",
    shortName: "RSI Purwokerto",
    faskesType: "RS Tipe C",
    endpoint: "https://simrs.rsipurwokerto.co.id/api/sync",
    protocol: "REST API",
    status: "success",
    lastSync: "7 menit lalu",
    lastSyncExact: "16 Okt 2026 01:25:30 WIB",
    syncFrequency: "Tiap 10 Menit",
    recordsSynced: 520,
    responseTimeMs: 290,
    successRate: 97.4,
    apiKeyPreview: "by_live_334b...12ef",
    ipWhitelist: "103.247.10.88/32",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter", "Stok Obat"],
  },
  {
    id: "ds-siaga",
    name: "RSU Siaga Medika Banyumas",
    shortName: "RSU Siaga Medika",
    faskesType: "RS Tipe C",
    endpoint: "https://siagamedika.co.id/bridge/satusehat",
    protocol: "FHIR SATUSEHAT",
    status: "warning",
    lastSync: "18 menit lalu",
    lastSyncExact: "16 Okt 2026 01:14:02 WIB",
    syncFrequency: "Tiap 15 Menit",
    recordsSynced: 310,
    responseTimeMs: 1250,
    successRate: 88.5,
    errorMessage: "Payload Warning: 14 baris Encounter tidak memiliki format NIK standar (null/invalid)",
    apiKeyPreview: "by_live_901c...44ee",
    ipWhitelist: "103.155.60.2/32",
    dataModules: ["Kamar SIRANAP", "Jadwal Dokter", "Kunjungan Pasien"],
  },
  {
    id: "ds-pmi",
    name: "UDD PMI Kabupaten Banyumas (SIMDONDAR)",
    shortName: "PMI SIMDONDAR",
    faskesType: "BDRS PMI",
    endpoint: "https://simdondar.pmibanyumas.or.id/api/v2/stock",
    protocol: "REST API",
    status: "success",
    lastSync: "2 menit lalu",
    lastSyncExact: "16 Okt 2026 01:30:55 WIB",
    syncFrequency: "Tiap 5 Menit",
    recordsSynced: 180,
    responseTimeMs: 95,
    successRate: 100.0,
    apiKeyPreview: "by_live_112a...77dd",
    ipWhitelist: "103.88.20.15/32",
    dataModules: ["Bank Darah (BDRS)"],
  },
  {
    id: "ds-farmasi-dinkes",
    name: "Gudang Farmasi Dinkes Banyumas (E-Logistik)",
    shortName: "E-Logistik Farmasi",
    faskesType: "Dinkes",
    endpoint: "https://farmasi.banyumaskab.go.id/api/v1/rko",
    protocol: "FHIR SATUSEHAT",
    status: "success",
    lastSync: "12 menit lalu",
    lastSyncExact: "16 Okt 2026 01:20:41 WIB",
    syncFrequency: "Tiap 15 Menit",
    recordsSynced: 940,
    responseTimeMs: 160,
    successRate: 99.5,
    apiKeyPreview: "by_live_449f...22aa",
    ipWhitelist: "103.111.45.0/24",
    dataModules: ["Stok Obat Esensial & PRB"],
  },
  {
    id: "ds-puskesmas-pwt-timur",
    name: "Puskesmas Purwokerto Timur I (Bridge P-Care)",
    shortName: "Puskesmas PWT Timur I",
    faskesType: "Puskesmas",
    endpoint: "https://pcare.bpjs-kesehatan.go.id/bridge/banyumas/0122",
    protocol: "REST API",
    status: "success",
    lastSync: "15 menit lalu",
    lastSyncExact: "16 Okt 2026 01:17:19 WIB",
    syncFrequency: "Tiap 30 Menit",
    recordsSynced: 320,
    responseTimeMs: 180,
    successRate: 98.2,
    apiKeyPreview: "by_live_887e...55ab",
    ipWhitelist: "103.111.45.92/32",
    dataModules: ["Rujukan Pertama", "Obat PRB"],
  },
];

// PIPELINE LOGS (Riwayat Tarik Data)
export const PIPELINE_LOGS: PipelineLogItem[] = [
  {
    id: "log-101",
    timestamp: "01:32:15 WIB",
    sourceId: "ds-margono",
    sourceName: "RSUD Prof. Dr. Margono Soekarjo",
    module: "Kamar SIRANAP",
    status: "SUCCESS",
    durationMs: 142,
    recordsIngested: 84,
    details: "Sinkronisasi 155 bed kosong dan okupansi 79% (kapasitas 728 bed) sukses diterima via FHIR Observation.",
    httpStatus: 200,
  },
  {
    id: "log-102",
    timestamp: "01:30:55 WIB",
    sourceId: "ds-pmi",
    sourceName: "UDD PMI Banyumas (SIMDONDAR)",
    module: "Bank Darah (BDRS)",
    status: "SUCCESS",
    durationMs: 95,
    recordsIngested: 48,
    details: "Pembaruan 48 kantong darah terkonsolidasi dari 6 BDRS faskes se-Banyumas.",
    httpStatus: 200,
  },
  {
    id: "log-103",
    timestamp: "01:29:40 WIB",
    sourceId: "ds-banyumas",
    sourceName: "RSUD Banyumas",
    module: "Jadwal Dokter",
    status: "SUCCESS",
    durationMs: 210,
    recordsIngested: 16,
    details: "Update jadwal praktik 16 dokter spesialis poliklinik shift pagi/siang.",
    httpStatus: 200,
  },
  {
    id: "log-104",
    timestamp: "01:27:12 WIB",
    sourceId: "ds-hermina",
    sourceName: "RS Hermina Purwokerto",
    module: "Kunjungan Pasien",
    status: "SUCCESS",
    durationMs: 185,
    recordsIngested: 112,
    details: "Data triase IGD dan kunjungan rawat inap terverifikasi masuk antrean sinkron.",
    httpStatus: 200,
  },
  {
    id: "log-105",
    timestamp: "01:20:41 WIB",
    sourceId: "ds-margono",
    sourceName: "Instalasi Farmasi RSUD Margono",
    module: "Rekap Resep Farmasi",
    status: "SUCCESS",
    durationMs: 160,
    recordsIngested: 73140,
    details: "Rekapitulasi 73.140 resep September 2026 dari 14 Depo Farmasi RSMS & Paviliun Abiyasa tersinkron via SIMRS FHIR.",
    httpStatus: 200,
  },
  {
    id: "log-106",
    timestamp: "01:14:02 WIB",
    sourceId: "ds-siaga",
    sourceName: "RSU Siaga Medika",
    module: "Kunjungan Pasien",
    status: "WARNING",
    durationMs: 1250,
    recordsIngested: 310,
    details: "14 entri Encounter pasien rawat jalan memiliki kolom NIK null, otomatis ditandai anomali.",
    httpStatus: 206,
  },
  {
    id: "log-107",
    timestamp: "00:50:18 WIB",
    sourceId: "ds-wijayakusuma",
    sourceName: "RS Wijayakusuma (DKT)",
    module: "Kamar SIRANAP",
    status: "FAILED",
    durationMs: 5120,
    recordsIngested: 0,
    details: "HTTP 504 Gateway Timeout: Endpoint database bridge tidak merespons dalam 5 detik.",
    httpStatus: 504,
  },
  {
    id: "log-108",
    timestamp: "00:45:22 WIB",
    sourceId: "ds-margono",
    sourceName: "Instalasi Penunjang Medis RSUD Margono",
    module: "Kunjungan Penunjang Medis",
    status: "SUCCESS",
    durationMs: 145,
    recordsIngested: 39195,
    details: "Kunjungan penunjang medis Agustus 2026 (Radiologi, Lab PK/PA, Bank Darah, Hemodialisa, Rehab Medik: 39.195 kunjungan) tersinkron via SIMRS FHIR.",
    httpStatus: 200,
  },
  {
    id: "log-109",
    timestamp: "00:40:05 WIB",
    sourceId: "ds-margono",
    sourceName: "Poliklinik Paviliun Abiyasa RSUD Margono",
    module: "Kunjungan Rawat Jalan",
    status: "SUCCESS",
    durationMs: 172,
    recordsIngested: 3265,
    details: "Kunjungan rawat jalan September 2026 Paviliun Abiyasa (3.265 pasien di 48 poliklinik/eksekutif) tersinkron via SIMRS FHIR Encounter.",
    httpStatus: 200,
  },
  {
    id: "log-110",
    timestamp: "00:35:14 WIB",
    sourceId: "ds-margono",
    sourceName: "Instalasi Gawat Darurat (IGD) RSUD Margono",
    module: "Triase & Kunjungan IGD",
    status: "SUCCESS",
    durationMs: 138,
    recordsIngested: 2796,
    details: "Kunjungan IGD September 2026 (2.796 pasien: 1.255 baru, 1.541 lama) dari 24 SMF terverifikasi masuk antrean sinkron.",
    httpStatus: 200,
  },
  {
    id: "log-111",
    timestamp: "00:30:45 WIB",
    sourceId: "ds-margono",
    sourceName: "Instalasi Rawat Inap RSUD Margono",
    module: "Admisi & Sensus Rawat Inap",
    status: "SUCCESS",
    durationMs: 165,
    recordsIngested: 3765,
    details: "Sensus pasien rawat inap September 2026 (3.765 pasien: 1.698 pria, 2.067 wanita) dari 20 bangsal/ruangan berhasil disinkronkan via SIMRS FHIR Encounter.",
    httpStatus: 200,
  },
];

// DATA QUALITY METRICS (4 Dimensi Standar DWH & SATUSEHAT)
export const DATA_QUALITY_DIMENSIONS: DataQualityDimension[] = [
  {
    dimension: "Kelengkapan (Completeness)",
    score: 97.8,
    target: 98.0,
    description: "Persentase field wajib (NIK, No. Kamar, Batch Obat, Golongan Darah) terisi lengkap tanpa nilai null/kosong.",
    status: "good",
    details: "Ditemukan 7 kasus data kosong pada 2 rumah sakit (NIK pasien & expired date obat).",
  },
  {
    dimension: "Keunikan (Uniqueness)",
    score: 98.9,
    target: 99.5,
    description: "Persentase data transaksi tanpa duplikasi kunci primer (No. Booking antrean, SIP dokter, kode kantong darah).",
    status: "good",
    details: "Ditemukan 5 kasus duplikasi (1 jadwal dokter overlap antar RS, 1 barcode darah, 1 booking antrean).",
  },
  {
    dimension: "Keabsahan & Kewajaran (Plausibility)",
    score: 94.2,
    target: 96.0,
    description: "Kesesuaian nilai dengan domain klinis wajar (stok non-negatif, BOR < 150%, umur 0-120 tahun).",
    status: "warning",
    details: "Ditemukan 6 nilai tidak wajar (stok obat minus -14, BOR kamar terinput 185%, tahun lahir 2035).",
  },
  {
    dimension: "Ketepatan Waktu (Timeliness)",
    score: 93.6,
    target: 95.0,
    description: "Kecepatan pembaruan data dari faskes ke data hub pusat (toleransi latensi maksimal 15 menit).",
    status: "warning",
    details: "RS Wijayakusuma mengalami kegagalan sync > 40 menit, menurunkan agregat ketepatan waktu.",
  },
];

// DATA ANOMALIES (Peringatan data bermasalah: Kosong, Ganda, Tidak Wajar)
export const DATA_ANOMALIES: DataAnomalyItem[] = [
  // Kategori 1: DATA KOSONG
  {
    id: "anom-01",
    sourceId: "ds-banyumas",
    sourceName: "RSUD Banyumas",
    module: "Pendaftaran Rawat Inap",
    category: "KOSONG",
    severity: "CRITICAL",
    fieldName: "patient_nik (Nomor Induk Kependudukan)",
    detectedAt: "16 Okt 2026 01:15 WIB",
    description: "Ditemukan 8 baris registrasi admisi rawat inap baru dengan nilai NIK kosong (NULL / String Kosong). Menyebabkan kegagalan bridging klaim BPJS & SATUSEHAT.",
    sampleValue: "nik: null, nama: 'Tn. S****'",
    expectedValue: "Format 16 Digit Angka NIK Valid",
    status: "unresolved",
    faskesContact: "IT SIMRS RSUD Banyumas (0281-796031 Ext. 102)",
    impactScore: 92,
  },
  {
    id: "anom-02",
    sourceId: "ds-islam",
    sourceName: "RS Islam Purwokerto",
    module: "Depo Farmasi Rawat Jalan",
    category: "KOSONG",
    severity: "HIGH",
    fieldName: "batch_expiry_date (Tanggal Kedaluwarsa)",
    detectedAt: "16 Okt 2026 00:45 WIB",
    description: "12 item sediaan antibiotik Cefotaxime 1g diinput tanpa mencantumkan tanggal kedaluwarsa pada manifest batch logistik.",
    sampleValue: "exp_date: '' (empty string)",
    expectedValue: "Format YYYY-MM-DD",
    status: "investigating",
    faskesContact: "Instalasi Farmasi RSI Purwokerto (0281-630019)",
    impactScore: 78,
  },
  {
    id: "anom-03",
    sourceId: "ds-siaga",
    sourceName: "RSU Siaga Medika",
    module: "Direktori Faskes & Kontak",
    category: "KOSONG",
    severity: "MEDIUM",
    fieldName: "emergency_hotline (Kontak Darurat IGD)",
    detectedAt: "15 Okt 2026 23:20 WIB",
    description: "Field nomor telepon darurat unit IGD ekstensi malam terhapus pada data master faskes.",
    sampleValue: "phone: null",
    expectedValue: "Nomor telepon faskes dengan kode area (0281)",
    status: "unresolved",
    faskesContact: "Admin Humas Siaga Medika (0281-796100)",
    impactScore: 65,
  },

  // Kategori 2: DATA GANDA
  {
    id: "anom-04",
    sourceId: "ds-margono",
    sourceName: "RSUD Margono & RS Hermina",
    module: "Jadwal Praktik Dokter",
    category: "GANDA",
    severity: "CRITICAL",
    fieldName: "doctor_schedule_overlap (SIP: 446/SIP.SP/082/2021)",
    detectedAt: "16 Okt 2026 01:05 WIB",
    description: "Dokter Spesialis yang sama (dr. Anton Nugroho, Sp.PD) terdaftar memiliki jam dinas tatap muka aktif bersamaan di dua rumah sakit berbeda (Kamis, 09.00 - 11.00 WIB).",
    sampleValue: "RSUD Margono (09:00-12:00) vs RS Hermina (09:00-11:30)",
    expectedValue: "Non-overlapping shift praktek dokter antar faskes",
    status: "investigating",
    faskesContact: "Bagian Yanmed Dinkes & Komite Medis",
    impactScore: 95,
  },
  {
    id: "anom-05",
    sourceId: "ds-wijayakusuma",
    sourceName: "RS Wijayakusuma (DKT)",
    module: "Antrean Online Poliklinik",
    category: "GANDA",
    severity: "HIGH",
    fieldName: "booking_code_duplicate (Kode Booking)",
    detectedAt: "15 Okt 2026 22:40 WIB",
    description: "Kode antrean registrasi online 'ANT-WJY-20261016-042' tercatat ganda untuk dua nama pasien berbeda pada Poli Bedah Umum.",
    sampleValue: "Kode: ANT-WJY-20261016-042 (2 Pasien)",
    expectedValue: "Unique Transaction UUID / Sequence",
    status: "unresolved",
    faskesContact: "Tim SIMRS RS Wijayakusuma",
    impactScore: 82,
  },
  {
    id: "anom-06",
    sourceId: "ds-pmi",
    sourceName: "UDD PMI Kabupaten Banyumas",
    module: "Manajemen Darah (BDRS)",
    category: "GANDA",
    severity: "HIGH",
    fieldName: "blood_bag_barcode (Nomor Kantong Darah)",
    detectedAt: "15 Okt 2026 19:10 WIB",
    description: "Barcode kantong darah 'WB-202610-8812' golongan O+ terdata di dua lemari penyimpanan pendingin berbeda.",
    sampleValue: "Barcode: WB-202610-8812 (Chiller A2 & Chiller B1)",
    expectedValue: "Satu barcode unik per unit kantong darah",
    status: "resolved",
    faskesContact: "Petugas Verifikasi Lab UDD PMI",
    impactScore: 80,
  },

  // Kategori 3: DATA TIDAK WAJAR
  {
    id: "anom-07",
    sourceId: "ds-banyumas",
    sourceName: "RSUD Banyumas",
    module: "Sistem Logistik Farmasi",
    category: "TIDAK_WAJAR",
    severity: "CRITICAL",
    fieldName: "stock_quantity (Kuantitas Stok Sediaan)",
    detectedAt: "16 Okt 2026 00:58 WIB",
    description: "Stok sediaan terapi vital Insulin Glargine 100 IU/ml tercatat bernilai negatif (-14 Pen) pada SIMRS akibat transaksi pengeluaran melebihi saldo awal tanpa re-stok.",
    sampleValue: "current_stock: -14",
    expectedValue: "Integer >= 0 (Stok fisik riil non-negatif)",
    status: "unresolved",
    faskesContact: "Kepala Depo Farmasi RSUD Banyumas",
    impactScore: 90,
  },
  {
    id: "anom-08",
    sourceId: "ds-margono",
    sourceName: "RSUD Prof. Dr. Margono Soekarjo",
    module: "Kapasitas Kamar SIRANAP",
    category: "TIDAK_WAJAR",
    severity: "HIGH",
    fieldName: "bed_occupancy_rate (BOR Bangsal)",
    detectedAt: "15 Okt 2026 21:30 WIB",
    description: "Okupansi Bangsal Melati Kelas 1 terinput 185% (tercatat 37 pasien ranap aktif pada kapasitas tempat tidur fisik 20 bed). Mengindikasikan salah pemetaan bangsal.",
    sampleValue: "filled_beds: 37, total_beds: 20 (BOR: 185%)",
    expectedValue: "BOR normal <= 100% dari kapasitas tempat tidur",
    status: "investigating",
    faskesContact: "Operator SIRANAP RSUD Margono",
    impactScore: 84,
  },
  {
    id: "anom-09",
    sourceId: "ds-hermina",
    sourceName: "RS Hermina Purwokerto",
    module: "Master Pasien (EMR)",
    category: "TIDAK_WAJAR",
    severity: "MEDIUM",
    fieldName: "birth_date (Tanggal Lahir Pasien)",
    detectedAt: "15 Okt 2026 18:22 WIB",
    description: "Tanggal lahir pasien poli anak tercatat '2035-08-12' (Tahun di masa depan karena kesalahan ketik petugas pendaftaran).",
    sampleValue: "birth_date: '2035-08-12'",
    expectedValue: "Tanggal lahir <= Tanggal hari ini (2026)",
    status: "resolved",
    faskesContact: "Supervisor Rekam Medis RS Hermina",
    impactScore: 60,
  },
  {
    id: "anom-10",
    sourceId: "ds-siaga",
    sourceName: "RSU Siaga Medika",
    module: "Kunjungan & Pelayanan Poliklinik",
    category: "TIDAK_WAJAR",
    severity: "MEDIUM",
    fieldName: "encounter_duration (Durasi Konsultasi)",
    detectedAt: "15 Okt 2026 17:05 WIB",
    description: "Durasi encounter rawat jalan tercatat 1.840 menit (>30 jam berturut-turut) karena dokter tidak menekan tombol selesai konsultasi di sistem EMR.",
    sampleValue: "duration_minutes: 1840",
    expectedValue: "Durasi periksa wajar: 5 - 120 menit",
    status: "unresolved",
    faskesContact: "Unit Penjaminan Mutu RS Siaga Medika",
    impactScore: 55,
  },
];

// TECHNICAL ACCOUNTS & CREDENTIALS
export const TECHNICAL_ACCOUNTS: TechnicalAccountItem[] = [
  {
    id: "acc-01",
    name: "Arya Prabowo, S.Kom",
    faskesName: "Dinas Kesehatan Kab. Banyumas",
    role: "Super Admin Dinkes",
    email: "arya.prabowo@banyumaskab.go.id",
    clientId: "dinkes_master_sys_01",
    apiKeyMasked: "by_live_master_99812a...009f",
    rateLimit: "5000 req/min",
    status: "active",
    lastActive: "1 menit lalu",
    createdDate: "12 Jan 2025",
  },
  {
    id: "acc-02",
    name: "Bambang Triyono, S.T",
    faskesName: "RSUD Prof. Dr. Margono Soekarjo",
    role: "Teknisi SIMRS RS",
    email: "simrs@margono.jatengprov.go.id",
    clientId: "client_margono_fhir_v2",
    apiKeyMasked: "by_live_948afbc...e72b",
    rateLimit: "1200 req/min",
    status: "active",
    lastActive: "45 detik lalu",
    createdDate: "05 Feb 2025",
  },
  {
    id: "acc-03",
    name: "Cahyo Wibowo, S.Kom",
    faskesName: "RSUD Banyumas",
    role: "Teknisi SIMRS RS",
    email: "it.rsud@banyumaskab.go.id",
    clientId: "client_rsudbms_rest_v1",
    apiKeyMasked: "by_live_612cfa...31fa",
    rateLimit: "1000 req/min",
    status: "active",
    lastActive: "3 menit lalu",
    createdDate: "18 Feb 2025",
  },
  {
    id: "acc-04",
    name: "Kapten Ckm dr. Danang",
    faskesName: "RS Wijayakusuma (DKT)",
    role: "Teknisi SIMRS RS",
    email: "simrs@rswijayakusuma.mil.id",
    clientId: "client_dkt_bridge_v1",
    apiKeyMasked: "by_live_771f89...99bc",
    rateLimit: "500 req/min",
    status: "suspended",
    lastActive: "42 menit lalu (Error 504)",
    createdDate: "02 Mar 2025",
  },
  {
    id: "acc-05",
    name: "Larasati Dewi, A.Md.Kes",
    faskesName: "UDD PMI Kabupaten Banyumas",
    role: "Operator BDRS",
    email: "bdrs@pmibanyumas.or.id",
    clientId: "client_pmi_simdondar",
    apiKeyMasked: "by_live_112a91...77dd",
    rateLimit: "800 req/min",
    status: "active",
    lastActive: "2 menit lalu",
    createdDate: "10 Mar 2025",
  },
];
