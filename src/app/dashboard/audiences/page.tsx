"use client";

import { useState, useMemo } from "react";
import { Users, Plus, ArrowLeft, Target, Hash, TrendingUp, Megaphone } from "lucide-react";
import Link from "next/link";
import KPICard from "@/components/KPICard";
import RuleBuilder, { type Rule } from "@/components/RuleBuilder";
import { audiences as initialAudiences, type Audience } from "@/data/audiences";
import { properties } from "@/data/properties";
import { useBusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";
import { moverFieldOptions, moverOperatorsByField } from "@/data/moverData";
import { formatDate } from "@/lib/utils";

export default function AudiencesPage() {
  const { businessType, isMover } = useBusinessType();
  const config = businessTypeConfigs[businessType];
  const [view, setView] = useState<"list" | "create">("list");
  const [allAudiences, setAllAudiences] = useState<Audience[]>(initialAudiences);
  const [newName, setNewName] = useState("");
  const [newRules, setNewRules] = useState<Rule[]>([
    { field: config.defaultRuleField, operator: config.defaultRuleOperator, value: "" },
  ]);

  const myAudiences = allAudiences.filter((a) => a.businessType === businessType);

  const totalRecords = myAudiences.reduce((sum, a) => sum + a.recordCount, 0);

  // Live preview: count properties matching current rules
  const previewCount = useMemo(() => {
    if (newRules.length === 0 || newRules.every((r) => !r.value)) return 0;
    return properties.filter((p) => {
      return newRules.every((rule) => {
        if (!rule.value) return true;
        const val = rule.value.toLowerCase();
        switch (rule.field) {
          case "HVAC Age": return applyNumericOp(p.hvacAge, rule.operator, Number(val));
          case "Water Heater Age": return applyNumericOp(p.waterHeaterAge, rule.operator, Number(val));
          case "Roof Age": return applyNumericOp(p.roofAge, rule.operator, Number(val));
          case "Home Value": return applyNumericOp(p.homeValue, rule.operator, Number(val));
          case "Lead Score": return applyNumericOp(p.leadScore, rule.operator, Number(val));
          case "Property Type": return p.propertyType === val;
          case "Phone Consent": return p.phoneConsent === (val === "yes");
          case "SMS Consent": return p.smsConsent === (val === "yes");
          case "Email Valid": return p.emailValid === (val === "yes");
          case "Has Warranty": return p.hasWarranty === (val === "yes");
          case "ZIP Code": return p.zip === val;
          case "City": return p.city.toLowerCase() === val;
          default: return true;
        }
      });
    }).length;
  }, [newRules]);

  const handleSave = () => {
    if (!newName.trim()) return;
    const newAudience: Audience = {
      id: `AUD${String(allAudiences.length + 1).padStart(3, "0")}`,
      name: newName.trim(),
      rules: newRules.filter((r) => r.value),
      recordCount: previewCount,
      createdDate: new Date().toISOString().split("T")[0],
      businessType,
    };
    setAllAudiences((prev) => [...prev, newAudience]);
    setNewName("");
    setNewRules([{ field: config.defaultRuleField, operator: config.defaultRuleOperator, value: "" }]);
    setView("list");
  };

  return (
    <div>
      {view === "list" ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Audiences</h1>
              <p className="text-slate-500 text-sm">Build and manage reusable audience segments</p>
            </div>
            <button
              onClick={() => setView("create")}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              <Plus className="h-4 w-4" /> Create Audience
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <KPICard title="Saved Audiences" value={String(myAudiences.length)} icon={Users} />
            <KPICard title="Total Records" value={totalRecords.toLocaleString()} icon={Hash} />
            <KPICard title="Avg Records/Audience" value={myAudiences.length > 0 ? Math.round(totalRecords / myAudiences.length).toLocaleString() : "0"} icon={TrendingUp} />
          </div>

          {/* Audience Cards */}
          {myAudiences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myAudiences.map((a) => (
                <div key={a.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{a.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Created {formatDate(a.createdDate)}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-800">{a.recordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {a.rules.map((r, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {r.field} {r.operator} {r.value}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/dashboard/campaigns"
                      className="flex-1 text-center px-3 py-2 rounded-md bg-blue-800 text-white text-xs font-medium hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Megaphone className="h-3 w-3" /> Use in Campaign
                    </Link>
                    <button
                      onClick={() => {
                        setNewName(a.name);
                        setNewRules(a.rules.map((r) => ({ ...r })));
                        setView("create");
                      }}
                      className="px-3 py-2 rounded-md border border-slate-200 text-xs text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <Target className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">No audiences created yet.</p>
              <button
                onClick={() => setView("create")}
                className="text-sm text-blue-800 font-medium hover:underline"
              >
                Create your first audience &rarr;
              </button>
            </div>
          )}
        </>
      ) : (
        /* ========== CREATE / EDIT VIEW ========== */
        <>
          <div className="mb-6">
            <button
              onClick={() => { setView("list"); setNewName(""); setNewRules([{ field: config.defaultRuleField, operator: config.defaultRuleOperator, value: "" }]); }}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Audiences
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Create Audience</h1>
            <p className="text-slate-500 text-sm">Define rules to segment your property data</p>
          </div>

          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-4">
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1">Audience Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={isMover ? "e.g., New Listings — Quick Movers" : "e.g., High-Value HVAC Replacements"}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-3">Filter Rules</label>
                <RuleBuilder
                  rules={newRules}
                  onChange={setNewRules}
                  fieldOptionsProp={isMover ? moverFieldOptions : undefined}
                  operatorsByFieldProp={isMover ? moverOperatorsByField : undefined}
                  defaultField={config.defaultRuleField}
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Matching Records</p>
                <p className="text-xs text-blue-700 mt-0.5">Based on current rules against your property data</p>
              </div>
              <span className="text-3xl font-bold text-blue-800">{previewCount}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!newName.trim() || previewCount === 0}
                className="px-6 py-3 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Audience
              </button>
              <button
                onClick={() => { setView("list"); setNewName(""); setNewRules([{ field: config.defaultRuleField, operator: config.defaultRuleOperator, value: "" }]); }}
                className="px-6 py-3 rounded-md border border-slate-200 text-sm text-slate-600 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function applyNumericOp(value: number, operator: string, target: number): boolean {
  switch (operator) {
    case "greater than": return value > target;
    case "less than": return value < target;
    case "equals": return value === target;
    default: return true;
  }
}
