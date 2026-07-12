import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Reset Password</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Contact the administrator to restore access to your TransItOps account.
        </p>
        <Link to="/login" className="mt-6 inline-flex text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
