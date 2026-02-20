"use client";

import { useState } from "react";
import { RefreshCw, Plus, Zap, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import KPICard from "@/components/KPICard";
import AutomationCard from "@/components/AutomationCard";
import { automations as contractorAutomations } from "@/data/automations";
import { moverAutomations } from "@/data/moverData";
import { useBusinessType } from "@/context/BusinessTypeContext";

type StatusFilter = "all" | "active" | "paused" | "draft";

export default function AutomationsPage() {
  const { isMover } = useBusinessType();
  const [automations, setAutomations] = useState(isMover ? moverAutomations : contractorAutomations);
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filtered = filter === "all"
    ? automations
    : automations.filter((a) => a.status === filter);

  const activeCount = automations.filter((a) => a.status === "active").length;
  const pausedCount = automations.filter((a) => a.status === "paused").length;
  const totalAutoExports = automations.reduce((sum, a) => sum + a.totalExports, 0);
  const monthlyCredits = automations
    .filter((a) => a.status === "active")
    .reduce((sum, a) => {
      const recent = a.runHistory.slice(0, 4);
      const avg = recent.length > 0 ? recent.reduce((s, r) => s + r.creditsUsed, 0) / recent.length : 0;
      return sum + avg * 4;
    }, 0);

  const toggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" as const : "active" as const }
          : a
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Automations</h1>
          <p className="text-slate-500 text-sm">Set-and-forget campaigns that run automatically</p>
        </div>
        <Link
          href="/dashboard/campaigns?tab=automation"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 transition-colors"
        >
          <Plus className="h-4 w-4" /> Create Automation
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard title="Active Automations" value={String(activeCount)} icon={Zap} trend={`${pausedCount} paused`} />
        <KPICard title="Paused" value={String(pausedCount)} icon={RefreshCw} />
        <KPICard title="Total Auto-Exports" value={totalAutoExports.toLocaleString()} icon={Users} trend="+18% vs last month" trendUp />
        <KPICard
          title="Credits on Autopilot"
          value={`~${Math.round(monthlyCredits).toLocaleString()}/mo`}
          icon={DollarSign}
          trend={`~$${(monthlyCredits * 0.35).toFixed(0)}/mo at Growth rate`}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "paused", "draft"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "bg-purple-700 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Automation List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((a) => (
            <AutomationCard key={a.id} automation={a} onToggleStatus={toggleStatus} />
          ))
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <RefreshCw className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">No automations match this filter.</p>
            <Link
              href="/dashboard/campaigns?tab=automation"
              className="text-sm text-purple-700 font-medium hover:underline"
            >
              Create your first automation &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Bottom callout */}
      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
        <h3 className="font-semibold text-slate-900 mb-1">Credits on Autopilot</h3>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Active automations consume credits predictably each month. This is recurring revenue that runs without any manual effort from the contractor.
        </p>
      </div>
    </div>
  );
}
