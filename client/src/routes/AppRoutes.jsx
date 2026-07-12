import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleGuard from './RoleGuard';

// Auth Pages
import Login from '../features/auth/Login';
import ForgotPassword from '../features/auth/ForgotPassword';

// Admin Pages
import AdminDashboard from '../features/admin/Dashboard';
import Users from '../features/admin/Users';
import CreateUser from '../features/admin/CreateUser';
import EditUser from '../features/admin/EditUser';
import UserProfile from '../features/admin/UserProfile';

// Dashboard Pages
import FleetDashboard from '../features/dashboard/FleetDashboard';
import DriverDashboard from '../features/dashboard/DriverDashboard';

// Vehicle Pages
import Vehicles from '../features/vehicles/Vehicles';
import AddVehicle from '../features/vehicles/AddVehicle';
import EditVehicle from '../features/vehicles/EditVehicle';
import VehicleDetails from '../features/vehicles/VehicleDetails';

// Driver Pages
import Drivers from '../features/drivers/Drivers';
import DriverDetails from '../features/drivers/DriverDetails';
import LicenseExpiry from '../features/drivers/LicenseExpiry';

// Trip Pages
import Trips from '../features/trips/Trips';
import CreateTrip from '../features/trips/CreateTrip';
import TripDetails from '../features/trips/TripDetails';
import DispatchTrip from '../features/trips/DispatchTrip';
import CompleteTrip from '../features/trips/CompleteTrip';
import CancelTrip from '../features/trips/CancelTrip';
import MyTrips from '../features/trips/MyTrips';
import TripHistory from '../features/trips/TripHistory';

// Maintenance Pages
import Maintenance from '../features/maintenance/Maintenance';
import CreateMaintenance from '../features/maintenance/CreateMaintenance';
import MaintenanceHistory from '../features/maintenance/MaintenanceHistory';

// Fuel & Expense Pages
import FuelLogs from '../features/fuel/FuelLogs';
import Expenses from '../features/expenses/Expenses';

// Report Pages
import Reports from '../features/reports/Reports';
import FleetReport from '../features/reports/FleetReport';
import FuelReport from '../features/reports/FuelReport';
import ROI from '../features/reports/ROI';

// Notifications
import Notifications from '../features/notifications/Notifications';

// Profile Page
import Profile from '../features/profile/Profile';

function AppRoutes() {
  return (
    <Routes>
      {/* Root Path Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboards */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/fleet" replace />} />
        <Route path="/dashboard/fleet" element={<FleetDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />

        {/* Profile & Notifications */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Vehicles */}
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route
          path="/vehicles/add"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']}>
              <AddVehicle />
            </RoleGuard>
          }
        />
        <Route
          path="/vehicles/edit/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']}>
              <EditVehicle />
            </RoleGuard>
          }
        />

        {/* Drivers */}
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/:id" element={<DriverDetails />} />
        <Route path="/drivers/license-expiry" element={<LicenseExpiry />} />

        {/* Trips */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/trips/history" element={<TripHistory />} />
        <Route path="/trips/my-trips" element={<MyTrips />} />
        <Route
          path="/trips/create"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']}>
              <CreateTrip />
            </RoleGuard>
          }
        />
        <Route
          path="/trips/dispatch/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']}>
              <DispatchTrip />
            </RoleGuard>
          }
        />
        <Route
          path="/trips/complete/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER', 'DRIVER']}>
              <CompleteTrip />
            </RoleGuard>
          }
        />
        <Route
          path="/trips/cancel/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER', 'FLEET_MANAGER']}>
              <CancelTrip />
            </RoleGuard>
          }
        />

        {/* Maintenance */}
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance/history" element={<MaintenanceHistory />} />
        <Route
          path="/maintenance/create"
          element={
            <RoleGuard allowedRoles={['ADMIN', 'DISPATCHER']}>
              <CreateMaintenance />
            </RoleGuard>
          }
        />

        {/* Fuel & Expenses */}
        <Route path="/fuel" element={<FuelLogs />} />
        <Route path="/expenses" element={<Expenses />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/fleet" element={<FleetReport />} />
        <Route path="/reports/fuel" element={<FuelReport />} />
        <Route path="/reports/roi" element={<ROI />} />

        {/* Admin Portal (Admin Only) */}
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <Navigate to="/admin/dashboard" replace />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <Users />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/users/create"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <CreateUser />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/users/edit/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <EditUser />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <UserProfile />
            </RoleGuard>
          }
        />
      </Route>

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
