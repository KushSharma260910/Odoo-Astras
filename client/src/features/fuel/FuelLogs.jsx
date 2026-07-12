import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import { fuelService } from '../../services/fuelService';

function FuelLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ quantity: '', cost: '', type: 'Fuel' });

  const loadLogs = async () => {
    try {
      const payload = await fuelService.getFuelLogs();
      setLogs(payload?.fuelLogs || payload || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleEdit = (log) => {
    setEditingId(log._id);
    setForm({ quantity: log.quantity || '', cost: log.cost || '', type: log.type || 'Fuel' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fuelService.updateFuelLog(editingId, {
        quantity: Number(form.quantity),
        cost: Number(form.cost),
        type: form.type,
      });
      toast.success('Fuel log updated');
      setEditingId(null);
      await loadLogs();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to update fuel log');
    }
  };

  return (
    <ModulePage title="Fuel Logs" description="Track fuel purchases and vehicle consumption.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading fuel logs...</div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {editingId === log._id ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span className="mb-1 block">Quantity</span>
                      <input name="quantity" value={form.quantity} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span className="mb-1 block">Cost</span>
                      <input name="cost" value={form.cost} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span className="mb-1 block">Type</span>
                      <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                        <option value="Fuel">Fuel</option>
                        <option value="Refuel">Refuel</option>
                        <option value="Service">Service</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditingId(null)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button>
                    <button type="submit" className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Save</button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">{log.vehicle?.registrationNumber || 'Vehicle'}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{log.quantity} liters • {log.cost}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">{log.type || 'Fuel'}</span>
                    <button onClick={() => handleEdit(log)} className="rounded-xl border border-blue-200 px-3 py-1.5 text-sm font-semibold text-blue-600 dark:border-blue-800 dark:text-blue-400">Edit</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default FuelLogs;
