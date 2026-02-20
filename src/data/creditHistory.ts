export interface CreditTransaction {
  id: string;
  date: string;
  description: string;
  campaign: string;
  channel: string;
  records: number;
  creditsUsed: number;
  type: "usage" | "purchase" | "bonus" | "refund";
  campaignType?: "manual" | "automated";
}

export const creditHistory: CreditTransaction[] = [
  { id: "T001", date: "2026-02-19", description: "Auto Export", campaign: "New Homeowner Welcome", channel: "Email + SMS", records: 23, creditsUsed: 23, type: "usage", campaignType: "automated" },
  { id: "T002", date: "2026-02-17", description: "Auto Export", campaign: "Aging Equipment Outreach", channel: "Direct Mail + Email", records: 67, creditsUsed: 67, type: "usage", campaignType: "automated" },
  { id: "T003", date: "2026-02-14", description: "Campaign Export", campaign: "Smart Thermostat Promo", channel: "Email + SMS", records: 280, creditsUsed: 280, type: "usage", campaignType: "automated" },
  { id: "T004", date: "2026-02-12", description: "Campaign Export", campaign: "Spring HVAC Tune-Up", channel: "Direct Mail", records: 1200, creditsUsed: 1200, type: "usage", campaignType: "automated" },
  { id: "T005", date: "2026-02-10", description: "Auto Export", campaign: "New Homeowner Welcome", channel: "Email + SMS", records: 18, creditsUsed: 18, type: "usage", campaignType: "automated" },
  { id: "T006", date: "2026-02-10", description: "Growth Bundle (500/mo)", campaign: "—", channel: "—", records: 0, creditsUsed: -500, type: "purchase" },
  { id: "T007", date: "2026-02-08", description: "Data Enrichment", campaign: "Imported List", channel: "CRM Import", records: 200, creditsUsed: 200, type: "usage", campaignType: "manual" },
  { id: "T008", date: "2026-02-05", description: "Auto Export", campaign: "Air Quality Awareness", channel: "Direct Mail", records: 750, creditsUsed: 750, type: "usage", campaignType: "automated" },
  { id: "T009", date: "2026-02-03", description: "Referral Bonus", campaign: "—", channel: "—", records: 0, creditsUsed: -500, type: "bonus" },
  { id: "T010", date: "2026-02-01", description: "Monthly Free Credits (50)", campaign: "—", channel: "—", records: 0, creditsUsed: -50, type: "bonus" },
  { id: "T011", date: "2026-02-01", description: "Growth Bundle (500/mo)", campaign: "—", channel: "—", records: 0, creditsUsed: -500, type: "purchase" },
  { id: "T012", date: "2026-01-28", description: "Campaign Export", campaign: "Emergency AC Campaign", channel: "Direct Mail", records: 800, creditsUsed: 800, type: "usage", campaignType: "manual" },
  { id: "T013", date: "2026-01-25", description: "PAYG Top-Up", campaign: "—", channel: "—", records: 0, creditsUsed: -200, type: "purchase" },
  { id: "T014", date: "2026-01-20", description: "Data Enrichment", campaign: "Customer Re-engagement", channel: "CRM Import", records: 150, creditsUsed: 150, type: "usage", campaignType: "manual" },
  { id: "T015", date: "2026-01-15", description: "Campaign Export", campaign: "Furnace Check Special", channel: "6x9 Postcard", records: 650, creditsUsed: 650, type: "usage", campaignType: "manual" },
  { id: "T016", date: "2026-01-10", description: "Tenure Bonus (3 months)", campaign: "—", channel: "—", records: 0, creditsUsed: -100, type: "bonus" },
  { id: "T017", date: "2026-01-05", description: "Campaign Export", campaign: "Roof Inspection Offer", channel: "Direct Mail", records: 550, creditsUsed: 550, type: "usage", campaignType: "manual" },
  { id: "T018", date: "2026-01-02", description: "Campaign Export", campaign: "New Year Maintenance", channel: "Direct Mail", records: 400, creditsUsed: 400, type: "usage", campaignType: "manual" },
  { id: "T019", date: "2026-01-01", description: "Monthly Free Credits (50)", campaign: "—", channel: "—", records: 0, creditsUsed: -50, type: "bonus" },
  { id: "T020", date: "2026-01-01", description: "Growth Bundle (500/mo)", campaign: "—", channel: "—", records: 0, creditsUsed: -500, type: "purchase" },
  { id: "T021", date: "2025-12-20", description: "Campaign Export", campaign: "Holiday HVAC Deal", channel: "Email", records: 1100, creditsUsed: 1100, type: "usage", campaignType: "manual" },
  { id: "T022", date: "2025-12-15", description: "PAYG Top-Up", campaign: "—", channel: "—", records: 0, creditsUsed: -300, type: "purchase" },
  { id: "T023", date: "2025-12-10", description: "Data Enrichment", campaign: "Warranty Expiration List", channel: "CRM Import", records: 300, creditsUsed: 300, type: "usage", campaignType: "manual" },
  { id: "T024", date: "2025-12-01", description: "Monthly Free Credits (50)", campaign: "—", channel: "—", records: 0, creditsUsed: -50, type: "bonus" },
  { id: "T025", date: "2025-12-01", description: "Growth Bundle (500/mo)", campaign: "—", channel: "—", records: 0, creditsUsed: -500, type: "purchase" },
];
