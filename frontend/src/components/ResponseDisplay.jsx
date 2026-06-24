import React from 'react';
import TreeComponent from './TreeComponent';

const ResponseDisplay = ({ response }) => {
  if (!response) return null;

  return (
    <div className="flex flex-col gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {/* Invalid Entries & Duplicates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-rose-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>
            Invalid Entries
          </h3>
          {response.invalid_entries?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {response.invalid_entries.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm font-mono shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No invalid entries found.
            </p>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-amber-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            Duplicate Edges
          </h3>
          {response.duplicate_edges?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {response.duplicate_edges.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-sm font-mono shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No duplicates detected.
            </p>
          )}
        </div>
      </div>

      {/* Hierarchy Trees Output */}
      <div className="glass-card p-6 overflow-hidden">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          Hierarchy Trees
        </h3>
        
        {response.hierarchies?.has_cycle && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 shadow-sm">
             <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <div>
               <h4 className="font-semibold text-rose-300">Cycle Detected!</h4>
               <p className="text-rose-400/80 text-sm">The graph contains a cycle. Valid tree depth calculation is omitted.</p>
             </div>
          </div>
        )}

        <TreeComponent data={response.hierarchies?.tree} />

      </div>
    </div>
  );
};

export default ResponseDisplay;
