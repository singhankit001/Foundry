"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function AgentWalkthrough({ walkthrough }: { walkthrough: any }) {
  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Agent Walkthrough</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          Anatomy of a single agent execution. Here is how the orchestrator handled the evaluation for {walkthrough.app_name}.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <FaGithub className="w-10 h-10 text-white" />
          <div>
            <h3 className="text-2xl font-bold text-white">{walkthrough.app_name}</h3>
            <div className="text-sm text-emerald-400 font-medium tracking-wider uppercase">Case Study</div>
          </div>
        </div>

        <div className="space-y-6">
          {walkthrough.steps.map((step: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-indigo-300">{index + 1}</span>
                </div>
                {index < walkthrough.steps.length - 1 && (
                  <div className="w-px h-full bg-white/10 my-2" />
                )}
              </div>
              <div className="pb-6">
                <h4 className="text-white font-semibold mb-1">{step.agent}</h4>
                <div className="text-gray-400 text-sm bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                  <span className="font-mono text-xs text-indigo-400 mr-2">{'>'}</span>
                  {step.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
