import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTruck, 
  FaRoute, 
  FaUserShield, 
  FaWrench, 
  FaGasPump, 
  FaDollarSign, 
  FaChartLine, 
  FaUsers, 
  FaUser, 
  FaTimes, 
  FaTruckMoving,
  FaRobot,
  FaFileAlt
} from 'react-icons/fa';

function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
  const { user } = useAuthContext();
  const location = useLocation();

  // Navigation configurations based on Roles
  const adminRoutes = [
    { name: 'Fleet Dashboard', path: '/dashboard/fleet', icon: FaTruckMoving },
    { name: 'Vehicles', path: '/vehicles', icon: FaTruck },
    { name: 'Drivers', path: '/drivers', icon: FaUsers },
    { name: 'Trips Portal', path: '/trips', icon: FaRoute },
    { name: 'Maintenance', path: '/maintenance', icon: FaWrench },
    { name: 'Fuel Management', path: '/fuel', icon: FaGasPump },
    { name: 'Expenses', path: '/expenses', icon: FaDollarSign },
    { name: 'Report Center', path: '/reports', icon: FaFileAlt },
    { name: 'User Directory', path: '/admin/users', icon: FaUsers },
  ];

  const dispatcherRoutes = [
    { name: 'Fleet Dashboard', path: '/dashboard/fleet', icon: FaTruckMoving },
    { name: 'Vehicles', path: '/vehicles', icon: FaTruck },
    { name: 'Drivers', path: '/drivers', icon: FaUsers },
    { name: 'Trips Portal', path: '/trips', icon: FaRoute },
    { name: 'Maintenance', path: '/maintenance', icon: FaWrench },
    { name: 'Fuel Management', path: '/fuel', icon: FaGasPump },
    { name: 'Expenses', path: '/expenses', icon: FaDollarSign },
    { name: 'Report Center', path: '/reports', icon: FaFileAlt },
  ];

  const driverRoutes = [
    { name: 'My Dashboard', path: '/dashboard/driver', icon: FaTruckMoving },
    { name: 'My Trips', path: '/trips/my-trips', icon: FaRoute },
    { name: 'Trip History', path: '/trips/history', icon: FaFileAlt },
    { name: 'License Expiry', path: '/drivers/license-expiry', icon: FaUserShield },
    { name: 'My Profile', path: '/profile', icon: FaUser },
  ];

  const getActiveRoutes = () => {
    if (user?.role === 'ADMIN') return adminRoutes;
    if (user?.role === 'DISPATCHER' || user?.role === 'FLEET_MANAGER') return dispatcherRoutes;
    if (user?.role === 'DRIVER') return driverRoutes;
    return [];
  };

  const menuItems = getActiveRoutes();

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const renderedLogo = (
    <div className="flex items-center space-x-3 text-white">
      <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
        <FaTruckMoving className="text-xl text-white" />
      </div>
      {(!isCollapsed || isOpen) && (
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
          TransItOps
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Core */}
      <motion.aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800/40 text-slate-400 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800/60">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            {renderedLogo}
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden focus:outline-none"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Check if active: exact match or partial match for subpages
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3.5 px-3 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Icon className={`text-lg flex-shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'
                }`} />
                {(!isCollapsed || isOpen) && (
                  <span className="truncate">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Sidebar Info (Collapsible) */}
        {(!isCollapsed || isOpen) && (
          <div className="p-5 border-t border-slate-800/60 bg-slate-950/20 text-center">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">TransItOps ERP</p>
            <p className="text-[9px] text-slate-650 mt-1">v1.2.0-client-stable</p>
          </div>
        )}
      </motion.aside>
    </>
  );
}

export default Sidebar;
