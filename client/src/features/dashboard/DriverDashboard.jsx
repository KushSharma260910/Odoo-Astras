import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { driverService } from '../../services/driverService';
import { tripService } from '../../services/tripService';

function DriverDashboard() {
  const { user } = useAuthContext();
  const [driver, setDriver] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [driverPayload, tripPayload] = await Promise.all([driverService.getDrivers(), tripService.getTrips()]);
        const driverList = driverPayload?.drivers || driverPayload || [];
        const tripList = tripPayload?.trips || tripPayload || [];
        const currentDriver = driverList.find((item) => item.user?._id === user?._id || item.user === user?._id || item.email === user?.email);
        setDriver(currentDriver || null);
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

  const activeTrip = useMemo(() => trips.find((trip) => ['SCHEDULED', 'ASSIGNED', 'IN_PROGRESS'].includes(trip.status)), [trips]);
  const historyTrips = useMemo(() => trips.filter((trip) => ['COMPLETED', 'CANCELLED'].includes(trip.status)), [trips]);

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Driver Portal</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Welcome {user?.name || 'Driver'}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your assigned vehicle and current trip are shown below.</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading your workspace...</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Assigned Vehicle</h2>
              {driver?.vehicle ? (
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">Vehicle Name:</span> {driver.vehicle.make} {driver.vehicle.model}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Registration Number:</span> {driver.vehicle.registrationNumber}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Vehicle Type:</span> {driver.vehicle.type}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Maximum Load Capacity:</span> {driver.vehicle.capacity}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No vehicle assigned yet.</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Current Trip</h2>
              {activeTrip ? (
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">Source:</span> {activeTrip.origin}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Destination:</span> {activeTrip.destination}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Cargo Weight:</span> {activeTrip.cargoWeight}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Planned Distance:</span> {activeTrip.plannedDistance}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Trip Status:</span> {activeTrip.status}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Start Time:</span> {activeTrip.startTime ? new Date(activeTrip.startTime).toLocaleString() : 'Pending'}</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">End Time:</span> {activeTrip.endTime ? new Date(activeTrip.endTime).toLocaleString() : 'Pending'}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No active trip at the moment.</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Trip History</h2>
              {historyTrips.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No trip history yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {historyTrips.map((trip) => (
                    <div key={trip._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                      <p className="font-medium text-slate-900 dark:text-white">{trip.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{trip.origin} → {trip.destination}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{trip.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Profile</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p><span className="font-semibold text-slate-900 dark:text-white">Name:</span> {user?.name}</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Email:</span> {user?.email}</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Role:</span> {user?.role}</p>
              </div>
              <Link to="/profile" className="mt-4 inline-flex text-sm font-semibold text-blue-600">View full profile →</Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default DriverDashboard;
