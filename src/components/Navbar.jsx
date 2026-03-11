import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 shadow-xl border-b border-slate-200 dark:border-slate-800' : 'bg-transparent py-6'}`}>
      <div className="container px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Portfolio.
        </a>

        {/* Desktop Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-indigo-400 ${link.isBtn ? 'btn-primary' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Custom Theme Switch */}
          <button 
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 border-slate-900 dark:border-white ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'}`}
            aria-label="Toggle Theme"
          >
            <div 
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform duration-300 transform shadow-md ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}
            >
              {theme === 'dark' ? (
                <Sun size={12} className="text-indigo-600" />
              ) : (
                <Moon size={12} className="text-slate-600" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none border-2 border-slate-900 dark:border-white ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'}`}
            aria-label="Toggle Theme"
          >
            <div 
              className={`absolute top-0 w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform duration-300 transform shadow-sm ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
            >
              {theme === 'dark' ? (
                <Sun size={10} className="text-indigo-600" />
              ) : (
                <Moon size={10} className="text-slate-600" />
              )}
            </div>
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-8 px-4 animate-in slide-in-from-top duration-300 shadow-2xl">
          <ul className="flex flex-col gap-8 items-center text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="w-full">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-medium block py-2 transition-colors ${link.isBtn ? 'btn-primary mx-auto' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
