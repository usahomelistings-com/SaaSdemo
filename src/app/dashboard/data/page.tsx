"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Database, AlertTriangle, Home, Filter, Upload, X, Info, RotateCcw, TrendingUp, Map, TableProperties, Users } from "lucide-react";
import Link from "next/link";
import KPICard from "@/components/KPICard";
import PropertyTable from "@/components/PropertyTable";
import PropertyCard from "@/components/PropertyCard";
import { properties, type Property } from "@/data/properties";
import { exportedRecords } from "@/data/exportedRecords";
import { getLeadScoreBg, getLeadScoreLabel, getPropertyTypeLabel } from "@/lib/utils";
import { useBusinessType } from "@/context/BusinessTypeContext";
import { businessTypeConfigs } from "@/data/businessTypeConfig";
import "leaflet/dist/leaflet.css";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), { ssr: false });

interface Filters {
  propertyTypes: Set<string>;
  leadScoreMin: number;
  leadScoreMax: number;
  hvacAgeMin: number;
  hvacAgeMax: number;
  homeValueMin: number;
  homeValueMax: number;
  phoneConsent: boolean | null;
  smsConsent: boolean | null;
  emailValid: boolean | null;
  highIntentOnly: boolean;
}

const defaultFilters: Filters = {
  propertyTypes: new Set(["new_listing", "new_owner", "new_build"]),
  leadScoreMin: 1,
  leadScoreMax: 10,
  hvacAgeMin: 0,
  hvacAgeMax: 25,
  homeValueMin: 100000,
  homeValueMax: 500000,
  phoneConsent: null,
  smsConsent: null,
  emailValid: null,
  highIntentOnly: false,
};

export default function DataPage() {
  const { businessType, isMover } = useBusinessType();
  const config = businessTypeConfigs[businessType];
  const [activeTab, setActiveTab] = useState<"listings" | "exported">("listings");
  const [viewMode, setViewMode] = useState<"table" | "map">("table");
  const [exportedViewMode, setExportedViewMode] = useState<"table" | "map">("table");
  const [selectedMapProperty, setSelectedMapProperty] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedExportedIds, setSelectedExportedIds] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, propertyTypes: new Set(defaultFilters.propertyTypes) });
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMapSelect = useCallback((id: string) => {
    setSelectedMapProperty(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (!filters.propertyTypes.has(p.propertyType)) return false;
      if (p.leadScore < filters.leadScoreMin || p.leadScore > filters.leadScoreMax) return false;
      if (p.hvacAge < filters.hvacAgeMin || p.hvacAge > filters.hvacAgeMax) return false;
      if (p.homeValue < filters.homeValueMin || p.homeValue > filters.homeValueMax) return false;
      if (filters.phoneConsent !== null && p.phoneConsent !== filters.phoneConsent) return false;
      if (filters.smsConsent !== null && p.smsConsent !== filters.smsConsent) return false;
      if (filters.emailValid !== null && p.emailValid !== filters.emailValid) return false;
      if (filters.highIntentOnly) {
        if (isMover) { if (p.propertyType !== "new_listing") return false; }
        else { if (p.hvacAge < 12) return false; }
      }
      return true;
    });
  }, [filters]);

  // Convert exported records to Property-compatible for map/card components
  const exportedAsProperties = useMemo<Property[]>(() =>
    exportedRecords.map((r) => ({
      id: r.id,
      address: r.address,
      city: r.city,
      state: r.state,
      zip: r.zip,
      moveInDate: r.moveInDate,
      homeValue: r.homeValue,
      hvacAge: r.hvacAge,
      waterHeaterAge: r.waterHeaterAge,
      roofAge: r.roofAge,
      hasWarranty: r.hasWarranty,
      signals: r.signals,
      lat: r.lat,
      lng: r.lng,
      leadScore: r.leadScore,
      propertyType: r.propertyType,
      phoneConsent: r.phoneConsent,
      smsConsent: r.smsConsent,
      emailValid: r.emailValid,
      emailOpened: r.emailOpened,
      permissionFormClicked: r.permissionFormClicked,
    })),
  []);

  const avgLeadScore = filteredProperties.length > 0
    ? (filteredProperties.reduce((sum, p) => sum + p.leadScore, 0) / filteredProperties.length).toFixed(1)
    : "0";

  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      const next = new Set(prev.propertyTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, propertyTypes: next };
    });
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters, propertyTypes: new Set(defaultFilters.propertyTypes) });
  };

  const isFiltered = filters.leadScoreMin !== 1 || filters.leadScoreMax !== 10 ||
    filters.hvacAgeMin !== 0 || filters.hvacAgeMax !== 25 ||
    filters.homeValueMin !== 100000 || filters.homeValueMax !== 500000 ||
    filters.phoneConsent !== null || filters.smsConsent !== null || filters.emailValid !== null ||
    filters.highIntentOnly || filters.propertyTypes.size !== 3;

  const toggleId = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredProperties.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProperties.map((p) => p.id)));
    }
  };

  const toggleExportedId = (id: string) => {
    setSelectedExportedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllExported = () => {
    if (selectedExportedIds.size === exportedRecords.length) {
      setSelectedExportedIds(new Set());
    } else {
      setSelectedExportedIds(new Set(exportedRecords.map((r) => r.id)));
    }
  };

  const highIntent = isMover
    ? filteredProperties.filter((p) => p.propertyType === "new_listing").length
    : filteredProperties.filter((p) => p.hvacAge >= 12).length;
  const hotLeads = filteredProperties.filter((p) => p.leadScore >= 8).length;
  const warmLeads = filteredProperties.filter((p) => p.leadScore >= 5 && p.leadScore < 8).length;
  const coldLeads = filteredProperties.filter((p) => p.leadScore < 5).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Data — Property Intelligence</h1>
        <p className="text-slate-500 text-sm">Newly listed homes and recent ownership changes in your 50-mile service area</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard title="Properties in Service Area" value="14,237" icon={Database} />
        <KPICard title="New Listings & Moves (30 days)" value="342" icon={Home} trend="+18% vs last month" trendUp />
        <KPICard title={config.highIntentLabel} value={String(highIntent)} icon={AlertTriangle} trend={config.highIntentDesc} />
        <KPICard title="Avg Lead Score" value={avgLeadScore} icon={TrendingUp} trend={`${hotLeads} hot, ${warmLeads} warm, ${coldLeads} cold`} />
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "listings"
              ? "border-blue-800 text-blue-800"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          New Listings & Moves
        </button>
        <button
          onClick={() => setActiveTab("exported")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "exported"
              ? "border-blue-800 text-blue-800"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          My Exported Data
          <span className="ml-1.5 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">{exportedRecords.length}</span>
        </button>
      </div>

      {/* View Toggle */}
      {(activeTab === "listings" || activeTab === "exported") && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => activeTab === "listings" ? setViewMode("table") : setExportedViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                (activeTab === "listings" ? viewMode : exportedViewMode) === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <TableProperties className="h-4 w-4" /> Table View
            </button>
            <button
              onClick={() => activeTab === "listings" ? setViewMode("map") : setExportedViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                (activeTab === "listings" ? viewMode : exportedViewMode) === "map" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Map className="h-4 w-4" /> Map View
            </button>
          </div>
          {((activeTab === "listings" && viewMode === "map") || (activeTab === "exported" && exportedViewMode === "map")) && (
            <Link
              href="/dashboard/audiences"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              <Users className="h-4 w-4" /> Save as Audience
            </Link>
          )}
        </div>
      )}

      {/* Map View */}
      {activeTab === "listings" && viewMode === "map" && (
        <div className="flex gap-4" style={{ height: "calc(100vh - 340px)", minHeight: "500px" }}>
          {/* Map Panel */}
          <div className="flex-[3] min-w-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
            <PropertyMap
              properties={properties}
              selectedPropertyId={selectedMapProperty}
              onSelectProperty={handleMapSelect}
              isMover={isMover}
            />
          </div>
          {/* Cards Panel */}
          <div className="flex-[2] overflow-y-auto space-y-3 pr-1">
            <p className="text-sm text-slate-500 mb-2">{properties.length} properties in your service area</p>
            {properties.map((p) => (
              <div key={p.id} ref={(el) => { cardRefs.current[p.id] = el; }}>
                <PropertyCard
                  property={p}
                  isSelected={selectedMapProperty === p.id}
                  onClick={() => setSelectedMapProperty(p.id)}
                  isMover={isMover}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table View: New Listings & Moves */}
      {activeTab === "listings" && viewMode === "table" && (
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900 text-sm">Filters</h3>
                </div>
                {isFiltered && (
                  <button onClick={resetFilters} className="text-xs text-blue-800 hover:text-blue-900 flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                )}
              </div>
              <div className="space-y-5">
                {/* Property Type */}
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-2">Property Type</label>
                  <div className="space-y-1.5">
                    {(["new_listing", "new_owner", "new_build"] as const).map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes.has(type)}
                          onChange={() => togglePropertyType(type)}
                          className="rounded border-slate-300 text-blue-800"
                        />
                        <span className="text-xs text-slate-700">{getPropertyTypeLabel(type)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lead Score Range */}
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-2">Lead Score (1-10)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={filters.leadScoreMin}
                      onChange={(e) => setFilters((prev) => ({ ...prev, leadScoreMin: Math.max(1, Math.min(10, Number(e.target.value))) }))}
                      className="w-14 border border-slate-200 rounded-md px-2 py-1 text-xs text-center"
                    />
                    <span className="text-xs text-slate-400">to</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={filters.leadScoreMax}
                      onChange={(e) => setFilters((prev) => ({ ...prev, leadScoreMax: Math.max(1, Math.min(10, Number(e.target.value))) }))}
                      className="w-14 border border-slate-200 rounded-md px-2 py-1 text-xs text-center"
                    />
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    <button onClick={() => setFilters((p) => ({ ...p, leadScoreMin: 8, leadScoreMax: 10 }))} className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-700 hover:bg-red-100">Hot</button>
                    <button onClick={() => setFilters((p) => ({ ...p, leadScoreMin: 5, leadScoreMax: 7 }))} className="text-xs px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 hover:bg-amber-100">Warm</button>
                    <button onClick={() => setFilters((p) => ({ ...p, leadScoreMin: 1, leadScoreMax: 4 }))} className="text-xs px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 hover:bg-slate-100">Cold</button>
                    <button onClick={() => setFilters((p) => ({ ...p, leadScoreMin: 1, leadScoreMax: 10 }))} className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100">All</button>
                  </div>
                </div>

                {/* HVAC Age */}
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-2">{isMover ? "Days Since Move" : "HVAC Age (yrs)"}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={25}
                      value={filters.hvacAgeMin}
                      onChange={(e) => setFilters((prev) => ({ ...prev, hvacAgeMin: Math.max(0, Number(e.target.value)) }))}
                      className="w-14 border border-slate-200 rounded-md px-2 py-1 text-xs text-center"
                    />
                    <span className="text-xs text-slate-400">to</span>
                    <input
                      type="number"
                      min={0}
                      max={25}
                      value={filters.hvacAgeMax}
                      onChange={(e) => setFilters((prev) => ({ ...prev, hvacAgeMax: Math.max(0, Number(e.target.value)) }))}
                      className="w-14 border border-slate-200 rounded-md px-2 py-1 text-xs text-center"
                    />
                  </div>
                </div>

                {/* Home Value */}
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-2">Home Value</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={filters.homeValueMin}
                      onChange={(e) => setFilters((prev) => ({ ...prev, homeValueMin: Number(e.target.value) }))}
                      className="flex-1 border border-slate-200 rounded-md px-1.5 py-1 text-xs"
                    >
                      {[100000, 150000, 200000, 250000, 300000, 350000, 400000].map((v) => (
                        <option key={v} value={v}>${(v / 1000).toFixed(0)}K</option>
                      ))}
                    </select>
                    <span className="text-xs text-slate-400">to</span>
                    <select
                      value={filters.homeValueMax}
                      onChange={(e) => setFilters((prev) => ({ ...prev, homeValueMax: Number(e.target.value) }))}
                      className="flex-1 border border-slate-200 rounded-md px-1.5 py-1 text-xs"
                    >
                      {[200000, 250000, 300000, 350000, 400000, 450000, 500000].map((v) => (
                        <option key={v} value={v}>${(v / 1000).toFixed(0)}K</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permission Filters */}
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-2">Contact Permissions</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Phone Consent</span>
                      <select
                        value={filters.phoneConsent === null ? "any" : filters.phoneConsent ? "yes" : "no"}
                        onChange={(e) => setFilters((prev) => ({ ...prev, phoneConsent: e.target.value === "any" ? null : e.target.value === "yes" }))}
                        className="border border-slate-200 rounded-md px-1.5 py-0.5 text-xs w-16"
                      >
                        <option value="any">Any</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">SMS Consent</span>
                      <select
                        value={filters.smsConsent === null ? "any" : filters.smsConsent ? "yes" : "no"}
                        onChange={(e) => setFilters((prev) => ({ ...prev, smsConsent: e.target.value === "any" ? null : e.target.value === "yes" }))}
                        className="border border-slate-200 rounded-md px-1.5 py-0.5 text-xs w-16"
                      >
                        <option value="any">Any</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Email Valid</span>
                      <select
                        value={filters.emailValid === null ? "any" : filters.emailValid ? "yes" : "no"}
                        onChange={(e) => setFilters((prev) => ({ ...prev, emailValid: e.target.value === "any" ? null : e.target.value === "yes" }))}
                        className="border border-slate-200 rounded-md px-1.5 py-0.5 text-xs w-16"
                      >
                        <option value="any">Any</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* High Intent Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700 font-medium">High Intent Only</span>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, highIntentOnly: !prev.highIntentOnly }))}
                    className={`w-8 h-4 rounded-full transition-colors relative ${filters.highIntentOnly ? "bg-blue-800" : "bg-slate-200"}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${filters.highIntentOnly ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-4 p-4 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {selectedIds.size > 0 ? (
                  <span className="font-medium text-blue-800">{selectedIds.size} properties selected</span>
                ) : (
                  <span>
                    Showing {filteredProperties.length} of {properties.length} properties
                    {isFiltered && <span className="text-blue-800 font-medium ml-1">(filtered)</span>}
                  </span>
                )}
              </div>
              {selectedIds.size > 0 && (
                <div className="flex gap-2">
                  <Link
                    href="/dashboard/campaigns"
                    className="px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
                  >
                    Build Campaign &rarr;
                  </Link>
                  <Link
                    href="/dashboard/campaigns?tab=automation"
                    className="px-4 py-2 rounded-md border border-purple-600 text-purple-700 text-sm font-medium hover:bg-purple-50 transition-colors"
                  >
                    Create Automation &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Lead Score Distribution Bar */}
            {filteredProperties.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-4 p-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-medium">Lead Score Distribution:</span>
                  <div className="flex-1 flex h-3 rounded-full overflow-hidden bg-slate-100">
                    {hotLeads > 0 && (
                      <div className="bg-red-400 h-full" style={{ width: `${(hotLeads / filteredProperties.length) * 100}%` }} title={`${hotLeads} Hot`} />
                    )}
                    {warmLeads > 0 && (
                      <div className="bg-amber-400 h-full" style={{ width: `${(warmLeads / filteredProperties.length) * 100}%` }} title={`${warmLeads} Warm`} />
                    )}
                    {coldLeads > 0 && (
                      <div className="bg-slate-300 h-full" style={{ width: `${(coldLeads / filteredProperties.length) * 100}%` }} title={`${coldLeads} Cold`} />
                    )}
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />{hotLeads} Hot</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />{warmLeads} Warm</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300" />{coldLeads} Cold</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <PropertyTable
                properties={filteredProperties}
                selectedIds={selectedIds}
                onToggle={toggleId}
                onToggleAll={toggleAll}
                allSelected={selectedIds.size === filteredProperties.length && filteredProperties.length > 0}
                isMover={isMover}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Exported Data */}
      {activeTab === "exported" && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Records you&apos;ve already exported through campaigns. Re-use this data in new campaigns at no additional credit cost for the data — you only pay for the new channel export.
            </p>
          </div>

          {/* Exported Map View */}
          {exportedViewMode === "map" && (
            <div className="flex gap-4" style={{ height: "calc(100vh - 380px)", minHeight: "500px" }}>
              <div className="flex-[3] min-w-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                <PropertyMap
                  properties={exportedAsProperties}
                  selectedPropertyId={selectedMapProperty}
                  onSelectProperty={handleMapSelect}
                  isMover={isMover}
                />
              </div>
              <div className="flex-[2] overflow-y-auto space-y-3 pr-1">
                <p className="text-sm text-slate-500 mb-2">{exportedRecords.length} exported records</p>
                {exportedRecords.map((r) => (
                  <div key={r.id} ref={(el) => { cardRefs.current[r.id] = el; }}>
                    <div
                      onClick={() => setSelectedMapProperty(r.id)}
                      className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        selectedMapProperty === r.id ? "border-blue-800 shadow-md" : "border-slate-200"
                      }`}
                    >
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-1.5">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                            <p className="text-xs text-slate-500">{r.address}</p>
                            <p className="text-xs text-slate-400">{r.city}, {r.state} {r.zip}</p>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getLeadScoreBg(r.leadScore)}`}>
                            {r.leadScore} {getLeadScoreLabel(r.leadScore)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                          <span className="font-medium text-blue-800">${r.homeValue.toLocaleString()}</span>
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{r.channel}</span>
                          <span>{r.campaign}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {r.signals.slice(0, 3).map((s) => (
                            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{s}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${r.phoneConsent ? "bg-emerald-500" : "bg-slate-300"}`} />
                          <span className={`w-2 h-2 rounded-full ${r.smsConsent ? "bg-emerald-500" : "bg-slate-300"}`} />
                          <span className={`w-2 h-2 rounded-full ${r.emailValid ? "bg-emerald-500" : "bg-slate-300"}`} />
                          <span className="text-xs text-slate-400 ml-1">
                            {[r.phoneConsent && "Phone", r.smsConsent && "SMS", r.emailValid && "Email"].filter(Boolean).join(" · ") || "No permissions"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exported Table View */}
          {exportedViewMode === "table" && (
            <>
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-4 p-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  {selectedExportedIds.size > 0 ? (
                    <span className="font-medium text-blue-800">{selectedExportedIds.size} records selected</span>
                  ) : (
                    <span>Showing {exportedRecords.length} exported records</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {selectedExportedIds.size > 0 && (
                    <>
                      <Link
                        href="/dashboard/campaigns"
                        className="px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
                      >
                        Build Campaign &rarr;
                      </Link>
                      <Link
                        href="/dashboard/campaigns?tab=automation"
                        className="px-4 py-2 rounded-md border border-purple-600 text-purple-700 text-sm font-medium hover:bg-purple-50 transition-colors"
                      >
                        Create Automation &rarr;
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => setShowUpload(true)}
                    className="px-4 py-2 rounded-md border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="h-4 w-4" /> Upload Your Data
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedExportedIds.size === exportedRecords.length && exportedRecords.length > 0}
                          onChange={toggleAllExported}
                          className="rounded border-slate-300"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Address</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">Lead Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">City/State</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Campaign</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Channel</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Exported</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{isMover ? "Move Status" : "HVAC Age"}</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Signals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportedRecords.map((r) => (
                      <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedExportedIds.has(r.id)}
                            onChange={() => toggleExportedId(r.id)}
                            className="rounded border-slate-300"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{r.name}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.phone}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.address}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${getLeadScoreBg(r.leadScore)}`}>
                            {r.leadScore} {getLeadScoreLabel(r.leadScore)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.city}, {r.state}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.campaign}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">{r.channel}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{r.exportedDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isMover ? (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              r.propertyType === "new_listing" ? "bg-blue-50 text-blue-700" :
                              r.propertyType === "new_owner" ? "bg-purple-50 text-purple-700" :
                              "bg-emerald-50 text-emerald-700"
                            }`}>
                              {getPropertyTypeLabel(r.propertyType)}
                            </span>
                          ) : (
                            <span className={`text-xs font-medium ${r.hvacAge >= 15 ? "text-red-600" : r.hvacAge >= 10 ? "text-amber-600" : "text-emerald-600"}`}>
                              {r.hvacAge} yrs
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${r.phoneConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={r.phoneConsent ? "Phone OK" : "No phone"} />
                            <span className={`w-2 h-2 rounded-full ${r.smsConsent ? "bg-emerald-500" : "bg-slate-300"}`} title={r.smsConsent ? "SMS OK" : "No SMS"} />
                            <span className={`w-2 h-2 rounded-full ${r.emailValid ? "bg-emerald-500" : "bg-slate-300"}`} title={r.emailValid ? "Email OK" : "No email"} />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {r.signals.map((s) => (
                              <span key={s} className="inline-block bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded">{s}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowUpload(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Upload Your Data</h3>
              <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">
                Upload a CSV of your existing customer/prospect list
              </p>
              <p className="text-xs text-slate-500">Supported: CSV, XLSX — Max 10,000 records</p>
            </div>
            <p className="text-xs text-slate-500 mb-4 text-center">
              {config.uploadEnrichText}
            </p>
            <button
              disabled
              className="w-full px-6 py-3 rounded-md bg-blue-800 text-white text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Upload & Enrich
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
