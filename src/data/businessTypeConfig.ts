import type { BusinessType } from "@/context/BusinessTypeContext";

export interface BusinessTypeConfig {
  companyName: string;
  industryLabel: string;
  pricingLabel: string;
  highIntentLabel: string;
  highIntentDesc: string;
  uploadEnrichText: string;
  referralText: string;
  campaignPlaceholder: string;
  defaultRuleField: string;
  defaultRuleOperator: string;
  audienceDesc: string;
  tradeTypes: string[];
  signalColumnHeader: string;
  marketplaceCta: string;
}

export const businessTypeConfigs: Record<BusinessType, BusinessTypeConfig> = {
  contractor: {
    companyName: "Comfort Pro HVAC",
    industryLabel: "Home Services",
    pricingLabel: "CONTRACTOR MEMBERSHIP",
    highIntentLabel: "High-Intent Properties",
    highIntentDesc: "Based on equipment age",
    uploadEnrichText: "We'll enrich your list with property intelligence data including equipment ages, home values, and intent signals.",
    referralText: "contractor",
    campaignPlaceholder: "e.g., Aging HVAC Outreach",
    defaultRuleField: "HVAC Age",
    defaultRuleOperator: "greater than",
    audienceDesc: "New homeowners, 50-mi radius of 41091, HVAC age > 10 years",
    tradeTypes: ["HVAC", "Plumbing", "Electrical", "Roofing", "General", "Painting", "Landscaping", "Other"],
    signalColumnHeader: "HVAC Age",
    marketplaceCta: "home service contractors",
  },
  mover: {
    companyName: "Swift City Movers",
    industryLabel: "Moving Services",
    pricingLabel: "MOVER MEMBERSHIP",
    highIntentLabel: "Active Movers",
    highIntentDesc: "Listings & recent moves",
    uploadEnrichText: "We'll enrich your list with property intelligence data including move dates, home values, and moving intent signals.",
    referralText: "moving company",
    campaignPlaceholder: "e.g., New Listing Moving Outreach",
    defaultRuleField: "Move-In Date",
    defaultRuleOperator: "within last",
    audienceDesc: "New listings & recent moves, 50-mi radius of 41091, last 30 days",
    tradeTypes: ["Full-Service Moving", "Local Moving", "Long-Distance Moving", "Commercial Moving", "Storage & Logistics"],
    signalColumnHeader: "Move Status",
    marketplaceCta: "moving companies",
  },
};
