"use client";

import { useState } from "react";
import { Coins, TrendingUp, CreditCard, Gift, X, Zap, RefreshCw, DollarSign, Sparkles } from "lucide-react";
import KPICard from "@/components/KPICard";
import { creditHistory } from "@/data/creditHistory";
import { moverCreditHistory } from "@/data/moverData";
import { formatDate, formatNumber } from "@/lib/utils";
import { useBusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";

type UsageFilter = "all" | "automated" | "manual";

const bundles = [
  { name: "PAYG", credits: "As needed", price: "$0.50", perCredit: "$0.50/credit", commitment: "No commitment", color: "slate" },
  { name: "Starter", credits: "200/mo", price: "$80/mo", perCredit: "$0.40/credit", commitment: "Month-to-month", color: "blue" },
  { name: "Growth", credits: "500/mo", price: "$175/mo", perCredit: "$0.35/credit", commitment: "Month-to-month", popular: true, color: "blue" },
  { name: "Pro", credits: "1,000/mo", price: "$300/mo", perCredit: "$0.30/credit", commitment: "Annual", color: "purple" },
  { name: "Enterprise", credits: "5,000/mo", price: "$1,250/mo", perCredit: "$0.25/credit", commitment: "Annual", color: "purple" },
];

export default function CreditsPage() {
  const { businessType, isMover } = useBusinessType();
  const config = businessTypeConfigs[businessType];
  const activeCreditHistory = isMover ? moverCreditHistory : creditHistory;
  const [showModal, setShowModal] = useState(false);
  const [purchaseBundle, setPurchaseBundle] = useState<string>("");
  const [usageFilter, setUsageFilter] = useState<UsageFilter>("all");

  const handleBuy = (name: string) => {
    setPurchaseBundle(name);
    setShowModal(true);
  };

  const filteredHistory = usageFilter === "all"
    ? activeCreditHistory
    : activeCreditHistory.filter((t) => {
        if (usageFilter === "automated") return t.campaignType === "automated";
        if (usageFilter === "manual") return t.campaignType === "manual" || t.type !== "usage";
        return true;
      });

  // Calculate auto credits this month
  const autoCreditsThisMonth = activeCreditHistory
    .filter((t) => t.date >= "2026-02-01" && t.campaignType === "automated" && t.creditsUsed > 0)
    .reduce((sum, t) => sum + t.creditsUsed, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Credits & Billing</h1>
        <p className="text-slate-500 text-sm">Manage your credits, bundles, and view usage history</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <KPICard title="Credit Balance" value="2,340" icon={Coins} />
        <KPICard title="Used This Month" value="1,660" icon={TrendingUp} trend="62% automated" trendUp />
        <KPICard title="Membership" value="$399/mo" icon={CreditCard} trend="Includes 50 free credits" />
        <KPICard title="Current Rate" value="$0.35" icon={DollarSign} trend="Growth Bundle" />
        <KPICard title="Credits on Autopilot" value={formatNumber(autoCreditsThisMonth)} icon={RefreshCw} trend="~$385/mo at Growth rate" />
      </div>

      {/* Credit Model Callout */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Simple Pricing: 1 Credit = 1 Export</p>
          <p className="text-sm text-blue-700 mt-0.5">
            Every record exported costs exactly 1 credit, regardless of channel (email, SMS, direct mail).
            Your $399/mo membership includes 50 free credits. Buy more with prepaid bundles for the best rate.
          </p>
        </div>
      </div>

      {/* Bundle Tiers */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Credit Bundles</h2>
        <p className="text-sm text-slate-500 mb-5">Prepaid bundles get you the best per-credit rate. Current plan: <span className="font-medium text-blue-800">Growth (500/mo)</span></p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {bundles.map((b) => (
            <div
              key={b.name}
              className={`rounded-lg border p-5 text-center transition-shadow hover:shadow-md ${
                b.popular ? "border-blue-800 ring-2 ring-blue-800 ring-opacity-20" : "border-slate-200"
              }`}
            >
              {b.popular && (
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-800 text-white font-medium mb-2">
                  Current Plan
                </span>
              )}
              <h3 className="font-semibold text-slate-900">{b.name}</h3>
              <p className="text-2xl font-bold text-slate-900 mt-2">{b.credits}</p>
              <p className="text-sm text-slate-500">credits</p>
              <p className="text-lg font-semibold text-blue-800 mt-2">{b.price}</p>
              <p className="text-xs text-slate-500">{b.perCredit}</p>
              <p className="text-xs text-slate-400 mt-1">{b.commitment}</p>
              <button
                onClick={() => handleBuy(b.name)}
                className={`w-full mt-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  b.popular
                    ? "bg-slate-100 text-slate-500 cursor-default"
                    : "bg-blue-800 text-white hover:bg-blue-900"
                }`}
                disabled={b.popular}
              >
                {b.popular ? "Active" : b.name === "PAYG" ? "Top Up" : "Switch Plan"}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600 mb-2 font-medium">Auto-Replenish (PAYG Top-Up)</p>
          <div className="flex items-center gap-3 flex-wrap text-sm text-slate-500">
            <span>When balance drops below</span>
            <input
              type="number"
              defaultValue={100}
              className="w-24 border border-slate-200 rounded-md px-3 py-1.5 text-sm"
            />
            <span>credits, automatically purchase</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm">
              <option>50 credits ($25.00)</option>
              <option>100 credits ($50.00)</option>
              <option>200 credits ($100.00)</option>
            </select>
            <span>at PAYG rate ($0.50/credit)</span>
          </div>
        </div>
      </div>

      {/* Smart Bundle Recommendation */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-8 flex items-start gap-4">
        <Zap className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-purple-900">Bundle Recommendation</h3>
          <p className="text-sm text-purple-700 mt-1">
            You used <strong>1,660 credits</strong> this month (62% from automations).
            Upgrading to the <strong>Pro Bundle (1,000/mo at $0.30)</strong> would save you
            <strong className="text-emerald-700"> ~$83/mo</strong> compared to your current Growth rate — and you&apos;d cover your PAYG overages at a better rate.
          </p>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-8">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Usage History</h2>
          <div className="flex gap-2">
            {(["all", "automated", "manual"] as UsageFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setUsageFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  usageFilter === f
                    ? "bg-blue-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Campaign</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Channel</th>
                <th className="text-right py-3 px-4 text-slate-500 font-medium">Records</th>
                <th className="text-right py-3 px-4 text-slate-500 font-medium">Credits</th>
                <th className="text-right py-3 px-4 text-slate-500 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((t) => {
                const cost = t.creditsUsed > 0 ? t.creditsUsed * 0.35 : 0;
                return (
                  <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600">{formatDate(t.date)}</td>
                    <td className="py-3 px-4 text-slate-900 font-medium">{t.description}</td>
                    <td className="py-3 px-4">
                      {t.campaignType === "automated" ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                          <Zap className="h-3 w-3" /> Auto
                        </span>
                      ) : t.campaignType === "manual" ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          Manual
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{t.campaign}</td>
                    <td className="py-3 px-4 text-slate-600">{t.channel}</td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      {t.records > 0 ? formatNumber(t.records) : "—"}
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${t.creditsUsed < 0 ? "text-emerald-600" : "text-slate-900"}`}>
                      {t.creditsUsed < 0 ? `+${formatNumber(Math.abs(t.creditsUsed))}` : formatNumber(t.creditsUsed)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {cost > 0 ? `$${cost.toFixed(2)}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900">Rewards & Bonuses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-slate-900 text-sm mb-2">Tenure Bonuses</h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>3 months = <span className="font-medium text-emerald-600">100 free credits</span></li>
              <li>6 months = <span className="font-medium text-emerald-600">250 free credits</span></li>
              <li>12 months = <span className="font-medium text-emerald-600">500 free credits</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 text-sm mb-2">Referral Bonus</h3>
            <p className="text-sm text-slate-600">
              Earn <span className="font-medium text-emerald-600">500 credits</span> for every {config.referralText} you refer who signs up.
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Confirm Change</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              {purchaseBundle === "PAYG"
                ? "Purchase a PAYG credit top-up?"
                : <>Switch to the <strong>{purchaseBundle}</strong> bundle?</>}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
