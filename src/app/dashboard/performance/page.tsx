"use client";

import { Users, Briefcase, DollarSign, TrendingUp, Target, BarChart3, Home, Zap } from "lucide-react";
import KPICard from "@/components/KPICard";
import PerformanceLine from "@/components/charts/PerformanceLine";
import LeadsByChannel from "@/components/charts/LeadsByChannel";
import AutoVsManual from "@/components/charts/AutoVsManual";
import { closeRateByEquipmentAge, topZips } from "@/data/performanceData";
import { closeRateByMoveRecency } from "@/data/moverData";
import { useBusinessType } from "@/context/BusinessTypeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformancePage() {
  const { isMover } = useBusinessType();
  const equipmentData = isMover ? closeRateByMoveRecency : closeRateByEquipmentAge;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Performance Analytics</h1>
        <p className="text-slate-500 text-sm">Track your campaign results and ROI</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard title="Total Leads Generated" value="2,847" icon={Users} trend="+18% vs last month" trendUp />
        <KPICard title="Jobs Booked" value="423" icon={Briefcase} trend="+12% vs last month" trendUp />
        <KPICard title="Revenue from Platform" value="$189,400" icon={DollarSign} trend="+22% vs last month" trendUp />
        <KPICard title="Avg ROI" value="3.2x" icon={TrendingUp} trend="+0.4 vs last month" trendUp />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Campaign Performance Over Time</h2>
          </div>
          <div className="p-4">
            <PerformanceLine />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Leads by Channel</h2>
          </div>
          <div className="p-4">
            <LeadsByChannel />
          </div>
        </div>
      </div>

      {/* Auto vs Manual Chart */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-8">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Automated vs Manual Leads</h2>
          <p className="text-xs text-slate-500 mt-0.5">Automation adoption has grown from 30% to 62% of total leads over the past 6 months</p>
        </div>
        <div className="p-4">
          <AutoVsManual />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">{isMover ? "Conversion by Move Recency" : "Close Rate by Equipment Age"}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{isMover ? "More recent moves = higher conversion rates" : "Older equipment indicates higher service needs = better conversion"}</p>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={equipmentData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} unit="%" />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                />
                <Bar dataKey="closeRate" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Top Performing ZIP Codes</h2>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topZips} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis dataKey="area" type="category" width={100} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip
                  formatter={(value) => `${value} leads`}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                />
                <Bar dataKey="leads" fill="#1E40AF" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insight Cards - now 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-blue-800" />
            <h3 className="font-medium text-slate-900 text-sm">Lead Score Insight</h3>
          </div>
          <p className="text-sm text-slate-600">
            Records with Lead Score 8+ convert at <strong className="text-blue-800">4.1x the rate</strong> of cold leads — prioritize hot leads for maximum ROI
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            <h3 className="font-medium text-slate-900 text-sm">Channel Insight</h3>
          </div>
          <p className="text-sm text-slate-600">
            Your 6x9 postcards outperform 4x6 by <strong className="text-emerald-600">34% in close rate</strong>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium text-slate-900 text-sm">Area Insight</h3>
          </div>
          <p className="text-sm text-slate-600">
            {isMover
              ? <>ZIP 41091 has <strong className="text-amber-600">23 new listings</strong> this week — 12 are high-value homes</>
              : <>ZIP 41091 has <strong className="text-amber-600">23 new homeowners</strong> this week — 8 have aging HVAC systems</>
            }
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium text-slate-900 text-sm">Automation Insight</h3>
          </div>
          <p className="text-sm text-slate-600">
            Automated campaigns generate <strong className="text-purple-700">62% of leads</strong> with zero manual effort — up from 30% in September
          </p>
        </div>
      </div>
    </div>
  );
}
