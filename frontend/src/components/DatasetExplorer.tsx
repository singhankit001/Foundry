"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Link as LinkIcon, ShieldAlert, CheckCircle2 } from "lucide-react";

export function DatasetExplorer({ apps }: { apps: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [authFilter, setAuthFilter] = useState("All");
  const [mcpFilter, setMcpFilter] = useState("All");
  const [sortField, setSortField] = useState<string>("agent_readiness_score");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(apps.map(a => a.category)))];
  const authTypes = ["All", ...Array.from(new Set(apps.map(a => a.auth)))];

  const filteredData = [...apps]
    .filter(app => app.app_name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(app => categoryFilter === "All" || app.category === categoryFilter)
    .filter(app => authFilter === "All" || app.auth === authFilter)
    .filter(app => mcpFilter === "All" || (mcpFilter === "Yes" ? app.mcp : !app.mcp))
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortAsc ? valA - valB : valB - valA;
    });

  const handleSort = (field: string) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  return (
    <section>
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Dataset Explorer</h2>
        <p className="text-gray-400">Search and filter the full intelligence database of 100 platforms. Click any row to view verified evidence.</p>
        
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search platforms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full transition-colors" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none w-full md:w-auto">
            {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>
          <select value={authFilter} onChange={(e) => setAuthFilter(e.target.value)} className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none w-full md:w-auto">
            {authTypes.map(c => <option key={c} value={c}>{c === "All" ? "All Auth Types" : c}</option>)}
          </select>
          <select value={mcpFilter} onChange={(e) => setMcpFilter(e.target.value)} className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none w-full md:w-auto">
            <option value="All">MCP: Any</option>
            <option value="Yes">MCP: Yes</option>
            <option value="No">MCP: No</option>
          </select>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar max-h-[800px]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black/40 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort("app_name")}>App Name</th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort("category")}>Category</th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort("auth")}>Auth</th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort("api_surface")}>API</th>
                <th className="px-6 py-4 font-medium text-center cursor-pointer hover:text-white" onClick={() => handleSort("confidence")}>Confidence</th>
                <th className="px-6 py-4 font-medium text-center cursor-pointer hover:text-white" onClick={() => handleSort("agent_readiness_score")}>Readiness Score</th>
                <th className="px-6 py-4 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((app, i) => (
                <React.Fragment key={app.id}>
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-white/10 transition-colors cursor-pointer ${expandedId === app.id ? 'bg-white/10' : ''}`}
                    onClick={() => toggleExpand(app.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white flex items-center gap-2">
                      {app.app_name.replace("_Mock", "")}
                      {app.mcp && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">MCP</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{app.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                        {app.auth}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">{app.api_surface}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${app.confidence >= 0.85 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {app.confidence >= 0.85 ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {(app.confidence * 100).toFixed(0)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 h-2.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${app.agent_readiness_score >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : app.agent_readiness_score >= 50 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-red-500'}`} style={{ width: `${app.agent_readiness_score}%` }} />
                        </div>
                        <span className="font-mono text-xs w-6 text-right text-gray-300">{app.agent_readiness_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {expandedId === app.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {expandedId === app.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-black/40 border-b border-white/5"
                      >
                        <td colSpan={7} className="px-6 py-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Description</h4>
                                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-3 py-1">
                                  {app.summary}
                                </p>
                              </div>
                              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Agent Findings</h4>
                              <div className="space-y-2">
                                <div className="text-sm"><span className="text-gray-500 w-24 inline-block">Self Serve:</span> <span className={app.self_serve ? "text-emerald-400" : "text-red-400"}>{app.self_serve ? "Yes" : "No"}</span></div>
                                <div className="text-sm"><span className="text-gray-500 w-24 inline-block">Blockers:</span> <span className="text-white">{app.blockers}</span></div>
                                <div className="text-sm"><span className="text-gray-500 w-24 inline-block">Buildability:</span> <span className="text-white font-medium">{app.buildability}</span></div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Verified Evidence</h4>
                              <div className="space-y-3">
                                {app.evidence?.map((ev: any, idx: number) => (
                                  <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-semibold text-indigo-400 uppercase">{ev.field}</span>
                                      <a href={ev.url} target="_blank" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                                        <LinkIcon className="w-3 h-3" /> Source
                                      </a>
                                    </div>
                                    <p className="text-xs text-gray-300 font-mono italic border-l-2 border-indigo-500/50 pl-2 py-1">"{ev.snippet}"</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import React from "react";
