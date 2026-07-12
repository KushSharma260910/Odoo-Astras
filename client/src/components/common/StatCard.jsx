import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function StatCard({
  title,
  value,
  change,
  changeType, // 'increase' | 'decrease' | 'neutral'
  icon: Icon,
  trendLabel = 'vs last month',
  isLoading = false,
  color = 'blue', // blue, green, red, amber, slate
  className = ''
}) {
  const iconColors = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
    green: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between ${className}`}
    >
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {title}
            </span>
            {Icon && (
              <div className={`p-2.5 rounded-xl ${iconColors[color] || iconColors.blue}`}>
                <Icon className="text-lg" />
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {value}
            </h3>
            
            {change && (
              <div className="flex items-center mt-2">
                <span
                  className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-lg mr-2 ${
                    changeType === 'increase'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                      : changeType === 'decrease'
                      ? 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
                      : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {changeType === 'increase' ? (
                    <FaArrowUp className="mr-0.5 text-[10px]" />
                  ) : changeType === 'decrease' ? (
                    <FaArrowDown className="mr-0.5 text-[10px]" />
                  ) : null}
                  {change}
                </span>
                <span className="text-xs text-slate-450 dark:text-slate-500 font-medium">
                  {trendLabel}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default StatCard;
