import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputForm = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState("A->B\nA->C\nB->D");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataArray = inputText.split('\n').map(line => line.trim()).filter(line => line);
    onSubmit(dataArray);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        Data Input
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full h-48 p-4 rounded-xl bg-slate-900/50 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none text-slate-200 font-mono text-lg"
          placeholder={"Enter relations here...\nExample:\nA->B\nA->C"}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Hierarchy'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InputForm;
