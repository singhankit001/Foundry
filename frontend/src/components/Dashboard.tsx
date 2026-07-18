"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export function Dashboard({ data }: { data: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((app) =>
    app.app_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Aggregate Data for Charts
  const authCounts = data.reduce((acc, app) => {
    acc[app.auth] = (acc[app.auth] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const authChartData = Object.entries(authCounts).map(([name, value]) => ({ name, value: value as number })).sort((a, b) => b.value - a.value);

  const mcpCount = data.filter((app) => app.mcp).length;
  const selfServeCount = data.filter((app) => app.self_serve).length;
  const highBuildabilityCount = data.filter((app) => app.buildability === "High").length;

  return (
    <div className="space-y-12">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="OAuth2 Dominance" 
          value={`${((authCounts["OAuth2"] || 0) / data.length * 100).toFixed(0)}%`}
          subtitle="of analyzed platforms use OAuth2"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
        />
        <SummaryCard 
          title="MCP Readiness" 
          value={`${mcpCount}%`}
          subtitle="platforms expose MCP or semantic APIs"
          icon={<Zap className="w-5 h-5 text-amber-400" />}
        />
        <SummaryCard 
          title="Self-Serve Access" 
          value={`${selfServeCount}%`}
          subtitle="platforms allow instant developer access"
          icon={<CheckCircle2 className="w-5 h-5 text-blue-400" />}
        />
        <SummaryCard 
          title="Composio Target" 
          value={`${highBuildabilityCount}`}
          subtitle="apps flagged as immediate 'High Buildability' wins"
          icon={<AlertTriangle className="w-5 h-5 text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-6">Authentication Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authChartData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {authChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#6366f1" : "#4f46e5"} opacity={1 - index * 0.15} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-4">Composio Prioritization (Top 5)</h3>
            <div className="space-y-4">
              {data.filter(a => a.buildability === "High").slice(0, 5).map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div>
                    <div className="text-sm font-medium text-white">{app.app_name}</div>
                    <div className="text-xs text-gray-400">{app.category} • {app.auth}</div>
                  </div>
                  <div className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    Quick Win
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col h-[800px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Interactive Research Dataset</h3>
            <input 
              type="text" 
              placeholder="Search apps..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-64 transition-colors"
            />
          </div>
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-white/5 sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl-lg">App Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Auth</th>
                  <th className="px-4 py-3 font-medium">API</th>
                  <th className="px-4 py-3 font-medium text-center">Confidence</th>
                  <th className="px-4 py-3 font-medium rounded-tr-lg">Buildability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((app) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={app.id} 
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-white">
                      {app.app_name}
                      {app.mcp && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">MCP</span>}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs">
                        {app.auth}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs">{app.api_surface}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={app.confidence > 0.85 ? "text-emerald-400" : "text-amber-400"}>
                          {(app.confidence * 100).toFixed(0)}%
                        </span>
                        {app.confidence < 0.85 && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        app.buildability === 'High' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        app.buildability === 'Medium' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {app.buildability}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </motion.div>
  );
}
