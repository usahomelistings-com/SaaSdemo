import { Zap } from "lucide-react";
import type { Campaign } from "@/data/campaigns";
import { formatDate } from "@/lib/utils";

interface CampaignTableProps {
  campaigns: Campaign[];
  compact?: boolean;
}

export default function CampaignTable({ campaigns, compact }: CampaignTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Campaign</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Type</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Status</th>
            <th className="text-right py-3 px-4 text-slate-500 font-medium">Leads Sent</th>
            {!compact && <th className="text-left py-3 px-4 text-slate-500 font-medium">Channel</th>}
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 font-medium text-slate-900">{c.name}</td>
              <td className="py-3 px-4">
                {c.type === "automated" ? (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                    <Zap className="h-3 w-3" /> Auto
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                    Manual
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                    c.status === "Active" || c.status === "Running"
                      ? "bg-emerald-50 text-emerald-700"
                      : c.status === "Completed"
                      ? "bg-blue-50 text-blue-700"
                      : c.status === "Draft"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right text-slate-600">
                {c.leadsSent > 0 ? c.leadsSent.toLocaleString() : "—"}
              </td>
              {!compact && <td className="py-3 px-4 text-slate-600">{c.channel || "—"}</td>}
              <td className="py-3 px-4 text-slate-500">{formatDate(c.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
