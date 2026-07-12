import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function MaintenanceHistory() {
  return (
    <ModulePage title="Maintenance History" description="Chronological view of maintenance activity.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Service history will appear here.</p>
      </div>
    </ModulePage>
  );
}

export default MaintenanceHistory;
