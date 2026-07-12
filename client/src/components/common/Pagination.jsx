import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = ''
}) {
  if (totalPages <= 1) return null;

  // Compute page numbers to show (e.g. current +/- 2 pages)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // number of pages to show on either side
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== '...'
      ) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm ${className}`}>
      {/* Description text */}
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="font-semibold text-slate-850 dark:text-slate-200">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-850 dark:text-slate-200">{totalPages}</span>
      </span>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all focus:outline-none"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-3.5 py-1.5 text-sm text-slate-400 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all focus:outline-none"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
