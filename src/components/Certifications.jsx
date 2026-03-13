import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';
import CertificateGate from './CertificateGate';

// Individual imports to ensure Vite bundles them and provides the correct URLs
import CiscoBadge from '../assets/cisco-badge.jpg';
import CiscoCert from '../assets/cisco-cert.jpg';
import KominfoBadge from '../assets/kominfo-badge.png';
import KominfoCert from '../assets/kominfo-cert.jpg';

// Mapping object for dynamic lookups
const imageMap = {
  "cisco-badge.jpg": CiscoBadge,
  "cisco-cert.jpg": CiscoCert,
  "kominfo-badge.png": KominfoBadge,
  "kominfo-cert.jpg": KominfoCert,
};

const Certifications = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [pendingCertImage, setPendingCertImage] = useState(null);

  useEffect(() => {
    // Check if user is already authorized
    const authStatus = localStorage.getItem('cert_authorized');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleViewCertificate = (imagePath) => {
    if (isAuthorized) {
      window.open(imageMap[imagePath], '_blank');
    } else {
      setPendingCertImage(imagePath);
      setIsGateOpen(true);
    }
  };

  const grantAccess = (email) => {
    // In a real app, you might save the email to a DB here
    console.log(`Access granted for: ${email}`);
    setIsAuthorized(true);
    localStorage.setItem('cert_authorized', 'true');
    setIsGateOpen(false);
    
    // Open the pending certificate if there was one
    if (pendingCertImage) {
      window.open(imageMap[pendingCertImage], '_blank');
      setPendingCertImage(null);
    }
  };

  return (
    <section id="certifications" className="bg-white dark:bg-slate-900/30 transition-colors duration-500">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:border-indigo-500/30 transition-all shadow-xl dark:shadow-2xl"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-2xl opacity-10 dark:opacity-20 animate-pulse" />
                <img
                  src={imageMap[cert.badge]}
                  alt={`${cert.issuer} Badge`}
                  className="relative z-10 w-full h-full object-contain rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-950 p-2"
                />
              </div>
              
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{cert.title}</h3>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm bg-indigo-600/10 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 whitespace-nowrap">{cert.date}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-600 dark:text-slate-300">{cert.issuer}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  "{cert.description}"
                </p>
                
                <div className="pt-4">
                  <button 
                    onClick={() => handleViewCertificate(cert.image)}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors mx-auto md:mx-0 group/btn"
                  >
                    View Full Certificate 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateGate 
        isOpen={isGateOpen} 
        onClose={() => setIsGateOpen(false)} 
        onGrantAccess={grantAccess} 
      />
    </section>
  );
};

export default Certifications;
