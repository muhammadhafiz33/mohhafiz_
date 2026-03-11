import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import * as Icons from 'lucide-react';

const Education = () => {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION.map((edu, index) => {
            const Icon = Icons[edu.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:border-indigo-500/30 transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Icon size={32} />
                </div>
                
                <div className="space-y-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-tighter uppercase">{edu.date}</span>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-snug">{edu.degree}</h3>
                  <h4 className="text-slate-600 dark:text-slate-400 font-medium">{edu.institution}</h4>
                  <p className="text-slate-500 dark:text-slate-500 text-sm italic">{edu.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
