"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyPerformance } from "@/data/performanceData";

export default function PerformanceLine() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyPerformance} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }} />
        <Legend />
        <Line type="monotone" dataKey="leads" name="Total Leads" stroke="#0F172A" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="autoLeads" name="Automated" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
        <Line type="monotone" dataKey="manualLeads" name="Manual" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
        <Line type="monotone" dataKey="jobsBooked" name="Jobs Booked" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
