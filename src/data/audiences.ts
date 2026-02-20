import type { BusinessType } from "@/context/BusinessTypeContext";

export interface AudienceRule {
  field: string;
  operator: string;
  value: string;
}

export interface Audience {
  id: string;
  name: string;
  rules: AudienceRule[];
  recordCount: number;
  createdDate: string;
  businessType: BusinessType;
}

export const audiences: Audience[] = [
  // Contractor audiences
  {
    id: "AUD001",
    name: "High-Value HVAC Replacements",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: "12" },
      { field: "Home Value", operator: "greater than", value: "250000" },
    ],
    recordCount: 87,
    createdDate: "2026-02-10",
    businessType: "contractor",
  },
  {
    id: "AUD002",
    name: "New Owners — Hot Leads",
    rules: [
      { field: "Property Type", operator: "equals", value: "new_owner" },
      { field: "Lead Score", operator: "greater than", value: "7" },
    ],
    recordCount: 156,
    createdDate: "2026-02-14",
    businessType: "contractor",
  },
  {
    id: "AUD003",
    name: "Phone-Ready Prospects",
    rules: [
      { field: "Phone Consent", operator: "equals", value: "yes" },
      { field: "Lead Score", operator: "greater than", value: "5" },
    ],
    recordCount: 203,
    createdDate: "2026-02-18",
    businessType: "contractor",
  },
  {
    id: "AUD004",
    name: "Critical Equipment — Urgent",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: "15" },
      { field: "Lead Score", operator: "greater than", value: "6" },
    ],
    recordCount: 42,
    createdDate: "2026-02-05",
    businessType: "contractor",
  },
  // Mover audiences
  {
    id: "AUD005",
    name: "New Listings — Quick Movers",
    rules: [
      { field: "Property Type", operator: "equals", value: "new_listing" },
      { field: "Move-In Date", operator: "within last", value: "7 days" },
    ],
    recordCount: 118,
    createdDate: "2026-02-12",
    businessType: "mover",
  },
  {
    id: "AUD006",
    name: "High-Value Relocations",
    rules: [
      { field: "Home Value", operator: "greater than", value: "350000" },
      { field: "Property Type", operator: "equals", value: "new_listing" },
    ],
    recordCount: 64,
    createdDate: "2026-02-16",
    businessType: "mover",
  },
  {
    id: "AUD007",
    name: "Recent Movers — Follow Up",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "30 days" },
      { field: "Lead Score", operator: "greater than", value: "5" },
    ],
    recordCount: 189,
    createdDate: "2026-02-08",
    businessType: "mover",
  },
];
