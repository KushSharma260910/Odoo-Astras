import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { vehicleService } from '../../services/vehicleService';

const typeOptions = [
  { value: 'TRUCK', label: 'Truck' },
  { value: 'VAN', label: 'Van' },
  { value: 'BUS', label: 'Bus' },
  { value: 'CAR', label: 'Car' },
  { value: 'HEAVY_EQUIPMENT', label: 'Heavy Equipment' },
];

const statusOptions = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'IDLE', label: 'Idle' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OUT_OF_SERVICE', label: 'Out of Service' },
];

function AddVehicle() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    registrationNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'TRUCK',
    status: 'AVAILABLE',
    capacity: '',
    mileage: '',
    fuelType: 'DIESEL',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await vehicleService.addVehicle({
        ...form,
        year: Number(form.year) || undefined,
        capacity: Number(form.capacity) || 0,
        mileage: Number(form.mileage) || 0,
      });
      toast.success('Vehicle registered successfully');
      navigate('/vehicles');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to register vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModulePage title="Add Vehicle" description="Create a new fleet vehicle record.">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Registration Number" name="registrationNumber" value={form.registrationNumber} onChange={handleChange} required />
          <Input label="Make" name="make" value={form.make} onChange={handleChange} required />
          <Input label="Model" name="model" value={form.model} onChange={handleChange} required />
          <Input label="Year" type="number" name="year" value={form.year} onChange={handleChange} />
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vehicle Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <Input label="Capacity" type="number" name="capacity" value={form.capacity} onChange={handleChange} />
          <Input label="Mileage" type="number" name="mileage" value={form.mileage} onChange={handleChange} />
          <Input label="Fuel Type" name="fuelType" value={form.fuelType} onChange={handleChange} />
          <Input label="Notes" name="notes" value={form.notes} onChange={handleChange} />
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="submit" variant="primary" isLoading={loading}>Register Vehicle</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/vehicles')}>Cancel</Button>
        </div>
      </form>
    </ModulePage>
  );
}

export default AddVehicle;
