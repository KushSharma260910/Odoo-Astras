import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { userService } from '../../services/userService';
import { vehicleService } from '../../services/vehicleService';

const roleOptions = [
  { value: 'FLEET_MANAGER', label: 'Fleet Manager' },
  { value: 'DRIVER', label: 'Driver' },
  { value: 'SAFETY_OFFICER', label: 'Safety Officer' },
  { value: 'FINANCIAL_ANALYST', label: 'Financial Analyst' },
];

function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    role: 'FLEET_MANAGER',
    status: 'Active',
    assignedVehicle: '',
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const payload = await vehicleService.getVehicles();
        setVehicles(payload?.vehicles || payload || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadVehicles();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.createUser({
        ...form,
        assignedVehicle: form.assignedVehicle || null,
        isActive: form.status === 'Active',
      });
      toast.success('Employee account created successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to create employee account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModulePage title="Create Employee" description="Create a new employee account for TransitOps.">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assign Vehicle</label>
            <select name="assignedVehicle" value={form.assignedVehicle} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <option value="">No vehicle assigned</option>
              {vehicles.filter((vehicle) => ['AVAILABLE', 'ACTIVE', 'IDLE'].includes((vehicle.status || '').toUpperCase())).map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>{vehicle.registrationNumber} — {vehicle.make} {vehicle.model}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="submit" variant="primary" isLoading={loading}>Create Employee</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/users')}>Cancel</Button>
        </div>
      </form>
    </ModulePage>
  );
}

export default CreateUser;
