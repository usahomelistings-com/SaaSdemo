"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Pause, Play, Trash2 } from "lucide-react";
import type { Automation } from "@/data/automations";
import { formatDate, formatNumber } from "@/lib/utils";

interface AutomationCardProps {
  automation: Automation;
  onToggleStatus?: (id: string) => void;
}

export default function AutomationCard({ automation: a, onToggleStatus }: AutomationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    active: "bg-emerald-50 text-emerald-700",
    paused: "bg-amber-50 text-amber-700",
    draft: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Row */}
      <div
        className="flex items-center gap-4 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Zap className="h-5 w-5 text-purple-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 truncate">{a.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[a.status]}`}>
              {a.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {a.rules.map((r) => `${r.field} ${r.operator} ${r.value}`).join(" AND ")}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <div className="text-center">
            <p className="font-medium text-slate-900">{formatNumber(a.totalExports)}</p>
            <p className="text-xs text-slate-500">Exports</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-slate-900">{formatNumber(a.totalCreditsUsed)}</p>
            <p className="text-xs text-slate-500">Credits</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-slate-900">{a.lastRunDate ? formatDate(a.lastRunDate) : "Never"}</p>
            <p className="text-xs text-slate-500">Last Run</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {a.status !== "draft" && onToggleStatus && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleStatus(a.id); }}
              className={`p-1.5 rounded-md text-xs ${
                a.status === "active"
                  ? "text-amber-600 hover:bg-amber-50"
                  : "text-emerald-600 hover:bg-emerald-50"
              }`}
              title={a.status === "active" ? "Pause" : "Resume"}
            >
              {a.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-slate-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Schedule</p>
              <p className="text-sm font-medium text-slate-900">{a.scheduleDetail || a.schedule}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Channels</p>
              <p className="text-sm font-medium text-slate-900">{a.channels.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Vendors</p>
              <p className="text-sm font-medium text-slate-900">{a.vendors.join(", ")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <p className="text-xs text-slate-500">Max/Run</p>
              <p className="text-sm font-medium">{a.maxPerRun ?? "No limit"}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <p className="text-xs text-slate-500">Monthly Cap</p>
              <p className="text-sm font-medium">{a.monthlyCreditCap ?? "No limit"}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <p className="text-xs text-slate-500">Dedup Window</p>
              <p className="text-sm font-medium">{a.dedupWindowDays} days</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <p className="text-xs text-slate-500">Pause Below</p>
              <p className="text-sm font-medium">{a.pauseBelowCredits} credits</p>
            </div>
          </div>

          {a.runHistory.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 mb-2 font-medium">Recent Runs</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500">Date</th>
                    <th className="text-right py-2 text-slate-500">Matched</th>
                    <th className="text-right py-2 text-slate-500">Exported</th>
                    <th className="text-right py-2 text-slate-500">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {a.runHistory.map((run, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2 text-slate-600">{formatDate(run.date)}</td>
                      <td className="py-2 text-right text-slate-600">{run.matched}</td>
                      <td className="py-2 text-right text-slate-600">{run.exported}</td>
                      <td className="py-2 text-right text-slate-900 font-medium">{run.creditsUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
