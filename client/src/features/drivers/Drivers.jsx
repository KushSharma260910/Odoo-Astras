import React, { useEffect, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { driverService } from '../../services/driverService';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await driverService.getDrivers();
        setDrivers(payload?.drivers || payload || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ModulePage title="Drivers" description="Monitor driver availability, status, and compliance.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading drivers...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {drivers.map((driver) => (
            <div key={driver._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{driver.name}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{driver.status}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Email: {driver.email}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">License: {driver.licenseNumber}</p>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Drivers;
