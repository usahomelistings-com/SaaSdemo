"use client";

import { useState } from "react";
import { Mail, MessageSquare, FileText, PenTool, Phone, Database, Star, CheckCircle, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import StepProgress from "@/components/StepProgress";
import RuleBuilder, { type Rule } from "@/components/RuleBuilder";
import SchedulePicker, { type Schedule } from "@/components/SchedulePicker";
import AutomationTemplates from "@/components/AutomationTemplates";
import { vendors } from "@/data/vendors";
import { automationTemplates } from "@/data/automationTemplates";
import { formatNumber, getLeadScoreLabel } from "@/lib/utils";
import { properties } from "@/data/properties";
import { audiences } from "@/data/audiences";
import { useBusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";
import { moverAutomationTemplates, moverFieldOptions, moverOperatorsByField } from "@/data/moverData";

const channels = [
  { id: "email", label: "Email", icon: Mail, desc: "Best for nurture sequences" },
  { id: "sms", label: "SMS", icon: MessageSquare, desc: "Best for time-sensitive offers" },
  { id: "4x6", label: "4x6 Postcard", icon: Mail, desc: "Best for first impressions" },
  { id: "6x9", label: "6x9 Postcard", icon: Mail, desc: "Higher visibility" },
  { id: "6x11", label: "6x11 Postcard", icon: Mail, desc: "Premium format" },
  { id: "letter", label: "Letter", icon: FileText, desc: "Professional correspondence" },
  { id: "handwritten", label: "Handwritten Card", icon: PenTool, desc: "Personal touch" },
  { id: "phone", label: "Phone / Dialer", icon: Phone, desc: "Direct outreach", subtitle: "Permission-verified contacts only — we filter for phone consent" },
  { id: "crm", label: "CRM Export", icon: Database, desc: "Push to your CRM", subtitle: "Compatible with: Smart Moving, HubSpot, Salesforce, and 20+ CRMs via API" },
];

const manualSteps = ["Select Audience", "Choose Channels", "Select Vendor", "Review & Export"];
const autoSteps = ["Choose Template", "Set Rules", "Schedule & Safety", "Channels & Vendor", "Review & Activate"];

const defaultSchedule: Schedule = {
  frequency: "weekly",
  dayOfWeek: "Monday",
  maxPerRun: "",
  monthlyCreditCap: "500",
  dedupWindowDays: "90",
  pauseBelowCredits: "100",
};

export default function CampaignBuilderPage() {
  const { businessType, isMover } = useBusinessType();
  const config = businessTypeConfigs[businessType];
  const [mode, setMode] = useState<"manual" | "automation">("manual");
  const [step, setStep] = useState(0);
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [exported, setExported] = useState(false);

  // Automation state
  const [autoRules, setAutoRules] = useState<Rule[]>([{ field: config.defaultRuleField, operator: config.defaultRuleOperator, value: "" }]);
  const [autoSchedule, setAutoSchedule] = useState<Schedule>(defaultSchedule);
  const [autoName, setAutoName] = useState("");

  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const myAudiences = audiences.filter((a) => a.businessType === businessType);
  const activeAudience = myAudiences.find((a) => a.id === selectedAudience);
  const audienceCount = activeAudience?.recordCount ?? 0;
  const creditsRequired = audienceCount;
  const creditBalance = 2340;
  const needMore = creditsRequired > creditBalance;
  const vendor = vendors.find((v) => v.id === selectedVendor);

  const selectedChannelLabels = channels.filter((c) => selectedChannels.has(c.id)).map((c) => c.label);

  const channelCategory = selectedChannels.size > 0
    ? (() => {
        const firstChannel = [...selectedChannels][0];
        if (["4x6", "6x9", "6x11", "letter", "handwritten"].includes(firstChannel)) return "Direct Mail";
        if (firstChannel === "sms") return "SMS";
        if (firstChannel === "email") return "Email";
        if (firstChannel === "crm") return "CRM";
        return "Direct Mail";
      })()
    : "";

  const filteredVendors = vendors.filter((v) => v.category === channelCategory || channelCategory === "");

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const steps = mode === "manual" ? manualSteps : autoSteps;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Campaign Builder</h1>
        <p className="text-slate-500 text-sm">Build and export campaigns to your preferred vendors</p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode("manual"); setStep(0); setExported(false); }}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "manual" ? "bg-blue-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          One-Time Campaign
        </button>
        <button
          onClick={() => { setMode("automation"); setStep(0); setExported(false); }}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
            mode === "automation" ? "bg-purple-700 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Zap className="h-4 w-4" /> Set-and-Forget Automation
        </button>
      </div>

      <StepProgress steps={steps} currentStep={step} />

      {/* ========== MANUAL MODE ========== */}
      {mode === "manual" && (
        <>
          {/* Step 0: Select Audience */}
          {step === 0 && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Select an Audience</h2>
              <p className="text-sm text-slate-500 mb-4">Choose a saved audience to target with this campaign</p>

              {myAudiences.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {myAudiences.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAudience(a.id)}
                      className={`text-left rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                        selectedAudience === a.id
                          ? "border-blue-800 bg-blue-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 text-sm">{a.name}</h3>
                        <span className="text-lg font-bold text-blue-800">{a.recordCount.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {a.rules.map((r, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                            {r.field} {r.operator} {r.value}
                          </span>
                        ))}
                      </div>
                      {selectedAudience === a.id && (
                        <p className="text-xs text-blue-700 font-medium mt-2">
                          {a.recordCount} records &middot; {a.recordCount} credits required
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-center mb-6">
                  <p className="text-slate-500 mb-2">No audiences saved yet.</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link
                  href="/dashboard/audiences"
                  className="text-sm text-blue-800 font-medium hover:underline"
                >
                  Create New Audience &rarr;
                </Link>
                <button
                  onClick={() => setStep(1)}
                  disabled={!selectedAudience}
                  className="px-6 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Choose Channels (multi-select) */}
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Choose Channel(s)</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800 font-medium">1 credit = 1 export, regardless of channel</p>
                <p className="text-xs text-blue-700 mt-0.5">Select one or more channels. Credits are charged once per export.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => toggleChannel(ch.id)}
                    className={`text-left bg-white rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                      selectedChannels.has(ch.id) ? "border-blue-800 bg-blue-50/30" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <ch.icon className="h-5 w-5 text-blue-800" />
                      {selectedChannels.has(ch.id) && <CheckCircle className="h-4 w-4 text-blue-800" />}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">{ch.label}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{ch.desc}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">1 credit/record</p>
                    {selectedChannels.has(ch.id) && (
                      <p className="text-xs text-blue-700 font-medium mt-1">{audienceCount} credits for {audienceCount} records</p>
                    )}
                    {ch.subtitle && <p className="text-xs text-slate-400 mt-1.5 leading-snug">{ch.subtitle}</p>}
                  </button>
                ))}
              </div>
              {selectedChannels.size > 0 && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Selected: {selectedChannelLabels.join(" + ")}
                      </p>
                      <p className="text-sm text-blue-800 font-semibold mt-0.5">
                        Total: 1 credit/record &times; {audienceCount} records = {audienceCount} credits
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Credits are charged once per record. Send to as many channels as you want — no extra cost.</p>
                    </div>
                    <button
                      onClick={() => { setSelectedVendor(null); setStep(2); }}
                      className="px-6 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 flex-shrink-0 ml-4"
                    >
                      Continue &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Vendor */}
          {step === 2 && (
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Select Vendor</h2>
              <p className="text-sm text-slate-500 mb-4">Showing vendors for your selected channels</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVendors.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVendor(v.id); setStep(3); }}
                    className={`text-left bg-white rounded-lg border-2 p-5 transition-all hover:shadow-md ${
                      selectedVendor === v.id ? "border-blue-800" : "border-slate-200"
                    }`}
                    disabled={v.integrationStatus !== "connected"}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: v.color }}>
                        {v.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{v.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-slate-600">{v.rating} ({v.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{v.description}</p>
                    {v.integrationStatus !== "connected" && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Coming Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Review & Export */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {exported ? (
                <div className="bg-white rounded-lg border border-emerald-200 shadow-sm p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Campaign Exported!</h2>
                  <p className="text-slate-500 mb-6">Campaign exported to {vendor?.name}! You&apos;ll receive a confirmation email.</p>
                  <Link href="/dashboard" className="px-6 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900">
                    Back to Dashboard
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Campaign Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Audience</span>
                      <span className="text-sm font-medium text-slate-900">{audienceCount} new homeowners</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Channels</span>
                      <span className="text-sm font-medium text-slate-900">{selectedChannelLabels.join(", ") || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Vendor</span>
                      <span className="text-sm font-medium text-slate-900">{vendor?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Credits Required</span>
                      <span className="text-sm font-medium text-slate-900">{formatNumber(creditsRequired)} (1 per export)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Credit Balance</span>
                      <span className="text-sm font-medium text-slate-900">{formatNumber(creditBalance)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Estimated Cost</span>
                      <span className="text-sm font-medium text-slate-900">
                        ${(creditsRequired * 0.50).toFixed(2)} PAYG · ${(creditsRequired * 0.25).toFixed(2)} Enterprise
                      </span>
                    </div>
                  </div>
                  {needMore && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-center justify-between">
                      <p className="text-sm text-amber-800">You need {formatNumber(creditsRequired - creditBalance)} more credits</p>
                      <Link href="/dashboard/credits" className="px-3 py-1.5 rounded-md bg-amber-600 text-white text-xs font-medium hover:bg-amber-700">
                        Buy Credits
                      </Link>
                    </div>
                  )}
                  <button onClick={() => setExported(true)} className="w-full px-6 py-3 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors">
                    Export Campaign &rarr;
                  </button>
                  <button
                    onClick={() => { setMode("automation"); setStep(0); }}
                    className="w-full mt-2 text-sm text-purple-700 hover:text-purple-800 font-medium"
                  >
                    Save as Automation Instead &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ========== AUTOMATION MODE ========== */}
      {mode === "automation" && (
        <>
          {/* Step 0: Choose Template */}
          {step === 0 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Start from a Template</h2>
              <p className="text-sm text-slate-500 mb-4">Choose a pre-built template or build from scratch</p>
              <AutomationTemplates
                templates={isMover ? moverAutomationTemplates : automationTemplates}
                onSelect={(t) => {
                  setAutoName(t.name);
                  setAutoRules(t.rules.map((r) => ({ field: r.field, operator: r.operator, value: String(r.value) })));
                  setAutoSchedule((prev) => ({ ...prev, frequency: t.suggestedSchedule }));
                  t.suggestedChannels.forEach((ch) => {
                    const found = channels.find((c) => c.label === ch);
                    if (found) setSelectedChannels((prev) => new Set(prev).add(found.id));
                  });
                  setStep(1);
                }}
              />
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-purple-700 hover:text-purple-800 font-medium"
                >
                  Or build from scratch &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Set Rules */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto">
              <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Define Trigger Rules</h2>
              <p className="text-sm text-slate-500 mb-4">Properties matching these rules will be automatically exported</p>
              {/* Start from Saved Audience */}
              {myAudiences.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-center gap-3">
                  <span className="text-sm text-purple-800 font-medium whitespace-nowrap">Start from saved audience:</span>
                  <select
                    onChange={(e) => {
                      const aud = myAudiences.find((a) => a.id === e.target.value);
                      if (aud) {
                        setAutoRules(aud.rules.map((r) => ({ field: r.field, operator: r.operator, value: r.value })));
                        if (!autoName) setAutoName(aud.name + " — Automation");
                      }
                    }}
                    defaultValue=""
                    className="flex-1 border border-purple-200 rounded-md px-2 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Choose an audience to pre-fill rules...</option>
                    {myAudiences.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} ({a.recordCount} records)</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Automation Name</label>
                  <input
                    type="text"
                    value={autoName}
                    onChange={(e) => setAutoName(e.target.value)}
                    placeholder={config.campaignPlaceholder}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <RuleBuilder
                  rules={autoRules}
                  onChange={setAutoRules}
                  fieldOptionsProp={isMover ? moverFieldOptions : undefined}
                  operatorsByFieldProp={isMover ? moverOperatorsByField : undefined}
                  defaultField={config.defaultRuleField}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={autoRules.length === 0}
                  className="px-6 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 disabled:opacity-50"
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Schedule & Safety */}
          {step === 2 && (
            <div className="max-w-3xl mx-auto">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Set Schedule & Safety</h2>
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-4">
                <SchedulePicker schedule={autoSchedule} onChange={setAutoSchedule} />
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep(3)} className="px-6 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800">
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Channels & Vendor */}
          {step === 3 && (
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Choose Channels & Vendor</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-purple-800 font-medium">1 credit = 1 export, regardless of channel</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => toggleChannel(ch.id)}
                    className={`text-left bg-white rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                      selectedChannels.has(ch.id) ? "border-purple-600 bg-purple-50/30" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <ch.icon className="h-5 w-5 text-purple-700" />
                      {selectedChannels.has(ch.id) && <CheckCircle className="h-4 w-4 text-purple-700" />}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">{ch.label}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{ch.desc}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">1 credit/record</p>
                    {selectedChannels.has(ch.id) && (
                      <p className="text-xs text-purple-700 font-medium mt-1">~45 records/week</p>
                    )}
                    {ch.subtitle && <p className="text-xs text-slate-400 mt-1.5 leading-snug">{ch.subtitle}</p>}
                  </button>
                ))}
              </div>
              {selectedChannels.size > 0 && (
                <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Selected: {selectedChannelLabels.join(" + ")}
                  </p>
                  <p className="text-sm text-purple-800 font-semibold mt-0.5">
                    Est: 1 credit/record &times; ~45 new matches/week = ~180 credits/month
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Credits are charged once per record. Send to as many channels as you want — no extra cost.</p>
                </div>
              )}
              {/* Permission notes for Phone/SMS channels */}
              {selectedChannels.has("phone") && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2">
                  <Phone className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-emerald-800">Only records with <strong>phone consent</strong> (not on DNC, verified active number) will be included in phone exports.</p>
                </div>
              )}
              {selectedChannels.has("sms") && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-emerald-800">Only records with <strong>SMS consent</strong> will be included in SMS exports. Non-consented records are automatically excluded.</p>
                </div>
              )}
              {selectedChannels.size > 0 && (
                <>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Select Vendor</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredVendors.filter((v) => v.integrationStatus === "connected").map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVendor(v.id); setStep(4); }}
                        className={`text-left bg-white rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                          selectedVendor === v.id ? "border-purple-600" : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: v.color }}>
                            {v.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm">{v.name}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-slate-500">{v.rating}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Review & Activate */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto">
              <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {exported ? (
                <div className="bg-white rounded-lg border border-purple-200 shadow-sm p-8 text-center">
                  <Zap className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Automation is Live!</h2>
                  <p className="text-slate-500 mb-6">It will run automatically based on your schedule.</p>
                  <Link href="/dashboard/automations" className="px-6 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800">
                    View Automations
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-lg border-2 border-purple-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-slate-900">AUTOMATION: {autoName || "Untitled"}</h2>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Trigger</span>
                      <span className="text-sm font-medium text-slate-900">
                        {autoRules.map((r) => `${r.field} ${r.operator} ${r.value}`).join(" AND ")}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Schedule</span>
                      <span className="text-sm font-medium text-slate-900 capitalize">
                        {autoSchedule.frequency === "realtime" ? "As new data arrives" : autoSchedule.frequency}
                        {autoSchedule.frequency === "weekly" ? ` (${autoSchedule.dayOfWeek})` : ""}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Channels</span>
                      <span className="text-sm font-medium text-slate-900">{selectedChannelLabels.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Vendor</span>
                      <span className="text-sm font-medium text-slate-900">{vendor?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Est. volume</span>
                      <span className="text-sm font-medium text-slate-900">~45 new matches/week</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Est. credits</span>
                      <span className="text-sm font-medium text-slate-900">~180/month</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Est. cost</span>
                      <span className="text-sm font-medium text-slate-900">~$63/mo at Growth ($0.35) rate</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Safety</span>
                      <span className="text-sm text-slate-600">
                        Pauses below {autoSchedule.pauseBelowCredits || 100} credits | {autoSchedule.dedupWindowDays}-day dedup
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setExported(true)} className="flex-1 px-6 py-3 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 transition-colors">
                      Activate Automation
                    </button>
                    <Link href="/dashboard/automations" className="flex-1 px-6 py-3 rounded-md border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 text-center">
                      Save as Draft
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
