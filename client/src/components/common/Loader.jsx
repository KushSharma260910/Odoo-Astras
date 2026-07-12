import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function Loader({
  type = 'spinner', // spinner, skeleton-card, skeleton-table, inline
  size = 'md', // sm, md, lg
  text = '',
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-5 h-5 text-sm',
    md: 'w-8 h-8 text-xl',
    lg: 'w-12 h-12 text-3xl'
  };

  if (type === 'inline') {
    return (
      <div className={`flex items-center space-x-2 text-slate-500 dark:text-slate-400 ${className}`}>
        <FaSpinner className="animate-spin text-blue-600" />
        {text && <span className="text-sm font-medium">{text}</span>}
      </div>
    );
  }

  if (type === 'skeleton-card') {
    return (
      <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 animate-skeleton ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-850 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-1/3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded w-full"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (type === 'skeleton-table') {
    return (
      <div className={`border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden animate-skeleton bg-white dark:bg-slate-900 ${className}`}>
        <div className="h-12 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center px-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-750 rounded w-1/4"></div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-850">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 flex items-center px-6 space-x-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/5"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <FaSpinner className={`animate-spin text-blue-600 dark:text-blue-500 mb-3 ${sizeClasses[size]}`} />
      {text && (
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;
