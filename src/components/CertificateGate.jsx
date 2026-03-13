import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ShieldCheck, Lock, Loader2, KeyRound, ArrowRight, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CertificateGate = ({ isOpen, onClose, onGrantAccess }) => {
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    const otp = generateOTP();
    setGeneratedOtp(otp);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
        await emailjs.send(
          serviceId,
          templateId,
          {
            user_email: email,
            otp_code: otp,
            message: `Your verification code is: ${otp}`,
            to_name: 'Visitor',
            from_name: 'Hafiz Portfolio',
          },
          publicKey
        );
        setStep(2);
        setError('');
      } else {
        setError('Email server is not configured correctly.');
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      onGrantAccess(email);
      // Reset state for next time
      setStep(1);
      setOtpInput('');
      setEmail('');
    } else {
      setError('Invalid verification code. Please check your email.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8 transition-colors duration-500"
          >
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
                {step === 1 ? <Mail size={32} /> : <KeyRound size={32} />}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {step === 1 ? 'Verification Required' : 'Enter Verification Code'}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400">
                {step === 1 
                  ? 'We will send a 6-digit verification code to your email.' 
                  : `Please enter the 6-digit code sent to ${email}`}
              </p>

              {step === 1 ? (
                <form onSubmit={handleSendOtp} className="w-full space-y-4 pt-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      disabled={isLoading}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all disabled:opacity-50"
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm font-medium text-left">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Code <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="w-full space-y-4 pt-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="6-digit code"
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white text-center text-2xl tracking-[0.5em] font-bold"
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm font-medium text-left">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                  >
                    <ShieldCheck size={20} />
                    Verify & View Certificate
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-sm font-medium transition-colors mx-auto"
                  >
                    <RefreshCw size={14} /> Change Email
                  </button>
                </form>
              )}
              
              <p className="text-xs text-slate-500 dark:text-slate-500 pt-4">
                We'll never share your email with anyone else.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateGate;
