"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { monthlyPerformance } from "@/data/performanceData";

export default function LeadsByChannel() {
  const latest = monthlyPerformance[monthlyPerformance.length - 1];
  const data = [
    { channel: "Mail", leads: latest.mailLeads, fill: "#1E40AF" },
    { channel: "SMS", leads: latest.smsLeads, fill: "#059669" },
    { channel: "Email", leads: latest.emailLeads, fill: "#F59E0B" },
    { channel: "Phone", leads: latest.phoneLeads, fill: "#8B5CF6" },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="channel" tick={{ fontSize: 12, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }} />
        <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
