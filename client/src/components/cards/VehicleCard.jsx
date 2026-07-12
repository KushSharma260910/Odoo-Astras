import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTruck, FaGasPump, FaTachometerAlt, FaUser } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';

function VehicleCard({ vehicle }) {
  const {
    id,
    make,
    model,
    year,
    licensePlate,
    status,
    type,
    mileage,
    fuelLevel,
    assignedDriver,
    avatar
  } = vehicle;

  const getFuelColor = (level) => {
    if (level < 20) return 'bg-red-500';
    if (level < 50) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
    >
      {/* Visual Header Banner */}
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      {/* Card Info Content */}
      <div className="p-5 flex-1 space-y-4 text-left">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-850 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-850">
              {type || 'Semi-Truck'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
              {year} {make} {model}
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">Plate: <span className="font-semibold">{licensePlate}</span></p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Thumbnail representation */}
        <div className="w-full h-32 bg-slate-50 dark:bg-slate-950/40 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-850/50 overflow-hidden relative group">
          {avatar ? (
            <img src={avatar} alt="vehicle avatar" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
          ) : (
            <FaTruck className="text-4xl text-slate-300 dark:text-slate-700" />
          )}
          <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800/40 text-[10px] font-bold flex justify-between">
            <span className="text-slate-500">ID</span>
            <span className="text-blue-600 dark:text-blue-400">#{id}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850">
              <FaTachometerAlt className="text-slate-450" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Mileage</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">{Number(mileage).toLocaleString()} mi</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850">
              <FaUser className="text-slate-450" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Driver</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[90px]">{assignedDriver || 'Unassigned'}</p>
            </div>
          </div>
        </div>

        {/* Fuel Gauge */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-850">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-450">
            <span className="flex items-center"><FaGasPump className="mr-1 text-[10px]" /> Fuel Level</span>
            <span className="text-slate-700 dark:text-slate-350">{fuelLevel}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getFuelColor(fuelLevel)}`}
              style={{ width: `${fuelLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/10 flex items-center justify-between">
        <Link
          to={`/vehicles/${id}`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Telematics
        </Link>
        <Link
          to={`/vehicles/edit/${id}`}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:underline"
        >
          Manage
        </Link>
      </div>
    </motion.div>
  );
}

export default VehicleCard;
