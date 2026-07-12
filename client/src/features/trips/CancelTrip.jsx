import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModulePage from '../../components/common/ModulePage';
import Button from '../../components/common/Button';
import { tripService } from '../../services/tripService';

function CancelTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

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

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await tripService.cancelTrip(id);
      toast.success('Trip cancelled successfully');
      navigate('/trips');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to cancel trip');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <ModulePage title="Cancel Trip" description="Log trip cancellations and notes.">
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Loading trip...</div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-300">Cancel this trip and return the assigned resources to availability.</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p><span className="font-semibold text-slate-900 dark:text-white">Trip:</span> {trip?.title}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Route:</span> {trip?.origin} → {trip?.destination}</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Status:</span> {trip?.status}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="button" variant="primary" isLoading={cancelling} onClick={handleCancel}>Cancel Trip</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/trips')}>Back</Button>
          </div>
        </div>
      )}
    </ModulePage>
  );
}

export default CancelTrip;
