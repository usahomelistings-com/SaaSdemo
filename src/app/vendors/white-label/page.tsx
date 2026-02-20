"use client";

import Link from "next/link";
import {
  Palette,
  Brain,
  Layers,
  DollarSign,
  ArrowRight,
  Database,
  BarChart3,
  Users,
} from "lucide-react";

export default function WhiteLabelPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-800">
            UHL Intelligence
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/vendors" className="text-sm text-slate-600 hover:text-slate-900">
              Back to Vendors
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Brand, Our Brain</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Embed our campaign builder and data intelligence directly into your platform.
            Your customers get smarter targeting without leaving your ecosystem.
          </p>
        </div>
      </section>

      {/* Split Screen Mockup */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Your Platform */}
            <div className="rounded-lg border-2 border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-500 ml-2">yourplatform.com/campaigns</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">YP</div>
                  <span className="font-semibold text-slate-900">Your Platform</span>
                  <span className="text-xs text-slate-400 ml-auto">Dashboard</span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Palette className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">Your Branding</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-slate-600">Campaign Builder (Embedded)</span>
                    </div>
                    <div className="bg-white rounded border border-slate-200 p-3 space-y-2">
                      <div className="h-2 bg-blue-200 rounded w-2/3" />
                      <div className="h-2 bg-blue-200 rounded w-1/2" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-blue-100 rounded" />
                        <div className="h-8 bg-blue-100 rounded" />
                        <div className="h-8 bg-blue-100 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <ArrowRight className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-slate-600">Data Intelligence (API)</span>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            </div>

            {/* Right: Our Intelligence */}
            <div className="rounded-lg border-2 border-blue-800 overflow-hidden">
              <div className="bg-blue-800 px-4 py-2 border-b border-blue-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                </div>
                <span className="text-xs text-blue-200 ml-2">UHL Intelligence Engine</span>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-blue-800" />
                      <span className="text-sm font-medium text-slate-900">Property Intelligence</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-lg font-bold text-blue-800">14.2K</p>
                        <p className="text-xs text-slate-500">Properties</p>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-lg font-bold text-blue-800">342</p>
                        <p className="text-xs text-slate-500">New Movers</p>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-lg font-bold text-blue-800">89</p>
                        <p className="text-xs text-slate-500">High Intent</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-900">Equipment Age Analysis</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { label: "HVAC", age: "18 yrs", status: "Critical", w: "w-4/5" },
                        { label: "Water Heater", age: "12 yrs", status: "Aging", w: "w-3/5" },
                        { label: "Roof", age: "6 yrs", status: "Good", w: "w-1/3" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-xs">
                          <span className="font-mono w-20 text-slate-600">{item.label}</span>
                          <div className={`h-2 bg-blue-800 rounded ${item.w}`} />
                          <span className="text-slate-500">{item.age} — {item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium text-slate-900">Campaign Analytics</span>
                    </div>
                    <div className="flex gap-1 h-12 items-end">
                      {[40, 55, 45, 70, 85, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Customer Journey Through Your Platform</h2>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            {[
              { label: "Contractor Signs Up", color: "bg-purple-100 text-purple-800" },
              { label: "Browses Property Data", color: "bg-blue-100 text-blue-800" },
              { label: "Builds Campaign", color: "bg-blue-100 text-blue-800" },
              { label: "Selects Your Services", color: "bg-emerald-100 text-emerald-800" },
              { label: "Exports Campaign", color: "bg-emerald-100 text-emerald-800" },
              { label: "You Earn Revenue", color: "bg-amber-100 text-amber-800" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className={`${step.color} px-3 py-2 rounded-lg text-xs font-medium`}>{step.label}</div>
                {i < 5 && <ArrowRight className="h-4 w-4 text-slate-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Earn */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">How You Earn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
              <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Per-Export Revenue Share</h3>
              <p className="text-sm text-slate-500">Earn $0.05–$0.10 per record exported through your platform</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
              <Layers className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Subscription Uplift</h3>
              <p className="text-sm text-slate-500">Charge your customers a premium for data-enhanced features on your platform</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
              <BarChart3 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Volume Bonuses</h3>
              <p className="text-sm text-slate-500">Hit monthly export thresholds for bonus payouts on top of your base share</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <p className="text-sm text-emerald-800 font-medium">Partners typically see 15–25% revenue uplift on their existing customer base</p>
          </div>
        </div>
      </section>

      {/* Key Selling Points */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why White-Label?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Your Brand", desc: "Fully customizable to match your visual identity" },
              { icon: Brain, title: "Our Brain", desc: "Powered by UHL property intelligence engine + set-and-forget automations" },
              { icon: Layers, title: "Seamless Integration", desc: "Embed via iframe or use our REST API directly" },
              { icon: DollarSign, title: "Revenue Share", desc: "You earn on every campaign export — including recurring automated exports" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-lg border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
                <f.icon className="h-8 w-8 text-blue-800 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Customers Benefit */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Customers Win Too</h2>
          <p className="text-slate-500 mb-8">
            Your customers get smarter targeting without leaving your ecosystem. Everyone benefits.
          </p>
          <div className="bg-slate-50 rounded-lg p-8">
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium">Your Customers</div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">Your Platform</div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium">UHL Intelligence</div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium">Smarter Campaigns</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-slate-400" />
              <p className="text-sm text-slate-600">
                Contractors using white-label integrations see <strong className="text-blue-800">28% higher engagement</strong> than standalone tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
        <p className="text-blue-200 mb-8">Contact our enterprise team to discuss white-label integration.</p>
        <Link
          href="/vendors"
          className="inline-block px-8 py-3 rounded-md bg-white text-blue-900 font-semibold hover:bg-blue-50"
        >
          Contact Enterprise Sales
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm">
        &copy; 2026 UHL Intelligence Platform. All rights reserved.
      </footer>
    </div>
  );
}
