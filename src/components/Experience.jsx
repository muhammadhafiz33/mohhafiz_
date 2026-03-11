import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Experience = () => {
  return (
    <section id="experience" className="bg-white dark:bg-slate-900/50 transition-colors duration-500">
      <div className="container">
        <h2 className="section-title">My Journey</h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-12 md:pl-0"
            >
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />
              
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 top-2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-500 -translate-x-1/2 border-4 border-slate-50 dark:border-slate-950 z-10" />
              
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-center md:text-right' : 'md:ml-auto md:pl-16 text-center md:text-left'}`}>
                <span className="inline-block px-4 py-1 bg-indigo-600/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold mb-4 border border-indigo-500/20">
                  {exp.date}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-4">{exp.company}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
