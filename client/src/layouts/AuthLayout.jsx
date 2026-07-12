import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaTruckMoving } from 'react-icons/fa';

function AuthLayout() {
  const { isAuthenticated } = useAuthContext();

  // If already authenticated, redirect directly to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      {/* Visual side panel - hidden on mobile */}
      <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        {/* Abstract grids and lights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-slate-900 to-slate-950 opacity-90 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
        
        {/* Animated ambient blob */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/35 rounded-full filter blur-[80px] z-0"
        />

        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 mb-6"
          >
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <FaTruckMoving className="text-3xl text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              TransItOps
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            Next-Gen Transport & Logistics Operations
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-lg leading-relaxed mb-8"
          >
            Empower your fleet, optimize dispatch routes, predict maintenance, and analyze logistics expenses through a single, responsive ERP environment.
          </motion.p>

          {/* Key metrics grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/50"
          >
            <div>
              <div className="text-3xl font-extrabold text-blue-400">99.8%</div>
              <div className="text-sm text-slate-400 mt-1">On-Time Dispatch</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400">14%</div>
              <div className="text-sm text-slate-400 mt-1">Fuel Economy Inc.</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400">1.2M+</div>
              <div className="text-sm text-slate-400 mt-1">Miles Managed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form area */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:col-span-5 xl:col-span-4 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 shadow-2xl relative z-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
