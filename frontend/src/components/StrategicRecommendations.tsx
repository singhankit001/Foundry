"use client";

import { Zap, Target, Lock } from "lucide-react";

export function StrategicRecommendations({ insights }: { insights: any[] }) {
  
  const getIcon = (category: string) => {
    switch (category) {
      case "Quick Wins": return <div className="p-3 bg-emerald-500/20 rounded-xl"><Zap className="w-6 h-6 text-emerald-400" /></div>;
      case "Medium Complexity": return <div className="p-3 bg-amber-500/20 rounded-xl"><Target className="w-6 h-6 text-amber-400" /></div>;
      case "Strategic Outreach": return <div className="p-3 bg-red-500/20 rounded-xl"><Lock className="w-6 h-6 text-red-400" /></div>;
      default: return null;
    }
  };

  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Strategic Recommendations</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          Based on the Agent Readiness Scores, we have categorized the targets to help the engineering and partnerships teams prioritize the next integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, i) => {
          let data;
          try {
            data = JSON.parse(insight.reason);
          } catch (e) {
            data = { matter: insight.reason, impact: "", action: "", evidence: "" };
          }
          
          return (
            <div key={i} className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                {getIcon(insight.category)}
                <h3 className="text-lg font-bold text-white">{insight.category}</h3>
              </div>
              
              <div className="mb-4 pb-4 border-b border-white/5">
                <p className="text-sm font-semibold text-indigo-300 mb-2">Targets</p>
                <p className="text-white font-medium">{insight.title}</p>
              </div>

              <div className="flex-grow space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">Why it matters</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{data.matter}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">Expected Impact</p>
                  <p className="text-sm text-emerald-400 leading-relaxed font-medium">{data.impact}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">Supporting Evidence</p>
                  <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-indigo-500/50 pl-2 italic">"{data.evidence}"</p>
                </div>
              </div>

              <div className="mt-auto pt-4 bg-indigo-500/10 -mx-6 px-6 -mb-6 pb-6 rounded-b-2xl border-t border-indigo-500/20">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Suggested Next Action</p>
                <p className="text-sm text-indigo-100/90 leading-relaxed font-medium">{data.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
