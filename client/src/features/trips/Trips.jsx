import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModulePage from '../../components/common/ModulePage';
import { tripService } from '../../services/tripService';
import { useAuthContext } from '../../context/AuthContext';

function Trips() {
  const { user } = useAuthContext();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await tripService.getTrips();
        setTrips(payload?.trips || payload || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const canManageTrips = ['ADMIN', 'DISPATCHER', 'FLEET_MANAGER'].includes(user?.role);

  return (
    <ModulePage title="Trips" description="Operations and dispatch activity for current and upcoming trips.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading trips...</div>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div key={trip._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{trip.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Vehicle: {trip.vehicle?.registrationNumber || 'Not assigned'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Driver: {trip.driver?.name || 'Not assigned'}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{trip.status}</span>
                  {canManageTrips && (
                    <div className="flex flex-wrap gap-2">
                      {['SCHEDULED', 'ASSIGNED'].includes(trip.status) && (
                        <Link to={`/trips/dispatch/${trip._id}`} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">Dispatch</Link>
                      )}
                      {['ASSIGNED', 'IN_PROGRESS'].includes(trip.status) && (
                        <Link to={`/trips/complete/${trip._id}`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">Complete</Link>
                      )}
                      {['SCHEDULED', 'ASSIGNED', 'IN_PROGRESS'].includes(trip.status) && (
                        <Link to={`/trips/cancel/${trip._id}`} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 dark:border-red-900/40 dark:text-red-400">Cancel</Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Trips;
