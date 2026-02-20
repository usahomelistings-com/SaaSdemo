"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Automated", value: 1540, color: "#7C3AED" },
  { name: "Manual", value: 120, color: "#1E40AF" },
  { name: "Remaining", value: 2340, color: "#E2E8F0" },
];

export default function CreditDonut() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${Number(value).toLocaleString()} credits`}
            contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-xs text-center text-slate-400 mt-1">1 credit = 1 export, regardless of channel</p>
    </div>
  );
}
