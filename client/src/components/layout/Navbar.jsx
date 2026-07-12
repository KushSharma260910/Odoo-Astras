import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaBars, 
  FaBell, 
  FaMoon, 
  FaSun, 
  FaUser, 
  FaSignOutAlt, 
  FaCog 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Safety Warning: Driver David Miller hard braking detected on Trip #T-501', time: '5m ago', read: false },
    { id: 2, text: 'Maintenance Alert: Vehicle #V-102 (Peterbilt 579) due for oil filter service in 150 miles', time: '1h ago', read: false },
    { id: 3, text: 'Route Dispatched: New trip #T-503 assigned to David Miller', time: '2h ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
          >
            <FaBars className="text-lg" />
          </button>
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            <FaBars className="text-lg" />
          </button>

          {/* Quick Stats Summary */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Services Operational</span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            title="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-base text-amber-500" /> : <FaMoon className="text-base" />}
          </button>

          {/* Notifications Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none relative"
            >
              <FaBell className="text-base" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-extrabold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-80 sm:w-96 origin-top-right rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Operations Alerts</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                            n.read
                              ? 'bg-transparent border-slate-100 dark:border-slate-850 text-slate-500'
                              : 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-100/50 dark:border-blue-950/30 text-slate-800 dark:text-slate-200 font-medium'
                          }`}
                        >
                          <p>{n.text}</p>
                          <span className="text-[10px] text-slate-400 block mt-1.5">{n.time}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="block text-center mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline border-t border-slate-100 dark:border-slate-850 pt-3"
                    >
                      View all notifications
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-850"></div>

          {/* User Profile Info Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center space-x-3 focus:outline-none p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt="user avatar"
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user?.name || 'Sara Jenkins'}</p>
                <p className="text-[10px] font-semibold text-slate-450 uppercase tracking-wider">{user?.role || 'Admin'}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-45" onClick={() => setProfileDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2.5 z-50 text-xs"
                  >
                    <div className="px-3.5 py-3 border-b border-slate-100 dark:border-slate-850 text-left">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{user?.name}</p>
                      <p className="text-slate-400 truncate text-[11px] mt-0.5">{user?.email}</p>
                    </div>
                    
                    <div className="py-1.5 space-y-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-all font-semibold"
                      >
                        <FaUser className="text-sm text-slate-400" />
                        <span>My Profile</span>
                      </Link>
                      
                      {user?.role === 'ADMIN' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-all font-semibold"
                        >
                          <FaCog className="text-sm text-slate-400" />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-850 pt-1.5 mt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-750 transition-all font-semibold text-left"
                      >
                        <FaSignOutAlt className="text-sm" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
