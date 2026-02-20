export interface AutomationRule {
  field: string;
  operator: string;
  value: string | number;
}

export interface AutomationRunEntry {
  date: string;
  matched: number;
  exported: number;
  creditsUsed: number;
}

export interface Automation {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  rules: AutomationRule[];
  schedule: "realtime" | "weekly" | "biweekly" | "monthly";
  scheduleDetail?: string;
  channels: string[];
  vendors: string[];
  maxPerRun: number | null;
  monthlyCreditCap: number | null;
  dedupWindowDays: number;
  pauseBelowCredits: number;
  createdDate: string;
  lastRunDate: string | null;
  totalExports: number;
  totalCreditsUsed: number;
  runHistory: AutomationRunEntry[];
}

export const automations: Automation[] = [
  {
    id: "A001",
    name: "New Homeowner Welcome",
    status: "active",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "30 days" },
    ],
    schedule: "realtime",
    scheduleDetail: "As new data arrives",
    channels: ["Email", "SMS"],
    vendors: ["Mailchimp", "Twilio"],
    maxPerRun: null,
    monthlyCreditCap: 500,
    dedupWindowDays: 90,
    pauseBelowCredits: 100,
    createdDate: "2025-11-01",
    lastRunDate: "2026-02-19",
    totalExports: 1847,
    totalCreditsUsed: 1847,
    runHistory: [
      { date: "2026-02-19", matched: 25, exported: 23, creditsUsed: 23 },
      { date: "2026-02-17", matched: 20, exported: 18, creditsUsed: 18 },
      { date: "2026-02-14", matched: 31, exported: 28, creditsUsed: 28 },
      { date: "2026-02-12", matched: 18, exported: 15, creditsUsed: 15 },
      { date: "2026-02-10", matched: 22, exported: 19, creditsUsed: 19 },
      { date: "2026-02-07", matched: 27, exported: 24, creditsUsed: 24 },
    ],
  },
  {
    id: "A002",
    name: "Aging HVAC Outreach",
    status: "active",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: 10 },
    ],
    schedule: "weekly",
    scheduleDetail: "Every Monday",
    channels: ["Direct Mail", "Email"],
    vendors: ["Postcard Mania", "Mailchimp"],
    maxPerRun: 250,
    monthlyCreditCap: 1000,
    dedupWindowDays: 90,
    pauseBelowCredits: 100,
    createdDate: "2025-11-15",
    lastRunDate: "2026-02-17",
    totalExports: 623,
    totalCreditsUsed: 623,
    runHistory: [
      { date: "2026-02-17", matched: 72, exported: 67, creditsUsed: 67 },
      { date: "2026-02-10", matched: 65, exported: 61, creditsUsed: 61 },
      { date: "2026-02-03", matched: 58, exported: 54, creditsUsed: 54 },
      { date: "2026-01-27", matched: 70, exported: 68, creditsUsed: 68 },
      { date: "2026-01-20", matched: 63, exported: 59, creditsUsed: 59 },
    ],
  },
  {
    id: "A003",
    name: "Critical Equipment Alert",
    status: "paused",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: 15 },
    ],
    schedule: "realtime",
    scheduleDetail: "As new data arrives",
    channels: ["Direct Mail"],
    vendors: ["MailShark"],
    maxPerRun: 100,
    monthlyCreditCap: 300,
    dedupWindowDays: 90,
    pauseBelowCredits: 50,
    createdDate: "2025-12-01",
    lastRunDate: "2026-02-10",
    totalExports: 234,
    totalCreditsUsed: 234,
    runHistory: [
      { date: "2026-02-10", matched: 14, exported: 12, creditsUsed: 12 },
      { date: "2026-02-05", matched: 11, exported: 9, creditsUsed: 9 },
      { date: "2026-01-30", matched: 18, exported: 16, creditsUsed: 16 },
      { date: "2026-01-25", matched: 13, exported: 11, creditsUsed: 11 },
    ],
  },
  {
    id: "A004",
    name: "Water Heater Campaign",
    status: "draft",
    rules: [
      { field: "Water Heater Age", operator: "greater than", value: 8 },
    ],
    schedule: "monthly",
    scheduleDetail: "1st of each month",
    channels: ["Direct Mail"],
    vendors: ["ProspectsPLUS!"],
    maxPerRun: null,
    monthlyCreditCap: 500,
    dedupWindowDays: 180,
    pauseBelowCredits: 100,
    createdDate: "2026-02-15",
    lastRunDate: null,
    totalExports: 0,
    totalCreditsUsed: 0,
    runHistory: [],
  },
];
