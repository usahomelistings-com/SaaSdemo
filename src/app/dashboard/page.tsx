"use client";

import { useState } from "react";
import { Megaphone, Coins, Users, TrendingUp, ArrowRight, RefreshCw, Upload, X } from "lucide-react";
import Link from "next/link";
import KPICard from "@/components/KPICard";
import CampaignTable from "@/components/CampaignTable";
import CreditDonut from "@/components/charts/CreditDonut";
import { campaigns } from "@/data/campaigns";
import { moverCampaigns, moverTopCampaigns } from "@/data/moverData";
import { properties } from "@/data/properties";
import { topCampaigns } from "@/data/performanceData";
import { formatCurrency, formatDate, getLeadScoreBg, getLeadScoreLabel, getPropertyTypeLabel } from "@/lib/utils";
import { useBusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function DashboardHome() {
  const { businessType, isMover } = useBusinessType();
  const config = businessTypeConfigs[businessType];
  const activeCampaigns = isMover ? moverCampaigns : campaigns;
  const activeTopCampaigns = isMover ? moverTopCampaigns : topCampaigns;
  const recentCampaigns = activeCampaigns.slice(0, 5);
  const recentProperties = properties.slice(0, 6);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, {config.companyName}</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 rounded-md border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <Upload className="h-4 w-4" /> Upload My Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <KPICard title="Active Campaigns" value="7" icon={Megaphone} trend="2 new this week" trendUp />
        <KPICard title="Automations Running" value="3" icon={RefreshCw} trend="62% of exports" trendUp />
        <KPICard title="Credits Remaining" value="2,340" icon={Coins} trend="1,660 used this month" />
        <KPICard title="Leads This Month" value="156" icon={Users} trend="+23% vs last month" trendUp />
        <KPICard title="Avg Campaign ROI" value="3.2x" icon={TrendingUp} trend="+0.4 vs last month" trendUp />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Campaigns */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Recent Campaigns</h2>
            <Link href="/dashboard/campaigns" className="text-sm text-blue-800 hover:underline">
              View All
            </Link>
          </div>
          <CampaignTable campaigns={recentCampaigns} compact />
        </div>

        {/* Credit Usage */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Credit Usage This Month</h2>
          </div>
          <div className="p-4">
            <CreditDonut />
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Homeowners */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">New Homeowners in Your Area</h2>
            <Link href="/dashboard/data" className="text-sm text-blue-800 hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentProperties.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {p.address}, {p.city} {p.state}
                  </p>
                  <p className="text-xs text-slate-500">Moved in {formatDate(p.moveInDate)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${getLeadScoreBg(p.leadScore)}`}>
                    {p.leadScore} {getLeadScoreLabel(p.leadScore)}
                  </span>
                  {isMover ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.propertyType === "new_listing" ? "bg-blue-100 text-blue-700" :
                      p.propertyType === "new_owner" ? "bg-purple-100 text-purple-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {getPropertyTypeLabel(p.propertyType)}
                    </span>
                  ) : (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.hvacAge >= 15 ? "bg-red-100 text-red-700" :
                      p.hvacAge >= 10 ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      HVAC: {p.hvacAge}yr
                    </span>
                  )}
                  <span className="text-xs text-slate-500">{formatCurrency(p.homeValue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Top Performing Campaigns</h2>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={activeTopCampaigns} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip
                  formatter={(value) => `${value}x ROI`}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                />
                <Bar dataKey="roi" radius={[0, 4, 4, 0]} barSize={24}>
                  {activeTopCampaigns.map((entry, index) => (
                    <Cell key={index} fill={entry.type === "automated" ? "#7C3AED" : "#1E40AF"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowUpload(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Upload My Data</h3>
              <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">
                Upload a CSV of your existing customer/prospect list
              </p>
              <p className="text-xs text-slate-500">Supported: CSV, XLSX — Max 10,000 records</p>
            </div>
            <p className="text-xs text-slate-500 mb-4 text-center">
              {config.uploadEnrichText}
            </p>
            <button
              disabled
              className="w-full px-6 py-3 rounded-md bg-blue-800 text-white text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Upload & Enrich
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
