import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProfileCard = ({ 
  image, 
  name = "Hafiz", 
  role = "Fullstack Developer", 
  className = "" 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoothing the tilt transitions for a premium feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Increased rotation for a more pronounced 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Spotlight position
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Support both mouse and touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseEnter={handlePointerEnter}
      onTouchStart={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onTouchEnd={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={`relative w-72 h-72 md:w-96 md:h-96 rounded-full cursor-pointer group ${className}`}
    >
      {/* Background/Base with stronger border and depth */}
      <div 
        className={`absolute inset-0 bg-white dark:bg-slate-900 border-2 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${isHovered ? 'border-indigo-500/50' : 'border-slate-200 dark:border-slate-800'}`}
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Spotlight light - Stronger and more responsive */}
        <motion.div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([sx, sy]) => `radial-gradient(300px circle at ${sx} ${sy}, rgba(99, 102, 241, 0.25), transparent 80%)`
            )
          }}
        />

        {/* Dotted Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "12px 12px"
          }}
        />

          {/* Main Content Area */}
          <div 
            className="absolute inset-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5"
            style={{ 
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Profile Image with correct framing */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <img 
                src={image} 
                alt={name} 
                className={`w-full h-full object-cover object-top transform transition-transform duration-700 ease-out ${isHovered ? 'scale-[1.3]' : 'scale-125'}`}
                style={{ 
                  objectPosition: '50% 10%', 
                  transform: "translateZ(10px)"
                }}
              />
              
              {/* Darker shadow overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-200/90 dark:from-slate-950/90 via-transparent to-transparent z-10 font-bold" />
            </div>
          </div>

        {/* Outer Highlight Rim */}
        <div className={`absolute inset-0 rounded-full ring-1 ring-inset transition-all z-40 pointer-events-none ${isHovered ? 'ring-white/20' : 'ring-white/10'}`} />
      </div>

      {/* Ambient background glows */}
      <div className={`absolute -inset-4 rounded-full blur-3xl -z-10 transition-all ${isHovered ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`} />
    </motion.div>
  );
};

export default ProfileCard;
