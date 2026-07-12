import React, { useContext, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    await logout();
    setMessage('Logged out successfully');
  };

  return (
    <ModulePage title="Profile" description="Manage account details and sign out.">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{user?.name || 'User'}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Role: {user?.role}</p>
        {message ? <p className="mt-4 text-sm text-emerald-600">{message}</p> : null}
        <button onClick={handleLogout} className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900">
          Logout
        </button>
      </div>
    </ModulePage>
  );
}

export default Profile;
