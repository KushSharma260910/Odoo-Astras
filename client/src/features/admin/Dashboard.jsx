import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function Dashboard() {
  return (
    <ModulePage title="Admin Dashboard" description="System administration overview.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Administrative summary data will appear here.</p>
      </div>
    </ModulePage>
  );
}

export default Dashboard;
