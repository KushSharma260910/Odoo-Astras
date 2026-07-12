import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Button from '../../components/common/Button';
import { tripService } from '../../services/tripService';

function DispatchTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dispatching, setDispatching] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const payload = await tripService.getTripById(id);
        setTrip(payload?.trip || payload || null);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Unable to load trip');
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [id]);

  const handleDispatch = async () => {
    setDispatching(true);
    try {
      await tripService.dispatchTrip(id);
      toast.success('Trip dispatched successfully');
      navigate('/trips');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to dispatch trip');
    } finally {
      setDispatching(false);
    }
  };

  return (
    <ModulePage title="Dispatch Trip" description="Manage route dispatching and driver assignments.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading trip...</div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p><span className="font-semibold text-slate-900 dark:text-white">Trip:</span> {trip?.title}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Route:</span> {trip?.origin} → {trip?.destination}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Vehicle:</span> {trip?.vehicle?.registrationNumber || 'Not assigned'}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Driver:</span> {trip?.driver?.name || 'Not assigned'}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Cargo Weight:</span> {trip?.cargoWeight}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Planned Distance:</span> {trip?.plannedDistance}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Current Status:</span> {trip?.status}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="button" variant="primary" isLoading={dispatching} onClick={handleDispatch}>Dispatch Trip</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/trips')}>Back</Button>
          </div>
        </div>
      )}
    </ModulePage>
  );
}

export default DispatchTrip;
