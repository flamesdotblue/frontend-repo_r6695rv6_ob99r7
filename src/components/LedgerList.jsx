import React, { useMemo, useState } from 'react';
import { Search, Filter, Coins, ArrowUpCircle, ArrowDownCircle, Receipt } from 'lucide-react';

const typeMeta = {
  contribution: { label: 'Contribution', icon: Coins, badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  loan: { label: 'Loan', icon: ArrowUpCircle, badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  repayment: { label: 'Repayment', icon: ArrowDownCircle, badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  expense: { label: 'Expense', icon: Receipt, badge: 'bg-rose-50 text-rose-700 border-rose-200' },
};

function Item({ entry }) {
  const T = typeMeta[entry.type];
  const Icon = T.icon;
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b last:border-b-0">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 h-9 w-9 rounded-lg border ${T.badge} flex items-center justify-center`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">₹ {entry.amount.toLocaleString()}</p>
            <span className={`text-xs rounded-full border px-2 py-0.5 ${T.badge}`}>{T.label}</span>
          </div>
          <p className="text-sm text-gray-600">
            {entry.member ? entry.member + ' • ' : ''}
            {new Date(entry.date).toLocaleDateString()}
          </p>
          {entry.notes && <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>}
          {entry.interestRate != null && (
            <p className="text-xs text-amber-700 mt-1">Interest: {entry.interestRate}%</p>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{new Date(entry.createdAt).toLocaleTimeString()}</div>
    </div>
  );
}

export default function LedgerList({ entries }) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchType = filterType === 'all' || e.type === filterType;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || [e.member, e.notes, typeMeta[e.type].label]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q);
      return matchType && matchQuery;
    });
  }, [entries, query, filterType]);

  return (
    <section className="rounded-xl border bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-3">
        <h2 className="font-semibold">Ledger</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, notes, type..."
              className="w-full sm:w-64 rounded-lg border pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none rounded-lg border pl-3 pr-8 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All</option>
              <option value="contribution">Contribution</option>
              <option value="loan">Loan</option>
              <option value="repayment">Repayment</option>
              <option value="expense">Expense</option>
            </select>
            <Filter className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">No entries yet. Add your first record above.</div>
        ) : (
          filtered
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry) => <Item key={entry.id} entry={entry} />)
        )}
      </div>
    </section>
  );
}
