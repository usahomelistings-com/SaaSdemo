"use client";

interface CreditPackCardProps {
  name: string;
  credits: number;
  price: string;
  perCredit: string;
  popular?: boolean;
  onBuy: () => void;
}

export default function CreditPackCard({ name, credits, price, perCredit, popular, onBuy }: CreditPackCardProps) {
  return (
    <div
      className={`rounded-lg border p-5 text-center transition-shadow hover:shadow-md ${
        popular ? "border-blue-800 ring-2 ring-blue-800 ring-opacity-20" : "border-slate-200"
      }`}
    >
      {popular && (
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-800 text-white font-medium mb-2">
          Most Popular
        </span>
      )}
      <h3 className="font-semibold text-slate-900">{name}</h3>
      <p className="text-3xl font-bold text-slate-900 mt-2">{credits.toLocaleString()}</p>
      <p className="text-sm text-slate-500">credits</p>
      <p className="text-lg font-semibold text-blue-800 mt-2">{price}</p>
      <p className="text-xs text-slate-500">{perCredit}/credit</p>
      <button
        onClick={onBuy}
        className="w-full mt-4 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
}
