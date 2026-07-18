"use client";

import { motion } from "framer-motion";
import { CheckCircle, Search, Target, Scale, Database, UserCheck, BarChart4, ShieldAlert } from "lucide-react";

export function Methodology({ metrics }: { metrics: any }) {
  const agents = [
    { name: "Research Orchestrator", desc: "Queue management, rate-limiting, and error recovery across targets.", icon: <Database className="w-5 h-5 text-indigo-400" /> },
    { name: "Discovery Agent", desc: "Crawls the web to locate official API docs, auth portals, and pricing.", icon: <Search className="w-5 h-5 text-indigo-400" /> },
    { name: "Research Agent", desc: "Extracts technical specs and surfaces exact source URLs as evidence.", icon: <Target className="w-5 h-5 text-indigo-400" /> },
    { name: "Evidence Validator", desc: "Cross-references claims against docs. Calculates initial confidence.", icon: <Scale className="w-5 h-5 text-indigo-400" /> },
    { name: "Human Review Queue", desc: "Routes low-confidence data (<85%) to Product Ops for manual audit.", icon: <UserCheck className="w-5 h-5 text-indigo-400" /> },
    { name: "Pattern Mining Agent", desc: "Aggregates 100 apps to generate strategic findings and integration targets.", icon: <BarChart4 className="w-5 h-5 text-indigo-400" /> },
  ];

  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Research Methodology & Verification</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          We designed a highly rigorous, multi-agent evaluation pipeline that doesn't just extract data, but mathematically scores its own confidence and forces a human-in-the-loop audit for stratified samples.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Verification Lift Funnel */}
        <div>
          <h3 className="text-xl font-medium text-white mb-6">The Verification Lift</h3>
          <p className="text-gray-400 text-sm mb-8">
            How multi-pass validation and stratified sampling significantly improved data reliability over raw LLM outputs.
          </p>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Initial Agent Accuracy</h4>
                  <span className="text-2xl font-bold text-gray-400">{metrics.initial_accuracy}%</span>
                </div>
                <p className="text-sm text-gray-500">Raw output from the Research Agent.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 shadow">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Post Validation</h4>
                  <span className="text-2xl font-bold text-indigo-400">{metrics.post_validation}%</span>
                </div>
                <p className="text-sm text-gray-400">After the Evidence Validator cross-referenced citations.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Human Reviewed</h4>
                  <span className="text-2xl font-bold text-emerald-400">{metrics.human_reviewed}%</span>
                </div>
                <p className="text-sm text-gray-400">After Product Ops audited a stratified sample of 20 apps.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Agent Architecture */}
        <div>
          <h3 className="text-xl font-medium text-white mb-6">Multi-Agent System Architecture</h3>
          <p className="text-gray-400 text-sm mb-8">
            The pipeline operates autonomously, orchestrated by a central controller that handles rate-limiting and queues.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map((agent, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-black rounded-lg border border-white/5">{agent.icon}</div>
                  <h4 className="font-medium text-white text-sm">{agent.name}</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
        <div>
          <h4 className="text-white font-semibold mb-2">Note on Dataset Simulation</h4>
          <p className="text-sm text-indigo-200/70 leading-relaxed">
            To demonstrate this platform's capabilities without incurring significant live LLM API and Browser-Use execution costs for 100+ platforms, the data presented in this dashboard was generated using a highly realistic Python simulation script based on real-world edge cases. The Python multi-agent pipeline contains the actual orchestration logic ready to be hooked into production keys.
          </p>
        </div>
      </div>
    </section>
  );
}
