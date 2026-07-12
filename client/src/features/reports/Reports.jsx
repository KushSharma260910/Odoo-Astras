import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModulePage from '../../components/common/ModulePage';
import Button from '../../components/common/Button';
import { reportService } from '../../services/reportService';

function Reports() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await reportService.getReports();
        setOverview(payload?.overview || payload?.data || payload || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const summaryCards = [
    { label: 'Total Trips', value: overview?.totalTrips ?? (Array.isArray(overview?.trips) ? overview.trips.length : 0), hint: 'Fleet movement' },
    { label: 'Total Expenses', value: overview?.totalExpenses ?? 0, hint: 'Operational spend' },
    { label: 'Fuel Cost', value: overview?.totalFuelCost ?? 0, hint: 'Fuel consumption' },
    { label: 'Maintenance Cost', value: overview?.totalMaintenanceCost ?? 0, hint: 'Vehicle upkeep' },
  ];

  const recentTrips = Array.isArray(overview?.trips) ? overview.trips.slice(0, 3) : [];
  const recentExpenses = Array.isArray(overview?.expenses) ? overview.expenses.slice(0, 3) : [];

  const chartData = [
    { label: 'Trips', value: summaryCards[0].value },
    { label: 'Expenses', value: summaryCards[1].value },
    { label: 'Fuel', value: summaryCards[2].value },
    { label: 'Maintenance', value: summaryCards[3].value },
  ];
  const maxChartValue = Math.max(...chartData.map((item) => Number(item.value) || 0), 1);

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <ModulePage title="Reports" description="Operational and financial summaries.">
      <div className="mb-4 flex justify-end">
        <Button variant="outline" onClick={handleDownloadPdf}>Download PDF</Button>
      </div>
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading reports...</div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{card.hint}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Operational overview</h2>
              </div>
              <div className="mt-5 flex h-52 items-end justify-between gap-3">
                {chartData.map((item) => {
                  const height = `${Math.max(((Number(item.value) || 0) / maxChartValue) * 100, 8)}%`;
                  return (
                    <div key={item.label} className="flex flex-1 flex-col items-center">
                      <div className="flex h-full w-full items-end rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                        <div className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-cyan-400" style={{ height }} />
                      </div>
                      <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick reports</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Link to="/reports/fleet" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300">Fleet Report</Link>
                <Link to="/reports/fuel" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300">Fuel Report</Link>
                <Link to="/reports/roi" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300">ROI Analysis</Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent activity</h2>
              <div className="mt-4 space-y-3">
                {recentTrips.length > 0 ? recentTrips.map((trip) => (
                  <div key={trip._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{trip.title || trip.tripNumber || 'Trip'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{trip.status}</p>
                  </div>
                )) : <p className="text-sm text-slate-500 dark:text-slate-400">No trip activity yet.</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent expenses</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {recentExpenses.length > 0 ? recentExpenses.map((expense) => (
                <div key={expense._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{expense.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{expense.category}</p>
                  <p className="text-sm font-medium text-blue-600">{expense.amount}</p>
                </div>
              )) : <p className="text-sm text-slate-500 dark:text-slate-400">No expense activity yet.</p>}
            </div>
          </div>
        </div>
      )}
    </ModulePage>
  );
}

export default Reports;
