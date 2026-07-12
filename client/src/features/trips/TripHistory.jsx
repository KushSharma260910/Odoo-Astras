import React, { useEffect, useMemo, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { useAuthContext } from '../../context/AuthContext';
import { tripService } from '../../services/tripService';
import { driverService } from '../../services/driverService';

function TripHistory() {
  const { user } = useAuthContext();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [tripPayload, driverPayload] = await Promise.all([tripService.getTrips(), driverService.getDrivers()]);
        const tripList = tripPayload?.trips || tripPayload || [];
        const driverList = driverPayload?.drivers || driverPayload || [];
        const currentDriver = driverList.find((driver) => driver.user?._id === user?._id || driver.user === user?._id || driver.email === user?.email);
        const filtered = tripList.filter((trip) => {
          if (user?.role === 'DRIVER') {
            return ['COMPLETED', 'CANCELLED'].includes(trip.status) && (trip.driver?._id === currentDriver?._id || trip.driver?.user?._id === user?._id || trip.driver?.user === user?._id);
          }
          return ['COMPLETED', 'CANCELLED'].includes(trip.status);
        });
        setTrips(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      load();
    }
  }, [user]);

  const renderedTrips = useMemo(() => trips, [trips]);

  return (
    <ModulePage title="Trip History" description="Historic trip activity and results.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading trip history...</div>
      ) : renderedTrips.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">No trip history yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {renderedTrips.map((trip) => (
            <div key={trip._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{trip.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{trip.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default TripHistory;
