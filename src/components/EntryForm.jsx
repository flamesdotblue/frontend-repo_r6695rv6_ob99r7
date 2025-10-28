import React, { useMemo, useState } from 'react';
import { Plus, Coins, ArrowUpCircle, ArrowDownCircle, Receipt } from 'lucide-react';

const ENTRY_TYPES = [
  { key: 'contribution', label: 'Contribution', icon: Coins, color: 'emerald' },
  { key: 'loan', label: 'Loan', icon: ArrowUpCircle, color: 'amber' },
  { key: 'repayment', label: 'Repayment', icon: ArrowDownCircle, color: 'sky' },
  { key: 'expense', label: 'Expense', icon: Receipt, color: 'rose' },
];

export default function EntryForm({ committee, onAdd }) {
  const [type, setType] = useState('contribution');
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    member: '',
    amount: '',
    interestRate: '',
    notes: '',
  });

  const activeMeta = useMemo(() => ENTRY_TYPES.find(t => t.key === type), [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    const payload = {
      id: crypto.randomUUID(),
      committee,
      type,
      date: form.date,
      member: form.member.trim() || undefined,
      amount: Number(form.amount),
      interestRate: type === 'loan' && form.interestRate ? Number(form.interestRate) : undefined,
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    onAdd(payload);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      member: '',
      amount: '',
      interestRate: '',
      notes: '',
    });
  };

  const colorMap = {
    emerald: 'bg-emerald-600 text-white',
    amber: 'bg-amber-600 text-white',
    sky: 'bg-sky-600 text-white',
    rose: 'bg-rose-600 text-white',
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Add Entry</h2>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {ENTRY_TYPES.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border p-2 text-xs transition-colors ${
              type === key ? `${colorMap[color]} border-transparent` : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-pressed={type === key}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Member / Name</label>
          <input
            type="text"
            value={form.member}
            onChange={(e) => setForm({ ...form, member: e.target.value })}
            placeholder="e.g., Ramesh Patel"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Amount (₹)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        {type === 'loan' && (
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Interest Rate (%)</label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={form.interestRate}
              onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
              placeholder="e.g., 2"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="sm:col-span-2 space-y-1">
          <label className="text-sm text-gray-600">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Add any details like receipt no., purpose, repayment ref, etc."
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows={3}
          />
        </div>

        <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" /> Add {activeMeta.label}
          </button>
        </div>
      </form>
    </section>
  );
}
