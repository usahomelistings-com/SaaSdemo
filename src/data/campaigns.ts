export interface Campaign {
  id: string;
  name: string;
  type: "manual" | "automated";
  status: "Active" | "Completed" | "Draft" | "Paused" | "Running";
  channel: string;
  vendor: string;
  leadsSent: number;
  creditsUsed: number;
  date: string;
  roi: number;
  responseRate: number;
}

export const campaigns: Campaign[] = [
  { id: "C001", name: "Spring HVAC Tune-Up", type: "automated", status: "Running", channel: "Direct Mail", vendor: "Postcard Mania", leadsSent: 1200, creditsUsed: 1200, date: "2026-02-12", roi: 4.1, responseRate: 3.2 },
  { id: "C002", name: "New Homeowner Welcome", type: "automated", status: "Running", channel: "Email + SMS", vendor: "Mailchimp", leadsSent: 450, creditsUsed: 450, date: "2026-02-10", roi: 2.8, responseRate: 5.1 },
  { id: "C003", name: "Emergency AC Campaign", type: "manual", status: "Completed", channel: "Direct Mail", vendor: "MailShark", leadsSent: 800, creditsUsed: 800, date: "2026-01-28", roi: 3.5, responseRate: 2.9 },
  { id: "C004", name: "Water Heater Promo", type: "manual", status: "Draft", channel: "Direct Mail", vendor: "", leadsSent: 0, creditsUsed: 0, date: "2026-02-15", roi: 0, responseRate: 0 },
  { id: "C005", name: "Furnace Check Special", type: "manual", status: "Completed", channel: "6x9 Postcard", vendor: "ProspectsPLUS!", leadsSent: 650, creditsUsed: 650, date: "2026-01-15", roi: 3.8, responseRate: 3.5 },
  { id: "C006", name: "Aging Equipment Outreach", type: "automated", status: "Running", channel: "Direct Mail + Email", vendor: "Postcard Mania", leadsSent: 890, creditsUsed: 890, date: "2026-01-15", roi: 3.6, responseRate: 3.9 },
  { id: "C007", name: "Roof Inspection Offer", type: "manual", status: "Completed", channel: "Direct Mail", vendor: "Postcard Mania", leadsSent: 550, creditsUsed: 550, date: "2026-01-05", roi: 2.9, responseRate: 2.1 },
  { id: "C008", name: "Holiday HVAC Deal", type: "manual", status: "Completed", channel: "Email", vendor: "Mailchimp", leadsSent: 1100, creditsUsed: 1100, date: "2025-12-20", roi: 4.5, responseRate: 6.2 },
  { id: "C009", name: "New Year Maintenance", type: "manual", status: "Paused", channel: "Direct Mail", vendor: "MailShark", leadsSent: 400, creditsUsed: 400, date: "2026-01-02", roi: 1.8, responseRate: 1.5 },
  { id: "C010", name: "Smart Thermostat Promo", type: "automated", status: "Running", channel: "Email + SMS", vendor: "Twilio", leadsSent: 280, creditsUsed: 280, date: "2026-02-14", roi: 3.2, responseRate: 4.3 },
  { id: "C011", name: "Spring Cleaning Blitz", type: "manual", status: "Draft", channel: "Handwritten Card", vendor: "", leadsSent: 0, creditsUsed: 0, date: "2026-02-18", roi: 0, responseRate: 0 },
  { id: "C012", name: "Air Quality Awareness", type: "automated", status: "Running", channel: "Direct Mail", vendor: "ProspectsPLUS!", leadsSent: 750, creditsUsed: 750, date: "2026-02-05", roi: 2.7, responseRate: 2.4 },
];
