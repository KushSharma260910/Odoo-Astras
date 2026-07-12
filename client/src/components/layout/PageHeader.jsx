import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

function PageHeader({
  title,
  subtitle,
  breadcrumbs = [], // [{ label: 'Dashboard', path: '/' }]
  actions,
  className = ''
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/40 mb-6 ${className}`}>
      
      {/* Title & Breadcrumbs */}
      <div className="space-y-1.5 text-left">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <Link 
              to="/dashboard" 
              className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FaHome className="mr-1 text-xs" />
              <span>Home</span>
            </Link>
            
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  <FaChevronRight className="text-[8px] text-slate-350" />
                  {isLast ? (
                    <span className="text-slate-500 dark:text-slate-400 font-bold">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Buttons Section */}
      {actions && (
        <div className="flex items-center space-x-2.5 flex-shrink-0 md:self-end">
          {actions}
        </div>
      )}

    </div>
  );
}

export default PageHeader;
