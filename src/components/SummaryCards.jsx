import React from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';

function StatCard({ icon: Icon, label, value, accent = 'emerald' }) {
  const accentMap = {
    emerald: 'text-emerald-600 bg-emerald-50',
    sky: 'text-sky-600 bg-sky-50',
    rose: 'text-rose-600 bg-rose-50',
    amber: 'text-amber-600 bg-amber-50',
  };
  return (
    <div className="rounded-xl border p-4 bg-white">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
          <p className="text-lg font-semibold">₹ {value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards({ summary }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard icon={Wallet} label="Balance" value={summary.balance} accent="emerald" />
      <StatCard icon={Coins} label="Contributions" value={summary.contributions} accent="sky" />
      <StatCard icon={ArrowUpCircle} label="Loans Issued" value={summary.loans} accent="amber" />
      <StatCard icon={ArrowDownCircle} label="Repayments" value={summary.repayments} accent="rose" />
    </section>
  );
}
