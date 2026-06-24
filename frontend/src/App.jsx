import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import SummaryCards from './components/SummaryCards';
import ResponseDisplay from './components/ResponseDisplay';
import { analyzeHierarchy } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const handleAnalyze = async (dataArray) => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const result = await analyzeHierarchy(dataArray);
      setApiResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-blue-500/30 overflow-x-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
           className="inline-block mb-4 p-2 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md"
        >
           <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
           </svg>
        </motion.div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4 tracking-tight drop-shadow-sm">
          Hierarchy Analyzer
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Input your relational edges to generate a comprehensive hierarchy breakdown. Automatically detects cycles, validates entries, and filters duplicates.
        </p>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            className="glass-card mb-8 p-5 bg-rose-500/10 border-rose-500/30 text-rose-300 flex items-center gap-4 shadow-[0_0_30px_rgba(225,29,72,0.1)] overflow-hidden"
          >
            <div className="p-2 bg-rose-500/20 rounded-full flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium tracking-wide">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {apiResponse && <SummaryCards summary={apiResponse.summary} />}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4"
        >
          <InputForm onSubmit={handleAnalyze} isLoading={loading} />
        </motion.div>
        
        <div className="lg:col-span-8 h-full">
          <AnimatePresence mode="wait">
             {apiResponse ? (
               <ResponseDisplay key="results" response={apiResponse} />
             ) : (
               <motion.div 
                 key="placeholder"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.3 }}
                 className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-slate-500"
               >
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="p-6 rounded-full bg-slate-800/50 mb-6 shadow-inner"
                 >
                   <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                 </motion.div>
                 <p className="text-xl font-medium text-slate-400">Waiting for Data</p>
                 <p className="text-sm mt-2">Submit relational edges on the left to see the analysis results here.</p>
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
