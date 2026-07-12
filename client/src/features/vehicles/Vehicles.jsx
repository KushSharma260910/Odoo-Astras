import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModulePage from '../../components/common/ModulePage';
import Button from '../../components/common/Button';
import { vehicleService } from '../../services/vehicleService';
import { useAuthContext } from '../../context/AuthContext';

function Vehicles() {
  const { user } = useAuthContext();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await vehicleService.getVehicles();
        setVehicles(payload?.vehicles || payload || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ModulePage title="Vehicles" description="Track fleet assets, statuses, and assigned drivers.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage fleet assets from one place.</p>
        {(user?.role === 'ADMIN' || user?.role === 'DISPATCHER' || user?.role === 'FLEET_MANAGER') && (
          <Link to="/vehicles/add">
            <Button variant="primary">Add Vehicle</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading vehicles...</div>
      ) : vehicles.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">No vehicles found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{vehicle.make} {vehicle.model}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{vehicle.status}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Registration: {vehicle.registrationNumber}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Mileage: {vehicle.mileage}</p>
              {(user?.role === 'ADMIN' || user?.role === 'DISPATCHER' || user?.role === 'FLEET_MANAGER') && (
                <div className="mt-4 flex justify-end">
                  <Link to={`/vehicles/edit/${vehicle._id}`} className="text-sm font-semibold text-blue-600">Edit</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Vehicles;
