export interface BedRoomDetail {
  id: string;
  label: string;
  available: number;
  total?: number;
  status: 'available' | 'limited' | 'full';
}

export interface Hospital {
  id: string;
  name: string;
  typeBadge: string;
  typeCategory: 'RSUD' | 'Swasta' | 'TNI' | 'Khusus';
  address: string;
  area: string;
  postalCode?: string;
  phone: string;
  emergencyPhone: string;
  callCenter?: string;
  services: string[];
  totalAvailableBeds: number;
  occupancyRate: number; // percentage, e.g. 78
  rooms: BedRoomDetail[];
  googleMapsUrl?: string;
  isIGDOpen24H: boolean;
}

export interface Puskesmas {
  id: string;
  name: string;
  kecamatan: string;
  address: string;
  phone: string;
  hasInpatient: boolean; // Rawat Inap atau Non-Rawat Inap
  emergencyPhone?: string;
}

export interface DoctorHospitalSchedule {
  hospitalId: string;
  hospitalName: string;
  schedule: string;
  clinicRoom: string;
  days?: string;
  quotaTotal: number;
  quotaRemaining: number;
  isQueueOpen: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyCategory: string; // e.g. 'Sp.PD', 'Sp.A', 'Sp.JP', 'Sp.OG', 'Sp.B', 'Sp.S', 'Sp.M', 'Sp.THT'
  photoUrl: string;
  hospitals: DoctorHospitalSchedule[];
  // Primary practice info (also serves as default/backwards-compatible properties)
  hospitalId: string;
  hospitalName: string;
  schedule: string;
  clinicRoom: string;
  quotaTotal: number;
  quotaRemaining: number;
  isQueueOpen: boolean;
}

export type MedicineCategoryType =
  | 'all'
  | 'kronis'
  | 'antibiotik'
  | 'kardiovaskular'
  | 'sabu'
  | 'onkologi';

export interface Medicine {
  id: string;
  name: string;
  subname: string;
  category: MedicineCategoryType;
  categoryBadge: string;
  isHardDrug: boolean;
  hospitals: string;
  depo: string;
  stock: number;
  phone: string;
  extension?: string;
}

export interface BloodStockItem {
  bloodType: 'A+' | 'B+' | 'O+' | 'AB+' | 'Rh (-)';
  count: number;
  status: 'safe' | 'limited' | 'critical' | 'special';
  subtitle: string;
  statusBadge?: string;
}

export interface BloodTypeBreakdown {
  a: number;
  b: number;
  o: number;
  ab: number;
  rhNeg?: number;
}

export interface BloodLocationStock {
  id: string;
  name: string;
  address: string;
  stockCount: number;
  statusText: string;
  breakdown: BloodTypeBreakdown;
}

export interface BloodDonorEvent {
  id: string;
  date: string;
  time: string;
  location: string;
  unit: string;
  notes?: string;
}

export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  label: string;
  subtitle: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'error' | 'tertiary';
}
