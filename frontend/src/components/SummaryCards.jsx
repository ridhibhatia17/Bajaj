import React from 'react';
import { motion } from 'framer-motion';

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    { title: "Total Trees", value: summary.total_trees, color: "from-emerald-500 to-teal-500" },
    { title: "Total Cycles", value: summary.total_cycles, color: "from-rose-500 to-pink-500" },
    { title: "Largest Root", value: summary.largest_tree_root || "N/A", color: "from-blue-500 to-indigo-500" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {cards.map((card, idx) => (
        <motion.div 
          key={idx} 
          variants={item}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass-card p-6 flex flex-col justify-center items-center text-center overflow-hidden relative group cursor-default"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2 font-semibold z-10">{card.title}</h3>
          <p className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${card.color} z-10 drop-shadow-sm`}>
            {card.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SummaryCards;
