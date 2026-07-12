import React, { useEffect, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { dashboardService } from '../../services/dashboardService';

function FleetDashboard() {
  const [data, setData] = useState({ stats: {}, recentTrips: [], chartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await dashboardService.getFleetDashboardStats();
        setData(payload || { stats: {}, recentTrips: [], chartData: [] });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = data.stats || {};

  return (
    <ModulePage title="Fleet Dashboard" description="Operational overview of vehicles, drivers, trips, and profitability.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading fleet metrics...
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Vehicles', stats.vehicleCount || 0],
              ['Drivers', stats.driverCount || 0],
              ['Trips', stats.tripCount || 0],
              ['Revenue', `$${Number(stats.revenue || 0).toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Trips</h2>
            <div className="mt-4 space-y-3">
              {(data.recentTrips || []).map((trip) => (
                <div key={trip._id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{trip.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                    {trip.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </ModulePage>
  );
}

export default FleetDashboard;
