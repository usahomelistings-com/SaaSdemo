"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  TrendingUp,
  Plug,
  FileCode,
  Settings,
  Rocket,
  X,
  Star,
  Award,
  Building2,
  Zap,
  Palette,
  Code,
} from "lucide-react";

export default function VendorPartnerPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-800">
            UHL Intelligence
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
              For Contractors
            </Link>
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Join the Largest Home Service Contractor Marketplace
          </h1>
          <p className="text-lg text-emerald-200 mb-8 max-w-2xl mx-auto">
            Get instant access to thousands of active contractors ready to use your services. Zero customer acquisition cost.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 rounded-md bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors"
          >
            Apply to Join
          </button>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Qualified Demand", desc: "Our contractors are actively building campaigns and need your services. No cold outreach required." },
              { icon: DollarSign, title: "Zero Customer Acquisition Cost", desc: "We bring you the customers, you deliver the service. No marketing spend needed." },
              { icon: TrendingUp, title: "Performance-Based Growth", desc: "Higher ratings = more visibility = more business. Quality work drives your marketplace rank." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="h-14 w-14 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Value Prop */}
      <section className="py-12 px-6 bg-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 rounded-lg border border-purple-200 bg-white p-6">
            <Zap className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Automation Drives Predictable Volume</h3>
              <p className="text-sm text-slate-600 mb-3">
                62% of campaign exports now come from set-and-forget automations. That means predictable, recurring order volume
                for vendors — without contractors manually building campaigns each time.
              </p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-purple-700">62%</p>
                  <p className="text-xs text-slate-500">Automated exports</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">3.2x</p>
                  <p className="text-xs text-slate-500">Avg vendor ROI</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">$0</p>
                  <p className="text-xs text-slate-500">Customer acq. cost</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Integration Works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How Integration Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Plug, step: "1", title: "Apply", desc: "Submit your application to join the marketplace" },
              { icon: FileCode, step: "2", title: "Connect via API", desc: "We provide SDK + documentation for integration" },
              { icon: Settings, step: "3", title: "Set Parameters", desc: "Configure your pricing and service options" },
              { icon: Rocket, step: "4", title: "Start Receiving", desc: "Campaign exports flow directly to your system — both manual and automated" },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-lg border border-slate-200 p-5 text-center">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <s.icon className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Way Partnership */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-purple-700 mb-2">TWO-WAY PARTNERSHIP</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Bring Your Customers to the Platform</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Don&apos;t just receive our contractors — bring YOUR customers to the intelligence layer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <Palette className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">White-Label Our Campaign Builder</h3>
              <p className="text-sm text-slate-500">
                Embed our data intelligence and campaign builder directly in your platform. Your customers get smarter targeting without leaving your ecosystem. Your brand, our brain.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <Users className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Bring Your Customer Base</h3>
              <p className="text-sm text-slate-500">
                Onboard your existing customers onto our platform with your branding. They get access to property intelligence and your services as the default vendor. You earn revenue share on every credit they spend.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <Code className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">API Data Access</h3>
              <p className="text-sm text-slate-500">
                Access our property intelligence data via API for your own products. New listing data, equipment ages, key signals — enriched and ready. Pay per API pull with volume pricing.
              </p>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <p className="text-sm text-purple-800">
              <strong>Example:</strong> A direct mail house white-labels our campaign builder. Their 5,000+ existing customers access our data through the mail house&apos;s interface. Every campaign export generates credit revenue for us AND fulfillment revenue for them. Win-win.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Partner Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star, title: "Standard", desc: "Listed in marketplace, receive campaign exports",
                features: ["Marketplace listing", "Campaign exports", "Basic analytics", "Email support"],
              },
              {
                icon: Award, title: "Preferred", desc: "Boosted visibility, featured placement, priority support",
                features: ["Everything in Standard", "Featured placement", "Priority in search", "Phone support", "Marketing co-op"],
                highlighted: true,
              },
              {
                icon: Building2, title: "Enterprise", desc: "White-label integration, custom API, dedicated account manager",
                features: ["Everything in Preferred", "White-label embed", "Custom API endpoints", "Dedicated account manager", "SLA guarantee"],
              },
            ].map((t) => (
              <div
                key={t.title}
                className={`rounded-lg border-2 p-6 ${
                  t.highlighted ? "border-emerald-600 ring-2 ring-emerald-600 ring-opacity-20" : "border-slate-200"
                }`}
              >
                <t.icon className={`h-8 w-8 mb-3 ${t.highlighted ? "text-emerald-600" : "text-slate-400"}`} />
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{t.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{t.desc}</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center">
          {[
            { value: "1,200+", label: "Active Contractors" },
            { value: "47", label: "Vendor Partners" },
            { value: "3.2M", label: "Records Exported Monthly" },
            { value: "62%", label: "Automated Exports" },
            { value: "3", label: "White-Label Partners" },
            { value: "8,200+", label: "Customers via Partners" },
            { value: "$2.1M", label: "Vendor Revenue Monthly" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-emerald-600">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-emerald-200 mb-8 max-w-lg mx-auto">
          Join the marketplace and start receiving campaign exports from thousands of contractors.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 rounded-md bg-white text-emerald-900 font-semibold hover:bg-emerald-50"
          >
            Apply to Join
          </button>
          <Link
            href="/vendors/white-label"
            className="px-8 py-3 rounded-md border border-emerald-400 text-emerald-100 font-semibold hover:bg-emerald-600/50"
          >
            Explore White-Label
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm">
        &copy; 2026 UHL Intelligence Platform. All rights reserved.
      </footer>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Apply to Join</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Business Email"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
              <select className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-500">
                <option>Service Category</option>
                <option>Direct Mail</option>
                <option>SMS</option>
                <option>Email</option>
                <option>CRM</option>
                <option>Digital Ads</option>
                <option>Other</option>
              </select>
              <textarea
                placeholder="Tell us about your company..."
                rows={3}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-6 py-3 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
