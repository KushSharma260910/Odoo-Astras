import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="p-5 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full mb-6"
        >
          <FaLock className="text-4xl" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-2"
        >
          Access Denied
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 max-w-md mb-6"
        >
          Your current account role (<span className="font-semibold text-slate-700 dark:text-slate-300">{user?.role || 'Guest'}</span>) is not authorized to view this page. If you believe this is an error, please contact your systems administrator.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return children;
}

export default RoleGuard;
