import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function SafetyDashboard() {
  return (
    <ModulePage title="Safety Dashboard" description="Safety compliance and incident monitoring overview.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Safety monitoring data will appear here.</p>
      </div>
    </ModulePage>
  );
}

export default SafetyDashboard;
