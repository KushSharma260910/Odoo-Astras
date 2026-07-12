import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function VehicleDetails() {
  return (
    <ModulePage title="Vehicle Details" description="View detailed vehicle information.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Dedicated vehicle detail view will be added here.</p>
      </div>
    </ModulePage>
  );
}

export default VehicleDetails;
