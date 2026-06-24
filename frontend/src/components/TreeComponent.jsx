import React, { useState } from 'react';

const TreeNode = ({ nodeName, childrenObj, depth = 0 }) => {
  const hasChildren = childrenObj && Object.keys(childrenObj).length > 0;
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const childKeys = hasChildren ? Object.keys(childrenObj) : [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 py-1.5 relative group">
        {/* Horizontal connector line */}
        {depth > 0 && (
          <div className="absolute -left-6 w-6 h-[1px] bg-emerald-500/30 group-hover:bg-emerald-400/60 transition-colors" />
        )}
        
        {/* Expand/Collapse Button or Leaf dot */}
        <button
          onClick={hasChildren ? toggleExpand : undefined}
          className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-300 z-10 ${
            hasChildren 
              ? 'bg-slate-800 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.15)] cursor-pointer'
              : 'bg-transparent text-slate-600 cursor-default'
          }`}
        >
          {hasChildren ? (
            <svg 
              className={`w-3.5 h-3.5 transition-transform duration-300 ease-spring ${isExpanded ? 'rotate-90' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 ring-2 ring-slate-800"></span>
          )}
        </button>

        {/* Node Label */}
        <div className={`px-3 py-1 rounded-md border text-sm font-mono tracking-wide transition-all duration-300 ${
           hasChildren 
            ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-100 shadow-sm'
            : 'bg-slate-800/40 border-slate-600/30 text-slate-300'
        }`}>
          {nodeName}
        </div>
      </div>

      {/* Children Container with smooth height animation */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {hasChildren && (
            <div className="pl-6 ml-3 relative">
              {childKeys.map((key, index) => {
                const isLast = index === childKeys.length - 1;
                return (
                  <div key={key} className="relative">
                    {/* Vertical Connector Line Segment */}
                    <div 
                      className={`absolute -left-6 top-0 w-[1px] bg-emerald-500/30 transition-colors ${
                        isLast ? 'h-5' : 'h-full'
                      }`} 
                    />
                    <TreeNode 
                      nodeName={key} 
                      childrenObj={childrenObj[key]} 
                      depth={depth + 1}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TreeComponent = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center gap-2 text-slate-500 italic">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        No tree data to display.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-[#0f172a]/80 border border-slate-700/50 overflow-x-auto shadow-inner">
      {Object.keys(data).map((rootKey, index) => (
        <div key={rootKey} className={index > 0 ? "mt-6" : ""}>
           <TreeNode 
             nodeName={rootKey} 
             childrenObj={data[rootKey]} 
             depth={0} 
           />
        </div>
      ))}
    </div>
  );
};

export default TreeComponent;
