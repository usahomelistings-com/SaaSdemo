import type { AutomationRule } from "./automations";

export interface AutomationTemplate {
  id: string;
  emoji: string;
  name: string;
  description: string;
  rules: AutomationRule[];
  suggestedSchedule: "realtime" | "weekly" | "biweekly" | "monthly";
  suggestedChannels: string[];
  estimatedLeadsPerMonth: number;
}

export const automationTemplates: AutomationTemplate[] = [
  {
    id: "TPL001",
    emoji: "\uD83C\uDFE0",
    name: "New Homeowner Welcome",
    description: "Automatically reach every new homeowner in your area",
    rules: [
      { field: "Move-In Date", operator: "within last", value: "30 days" },
    ],
    suggestedSchedule: "realtime",
    suggestedChannels: ["Email", "SMS", "Direct Mail"],
    estimatedLeadsPerMonth: 85,
  },
  {
    id: "TPL002",
    emoji: "\uD83D\uDD27",
    name: "Aging HVAC Outreach",
    description: "Target homeowners with HVAC systems past their prime",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: 10 },
    ],
    suggestedSchedule: "weekly",
    suggestedChannels: ["Direct Mail", "Email"],
    estimatedLeadsPerMonth: 65,
  },
  {
    id: "TPL003",
    emoji: "\uD83D\uDD34",
    name: "Critical Equipment Alert",
    description: "Catch homes with multiple aging systems",
    rules: [
      { field: "HVAC Age", operator: "greater than", value: 15 },
    ],
    suggestedSchedule: "realtime",
    suggestedChannels: ["Direct Mail"],
    estimatedLeadsPerMonth: 25,
  },
  {
    id: "TPL004",
    emoji: "\uD83D\uDCA7",
    name: "Water Heater Replacement",
    description: "Find water heaters nearing end of life",
    rules: [
      { field: "Water Heater Age", operator: "greater than", value: 8 },
    ],
    suggestedSchedule: "monthly",
    suggestedChannels: ["Direct Mail", "Email"],
    estimatedLeadsPerMonth: 45,
  },
  {
    id: "TPL005",
    emoji: "\uD83C\uDFD7\uFE0F",
    name: "New Construction Follow-Up",
    description: "Welcome new builds — upsell maintenance plans",
    rules: [
      { field: "HVAC Age", operator: "less than", value: 3 },
      { field: "Move-In Date", operator: "within last", value: "60 days" },
    ],
    suggestedSchedule: "weekly",
    suggestedChannels: ["Email", "Handwritten Card"],
    estimatedLeadsPerMonth: 30,
  },
];
