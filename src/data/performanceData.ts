export interface MonthlyPerformance {
  month: string;
  leads: number;
  jobsBooked: number;
  revenue: number;
  mailLeads: number;
  smsLeads: number;
  emailLeads: number;
  phoneLeads: number;
  autoLeads: number;
  manualLeads: number;
}

export const monthlyPerformance: MonthlyPerformance[] = [
  { month: "Sep 2025", leads: 312, jobsBooked: 47, revenue: 21200, mailLeads: 180, smsLeads: 52, emailLeads: 65, phoneLeads: 15, autoLeads: 94, manualLeads: 218 },
  { month: "Oct 2025", leads: 389, jobsBooked: 58, revenue: 26100, mailLeads: 210, smsLeads: 68, emailLeads: 89, phoneLeads: 22, autoLeads: 148, manualLeads: 241 },
  { month: "Nov 2025", leads: 445, jobsBooked: 67, revenue: 30100, mailLeads: 245, smsLeads: 78, emailLeads: 95, phoneLeads: 27, autoLeads: 200, manualLeads: 245 },
  { month: "Dec 2025", leads: 521, jobsBooked: 78, revenue: 35200, mailLeads: 290, smsLeads: 92, emailLeads: 108, phoneLeads: 31, autoLeads: 271, manualLeads: 250 },
  { month: "Jan 2026", leads: 624, jobsBooked: 94, revenue: 42300, mailLeads: 340, smsLeads: 110, emailLeads: 135, phoneLeads: 39, autoLeads: 362, manualLeads: 262 },
  { month: "Feb 2026", leads: 556, jobsBooked: 79, revenue: 34500, mailLeads: 300, smsLeads: 98, emailLeads: 122, phoneLeads: 36, autoLeads: 345, manualLeads: 211 },
];

export interface CloseRateByEquipmentAge {
  range: string;
  closeRate: number;
}

export const closeRateByEquipmentAge: CloseRateByEquipmentAge[] = [
  { range: "0-5 yrs", closeRate: 3.4 },
  { range: "5-10 yrs", closeRate: 6.1 },
  { range: "10-15 yrs", closeRate: 9.8 },
  { range: "15-20 yrs", closeRate: 14.2 },
  { range: "20+ yrs", closeRate: 18.5 },
];

export interface ZipPerformance {
  zip: string;
  area: string;
  leads: number;
  revenue: number;
}

export const topZips: ZipPerformance[] = [
  { zip: "41091", area: "Union", leads: 487, revenue: 32800 },
  { zip: "41042", area: "Florence", leads: 412, revenue: 28100 },
  { zip: "41018", area: "Erlanger", leads: 356, revenue: 24300 },
  { zip: "41005", area: "Burlington", leads: 298, revenue: 20100 },
  { zip: "41048", area: "Hebron", leads: 267, revenue: 18200 },
  { zip: "41017", area: "Fort Mitchell", leads: 234, revenue: 15900 },
  { zip: "41011", area: "Covington", leads: 198, revenue: 13400 },
  { zip: "41051", area: "Independence", leads: 176, revenue: 11900 },
];

export interface CampaignPerformance {
  name: string;
  roi: number;
  type: "manual" | "automated";
}

export interface ConversionByLeadScore {
  range: string;
  conversionRate: number;
  count: number;
}

export const conversionByLeadScore: ConversionByLeadScore[] = [
  { range: "1-2 (Cold)", conversionRate: 2.1, count: 312 },
  { range: "3-4 (Cold)", conversionRate: 4.8, count: 486 },
  { range: "5-6 (Warm)", conversionRate: 8.6, count: 621 },
  { range: "7 (Warm)", conversionRate: 12.3, count: 389 },
  { range: "8-9 (Hot)", conversionRate: 18.7, count: 245 },
  { range: "10 (Hot)", conversionRate: 24.2, count: 94 },
];

export const topCampaigns: CampaignPerformance[] = [
  { name: "Holiday HVAC Deal", roi: 4.5, type: "manual" },
  { name: "Spring HVAC Tune-Up", roi: 4.1, type: "automated" },
  { name: "Furnace Check Special", roi: 3.8, type: "manual" },
  { name: "Aging Equipment Outreach", roi: 3.6, type: "automated" },
  { name: "Emergency AC Campaign", roi: 3.5, type: "manual" },
  { name: "Smart Thermostat Promo", roi: 3.2, type: "automated" },
];
