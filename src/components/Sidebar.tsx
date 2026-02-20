"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  Megaphone,
  Store,
  Coins,
  BarChart3,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useBusinessType } from "@/context/BusinessTypeContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/data", label: "My Data", icon: Database },
  { href: "/dashboard/campaigns", label: "Campaign Builder", icon: Megaphone },
  { href: "/dashboard/automations", label: "Automations", icon: RefreshCw },
  { href: "/dashboard/marketplace", label: "Vendor Marketplace", icon: Store },
  { href: "/dashboard/credits", label: "Credits & Billing", icon: Coins },
  { href: "/dashboard/performance", label: "Performance", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { businessType, setBusinessType } = useBusinessType();

  return (
    <aside
      className={cn(
        "fixed left-0 top-10 h-[calc(100vh-40px)] bg-white border-r border-slate-200 flex flex-col transition-all duration-200 z-40",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        {!collapsed && (
          <Link href="/dashboard" className="text-lg font-bold text-blue-800">
            UHL Intel
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 space-y-1">
        {!collapsed && (
          <div className="px-3 py-2">
            <label className="text-xs text-slate-500 font-medium block mb-1.5">Demo Mode</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as "contractor" | "mover")}
              className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              <option value="contractor">Contractor</option>
              <option value="mover">Moving Company</option>
            </select>
          </div>
        )}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-600 hover:bg-slate-50"
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
