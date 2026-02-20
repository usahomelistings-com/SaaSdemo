"use client";

import { Plus, Trash2 } from "lucide-react";

export interface Rule {
  field: string;
  operator: string;
  value: string;
}

interface RuleBuilderProps {
  rules: Rule[];
  onChange: (rules: Rule[]) => void;
  fieldOptionsProp?: string[];
  operatorsByFieldProp?: Record<string, string[]>;
  defaultField?: string;
}

const fieldOptions = [
  "Lead Score",
  "HVAC Age",
  "Water Heater Age",
  "Roof Age",
  "Home Value",
  "Move-In Date",
  "Property Type",
  "Phone Consent",
  "SMS Consent",
  "Email Valid",
  "Has Warranty",
  "ZIP Code",
  "City",
];

const operatorsByField: Record<string, string[]> = {
  "Lead Score": ["greater than", "less than", "equals"],
  "HVAC Age": ["less than", "greater than", "equals"],
  "Water Heater Age": ["less than", "greater than", "equals"],
  "Roof Age": ["less than", "greater than", "equals"],
  "Home Value": ["less than", "greater than"],
  "Move-In Date": ["within last", "before", "after"],
  "Property Type": ["equals"],
  "Phone Consent": ["equals"],
  "SMS Consent": ["equals"],
  "Email Valid": ["equals"],
  "Has Warranty": ["equals"],
  "ZIP Code": ["equals"],
  "City": ["equals"],
};

export default function RuleBuilder({ rules, onChange, fieldOptionsProp, operatorsByFieldProp, defaultField }: RuleBuilderProps) {
  const activeFields = fieldOptionsProp || fieldOptions;
  const activeOperators = operatorsByFieldProp || operatorsByField;
  const activeDefault = defaultField || "HVAC Age";

  const addRule = () => {
    const ops = activeOperators[activeDefault] || ["equals"];
    onChange([...rules, { field: activeDefault, operator: ops[0], value: "" }]);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, key: keyof Rule, value: string) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [key]: value };
    if (key === "field") {
      const ops = activeOperators[value] || ["equals"];
      updated[index].operator = ops[0];
      updated[index].value = "";
    }
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {rules.map((rule, i) => (
        <div key={i} className="flex items-center gap-2 flex-wrap">
          {i > 0 && (
            <span className="text-xs font-medium text-blue-800 bg-blue-50 px-2 py-1 rounded">AND</span>
          )}
          {i === 0 && (
            <span className="text-xs font-medium text-slate-500 w-10">IF</span>
          )}
          <select
            value={rule.field}
            onChange={(e) => updateRule(i, "field", e.target.value)}
            className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            {activeFields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            value={rule.operator}
            onChange={(e) => updateRule(i, "operator", e.target.value)}
            className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            {(activeOperators[rule.field] || ["equals"]).map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          <input
            type="text"
            value={rule.value}
            onChange={(e) => updateRule(i, "value", e.target.value)}
            placeholder={
              ["Has Warranty", "Phone Consent", "SMS Consent", "Email Valid"].includes(rule.field) ? "yes / no" :
              rule.field === "Move-In Date" ? "30 days" :
              rule.field === "Property Type" ? "new_listing / new_owner / new_build" :
              rule.field === "Lead Score" ? "1-10" :
              "value"
            }
            className="w-32 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <button
            onClick={() => removeRule(i)}
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addRule}
        className="flex items-center gap-1.5 text-sm text-blue-800 hover:text-blue-900 font-medium"
      >
        <Plus className="h-4 w-4" /> Add Rule
      </button>
    </div>
  );
}
