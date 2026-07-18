"use client";

import { Activity, Clock, Database, UserCheck } from "lucide-react";

export function OperationalImpact({ metrics }: { metrics: any }) {
  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Operational Impact</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          The Foundry system functions as a scalable Product Operations engine, dramatically reducing the manual research burden while enforcing a strict quality bar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Apps Analyzed" value={metrics.apps_analyzed} icon={<Database />} />
        <MetricCard title="Sources Processed" value={metrics.sources_verified} icon={<Activity />} />
        <MetricCard title="Human Intervention Rate" value={`${metrics.intervention_rate}%`} icon={<UserCheck />} />
        <MetricCard title="Research Hours Saved" value={`${metrics.estimated_hours_saved}h`} icon={<Clock />} />
      </div>
    </section>
  );
}

function MetricCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</h4>
        <div className="text-4xl font-bold text-white">{value}</div>
      </div>
      <div className="p-4 bg-white/5 rounded-xl text-gray-400">
        {icon}
      </div>
    </div>
  );
}
