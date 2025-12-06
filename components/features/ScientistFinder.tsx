import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { findScientistInfo } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const ScientistFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await findScientistInfo(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="p-3 bg-neon-purple/20 rounded-lg">
           <Search className="text-neon-purple w-6 h-6" />
        </div>
        <div>
           <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500">
            Scientist Finder
          </h2>
          <p className="text-gray-400 text-sm">Discover the minds that changed the world</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter name (e.g. Einstein) or field (e.g. Quantum Physics)..."
          className="flex-1 bg-white/5 border border-neon-purple/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="bg-neon-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-neon-purple/80 transition flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin"/> : <Sparkles size={20} />}
          Find
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-black/20 rounded-2xl p-6 border border-white/5">
        {loading ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Loader2 className="w-12 h-12 text-neon-purple animate-spin mb-4" />
                <p>Searching the archives of history...</p>
             </div>
        ) : result ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="prose prose-invert prose-headings:text-neon-purple"
          >
            <ReactMarkdown>{result}</ReactMarkdown>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
            <Search size={64} className="mb-4" />
            <p className="text-xl">Waiting for your query...</p>
          </div>
        )}
      </div>
    </div>
  );
};
