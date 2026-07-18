import { Hero } from "@/components/Hero";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { StrategicRecommendations } from "@/components/StrategicRecommendations";
import { OperationalImpact } from "@/components/OperationalImpact";
import { VerificationIntelligence } from "@/components/VerificationIntelligence";
import { AgentWalkthrough } from "@/components/AgentWalkthrough";
import { Methodology } from "@/components/Methodology";
import { DatasetExplorer } from "@/components/DatasetExplorer";
import { Limitations } from "@/components/Limitations";
import data from "@/lib/data.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero metrics={data.global_metrics} />
      <div className="container mx-auto px-6 py-24 space-y-20">
        <ExecutiveSummary apps={data.apps} />
        <StrategicRecommendations insights={data.insights} />
        <OperationalImpact metrics={data.global_metrics} />
        <VerificationIntelligence metrics={data.global_metrics} categoryAccuracy={data.accuracy_by_category} />
        <AgentWalkthrough walkthrough={data.agent_walkthrough} />
        <Methodology metrics={data.global_metrics} />
        <DatasetExplorer apps={data.apps} />
        <Limitations limitations={data.limitations} />
      </div>
    </main>
  );
}
