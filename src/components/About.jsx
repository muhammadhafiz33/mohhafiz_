import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABOUT_SLIDES, STATS } from '../constants';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="bg-white dark:bg-slate-900/50 transition-colors duration-500">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="relative h-64 md:h-32 flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic"
                >
                  "{ABOUT_SLIDES[currentSlide]}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex justify-center md:justify-start gap-4">
              {ABOUT_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-indigo-600 dark:bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 text-center hover:border-indigo-500/50 transition-colors shadow-sm dark:shadow-none"
              >
                <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stat.value}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
