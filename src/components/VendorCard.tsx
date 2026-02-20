"use client";

import { Star } from "lucide-react";
import type { Vendor } from "@/data/vendors";

interface VendorCardProps {
  vendor: Vendor;
  onViewDetails?: (vendor: Vendor) => void;
  onSelect?: (vendor: Vendor) => void;
  showSelect?: boolean;
}

export default function VendorCard({ vendor, onViewDetails, onSelect, showSelect }: VendorCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div
          className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: vendor.color }}
        >
          {vendor.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{vendor.name}</h3>
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mt-0.5">
            {vendor.category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="text-sm font-medium text-slate-900">{vendor.rating}</span>
        <span className="text-sm text-slate-500">({vendor.reviewCount} reviews)</span>
      </div>

      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{vendor.description}</p>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>Avg turnaround: {vendor.turnaroundDays === 0 ? "Instant" : `${vendor.turnaroundDays} days`}</span>
        <span>From {vendor.startingPrice}</span>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            vendor.integrationStatus === "connected"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {vendor.integrationStatus === "connected" ? "API Connected" : "Coming Soon"}
        </span>
        <div className="flex gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(vendor)}
              className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              View Details
            </button>
          )}
          {showSelect && onSelect && (
            <button
              onClick={() => onSelect(vendor)}
              className="text-xs px-3 py-1.5 rounded-md bg-blue-800 text-white hover:bg-blue-900"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
