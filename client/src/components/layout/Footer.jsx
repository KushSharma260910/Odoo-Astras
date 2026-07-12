import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 md:px-8 bg-white dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/40 mt-auto text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-slate-500 dark:text-slate-450">
        <div>
          <span>&copy; {currentYear} </span>
          <span className="font-bold text-slate-700 dark:text-slate-350">TransItOps ERP Systems Inc. </span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <span>Build v1.2.0-STABLE</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
