import React from 'react';
import { Atom } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Atom className="text-neon-blue w-8 h-8 animate-spin-slow" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-2xl tracking-wider text-white">
            M<span className="text-neon-purple">λ</span>th Bo<span className="text-neon-blue">t</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Future Learning</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest font-semibold text-gray-300">
        <a href="#" className="hover:text-neon-blue transition relative group">
          HOMIN
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-blue transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="hover:text-neon-purple transition relative group">
          WIKIBET
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-purple transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="hover:text-neon-green transition relative group">
          FORCOUST
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-green transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="hover:text-neon-blue transition relative group">
          CNSBOLAT
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-blue transition-all group-hover:w-full"></span>
        </a>
      </div>

      <button className="bg-neon-green/90 hover:bg-neon-green text-black font-bold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(10,255,104,0.4)] hover:shadow-[0_0_25px_rgba(10,255,104,0.6)] transition-all transform hover:scale-105">
        Cheave
      </button>
    </nav>
  );
};
