"use client";

import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function VerificationIntelligence({ metrics, categoryAccuracy }: { metrics: any, categoryAccuracy: any[] }) {
  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Verification Intelligence</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          How Foundry mathematically scores its own confidence and uses a human-in-the-loop audit for stratified samples to guarantee data integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-xl font-medium text-white mb-8">The Verification Lift</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Initial Accuracy</h4>
                  <span className="text-2xl font-bold text-gray-400">{metrics.initial_accuracy}%</span>
                </div>
                <p className="text-sm text-gray-500">Raw agent output.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Validated Accuracy</h4>
                  <span className="text-2xl font-bold text-indigo-400">{metrics.post_validation}%</span>
                </div>
                <p className="text-sm text-gray-400">After cross-referencing citations.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-semibold text-white">Human Reviewed</h4>
                  <span className="text-2xl font-bold text-emerald-400">{metrics.human_reviewed}%</span>
                </div>
                <p className="text-sm text-gray-400">After stratified human audit.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-white mb-8">Accuracy by Category</h3>
          <div className="space-y-4">
            {categoryAccuracy.map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-1/3">
                  <div className="text-sm font-semibold text-white">{cat.name}</div>
                </div>
                <div className="flex items-center gap-4 w-2/3">
                  <div className="flex flex-col items-end w-1/3">
                    <span className="text-xs text-gray-500 mb-1">Initial</span>
                    <span className="text-sm font-mono text-gray-400">{cat.initial}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20" />
                  <div className="flex flex-col items-start w-1/3">
                    <span className="text-xs text-emerald-500/70 mb-1">Validated</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{cat.final}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
