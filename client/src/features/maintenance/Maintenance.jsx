import React, { useEffect, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { maintenanceService } from '../../services/maintenanceService';

function Maintenance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await maintenanceService.getMaintenanceLogs();
        setRecords(payload?.maintenances || payload || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ModulePage title="Maintenance" description="Monitor service schedules and repair work orders.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading maintenance records...</div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <div key={record._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{record.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{record.description}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{record.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Maintenance;
