"use client";

import { Clock, Shield } from "lucide-react";

export interface Schedule {
  frequency: "realtime" | "weekly" | "biweekly" | "monthly";
  dayOfWeek: string;
  maxPerRun: string;
  monthlyCreditCap: string;
  dedupWindowDays: string;
  pauseBelowCredits: string;
}

interface SchedulePickerProps {
  schedule: Schedule;
  onChange: (schedule: Schedule) => void;
}

const frequencies = [
  { value: "realtime", label: "As New Data Arrives", desc: "Export triggered every time new matching records enter the system" },
  { value: "weekly", label: "Weekly", desc: "Batches matching records and exports once per week" },
  { value: "biweekly", label: "Bi-Weekly", desc: "Run every 1st and 15th of the month" },
  { value: "monthly", label: "Monthly", desc: "Run on a specific day each month" },
];

export default function SchedulePicker({ schedule, onChange }: SchedulePickerProps) {
  const update = (key: keyof Schedule, value: string) => {
    onChange({ ...schedule, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Frequency */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-medium text-slate-900">Schedule Frequency</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {frequencies.map((f) => (
            <button
              key={f.value}
              onClick={() => update("frequency", f.value)}
              className={`text-left rounded-lg border-2 p-3 transition-all ${
                schedule.frequency === f.value
                  ? "border-purple-600 bg-purple-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="text-sm font-medium text-slate-900">{f.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Day of week (only for weekly) */}
      {schedule.frequency === "weekly" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Run Day</label>
          <select
            value={schedule.dayOfWeek}
            onChange={(e) => update("dayOfWeek", e.target.value)}
            className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      {/* Safety Settings */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-medium text-slate-900">Safety Settings</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Max exports per run</label>
            <select
              value={schedule.maxPerRun}
              onChange={(e) => update("maxPerRun", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            >
              <option value="">No limit</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1,000</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Monthly credit cap</label>
            <input
              type="number"
              value={schedule.monthlyCreditCap}
              onChange={(e) => update("monthlyCreditCap", e.target.value)}
              placeholder="500"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Deduplication window</label>
            <select
              value={schedule.dedupWindowDays}
              onChange={(e) => update("dedupWindowDays", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Pause if credits below</label>
            <input
              type="number"
              value={schedule.pauseBelowCredits}
              onChange={(e) => update("pauseBelowCredits", e.target.value)}
              placeholder="100"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
