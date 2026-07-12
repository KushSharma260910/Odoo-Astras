import React from 'react';

function StatusBadge({ status = '', className = '' }) {
  const normStatus = status.toString().toUpperCase().trim();

  // Color mapping logic
  const colors = {
    // Success - Green
    active: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',
    available: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',
    completed: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',
    success: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',
    paid: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',
    resolved: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250/30 dark:border-emerald-900/40',

    // Warning - Yellow/Orange
    pending: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',
    maintenance: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',
    scheduled: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',
    on_trip: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',
    in_progress: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',
    warning: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-250/30 dark:border-amber-900/40',

    // Info - Blue
    dispatched: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-250/30 dark:border-blue-900/40',
    en_route: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-250/30 dark:border-blue-900/40',
    assigned: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-250/30 dark:border-blue-900/40',
    info: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-250/30 dark:border-blue-900/40',

    // Danger - Red
    cancelled: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',
    canceled: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',
    out_of_service: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',
    danger: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',
    overdue: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',
    delayed: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-250/30 dark:border-red-900/40',

    // Neutral - Gray
    inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-750',
    off_duty: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-750',
    unknown: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-750',
  };

  const getStyleClass = () => {
    const key = normStatus.toLowerCase();
    if (colors[key]) return colors[key];
    
    // Fallback checks
    if (key.includes('active') || key.includes('avail') || key.includes('complete') || key.includes('ok')) {
      return colors.active;
    }
    if (key.includes('pending') || key.includes('trip') || key.includes('progress') || key.includes('maintenance')) {
      return colors.pending;
    }
    if (key.includes('cancel') || key.includes('out') || key.includes('fail') || key.includes('delay') || key.includes('expiry')) {
      return colors.danger;
    }
    if (key.includes('dispatch') || key.includes('route') || key.includes('assign')) {
      return colors.dispatched;
    }
    
    return colors.unknown;
  };

  // Convert status to human readable: "OUT_OF_SERVICE" -> "Out Of Service"
  const getReadableStatus = () => {
    return normStatus
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm select-none ${getStyleClass()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {getReadableStatus()}
    </span>
  );
}

export default StatusBadge;
