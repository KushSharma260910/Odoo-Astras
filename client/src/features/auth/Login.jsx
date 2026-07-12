import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

function Login() {
  const { login, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const from = location.state?.from?.pathname || null;

  const getRoleRedirect = (role) => {
    switch (role) {
      case 'ADMIN':         return '/admin/dashboard';
      case 'FLEET_MANAGER': return '/dashboard/fleet';
      case 'DISPATCHER':    return '/dashboard/fleet';
      case 'DRIVER':        return '/dashboard/driver';
      case 'MECHANIC':      return '/maintenance';
      default:              return '/dashboard/fleet';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authUser = await login(email, password);
      toast.success(`Welcome back, ${authUser?.name || 'User'}!`);

      // If there's a saved location (e.g., user tried to access /trips and was
      // redirected to login), send them back there first.
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(getRoleRedirect(authUser?.role), { replace: true });
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed. Check your credentials.';
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-[85vh] flex flex-col justify-center">
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          Sign in
        </h1>
        <p className="text-slate-500 dark:text-slate-300 mb-8">
          Use your credentials to access TransItOps.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="admin@odooastras.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>

            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Demo: admin123 / dispatcher123 / driver123
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>
      </div>

      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
        By continuing, you agree to our Terms and Privacy Policy.
      </div>
    </div>
  );
}

export default Login;

