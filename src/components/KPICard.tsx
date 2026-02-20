import { type LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function KPICard({ title, value, icon: Icon, trend, trendUp }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-800" />
        </div>
      </div>
    </div>
  );
}
