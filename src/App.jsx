import React, { useMemo, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import SummaryCards from './components/SummaryCards';
import EntryForm from './components/EntryForm';
import LedgerList from './components/LedgerList';

function computeSummary(entries) {
  const sums = entries.reduce(
    (acc, e) => {
      if (e.type === 'contribution') acc.contributions += e.amount;
      if (e.type === 'loan') acc.loans += e.amount;
      if (e.type === 'repayment') acc.repayments += e.amount;
      if (e.type === 'expense') acc.expenses += e.amount;
      return acc;
    },
    { contributions: 0, loans: 0, repayments: 0, expenses: 0 }
  );
  const balance = sums.contributions + sums.repayments - sums.loans - sums.expenses;
  return { ...sums, balance };
}

export default function App() {
  const [selectedCommittee, setSelectedCommittee] = useState('Gramin');
  const [entries, setEntries] = useState([]);

  const committeeEntries = useMemo(
    () => entries.filter((e) => e.committee === selectedCommittee),
    [entries, selectedCommittee]
  );

  const summary = useMemo(() => computeSummary(committeeEntries), [committeeEntries]);

  const handleAdd = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <HeaderBar selected={selectedCommittee} onSelect={setSelectedCommittee} />

      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold">
            {selectedCommittee} Committee Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Record contributions (varshik vargani), loans (varshik madat), repayments and expenses. This demo keeps data only while the page is open.
          </p>
        </div>

        <SummaryCards summary={summary} />

        <EntryForm committee={selectedCommittee} onAdd={handleAdd} />

        <LedgerList entries={committeeEntries} />

        <footer className="text-center text-xs text-gray-500 py-6">
          Built for simple, transparent record-keeping for village committees.
        </footer>
      </main>
    </div>
  );
}
