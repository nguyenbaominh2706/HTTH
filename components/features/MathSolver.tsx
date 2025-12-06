import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, Loader2, Calculator } from 'lucide-react';
import { solveMathProblem } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const MathSolver: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!input && !selectedImage) return;
    setLoading(true);
    setResult(null);
    
    const response = await solveMathProblem(input, selectedImage || undefined);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="p-3 bg-neon-blue/20 rounded-lg">
           <Calculator className="text-neon-blue w-6 h-6" />
        </div>
        <div>
           <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">
            AI Math Solver
          </h2>
          <p className="text-gray-400 text-sm">Upload a problem or type it below</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-4">
        {/* Output Area */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-neon-green/30 rounded-xl p-6 shadow-[0_0_30px_rgba(10,255,104,0.1)]"
          >
            <div className="prose prose-invert prose-p:text-gray-200 prose-headings:text-neon-green max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </motion.div>
        )}
        
        {loading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-10 h-10 text-neon-blue animate-spin" />
            <span className="ml-3 text-neon-blue animate-pulse">Analyzing problem...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
             <img src={selectedImage} alt="Problem" className="h-20 rounded-lg border border-neon-purple" />
             <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition"
             >
                <span className="sr-only">Remove</span>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        )}
        
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-white/10 hover:bg-neon-purple/20 text-neon-purple rounded-xl transition border border-white/5"
          >
            <Upload size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="Type your math problem here (e.g., Integrate x^2 dx)..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 font-sans text-lg"
          />
          <button 
            onClick={handleSolve}
            disabled={loading || (!input && !selectedImage)}
            className="bg-gradient-to-r from-neon-blue to-blue-600 text-black font-bold px-6 py-2 rounded-xl hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            Solve <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
