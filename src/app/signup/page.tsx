"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StepProgress from "@/components/StepProgress";
import { CheckCircle, Coins, Wrench, Truck } from "lucide-react";
import { useBusinessType, type BusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";

const steps = ["Business Info", "Service Area", "Plan & Credits", "Payment", "Welcome"];

const creditBundles = [
  { id: "payg", name: "Pay-As-You-Go", credits: "As needed", price: "$0.50/credit", monthly: "$0", desc: "No commitment, buy when you need" },
  { id: "starter", name: "Starter", credits: "200/mo", price: "$0.40/credit", monthly: "$80/mo", desc: "Great for getting started" },
  { id: "growth", name: "Growth", credits: "500/mo", price: "$0.35/credit", monthly: "$175/mo", desc: "Most popular for growing businesses", popular: true },
  { id: "pro", name: "Pro", credits: "1,000/mo", price: "$0.30/credit", monthly: "$300/mo", desc: "High-volume campaigns + automations" },
];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState("growth");
  const [selectedType, setSelectedType] = useState<BusinessType>("contractor");
  const { setBusinessType } = useBusinessType();
  const router = useRouter();
  const config = businessTypeConfigs[selectedType];

  const bundle = creditBundles.find((b) => b.id === selectedBundle)!;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-800">
            UHL Intelligence
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-6">
        <StepProgress steps={steps} currentStep={step} />

        {/* Step 0: Business Info */}
        {step === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Business Information</h2>
            <div className="space-y-4">
              {/* Business Type Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Business Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedType("contractor")}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                      selectedType === "contractor"
                        ? "border-blue-800 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Wrench className="h-5 w-5 text-blue-800 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Home Services Contractor</p>
                      <p className="text-xs text-slate-500">HVAC, Plumbing, Electrical, etc.</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType("mover")}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                      selectedType === "mover"
                        ? "border-blue-800 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Truck className="h-5 w-5 text-blue-800 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Moving Company</p>
                      <p className="text-xs text-slate-500">Local, Long-Distance, Commercial</p>
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  defaultValue={config.companyName}
                  key={selectedType}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{selectedType === "mover" ? "Service Type" : "Trade Type"}</label>
                <select key={selectedType} className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800">
                  {config.tradeTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years in Business</label>
                <input
                  type="number"
                  defaultValue={12}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>
            <button
              onClick={() => { setBusinessType(selectedType); setStep(1); }}
              className="mt-6 w-full px-6 py-3 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-900 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1: Service Area */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Service Area</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary ZIP Code</label>
                <input
                  type="text"
                  defaultValue="41091"
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Radius</label>
                <select className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800">
                  <option>25 miles</option>
                  <option>50 miles</option>
                  <option>75 miles</option>
                  <option>100 miles</option>
                </select>
              </div>
              {/* Map Placeholder */}
              <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-400 mx-auto flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-800" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">50-mile radius from 41091</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(0)}
                className="flex-1 px-6 py-3 rounded-md border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-900 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Plan & Credit Bundle */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Plan</h2>

            {/* Membership */}
            <div className="border-2 border-blue-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Platform Membership</h3>
                <span className="text-2xl font-bold text-blue-800">$399/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> 50-mile radius homeowner data</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> Campaign builder + set-and-forget automations</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> Vendor marketplace access</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> Performance analytics</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> 50 free credits every month</li>
              </ul>
            </div>

            {/* Credit Bundle Selector */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-900">Credit Bundle (1 credit = 1 export)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {creditBundles.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBundle(b.id)}
                    className={`text-left rounded-lg border-2 p-4 transition-all ${
                      selectedBundle === b.id
                        ? "border-blue-800 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-900">{b.name}</span>
                      {b.popular && (
                        <span className="text-xs bg-blue-800 text-white px-2 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{b.credits} &middot; {b.price}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{b.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 rounded-md border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-900 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Details</h2>
            <div className="space-y-4 opacity-75">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  disabled
                  placeholder="4242 4242 4242 4242"
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-slate-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    disabled
                    placeholder="MM/YY"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                  <input
                    type="text"
                    disabled
                    placeholder="123"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-slate-50"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Platform Membership</span>
                <span className="font-medium">$399/mo</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Credit Bundle: {bundle.name}</span>
                <span className="font-medium">{bundle.monthly}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>Includes 50 free credits/mo</span>
                <span>included</span>
              </div>
              <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>
                  {selectedBundle === "payg" ? "$399" :
                   selectedBundle === "starter" ? "$479" :
                   selectedBundle === "growth" ? "$574" : "$699"}/mo
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 rounded-md border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 px-6 py-3 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-900 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Welcome */}
        {step === 4 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the Platform!</h2>
            <p className="text-slate-500 mb-2">
              Your account is set up and ready to go. You have <strong>50 free credits</strong> waiting for you.
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Try setting up a set-and-forget automation to start generating leads on autopilot.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 py-3 rounded-md bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
