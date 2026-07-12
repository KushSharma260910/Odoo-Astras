import React from 'react';
import { FaSearch, FaTimes, FaSlidersH } from 'react-icons/fa';

function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search records...',
  showFilterToggle = false,
  onFilterToggle,
  isFilterActive = false,
  className = ''
}) {
  return (
    <div className={`flex items-center space-x-2 w-full md:max-w-md ${className}`}>
      <div className="relative flex-1">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <FaSearch className="text-sm" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2.5 pl-10 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-600 dark:hover:text-slate-350 focus:outline-none"
          >
            <FaTimes className="text-sm" />
          </button>
        )}
      </div>

      {showFilterToggle && (
        <button
          type="button"
          onClick={onFilterToggle}
          className={`p-3 border rounded-xl flex items-center justify-center transition-all focus:outline-none ${
            isFilterActive
              ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 border-blue-200 dark:border-blue-800/60'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <FaSlidersH className="text-sm" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
