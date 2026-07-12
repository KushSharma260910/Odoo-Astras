import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { expenseService } from '../../services/expenseService';
import { useAuthContext } from '../../context/AuthContext';

function Expenses() {
  const { user } = useAuthContext();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'OTHER',
    amount: '',
    description: '',
    status: 'PENDING',
    expenseDate: '',
  });

  const loadExpenses = async () => {
    try {
      const payload = await expenseService.getExpenses();
      setExpenses(payload?.expenses || payload || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: '', category: 'OTHER', amount: '', description: '', status: 'PENDING', expenseDate: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        amount: Number(form.amount) || 0,
        expenseDate: form.expenseDate || new Date().toISOString(),
      };

      if (editingId) {
        await expenseService.updateExpense(editingId, payload);
        toast.success('Expense updated');
      } else {
        await expenseService.addExpense(payload);
        toast.success('Expense added');
      }

      resetForm();
      await loadExpenses();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save expense');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setForm({
      title: expense.title || '',
      category: expense.category || 'OTHER',
      amount: expense.amount || '',
      description: expense.description || '',
      status: expense.status || 'PENDING',
      expenseDate: expense.expenseDate ? new Date(expense.expenseDate).toISOString().slice(0, 10) : '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await expenseService.deleteExpense(id);
      toast.success('Expense removed');
      await loadExpenses();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to delete expense');
    }
  };

  return (
    <ModulePage title="Expenses" description="Manage operating and maintenance expenses.">
      {(user?.role === 'ADMIN' || user?.role === 'DISPATCHER') && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <option value="FUEL">Fuel</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="TOLL">Toll</option>
                <option value="INSURANCE">Insurance</option>
                <option value="PAYROLL">Payroll</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <Input label="Amount" type="number" name="amount" value={form.amount} onChange={handleChange} required />
            <Input label="Expense Date" type="date" name="expenseDate" value={form.expenseDate} onChange={handleChange} />
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <Input label="Description" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" variant="primary" isLoading={submitting}>{editingId ? 'Save Expense' : 'Add Expense'}</Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading expenses...</div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{expense.title || expense.description}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{expense.category} • {expense.status}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">${expense.amount}</span>
                  {(user?.role === 'ADMIN' || user?.role === 'DISPATCHER') && (
                    <div className="mt-2 flex justify-end gap-3 text-sm">
                      <button type="button" onClick={() => handleEdit(expense)} className="font-semibold text-blue-600">Edit</button>
                      <button type="button" onClick={() => handleDelete(expense._id)} className="font-semibold text-red-600">Delete</button>
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

export default Expenses;
