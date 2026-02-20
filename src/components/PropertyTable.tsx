"use client";

import type { Property } from "@/data/properties";
import { formatCurrency, formatDate, getLeadScoreBg, getLeadScoreLabel, getPropertyTypeLabel } from "@/lib/utils";

interface PropertyTableProps {
  properties: Property[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
  isMover?: boolean;
}

export default function PropertyTable({
  properties,
  selectedIds,
  onToggle,
  onToggleAll,
  allSelected,
  isMover = false,
}: PropertyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="rounded border-slate-300"
              />
            </th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Address</th>
            <th className="text-center py-3 px-4 text-slate-500 font-medium">Lead Score</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Type</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Move-In Date</th>
            <th className="text-right py-3 px-4 text-slate-500 font-medium">Home Value</th>
            <th className="text-center py-3 px-4 text-slate-500 font-medium">{isMover ? "Move Status" : "HVAC Age"}</th>
            <th className="text-center py-3 px-4 text-slate-500 font-medium">Contact</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Key Signals</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr
              key={p.id}
              className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                selectedIds.has(p.id) ? "bg-blue-50" : ""
              }`}
              onClick={() => onToggle(p.id)}
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.has(p.id)}
                  onChange={() => onToggle(p.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded border-slate-300"
                />
              </td>
              <td className="py-3 px-4 font-medium text-slate-900 whitespace-nowrap">
                {p.address}, {p.city} {p.state}
              </td>
              <td className="py-3 px-4 text-center">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${getLeadScoreBg(p.leadScore)}`}>
                  {p.leadScore} {getLeadScoreLabel(p.leadScore)}
                </span>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  p.propertyType === "new_listing" ? "bg-blue-50 text-blue-700" :
                  p.propertyType === "new_owner" ? "bg-purple-50 text-purple-700" :
                  "bg-emerald-50 text-emerald-700"
                }`}>
                  {getPropertyTypeLabel(p.propertyType)}
                </span>
              </td>
              <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{formatDate(p.moveInDate)}</td>
              <td className="py-3 px-4 text-right text-slate-600">{formatCurrency(p.homeValue)}</td>
              <td className="py-3 px-4 text-center text-slate-600">
                {isMover ? (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    p.propertyType === "new_listing" ? "bg-blue-50 text-blue-700" :
                    p.propertyType === "new_owner" ? "bg-purple-50 text-purple-700" :
                    "bg-emerald-50 text-emerald-700"
                  }`}>
                    {getPropertyTypeLabel(p.propertyType)}
                  </span>
                ) : (
                  <>{p.hvacAge} yrs</>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${p.phoneConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={p.phoneConsent ? "Phone OK" : "No phone consent"} />
                  <span className={`w-2 h-2 rounded-full ${p.smsConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={p.smsConsent ? "SMS OK" : "No SMS consent"} />
                  <span className={`w-2 h-2 rounded-full ${p.emailValid ? "bg-emerald-500" : "bg-slate-300"}`} title={p.emailValid ? "Email valid" : "Email invalid"} />
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {p.signals.map((s, i) => (
                    <span
                      key={i}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        s.includes("critical")
                          ? "bg-red-100 text-red-700"
                          : s.includes("aging")
                          ? "bg-amber-100 text-amber-700"
                          : s.includes("No warranty")
                          ? "bg-slate-100 text-slate-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
