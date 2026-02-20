"use client";

import { useState } from "react";
import { X, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import VendorCard from "@/components/VendorCard";
import { vendors, type Vendor } from "@/data/vendors";

const categories = ["All", "Direct Mail", "SMS", "Email", "CRM", "Door Knocking", "Digital Ads", "Phone"];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filtered = activeTab === "All" ? vendors : vendors.filter((v) => v.category === activeTab);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Vendor Marketplace</h1>
        <p className="text-slate-500 text-sm">Browse and connect with verified vendor partners</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === cat
                ? "bg-blue-800 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filtered.map((v) => (
          <VendorCard key={v.id} vendor={v} onViewDetails={setSelectedVendor} />
        ))}
      </div>

      {/* Become a Partner CTA */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Are You a Vendor?</h2>
        <p className="text-blue-200 mb-4 max-w-lg mx-auto">
          Join our marketplace and get instant access to thousands of service professionals actively building campaigns.
        </p>
        <Link
          href="/vendors"
          className="inline-block px-6 py-3 rounded-md bg-white text-blue-800 text-sm font-semibold hover:bg-blue-50 transition-colors"
        >
          Become a Vendor Partner
        </Link>
      </div>

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedVendor(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: selectedVendor.color }}
                >
                  {selectedVendor.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedVendor.name}</h3>
                  <span className="text-xs text-slate-500">{selectedVendor.category}</span>
                </div>
              </div>
              <button onClick={() => setSelectedVendor(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{selectedVendor.rating}</span>
                <span className="text-slate-500 text-sm">({selectedVendor.reviewCount} reviews)</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{selectedVendor.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Avg Turnaround</p>
                  <p className="font-semibold text-slate-900">
                    {selectedVendor.turnaroundDays === 0 ? "Instant" : `${selectedVendor.turnaroundDays} days`}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Starting Price</p>
                  <p className="font-semibold text-slate-900">{selectedVendor.startingPrice}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3" /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedVendor.integrationStatus === "connected"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedVendor.integrationStatus === "connected" ? "API Connected" : "Coming Soon"}
                </span>
                <Link
                  href="/dashboard/campaigns"
                  className="px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900"
                >
                  Use in Campaign
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
