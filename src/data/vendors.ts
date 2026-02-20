export interface Vendor {
  id: string;
  name: string;
  category: "Direct Mail" | "SMS" | "Email" | "CRM" | "Door Knocking" | "Digital Ads" | "Phone";
  rating: number;
  reviewCount: number;
  description: string;
  turnaroundDays: number;
  startingPrice: string;
  integrationStatus: "connected" | "coming_soon";
  color: string;
  features: string[];
}

export const vendors: Vendor[] = [
  {
    id: "V001", name: "Postcard Mania", category: "Direct Mail", rating: 4.6, reviewCount: 230,
    description: "Industry leader in direct mail marketing with fast turnaround and proven templates for home services.",
    turnaroundDays: 3, startingPrice: "$0.28/piece", integrationStatus: "connected", color: "#E11D48",
    features: ["Design templates", "Variable data printing", "EDDM support", "Tracking dashboard"],
  },
  {
    id: "V002", name: "MailShark", category: "Direct Mail", rating: 4.3, reviewCount: 156,
    description: "Budget-friendly direct mail with good template library and reliable delivery.",
    turnaroundDays: 5, startingPrice: "$0.22/piece", integrationStatus: "connected", color: "#2563EB",
    features: ["Budget pricing", "Template library", "Bulk discounts", "Address verification"],
  },
  {
    id: "V003", name: "Twilio", category: "SMS", rating: 4.7, reviewCount: 412,
    description: "Enterprise-grade SMS and messaging platform with global reach and advanced automation.",
    turnaroundDays: 0, startingPrice: "$0.0079/msg", integrationStatus: "connected", color: "#DC2626",
    features: ["Two-way SMS", "MMS support", "Automation workflows", "Deliverability analytics"],
  },
  {
    id: "V004", name: "RingCentral", category: "Phone", rating: 4.2, reviewCount: 98,
    description: "Cloud-based phone system with call tracking and recording for follow-up campaigns.",
    turnaroundDays: 1, startingPrice: "$0.03/min", integrationStatus: "coming_soon", color: "#F97316",
    features: ["Call tracking", "Call recording", "IVR menus", "Analytics dashboard"],
  },
  {
    id: "V005", name: "Smart Moving", category: "CRM", rating: 4.4, reviewCount: 187,
    description: "CRM designed specifically for home services with lead tracking and job management.",
    turnaroundDays: 0, startingPrice: "$49/mo", integrationStatus: "connected", color: "#059669",
    features: ["Lead management", "Job scheduling", "Invoice tracking", "Customer portal"],
  },
  {
    id: "V006", name: "Mailchimp", category: "Email", rating: 4.5, reviewCount: 523,
    description: "Leading email marketing platform with drag-and-drop builder and advanced segmentation.",
    turnaroundDays: 0, startingPrice: "$0.01/email", integrationStatus: "connected", color: "#FBBF24",
    features: ["Email builder", "A/B testing", "Automation", "Analytics"],
  },
  {
    id: "V007", name: "ProspectsPLUS!", category: "Direct Mail", rating: 4.5, reviewCount: 189,
    description: "Specialized in real estate and home service marketing with proven campaign templates.",
    turnaroundDays: 4, startingPrice: "$0.31/piece", integrationStatus: "connected", color: "#7C3AED",
    features: ["Home service templates", "Listing designs", "Market analysis", "Automated campaigns"],
  },
  {
    id: "V008", name: "TaskRabbit", category: "Door Knocking", rating: 4.1, reviewCount: 67,
    description: "On-demand labor for door-to-door canvassing and flyer distribution in target areas.",
    turnaroundDays: 2, startingPrice: "$25/hr", integrationStatus: "coming_soon", color: "#16A34A",
    features: ["Local taskers", "GPS tracking", "Photo verification", "Custom scripts"],
  },
  {
    id: "V009", name: "Meta Ads", category: "Digital Ads", rating: 4.3, reviewCount: 345,
    description: "Facebook and Instagram advertising with custom audience targeting from your data.",
    turnaroundDays: 1, startingPrice: "$5/day min", integrationStatus: "coming_soon", color: "#1877F2",
    features: ["Custom audiences", "Lookalike targeting", "Retargeting", "Performance tracking"],
  },
  {
    id: "V010", name: "Google Ads", category: "Digital Ads", rating: 4.4, reviewCount: 298,
    description: "Search and display advertising powered by your property intelligence data.",
    turnaroundDays: 1, startingPrice: "$10/day min", integrationStatus: "coming_soon", color: "#4285F4",
    features: ["Search ads", "Display network", "Local service ads", "Conversion tracking"],
  },
];
