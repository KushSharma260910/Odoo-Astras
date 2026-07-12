import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaUser, FaBox, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';

function TripCard({ trip }) {
  const {
    id,
    origin,
    destination,
    vehicleId,
    vehiclePlate,
    driverName,
    status,
    dispatchDate,
    eta,
    revenue,
    cargoType
  } = trip;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
    >
      <div className="p-5 space-y-4 flex-1 text-left">
        {/* Header: ID, Cargo & Status */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                #{id}
              </span>
              <span className="w-1 h-1 bg-slate-350 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                {cargoType || 'Dry Van'}
              </span>
            </div>
            <StatusBadge status={status} className="mt-2" />
          </div>
          {revenue && (
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Revenue</p>
              <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-end">
                <FaDollarSign className="text-xs mr-0.5" />
                {Number(revenue).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Route Line Drawing */}
        <div className="relative pl-6 py-1 space-y-4">
          {/* Vertical connecting line */}
          <div className="absolute left-2.5 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-200 dark:border-slate-800"></div>

          {/* Origin */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute -left-5 top-0.5 text-blue-600 text-sm bg-white dark:bg-slate-900 rounded-full" />
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">Origin</p>
            <p className="text-sm font-bold text-slate-850 dark:text-slate-200 mt-1">{origin}</p>
          </div>

          {/* Destination */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute -left-5 top-0.5 text-red-500 text-sm bg-white dark:bg-slate-900 rounded-full" />
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">Destination</p>
            <p className="text-sm font-bold text-slate-850 dark:text-slate-200 mt-1">{destination}</p>
          </div>
        </div>

        {/* Dispatch timeline metadata */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-850 text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <FaCalendarAlt className="text-slate-400 flex-shrink-0" />
            <div className="truncate">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Dispatched</p>
              <p className="font-semibold text-slate-750 dark:text-slate-350 truncate">{dispatchDate || 'Pending'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-500">
            <FaCalendarAlt className="text-slate-450 flex-shrink-0" />
            <div className="truncate">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">ETA</p>
              <p className="font-semibold text-slate-750 dark:text-slate-350 truncate">{eta || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Resource Assignments */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850/50 grid grid-cols-2 gap-2 text-xs font-semibold">
          <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-450">
            <FaUser className="text-slate-400 text-xs flex-shrink-0" />
            <span className="truncate">{driverName || 'No Driver'}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-450 justify-end">
            <FaTruck className="text-slate-400 text-xs flex-shrink-0" />
            <span className="truncate">{vehiclePlate || `Truck #${vehicleId}`}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/10 flex items-center justify-between">
        <Link
          to={`/trips/${id}`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Trip Manifest
        </Link>
        
        {/* Contextual actions based on state */}
        {status === 'PENDING' && (
          <Link
            to={`/trips/dispatch/${id}`}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline animate-pulse"
          >
            Dispatch Now
          </Link>
        )}
        {status === 'DISPATCHED' && (
          <Link
            to={`/trips/${id}`}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Track Route
          </Link>
        )}
        {status === 'ON_TRIP' && (
          <Link
            to={`/trips/complete/${id}`}
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            Complete Trip
          </Link>
        )}
        {status === 'COMPLETED' && (
          <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded">
            Archived
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default TripCard;
