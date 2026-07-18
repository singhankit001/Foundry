"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { ShieldCheck, Zap, Server, Activity } from "lucide-react";

export function ExecutiveSummary({ apps }: { apps: any[] }) {
  const mcpCount = apps.filter((app) => app.mcp).length;
  const selfServeCount = apps.filter((app) => app.self_serve).length;
  
  const authCounts = apps.reduce((acc, app) => {
    acc[app.auth] = (acc[app.auth] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const authChartData = Object.entries(authCounts).map(([name, value]) => ({ name, value: value as number })).sort((a, b) => b.value - a.value);

  const apiCounts = apps.reduce((acc, app) => {
    acc[app.api_surface] = (acc[app.api_surface] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const apiChartData = Object.entries(apiCounts).map(([name, value]) => ({ name, value: value as number })).sort((a, b) => b.value - a.value);

  return (
    <section>
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Executive Summary</h2>
        <p className="text-gray-400 max-w-4xl text-lg">
          The Foundry Research Pipeline autonomously ingested documentation across 100 top software platforms. Our analysis reveals that while modern authentication (OAuth2) is highly prevalent, actual Agent Readiness—measured by semantic APIs and self-serve sandboxes—remains a significant bottleneck for AI integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <SummaryCard 
          title="OAuth2 Dominance" 
          value={`${((authCounts["OAuth2"] || 0) / apps.length * 100).toFixed(0)}%`}
          subtitle="use OAuth2 for auth"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
        />
        <SummaryCard 
          title="REST Architecture" 
          value={`${((apiCounts["REST"] || 0) / apps.length * 100).toFixed(0)}%`}
          subtitle="rely on standard REST APIs"
          icon={<Server className="w-5 h-5 text-blue-400" />}
        />
        <SummaryCard 
          title="Self-Serve Access" 
          value={`${selfServeCount}%`}
          subtitle="allow instant developer access"
          icon={<Activity className="w-5 h-5 text-purple-400" />}
        />
        <SummaryCard 
          title="MCP Readiness" 
          value={`${mcpCount}%`}
          subtitle="natively expose MCP endpoints"
          icon={<Zap className="w-5 h-5 text-amber-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-8">Authentication Mechanisms</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authChartData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {authChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#818cf8" : "#4f46e5"} opacity={1 - index * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-8">API Surface Types</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiChartData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {apiChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#38bdf8" : "#0284c7"} opacity={1 - index * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">{icon}</div>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}
