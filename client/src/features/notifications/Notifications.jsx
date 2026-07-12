import React, { useEffect, useState } from 'react';
import ModulePage from '../../components/common/ModulePage';
import api from '../../services/api';

function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/notifications');
        setItems(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ModulePage title="Notifications" description="Recent alerts and events for the fleet operations team.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading notifications...</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </ModulePage>
  );
}

export default Notifications;
