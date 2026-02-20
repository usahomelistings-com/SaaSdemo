"use client";

import type { AutomationTemplate } from "@/data/automationTemplates";

interface AutomationTemplatesProps {
  templates: AutomationTemplate[];
  onSelect: (template: AutomationTemplate) => void;
}

export default function AutomationTemplates({ templates, onSelect }: AutomationTemplatesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className="text-left bg-white rounded-lg border-2 border-slate-200 p-4 hover:border-purple-400 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">{t.emoji}</div>
          <h3 className="font-semibold text-slate-900 text-sm">{t.name}</h3>
          <p className="text-xs text-slate-500 mt-1 mb-3">{t.description}</p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>~{t.estimatedLeadsPerMonth} leads/mo</span>
            <span className="capitalize">{t.suggestedSchedule === "realtime" ? "Real-time" : t.suggestedSchedule}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
