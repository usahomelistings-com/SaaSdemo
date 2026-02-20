import type { Campaign } from "./campaigns";
import type { AutomationTemplate } from "./automationTemplates";
import type { Automation } from "./automations";
import type { CampaignPerformance, CloseRateByEquipmentAge } from "./performanceData";
import type { CreditTransaction } from "./creditHistory";

// Mover campaigns — same interface as contractor campaigns
export const moverCampaigns: Campaign[] = [
  { id: "MC001", name: "New Listing Moving Outreach", type: "automated", status: "Running", channel: "Direct Mail", vendor: "Postcard Mania", leadsSent: 980, creditsUsed: 980, date: "2026-02-12", roi: 4.3, responseRate: 4.8 },
  { id: "MC002", name: "Post-Move Services Bundle", type: "automated", status: "Running", channel: "Email + SMS", vendor: "Mailchimp", leadsSent: 520, creditsUsed: 520, date: "2026-02-10", roi: 3.1, responseRate: 5.6 },
  { id: "MC003", name: "Long-Distance Move Special", type: "manual", status: "Completed", channel: "Direct Mail", vendor: "MailShark", leadsSent: 650, creditsUsed: 650, date: "2026-01-28", roi: 3.8, responseRate: 3.2 },
  { id: "MC004", name: "Storage & Unpacking Promo", type: "manual", status: "Draft", channel: "Direct Mail", vendor: "", leadsSent: 0, creditsUsed: 0, date: "2026-02-15", roi: 0, responseRate: 0 },
  { id: "MC005", name: "Pre-Move Packing Service", type: "manual", status: "Completed", channel: "6x9 Postcard", vendor: "ProspectsPLUS!", leadsSent: 480, creditsUsed: 480, date: "2026-01-15", roi: 3.5, responseRate: 3.9 },
  { id: "MC006", name: "Spring Moving Season Push", type: "automated", status: "Running", channel: "Direct Mail + Email", vendor: "Postcard Mania", leadsSent: 1100, creditsUsed: 1100, date: "2026-01-15", roi: 4.1, responseRate: 4.5 },
  { id: "MC007", name: "Corporate Relocation Outreach", type: "manual", status: "Completed", channel: "Email", vendor: "Mailchimp", leadsSent: 340, creditsUsed: 340, date: "2026-01-05", roi: 5.2, responseRate: 7.1 },
  { id: "MC008", name: "Downsizer Moving Deal", type: "manual", status: "Completed", channel: "Direct Mail", vendor: "Postcard Mania", leadsSent: 720, creditsUsed: 720, date: "2025-12-20", roi: 3.9, responseRate: 4.2 },
  { id: "MC009", name: "Local Move Same-Day", type: "manual", status: "Paused", channel: "SMS", vendor: "Twilio", leadsSent: 290, creditsUsed: 290, date: "2026-01-02", roi: 2.4, responseRate: 3.1 },
  { id: "MC010", name: "Premium Home White Glove", type: "automated", status: "Running", channel: "Handwritten Card", vendor: "Postcard Mania", leadsSent: 180, creditsUsed: 180, date: "2026-02-14", roi: 6.1, responseRate: 8.3 },
  { id: "MC011", name: "January Moving Promo", type: "manual", status: "Completed", channel: "Direct Mail", vendor: "MailShark", leadsSent: 890, creditsUsed: 890, date: "2026-01-10", roi: 3.2, responseRate: 2.8 },
  { id: "MC012", name: "New Homeowner Welcome Pack", type: "automated", status: "Running", channel: "Email + SMS", vendor: "Mailchimp", leadsSent: 410, creditsUsed: 410, date: "2026-02-05", roi: 2.9, responseRate: 5.4 },
];

// Mover automation templates
export const moverAutomationTemplates: AutomationTemplate[] = [
  {
    id: "MTPL001",
    emoji: "\uD83C\uDFE0",
    name: "New Listing Outreach",
    description: "Reach homeowners the moment they list — they need a mover",
    rules: [
      { field: "Property Type", operator: "equals", value: "new_listing" },
      { field: "Move-In Date", operator: "within last", value: "7 days" },
    ],
    suggestedSchedule: "realtime",
    suggestedChannels: ["Direct Mail", "Email"],
    estimatedLeadsPerMonth: 110,
  },
  {
    id: "MTPL002",
    emoji: "\uD83D\uDCE6",
    name: "Post-Move Follow-Up",
    description: "Target recent movers for unpacking, storage, and setup services",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "30 days" },
    ],
    suggestedSchedule: "weekly",
    suggestedChannels: ["Email", "SMS"],
    estimatedLeadsPerMonth: 85,
  },
  {
    id: "MTPL003",
    emoji: "\uD83D\uDCB0",
    name: "High-Value Home Package",
    description: "Premium white-glove moving service for luxury homes",
    rules: [
      { field: "Home Value", operator: "greater than", value: 350000 },
      { field: "Property Type", operator: "equals", value: "new_listing" },
    ],
    suggestedSchedule: "realtime",
    suggestedChannels: ["Direct Mail", "Handwritten Card"],
    estimatedLeadsPerMonth: 35,
  },
  {
    id: "MTPL004",
    emoji: "\uD83D\uDE9A",
    name: "Local Move Quick Quote",
    description: "Fast quotes for local moves — respond before competitors",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "14 days" },
      { field: "Home Value", operator: "less than", value: 300000 },
    ],
    suggestedSchedule: "realtime",
    suggestedChannels: ["SMS", "Email"],
    estimatedLeadsPerMonth: 70,
  },
  {
    id: "MTPL005",
    emoji: "\u2708\uFE0F",
    name: "Long-Distance Specialist",
    description: "Capture high-value long-distance moves from new listings",
    rules: [
      { field: "Home Value", operator: "greater than", value: 300000 },
      { field: "Property Type", operator: "equals", value: "new_listing" },
    ],
    suggestedSchedule: "weekly",
    suggestedChannels: ["Direct Mail", "Phone / Dialer"],
    estimatedLeadsPerMonth: 45,
  },
];

// Mover automations
export const moverAutomations: Automation[] = [
  {
    id: "MA001",
    name: "New Listing Outreach",
    status: "active",
    rules: [
      { field: "Property Type", operator: "equals", value: "new_listing" },
      { field: "Move-In Date", operator: "within last", value: "7 days" },
    ],
    schedule: "realtime",
    scheduleDetail: "As new listings arrive",
    channels: ["Direct Mail", "Email"],
    vendors: ["Postcard Mania", "Mailchimp"],
    maxPerRun: null,
    monthlyCreditCap: 600,
    dedupWindowDays: 90,
    pauseBelowCredits: 100,
    createdDate: "2025-11-01",
    lastRunDate: "2026-02-19",
    totalExports: 2140,
    totalCreditsUsed: 2140,
    runHistory: [
      { date: "2026-02-19", matched: 32, exported: 29, creditsUsed: 29 },
      { date: "2026-02-17", matched: 28, exported: 25, creditsUsed: 25 },
      { date: "2026-02-14", matched: 35, exported: 31, creditsUsed: 31 },
      { date: "2026-02-12", matched: 22, exported: 19, creditsUsed: 19 },
      { date: "2026-02-10", matched: 30, exported: 27, creditsUsed: 27 },
      { date: "2026-02-07", matched: 26, exported: 23, creditsUsed: 23 },
    ],
  },
  {
    id: "MA002",
    name: "Post-Move Follow-Up",
    status: "active",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "30 days" },
    ],
    schedule: "weekly",
    scheduleDetail: "Every Monday",
    channels: ["Email", "SMS"],
    vendors: ["Mailchimp", "Twilio"],
    maxPerRun: 200,
    monthlyCreditCap: 800,
    dedupWindowDays: 60,
    pauseBelowCredits: 100,
    createdDate: "2025-11-15",
    lastRunDate: "2026-02-17",
    totalExports: 890,
    totalCreditsUsed: 890,
    runHistory: [
      { date: "2026-02-17", matched: 58, exported: 52, creditsUsed: 52 },
      { date: "2026-02-10", matched: 51, exported: 47, creditsUsed: 47 },
      { date: "2026-02-03", matched: 45, exported: 41, creditsUsed: 41 },
      { date: "2026-01-27", matched: 62, exported: 58, creditsUsed: 58 },
      { date: "2026-01-20", matched: 49, exported: 44, creditsUsed: 44 },
    ],
  },
  {
    id: "MA003",
    name: "Premium Home White Glove",
    status: "active",
    rules: [
      { field: "Home Value", operator: "greater than", value: 350000 },
      { field: "Property Type", operator: "equals", value: "new_listing" },
    ],
    schedule: "realtime",
    scheduleDetail: "As new data arrives",
    channels: ["Handwritten Card"],
    vendors: ["Postcard Mania"],
    maxPerRun: 50,
    monthlyCreditCap: 200,
    dedupWindowDays: 120,
    pauseBelowCredits: 50,
    createdDate: "2025-12-01",
    lastRunDate: "2026-02-18",
    totalExports: 156,
    totalCreditsUsed: 156,
    runHistory: [
      { date: "2026-02-18", matched: 8, exported: 7, creditsUsed: 7 },
      { date: "2026-02-14", matched: 6, exported: 5, creditsUsed: 5 },
      { date: "2026-02-09", matched: 10, exported: 9, creditsUsed: 9 },
      { date: "2026-02-04", matched: 7, exported: 6, creditsUsed: 6 },
    ],
  },
  {
    id: "MA004",
    name: "Local Move Quick Quote",
    status: "draft",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "14 days" },
      { field: "Home Value", operator: "less than", value: 300000 },
    ],
    schedule: "realtime",
    scheduleDetail: "As new data arrives",
    channels: ["SMS", "Email"],
    vendors: ["Twilio", "Mailchimp"],
    maxPerRun: null,
    monthlyCreditCap: 400,
    dedupWindowDays: 60,
    pauseBelowCredits: 100,
    createdDate: "2026-02-15",
    lastRunDate: null,
    totalExports: 0,
    totalCreditsUsed: 0,
    runHistory: [],
  },
];

// Mover top campaigns for performance chart
export const moverTopCampaigns: CampaignPerformance[] = [
  { name: "Premium Home White Glove", roi: 6.1, type: "automated" },
  { name: "Corporate Relocation", roi: 5.2, type: "manual" },
  { name: "New Listing Outreach", roi: 4.3, type: "automated" },
  { name: "Spring Moving Season", roi: 4.1, type: "automated" },
  { name: "Downsizer Moving Deal", roi: 3.9, type: "manual" },
  { name: "Long-Distance Special", roi: 3.8, type: "manual" },
];

// Conversion by move recency (replaces closeRateByEquipmentAge for movers)
export const closeRateByMoveRecency: CloseRateByEquipmentAge[] = [
  { range: "0-7 days", closeRate: 22.1 },
  { range: "8-14 days", closeRate: 16.4 },
  { range: "15-30 days", closeRate: 11.2 },
  { range: "31-60 days", closeRate: 6.8 },
  { range: "60+ days", closeRate: 3.1 },
];

// Mover credit history
export const moverCreditHistory: CreditTransaction[] = [
  { id: "MT001", date: "2026-02-19", description: "Auto Export", campaign: "New Listing Outreach", channel: "Direct Mail + Email", records: 29, creditsUsed: 29, type: "usage", campaignType: "automated" },
  { id: "MT002", date: "2026-02-18", description: "Auto Export", campaign: "Premium Home White Glove", channel: "Handwritten Card", records: 7, creditsUsed: 7, type: "usage", campaignType: "automated" },
  { id: "MT003", date: "2026-02-17", description: "Auto Export", campaign: "Post-Move Follow-Up", channel: "Email + SMS", records: 52, creditsUsed: 52, type: "usage", campaignType: "automated" },
  { id: "MT004", date: "2026-02-14", description: "Campaign Export", campaign: "Spring Moving Season Push", channel: "Direct Mail + Email", records: 1100, creditsUsed: 1100, type: "usage", campaignType: "automated" },
  { id: "MT005", date: "2026-02-12", description: "Campaign Export", campaign: "New Listing Outreach", channel: "Direct Mail", records: 980, creditsUsed: 980, type: "usage", campaignType: "automated" },
  { id: "MT006", date: "2026-02-10", description: "Growth Bundle (500/mo)", campaign: "\u2014", channel: "\u2014", records: 0, creditsUsed: -500, type: "purchase" },
  { id: "MT007", date: "2026-02-08", description: "Data Enrichment", campaign: "Imported List", channel: "CRM Import", records: 150, creditsUsed: 150, type: "usage", campaignType: "manual" },
  { id: "MT008", date: "2026-02-05", description: "Auto Export", campaign: "New Homeowner Welcome Pack", channel: "Email + SMS", records: 410, creditsUsed: 410, type: "usage", campaignType: "automated" },
  { id: "MT009", date: "2026-02-03", description: "Referral Bonus", campaign: "\u2014", channel: "\u2014", records: 0, creditsUsed: -500, type: "bonus" },
  { id: "MT010", date: "2026-02-01", description: "Monthly Free Credits (50)", campaign: "\u2014", channel: "\u2014", records: 0, creditsUsed: -50, type: "bonus" },
];

// Mover RuleBuilder field options
export const moverFieldOptions = [
  "Lead Score",
  "Move-In Date",
  "Home Value",
  "Property Type",
  "Phone Consent",
  "SMS Consent",
  "Email Valid",
  "ZIP Code",
  "City",
];

export const moverOperatorsByField: Record<string, string[]> = {
  "Lead Score": ["greater than", "less than", "equals"],
  "Move-In Date": ["within last", "before", "after"],
  "Home Value": ["less than", "greater than"],
  "Property Type": ["equals"],
  "Phone Consent": ["equals"],
  "SMS Consent": ["equals"],
  "Email Valid": ["equals"],
  "ZIP Code": ["equals"],
  "City": ["equals"],
};
