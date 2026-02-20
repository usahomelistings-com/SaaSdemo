import { Check } from "lucide-react";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i < currentStep
                  ? "bg-emerald-600 text-white"
                  : i === currentStep
                  ? "bg-blue-800 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`text-sm hidden sm:inline ${
                i === currentStep ? "font-medium text-slate-900" : "text-slate-500"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-0.5 mx-2 ${
                i < currentStep ? "bg-emerald-600" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
