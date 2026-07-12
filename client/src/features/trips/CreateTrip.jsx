import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { tripService } from '../../services/tripService';
import { vehicleService } from '../../services/vehicleService';
import { driverService } from '../../services/driverService';

function CreateTrip() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    origin: '',
    destination: '',
    cargoWeight: '',
    plannedDistance: '',
    vehicle: '',
    driver: '',
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [vehiclePayload, driverPayload] = await Promise.all([
          vehicleService.getVehicles(),
          driverService.getDrivers(),
        ]);
        const vehicleList = vehiclePayload?.vehicles || vehiclePayload || [];
        const driverList = driverPayload?.drivers || driverPayload || [];
        setVehicles(vehicleList);
        setDrivers(driverList);
      } catch (error) {
        console.error(error);
        toast.error('Unable to load available vehicles and drivers');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tripService.createTrip({
        ...form,
        cargoWeight: Number(form.cargoWeight) || 0,
        plannedDistance: Number(form.plannedDistance) || 0,
      });
      toast.success('Trip created successfully');
      navigate('/trips');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to create trip');
    } finally {
      setSubmitting(false);
    }
  };

  const availableVehicles = vehicles.filter((vehicle) => ['AVAILABLE', 'ACTIVE', 'IDLE'].includes((vehicle.status || '').toUpperCase()));
  const availableDrivers = drivers.filter((driver) => {
    const status = (driver.status || '').toUpperCase();
    const expiryOk = new Date(driver.licenseExpiryDate) > new Date();
    return status === 'AVAILABLE' && expiryOk;
  });

  return (
    <ModulePage title="Create Trip" description="Create a new dispatch trip record.">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Trip Title" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Source" name="origin" value={form.origin} onChange={handleChange} required />
          <Input label="Destination" name="destination" value={form.destination} onChange={handleChange} required />
          <Input label="Cargo Weight" type="number" name="cargoWeight" value={form.cargoWeight} onChange={handleChange} required />
          <Input label="Planned Distance" type="number" name="plannedDistance" value={form.plannedDistance} onChange={handleChange} required />
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vehicle</label>
            <select name="vehicle" value={form.vehicle} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required>
              <option value="">Select a vehicle</option>
              {availableVehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>{vehicle.registrationNumber} — {vehicle.make} {vehicle.model}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Driver</label>
            <select name="driver" value={form.driver} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required>
              <option value="">Select a driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver._id} value={driver._id}>{driver.name}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">The backend validates that the vehicle is available, the driver is available, the license is valid, and the cargo weight fits the vehicle capacity.</p>

        <div className="mt-6 flex gap-3">
          <Button type="submit" variant="primary" isLoading={submitting || loading}>Create Trip</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/trips')}>Cancel</Button>
        </div>
      </form>
    </ModulePage>
  );
}

export default CreateTrip;
