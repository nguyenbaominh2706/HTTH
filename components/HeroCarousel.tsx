import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, FileText, Gamepad2, Search, AlertTriangle, X } from 'lucide-react';
import { FeatureItem, AppState } from '../types';
import { MathSolver } from './features/MathSolver';
import { ScientistFinder } from './features/ScientistFinder';

// Placeholder components for other features
const PlaceholderFeature: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h3 className="text-4xl font-display text-neon-blue mb-4">{title}</h3>
    <p className="text-gray-400">This module is currently under development by our robots.</p>
  </div>
);

const ErrorAnalysis: React.FC = () => <PlaceholderFeature title="Error Analysis" />;
const OnlineExam: React.FC = () => <PlaceholderFeature title="Online Exams" />;
const MathGames: React.FC = () => <PlaceholderFeature title="Math Games" />;

const features: FeatureItem[] = [
  {
    id: AppState.MATH_SOLVER,
    title: "AI Math Solver",
    vietnameseTitle: "Giải toán bằng AI",
    description: "Instant step-by-step solutions for any math problem.",
    icon: <Calculator size={48} />,
    color: "from-blue-600 to-cyan-400",
    bgImage: "https://picsum.photos/seed/math/800/600"
  },
  {
    id: AppState.EXAMS,
    title: "Online Exams",
    vietnameseTitle: "Thi Online",
    description: "Test your skills with adaptive testing.",
    icon: <FileText size={48} />,
    color: "from-purple-600 to-pink-500",
    bgImage: "https://picsum.photos/seed/exam/800/600"
  },
  {
    id: AppState.GAMES,
    title: "Math Games",
    vietnameseTitle: "Trò chơi toán học",
    description: "Learn while playing interactive games.",
    icon: <Gamepad2 size={48} />,
    color: "from-green-500 to-emerald-400",
    bgImage: "https://picsum.photos/seed/game/800/600"
  },
  {
    id: AppState.SCIENTISTS,
    title: "Find Scientists",
    vietnameseTitle: "Tìm kiếm nhà bác học",
    description: "Explore the lives of famous mathematicians.",
    icon: <Search size={48} />,
    color: "from-orange-500 to-yellow-400",
    bgImage: "https://picsum.photos/seed/scientist/800/600"
  },
  {
    id: AppState.ERROR_ANALYSIS,
    title: "Error Analysis",
    vietnameseTitle: "Phân tích lỗi sai",
    description: "Understand where you went wrong.",
    icon: <AlertTriangle size={48} />,
    color: "from-red-600 to-rose-500",
    bgImage: "https://picsum.photos/seed/error/800/600"
  }
];

export const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState<FeatureItem | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const openFeature = (feature: FeatureItem) => {
    setActiveFeature(feature);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  // Logic to determine which items to show. 
  // We want centered active, and simplified next/prev
  const getVisibleItems = () => {
    const prev = (activeIndex - 1 + features.length) % features.length;
    const next = (activeIndex + 1) % features.length;
    return { prev, curr: activeIndex, next };
  };

  const { prev, curr, next } = getVisibleItems();

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden perspective-1000">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#050510]">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/30 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px]" />
      </div>

      {/* Feature Modal Overlay */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-[#0f0f2d] w-full max-w-5xl h-[85vh] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative"
            >
              <button 
                onClick={closeFeature}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-red-500/20 hover:text-red-500 rounded-full transition"
              >
                <X size={24} />
              </button>
              
              <div className="flex-1 p-8 overflow-hidden">
                {activeFeature.id === AppState.MATH_SOLVER && <MathSolver onClose={closeFeature} />}
                {activeFeature.id === AppState.SCIENTISTS && <ScientistFinder />}
                {activeFeature.id === AppState.EXAMS && <OnlineExam />}
                {activeFeature.id === AppState.GAMES && <MathGames />}
                {activeFeature.id === AppState.ERROR_ANALYSIS && <ErrorAnalysis />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute z-30 w-full flex justify-between px-10 md:px-20 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 hover:bg-neon-blue/20 hover:border-neon-blue transition duration-300 group"
        >
          <ChevronLeft className="text-white group-hover:text-neon-blue w-8 h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 hover:bg-neon-blue/20 hover:border-neon-blue transition duration-300 group"
        >
          <ChevronRight className="text-white group-hover:text-neon-blue w-8 h-8" />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {features.map((feature, index) => {
          let position = 'hidden';
          if (index === curr) position = 'active';
          else if (index === prev) position = 'left';
          else if (index === next) position = 'right';

          if (position === 'hidden') return null;

          return (
            <motion.div
              key={feature.id}
              className={`absolute rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl
                ${position === 'active' ? 'z-20 w-[60vw] h-[70vh]' : 'z-10 w-[20vw] h-[50vh] opacity-40 blur-[2px]'}
              `}
              initial={false}
              animate={{
                left: position === 'left' ? '5%' : position === 'right' ? '75%' : '50%',
                x: position === 'left' ? 0 : position === 'right' ? 0 : '-50%',
                scale: position === 'active' ? 1 : 0.8,
                opacity: position === 'active' ? 1 : 0.5,
                filter: position === 'active' ? 'blur(0px)' : 'blur(4px)',
              }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              onClick={() => position === 'active' && openFeature(feature)}
            >
              {/* Card Content */}
              <div className="relative w-full h-full group">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img src={feature.bgImage} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} mix-blend-multiply opacity-80`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="mb-4 inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                   >
                     {feature.icon}
                   </motion.div>
                   
                   <motion.h2 
                      className="text-4xl md:text-6xl font-display font-bold text-white mb-2"
                      layoutId={`title-${feature.id}`}
                   >
                     {feature.vietnameseTitle}
                   </motion.h2>
                   
                   <p className="text-xl text-gray-300 font-sans font-light max-w-lg">
                     {feature.description}
                   </p>

                   {position === 'active' && (
                     <motion.div 
                       className="mt-8 flex items-center gap-2 text-neon-green font-bold uppercase tracking-widest text-sm"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.5 }}
                     >
                        Click to Open <div className="w-12 h-[2px] bg-neon-green" />
                     </motion.div>
                   )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
