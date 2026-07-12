import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaIdCard, FaStar, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';

function DriverCard({ driver }) {
  const {
    id,
    name,
    licenseNo,
    licenseType,
    licenseExpiry,
    status,
    avatar,
    rating = 5.0,
    email
  } = driver;

  // Calculate if license is close to expiring (within 60 days) or already expired
  const getLicenseWarning = () => {
    if (!licenseExpiry) return null;
    const expiryDate = new Date(licenseExpiry);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return { text: 'Expired License', style: 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-200/50' };
    }
    if (diffDays <= 60) {
      return { text: `Expires in ${diffDays} days`, style: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-200/50' };
    }
    return null;
  };

  const warning = getLicenseWarning();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
    >
      {/* Profile summary info */}
      <div className="p-5 space-y-4 flex-1 text-left">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3.5">
            <img
              src={avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-850"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {name}
              </h3>
              <div className="flex items-center space-x-1.5 mt-1 text-slate-400">
                <FaStar className="text-amber-450 text-[10px]" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{rating.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 font-medium">(Logistics Rating)</span>
              </div>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* License details */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850/50 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span className="flex items-center font-medium"><FaIdCard className="mr-1.5 text-slate-400 text-sm" /> License No</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{licenseNo || 'CDL-XXXXXX'}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span className="font-medium">License Type</span>
            <span className="font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-200/20">{licenseType || 'Class A CDL'}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span className="font-medium">Expiry Date</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{licenseExpiry || 'N/A'}</span>
          </div>
        </div>

        {/* Dynamic License warning banner */}
        {warning && (
          <div className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-center space-x-2 ${warning.style}`}>
            <FaExclamationTriangle />
            <span>{warning.text}</span>
          </div>
        )}

        {/* Email listing */}
        {email && (
          <div className="flex items-center space-x-2 text-xs text-slate-450 dark:text-slate-500 font-medium">
            <FaEnvelope className="text-slate-400" />
            <span className="truncate">{email}</span>
          </div>
        )}
      </div>

      {/* Actions footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/10 flex items-center justify-between">
        <Link
          to={`/drivers/${id}`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Log Sheets
        </Link>
        <a
          href={`mailto:${email}`}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-350 hover:underline"
        >
          Contact Driver
        </a>
      </div>
    </motion.div>
  );
}

export default DriverCard;
