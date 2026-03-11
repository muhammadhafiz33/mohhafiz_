import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import * as Icons from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" className="bg-white dark:bg-slate-950 py-24 transition-colors duration-500">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group shadow-sm dark:shadow-none"
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center justify-center md:justify-start gap-3">
                <span className="w-10 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full group-hover:w-16 transition-all hidden md:block" />
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {skillGroup.items.map((skill, index) => {
                  const isSoftSkill = skillGroup.category === "Soft Skills";
                  const Icon = isSoftSkill ? Icons[skill.icon] : null;
                  
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 group/skill"
                    >
                      <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover/skill:border-indigo-500/50 transition-all p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                        {isSoftSkill ? (
                          <Icon size={24} className="text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <img
                            src={`https://cdn.simpleicons.org/${skill.icon}/6366f1`}
                            alt={skill.name}
                            className="w-full h-full object-contain filter brightness-110 dark:brightness-100"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        )}
                        <Icons.Code className="hidden text-indigo-600 dark:text-indigo-400" size={24} />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover/skill:text-indigo-600 dark:group-hover/skill:text-indigo-400 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
