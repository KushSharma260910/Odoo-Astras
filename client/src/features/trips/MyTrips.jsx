import React, { useEffect, useMemo, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { useAuthContext } from '../../context/AuthContext';
import { tripService } from '../../services/tripService';
import { driverService } from '../../services/driverService';

function MyTrips() {
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
        const assignedTrips = tripList.filter((trip) => {
          const sameDriver = trip.driver?._id === currentDriver?._id || trip.driver?.user?._id === user?._id || trip.driver?.user === user?._id;
          return sameDriver;
        });
        setTrips(assignedTrips);
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

  const activeTrips = useMemo(() => trips.filter((trip) => ['SCHEDULED', 'ASSIGNED', 'IN_PROGRESS'].includes(trip.status)), [trips]);
  const historyTrips = useMemo(() => trips.filter((trip) => ['COMPLETED', 'CANCELLED'].includes(trip.status)), [trips]);

  return (
    <ModulePage title="My Trips" description="Personal assigned trip list.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading your trips...</div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Active Assignments</h2>
            {activeTrips.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">You currently have no active trip assignments.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {activeTrips.map((trip) => (
                  <div key={trip._id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <p className="font-medium text-slate-900 dark:text-white">{trip.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Status: {trip.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trip History</h2>
            {historyTrips.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No completed or cancelled trips yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {historyTrips.map((trip) => (
                  <div key={trip._id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <p className="font-medium text-slate-900 dark:text-white">{trip.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Status: {trip.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </ModulePage>
  );
}

export default MyTrips;
