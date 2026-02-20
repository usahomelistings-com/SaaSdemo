export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getLeadScoreColor(score: number): string {
  if (score >= 8) return "text-red-600";
  if (score >= 5) return "text-amber-600";
  return "text-slate-500";
}

export function getLeadScoreBg(score: number): string {
  if (score >= 8) return "bg-red-50 text-red-700 border border-red-200";
  if (score >= 5) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-slate-50 text-slate-600 border border-slate-200";
}

export function getLeadScoreLabel(score: number): string {
  if (score >= 8) return "Hot";
  if (score >= 5) return "Warm";
  return "Cold";
}

export function getPropertyTypeLabel(type: string): string {
  switch (type) {
    case "new_listing": return "New Listing";
    case "new_owner": return "New Owner";
    case "new_build": return "New Build";
    default: return type;
  }
}
