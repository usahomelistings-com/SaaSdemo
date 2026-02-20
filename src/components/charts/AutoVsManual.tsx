"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyPerformance } from "@/data/performanceData";

export default function AutoVsManual() {
  const data = monthlyPerformance.map((m) => ({
    month: m.month,
    Automated: m.autoLeads,
    Manual: m.manualLeads,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }} />
        <Legend />
        <Bar dataKey="Automated" fill="#7C3AED" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Manual" fill="#1E40AF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
