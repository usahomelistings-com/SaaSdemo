"use client";

import type { Property } from "@/data/properties";
import { formatCurrency, formatDate, getLeadScoreBg, getLeadScoreLabel, getPropertyTypeLabel } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
  isMover?: boolean;
}

export default function PropertyCard({ property: p, isSelected, onClick, isMover = false }: PropertyCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-blue-800 shadow-md" : "border-slate-200"
      }`}
    >
      {/* Photo placeholder */}
      <div className="bg-slate-100 h-36 flex items-center justify-center relative">
        <div className="text-center">
          <div className="text-3xl mb-1">🏠</div>
          <p className="text-xs text-slate-400">Property Photo</p>
        </div>
        {/* Lead score badge */}
        <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${getLeadScoreBg(p.leadScore)}`}>
          {p.leadScore} {getLeadScoreLabel(p.leadScore)}
        </span>
        {/* Property type chip */}
        <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${
          p.propertyType === "new_listing" ? "bg-blue-100 text-blue-700" :
          p.propertyType === "new_owner" ? "bg-purple-100 text-purple-700" :
          "bg-emerald-100 text-emerald-700"
        }`}>
          {getPropertyTypeLabel(p.propertyType)}
        </span>
      </div>

      <div className="p-3">
        {/* Address + Value */}
        <div className="flex items-start justify-between mb-1.5">
          <div>
            <p className="text-sm font-semibold text-slate-900">{p.address}</p>
            <p className="text-xs text-slate-500">{p.city}, {p.state} {p.zip}</p>
          </div>
          <p className="text-sm font-bold text-blue-800">{formatCurrency(p.homeValue)}</p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
          <span>Moved {formatDate(p.moveInDate)}</span>
          {isMover ? (
            <span className={`px-1.5 py-0.5 rounded font-medium ${
              p.propertyType === "new_listing" ? "bg-blue-50 text-blue-700" :
              p.propertyType === "new_owner" ? "bg-purple-50 text-purple-700" :
              "bg-emerald-50 text-emerald-700"
            }`}>
              {getPropertyTypeLabel(p.propertyType)}
            </span>
          ) : (
            <span className={`font-medium ${
              p.hvacAge >= 15 ? "text-red-600" : p.hvacAge >= 10 ? "text-amber-600" : "text-emerald-600"
            }`}>
              HVAC: {p.hvacAge}yr
            </span>
          )}
        </div>

        {/* Signals */}
        <div className="flex flex-wrap gap-1 mb-2">
          {p.signals.slice(0, 3).map((s) => (
            <span
              key={s}
              className={`text-xs px-1.5 py-0.5 rounded ${
                s.includes("critical") ? "bg-red-100 text-red-700" :
                s.includes("aging") ? "bg-amber-100 text-amber-700" :
                s.includes("No warranty") ? "bg-slate-100 text-slate-600" :
                "bg-emerald-50 text-emerald-700"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Contact permissions */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${p.phoneConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={p.phoneConsent ? "Phone OK" : "No phone"} />
          <span className={`w-2 h-2 rounded-full ${p.smsConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={p.smsConsent ? "SMS OK" : "No SMS"} />
          <span className={`w-2 h-2 rounded-full ${p.emailValid ? "bg-emerald-500" : "bg-slate-300"}`} title={p.emailValid ? "Email OK" : "No email"} />
          <span className="text-xs text-slate-400 ml-1">
            {[p.phoneConsent && "Phone", p.smsConsent && "SMS", p.emailValid && "Email"].filter(Boolean).join(" · ") || "No permissions"}
          </span>
        </div>
      </div>
    </div>
  );
}
