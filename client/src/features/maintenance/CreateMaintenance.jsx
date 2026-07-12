import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function CreateMaintenance() {
  return (
    <ModulePage title="Create Maintenance" description="Log a new maintenance request or repair.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Maintenance creation form will be added here.</p>
      </div>
    </ModulePage>
  );
}

export default CreateMaintenance;
