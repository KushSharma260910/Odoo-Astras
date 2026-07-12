import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModulePage from '../../components/common/ModulePage';
import Button from '../../components/common/Button';
import { userService } from '../../services/userService';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await userService.getUsers();
        setUsers(payload?.users || payload || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ModulePage title="Employee Directory" description="Manage employee access for TransitOps.">
      <div className="mb-4 flex justify-end">
        <Link to="/admin/users/create">
          <Button variant="primary">Create Employee</Button>
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading employees...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <div key={user._id || user.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</h2>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${user.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {user.status || (user.isActive ? 'Active' : 'Inactive')}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Username: {user.username || '—'}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Role: {user.role}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Assigned Vehicle: {user.assignedVehicle ? `${user.assignedVehicle.registrationNumber || ''} ${user.assignedVehicle.make || ''} ${user.assignedVehicle.model || ''}`.trim() : '—'}</p>
              <div className="mt-4 flex justify-end">
                <Link to={`/admin/users/edit/${user._id || user.id}`} className="text-sm font-semibold text-blue-600">Edit User</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Users;
