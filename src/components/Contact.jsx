import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, subject, message } = formData;
    
    // WhatsApp configuration
    const phoneNumber = "6281234567890"; // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER
    const whatsappMessage = `*Halo, I'm ${name}*\n\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="bg-white dark:bg-slate-950 py-20 transition-colors duration-500">
      <div className="container px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl transition-colors duration-500">
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div className="space-y-8 text-center md:text-left">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Let's work together</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-sm mx-auto md:mx-0">
                  Feel free to reach out for collaborations or just to say hi! I'm always open to new opportunities.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Email</p>
                    <p className="text-slate-900 dark:text-white font-medium">CIO@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">WhatsApp</p>
                    <p className="text-slate-900 dark:text-white font-medium">+62 812 3456 7890</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Location</p>
                    <p className="text-slate-900 dark:text-white font-medium">Padang, Sumatera Barat</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800/30 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 transition-colors duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-500 dark:text-slate-400 text-sm font-bold ml-1">Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    required
                    placeholder="" 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-500 dark:text-slate-400 text-sm font-bold ml-1">Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    required
                    placeholder="" 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 dark:text-slate-400 text-sm font-bold ml-1">Subject</label>
                <input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text" 
                  required
                  placeholder="I'd like to talk about..." 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 dark:text-slate-400 text-sm font-bold ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  required
                  placeholder="Your message here..." 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none text-slate-900 dark:text-white"
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-transform">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
