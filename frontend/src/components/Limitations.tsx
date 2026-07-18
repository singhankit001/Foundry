"use client";

import { AlertOctagon } from "lucide-react";

export function Limitations({ limitations }: { limitations: any[] }) {
  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6 flex items-center gap-4">
        <AlertOctagon className="w-8 h-8 text-red-500" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Where Foundry Struggled</h2>
          <p className="text-gray-400 text-lg">
            Honest assessment of the current system limitations and agent failure modes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {limitations.map((lim, i) => (
          <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-red-500/20" />
            <h3 className="text-lg font-bold text-white mb-3">{lim.issue}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{lim.impact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
