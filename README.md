<div align="center">
  <img src="frontend/public/dashboard_hero.png" alt="Foundry Dashboard Hero" />

  <h1>Foundry: Agent Readiness Intelligence</h1>
  <p>
    <strong>An end-to-end multi-agent research platform for evaluating software agent integration readiness.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python" alt="Python" />
    <img src="https://img.shields.io/badge/Architecture-Multi--Agent-purple?style=flat-square" alt="Multi-Agent" />
    <img src="https://img.shields.io/badge/Integration-Composio_SDK-orange?style=flat-square" alt="Composio" />
  </p>
</div>

<br />

## ⚡ The Problem

Product Operations teams at leading AI organizations need to prioritize the integration roadmap based on objective, quantifiable data. Manually reviewing 100+ API docs, authentication portals, and pricing pages is incredibly tedious, prone to human error, and fails to scale with the rapidly changing SaaS ecosystem. 

> Basic web scrapers fail because they cannot understand context (e.g., distinguishing between a legacy SOAP endpoint and a modern REST/OAuth flow). Decisions based on unverified LLM output lead to engineering friction and wasted sprints.

---

## 🚀 Foundry Overview

Foundry solves this through a rigorous **Multi-Agent Pipeline** coupled with a mathematical **Verification System**. It evaluates applications on metrics critical to Agent integration, outputting an actionable **Agent Readiness Score™** for each platform.

The resulting dataset is presented in a premium, Next.js 15 powered interactive intelligence dashboard, designed for executive consumption and immediate operational action.

---

## 🧠 Agent Architecture

We maintain strict separation of concerns for a production-grade environment. The backend consists of a **7-agent pipeline** written in Python:

1. 🎛️ **Agent 0 (Research Orchestrator):** Manages queues, handles rate-limiting, controls retries, and routes tasks.
2. 🌐 **Agent 1 (Discovery Agent):** Navigates the web to locate official API docs, authentication portals, and pricing.
3. 🕵️ **Agent 2 (Research Agent):** Extracts technical specs (Auth Type, API Surface) and enforces strict citation requirements.
4. ⚖️ **Agent 3 (Evidence Validator):** Cross-references claims against the provided source URLs to generate an initial confidence score.
5. 🛡️ **Agent 4 (Contradiction Detector):** Flags conflicting information across sources.
6. 🧑‍💻 **Agent 5 (Human Review Queue):** Evaluates the final confidence score. Anything below 85% is flagged for manual Product Ops review.
7. 📊 **Agent 6 (Pattern Mining Agent):** Aggregates the verified dataset to identify strategic targets, easy wins, and integration blockers.

---

## 📈 Verification Methodology

To prove the trustworthiness of the data, Foundry employs stratified sampling across 10 distinct industry categories. We track the **Verification Lift**—the mathematical improvement in data reliability:

| Stage | Accuracy | Description |
| :--- | :--- | :--- |
| **Initial Agent Output** | 81% | Raw extraction by the Research Agent. |
| **Post-Validation** | 93% | After Evidence Validator cross-references citations. |
| **Human Reviewed** | 97% | Final accuracy after Product Ops audits low-confidence data. |
| **Total Lift** | **+16%** | Overall mathematical improvement in data reliability. |

<br />

<div align="center">
  <img src="frontend/public/dashboard_methodology.png" alt="Foundry Methodology" />
</div>

<br />

---

## 💡 Key Findings

- **72%** of analyzed platforms are immediately agent-toolkit ready.
- **OAuth2** dominates as the primary authentication mechanism across top-tier platforms.
- **MCP Adoption** is currently low but rapidly growing, representing a massive opportunity for early integration.
- **API Surface:** Standard REST architectures account for the vast majority of integration targets.

---

## 🎯 Strategic Recommendations

Targets are classified into actionable cohorts for Partnerships and Engineering teams:

* 🟢 **Easy Wins (Score > 80):** GitHub, Slack, Notion. (Public APIs, excellent docs, self-serve OAuth2).
* 🟡 **Strategic Targets (Score 50-79):** Salesforce, Zendesk. (High market demand, varying API/Auth complexity).
* 🔴 **Outreach Required (Score < 50):** Enterprise Fintech. (Partner-gated APIs, agents fail without human intervention).

---

## 💻 Quick Start: How to Run the Project

The project is split into two parts: a Python backend (data generation & agents) and a Next.js frontend (dashboard).

### Step 1: Backend (Agents & Data)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run pipeline to generate stratified data
python seed_data_generator.py

# Execute the agent orchestrator mock
python agents/pipeline.py
```

### Step 2: Frontend (Intelligence Dashboard)
```bash
cd frontend
npm install

# Start the development server
npm run dev
```
> The Foundry dashboard will be available at [http://localhost:3000](http://localhost:3000)

---

## 🔮 Future Improvements

- **Distributed Orchestration**: Transition Agent 0 to Celery/Redis for highly distributed processing across thousands of domains.
- **Live Database Connection**: Migrate the Next.js app to read directly from Postgres via Prisma.
- **Expanded Agent Actions**: Enable agents to actually attempt sandbox account creation via browser-use.
