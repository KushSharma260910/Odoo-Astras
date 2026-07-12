import React from 'react';
import ModulePage from '../../components/common/ModulePage';

function LicenseExpiry() {
  return (
    <ModulePage title="License Expiry" description="Upcoming commercial license renewals.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">License expiry tracking will be added here.</p>
      </div>
    </ModulePage>
  );
}

export default LicenseExpiry;
