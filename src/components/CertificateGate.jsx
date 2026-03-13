import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CertificateGate = ({ isOpen, onClose, onGrantAccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSending(true);
    
    try {
      // EmailJS Configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
        await emailjs.send(
          serviceId,
          templateId,
          {
            user_email: email,
            message: `Someone wants to view your certification. Authorized email: ${email}`,
            to_name: 'Hafiz',
            from_name: 'Portfolio Bot',
          },
          publicKey
        );
        console.log('Email successfully sent via EmailJS');
      } else {
        console.warn('EmailJS keys not configured. Skipping email sending.');
      }
      
      onGrantAccess(email);
    } catch (err) {
      console.error('EmailJS Error:', err);
      // We still grant access even if email fails to send, to not block the user experience
      // but we could also show an error if desired.
      onGrantAccess(email);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8 transition-colors duration-500"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isSending}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
                <Lock size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Verification Required
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400">
                Please provide your email address to view the full certification document.
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-4 pt-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    disabled={isSending}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all disabled:opacity-50"
                  />
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm font-medium text-left">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      Grant Permission
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-slate-500 dark:text-slate-500 pt-4">
                By granting permission, you agree to our terms for viewing official documents.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateGate;
