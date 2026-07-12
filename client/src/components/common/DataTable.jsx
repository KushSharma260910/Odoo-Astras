import React from 'react';
import Loader from './Loader';
import { FaInbox } from 'react-icons/fa';

function DataTable({
  columns = [], // Array of { key, label, render: fn, sortable: bool, align: 'left'|'center'|'right' }
  data = [],
  isLoading = false,
  onRowClick,
  emptyStateText = 'No records found matching your query.',
  actionsHeaderLabel = 'Actions',
  actions
}) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
          <thead className="bg-slate-50/75 dark:bg-slate-850/50 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-xs border-b border-slate-250/60 dark:border-slate-805">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 font-semibold ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                  }`}
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 font-semibold text-right">
                  {actionsHeaderLabel}
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850 bg-transparent">
            {isLoading ? (
              // Loading Skeleton State
              [...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4.5">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4.5 text-right">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16 ml-auto"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 text-slate-400">
                    <FaInbox className="text-4xl text-slate-300 dark:text-slate-700" />
                    <p className="text-sm font-medium">{emptyStateText}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Content Row Rendering
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors duration-150 group/row ${
                    onRowClick ? 'cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-850/50' : 'hover:bg-slate-50/30 dark:hover:bg-slate-850/10'
                  }`}
                >
                  {columns.map((col) => {
                    const cellValue = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={`px-6 py-4 text-slate-700 dark:text-slate-300 font-medium ${
                          col.align === 'center'
                            ? 'text-center'
                            : col.align === 'right'
                            ? 'text-right'
                            : 'text-left'
                        }`}
                      >
                        {col.render ? col.render(cellValue, row) : cellValue ?? '-'}
                      </td>
                    );
                  })}
                  {actions && (
                    <td 
                      className="px-6 py-4 text-right"
                      onClick={(e) => e.stopPropagation()} // Stop row click trigger on action click
                    >
                      <div className="flex items-center justify-end space-x-1.5">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
