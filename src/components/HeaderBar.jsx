import React from 'react';
import { Banknote, Building2 } from 'lucide-react';

const committees = [
  { key: 'Gramin', label: 'Gramin Committee', icon: Building2 },
  { key: 'Mumbai', label: 'Mumbai Committee', icon: Banknote },
];

export default function HeaderBar({ selected, onSelect }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">FM</span>
          <div className="leading-tight">
            <h1 className="text-base font-semibold">Village Finance</h1>
            <p className="text-xs text-gray-500">Transparent committee accounting</p>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm">
          {committees.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 border transition-colors ${
                selected === key
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
              aria-pressed={selected === key}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
