import React, { useState, forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="w-full flex flex-col space-y-1.5 text-left">
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="text-base" />
          </div>
        )}
        
        <input
          id={id}
          ref={ref}
          type={inputType}
          className={`w-full py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border rounded-xl text-sm transition-all duration-205 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-slate-400 ${
            Icon ? 'pl-11' : 'px-4'
          } ${
            isPassword ? 'pr-11' : 'pr-4'
          } ${
            error 
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
          >
            {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-red-500 animate-pulse-subtle">
          {error.message || error}
        </span>
      )}
      
      {!error && helperText && (
        <span className="text-xs text-slate-400">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
