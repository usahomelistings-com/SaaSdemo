"use client";

import Link from "next/link";
import {
  Database,
  Brain,
  Megaphone,
  Store,
  Coins,
  BarChart3,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    let current = 0;
    const steps = 60;
    const increment = numericPart / steps;
    const interval = 2000 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        current = numericPart;
        clearInterval(timer);
      }
      if (target.includes("M")) {
        setDisplay(current.toFixed(1) + "M");
      } else if (target.includes(",")) {
        setDisplay(Math.round(current).toLocaleString());
      } else if (target.includes(".")) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(String(Math.round(current)));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [numericPart, target]);

  return <span>{display}{suffix}</span>;
}

const contractorFeatures = [
  { icon: Database, title: "New Homeowner Data", desc: "Real-time data on new movers in your service area" },
  { icon: Brain, title: "Property Intelligence", desc: "Equipment age tracking and predictive signals for service needs" },
  { icon: Megaphone, title: "Campaign Builder", desc: "Build targeted multi-channel campaigns in minutes" },
  { icon: RefreshCw, title: "Set-and-Forget Automation", desc: "Define trigger rules and let campaigns run automatically — 62% of exports are now automated" },
  { icon: Store, title: "Vendor Marketplace", desc: "Choose from 47+ verified vendors for campaign execution" },
  { icon: Coins, title: "Credit Economy", desc: "Simple 1 credit = 1 export pricing that scales with you" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Track ROI and optimize campaigns with data" },
];


export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-800">
            UHL Intelligence
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900"
            >
              Get 50 Free Credits
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Intelligence Layer for Home Service Marketing
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Stop guessing. Start knowing. Data-driven campaigns that find your next customer before they even know they need you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-md bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-colors"
            >
              Get 50 Free Credits
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Subscribe", desc: "$399/mo gets you access to new homeowner intelligence in your service area — plus 50 free credits every month" },
              { step: "2", title: "Build or Automate", desc: "Create one-time campaigns or set-and-forget automations that trigger when new data matches your rules" },
              { step: "3", title: "Export & Execute", desc: "Send to your preferred vendors via one-click export. 1 credit = 1 export, regardless of channel" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-14 w-14 rounded-full bg-blue-800 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2.4M", suffix: "+", label: "Properties Tracked" },
            { value: "12,500", suffix: "+", label: "Active Campaigns" },
            { value: "47", suffix: "", label: "Vendor Integrations" },
            { value: "3.2", suffix: "x", label: "Average ROI" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold text-blue-800">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Contractors */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Built for Service Businesses</h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            Whether you&apos;re an HVAC contractor or a moving company — everything you need to find and reach your next customer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractorFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <f.icon className="h-8 w-8 text-blue-800 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Simple Pricing</h2>
          <div className="bg-white rounded-xl border-2 border-blue-800 p-8 shadow-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">PLATFORM MEMBERSHIP</p>
            <p className="text-5xl font-bold text-slate-900 mb-1">$399</p>
            <p className="text-slate-500 mb-6">/month</p>
            <ul className="text-left space-y-3 mb-6">
              {[
                "50-mile radius homeowner data",
                "Property intelligence & intent signals",
                "Campaign builder + set-and-forget automations",
                "Vendor marketplace access",
                "Performance analytics dashboard",
                "50 free credits every month",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mb-4">
              + Credits at $0.25/each (prepaid bundles) or $0.50 pay-as-you-go
            </p>
            <Link
              href="/signup"
              className="block w-full px-6 py-3 rounded-md bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors"
            >
              Get 50 Free Credits
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/dashboard/campaigns" className="hover:text-white">Campaign Builder</Link></li>
              <li><Link href="/dashboard/automations" className="hover:text-white">Automations</Link></li>
              <li><Link href="/dashboard/marketplace" className="hover:text-white">Marketplace</Link></li>
              <li><Link href="/dashboard/credits" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Affiliates</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendors" className="hover:text-white">Become an Affiliate</Link></li>
              <li><Link href="/vendors/white-label" className="hover:text-white">White-Label</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-default">About</span></li>
              <li><span className="cursor-default">Careers</span></li>
              <li><span className="cursor-default">Blog</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
              <li><span className="cursor-default">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; 2026 UHL Intelligence Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
