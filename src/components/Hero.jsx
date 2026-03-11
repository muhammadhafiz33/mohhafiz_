import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT, SOCIAL_LINKS } from '../constants';
import * as Icons from 'lucide-react';

import ProfileImg from '../assets/profile-photo.png';
import ProfileCard from './ProfileCard';

const Hero = () => {
  return (
    <header className="relative min-h-[90vh] flex items-center pt-32 pb-20">
      {/* Background Placeholder for React Bits */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Placeholder for components like Particles, Waves, etc. */}
        <div className="w-full h-full bg-white dark:bg-slate-950 transition-colors duration-500"></div>
      </div>

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <span className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wider text-lg block">
            {HERO_CONTENT.greeting}
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {HERO_CONTENT.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-300">
            Professional <span className="text-indigo-600 dark:text-indigo-500">{HERO_CONTENT.role.split(' ').pop()}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mx-auto md:mx-0 max-w-lg leading-relaxed">
            {HERO_CONTENT.description}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <a href={HERO_CONTENT.primaryBtn.href} className="btn-primary">
              {HERO_CONTENT.primaryBtn.text}
            </a>
            <a href={HERO_CONTENT.secondaryBtn.href} className="btn-secondary">
              {HERO_CONTENT.secondaryBtn.text}
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-6 pt-8 pb-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = Icons[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-indigo-500 transition-colors"
                  aria-label={link.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center perspective-1000"
        >
          <ProfileCard 
            image={ProfileImg} 
            name={HERO_CONTENT.name} 
            role={HERO_CONTENT.role} 
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
