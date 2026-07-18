"use client";

import { motion } from "framer-motion";

export function Hero({ metrics }: { metrics: any }) {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-40 pb-20 border-b border-white/10">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-semibold tracking-wide border border-indigo-500/20 mb-8">
            Foundry Research Intelligence
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">72%</span> of analyzed platforms are<br className="hidden md:block" />
            immediately agent-toolkit ready.
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Foundry evaluated 100 software platforms across authentication, API accessibility, MCP support, and buildability to identify the fastest integration opportunities for AI agents.
          </p>
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-2xl shadow-indigo-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: "Apps Analyzed", value: metrics.apps_analyzed },
            { label: "Sources Verified", value: metrics.sources_verified },
            { label: "Verification Accuracy", value: `${metrics.human_reviewed}%` },
            { label: "Research Hours Saved", value: metrics.estimated_hours_saved },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md hover:bg-white/5 transition-colors duration-300">
              <span className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
