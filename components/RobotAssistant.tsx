import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RobotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("Hi! I'm MathBot. Need help?");

  useEffect(() => {
    const messages = [
      "Click me for help!",
      "I love solving integrals!",
      "Don't forget to practice!",
      "Math is the language of the universe."
    ];
    const interval = setInterval(() => {
      if (!isOpen) {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      {/* Chat Bubble */}
      <AnimatePresence>
        {(isOpen || isHovered) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 mr-4 bg-white/10 backdrop-blur-md border border-neon-blue/30 text-white p-4 rounded-2xl rounded-tr-none shadow-[0_0_15px_rgba(0,243,255,0.3)] max-w-xs"
          >
            <p className="font-sans text-sm font-semibold text-neon-blue mb-1">MathBot System</p>
            <p className="text-sm">{isOpen ? "How can I assist you with your calculations today?" : message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Body */}
      <motion.div
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-neon-purple/40 blur-3xl rounded-full scale-75 animate-pulse"></div>

        {/* Robot SVG Construction */}
        <div className="relative w-24 h-24">
          {/* Head */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-b from-slate-200 to-slate-400 rounded-2xl border-2 border-white/50 shadow-lg z-20 flex items-center justify-center overflow-hidden"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
             {/* Face Screen */}
             <div className="w-12 h-8 bg-black rounded-lg relative flex items-center justify-center gap-2">
                {/* Eyes */}
                <motion.div 
                  className="w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_#00f3ff]"
                  animate={{ height: [8, 1, 8] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_#00f3ff]"
                  animate={{ height: [8, 1, 8] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
             </div>
             {/* Antenna */}
             <div className="absolute -top-3 w-1 h-3 bg-gray-400 left-1/2 -translate-x-1/2"></div>
             <div className="absolute -top-4 w-2 h-2 bg-red-500 rounded-full left-1/2 -translate-x-1/2 animate-ping"></div>
          </motion.div>

          {/* Body */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl z-10 border border-white/20">
             <div className="w-full h-full flex items-center justify-center">
               <div className="w-4 h-4 bg-white/20 rounded-full animate-spin"></div>
             </div>
          </div>

          {/* Arms */}
          <motion.div 
            className="absolute top-14 left-1 w-6 h-2 bg-gray-400 rounded-full origin-right"
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-14 right-1 w-6 h-2 bg-gray-400 rounded-full origin-left"
            animate={{ rotate: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};