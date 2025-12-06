import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { RobotAssistant } from './components/RobotAssistant';

// Animated background particle component
const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-white/10 blur-sm"
    initial={{ 
      x: Math.random() * window.innerWidth, 
      y: Math.random() * window.innerHeight, 
      scale: 0 
    }}
    animate={{ 
      y: [null, Math.random() * -100], 
      opacity: [0, 0.8, 0],
      scale: [0, 1.5, 0]
    }}
    transition={{ 
      duration: Math.random() * 5 + 5, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
    style={{
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
    }}
  />
);

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050510] text-white selection:bg-neon-purple selection:text-white overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      />
      
      {/* Ambient Moving Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neon-blue/20 rounded-full blur-[120px] z-0" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-neon-purple/20 rounded-full blur-[120px] z-0" 
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      <Navbar />
      
      <main className="relative z-10">
        <HeroCarousel />
      </main>

      <RobotAssistant />
      
      {/* Decorative Text with Reveal Animation */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-10 left-10 z-0 pointer-events-none hidden lg:block"
      >
        <h1 className="text-8xl font-display font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white/10 to-transparent">
          Smart<br/>Chatbot
        </h1>
      </motion.div>
    </div>
  );
};

export default App;