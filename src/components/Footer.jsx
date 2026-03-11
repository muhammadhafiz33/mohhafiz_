import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import * as Icons from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors duration-500">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 bg-clip-text text-transparent">
            Portfolio.
          </a>
          <p className="text-slate-500 mt-2 text-sm italic">
            &copy; {new Date().getFullYear()} Copyright by Hafiz.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = Icons[link.icon];
            return (
              <a
                key={link.name}
                href={link.href}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-600 dark:hover:border-indigo-500 transition-all bg-slate-50 dark:bg-slate-900"
                aria-label={link.name}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        
        <div className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for new projects
        </div>
      </div>
    </footer>
  );
};

export default Footer;
