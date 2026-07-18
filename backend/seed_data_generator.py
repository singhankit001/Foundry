import uuid
import random
import json
import os
from database import get_session, App, Evidence, VerificationRun, Insight, AgentRun

CATEGORIES = ['CRM', 'Helpdesk', 'Communication', 'Marketing', 'Ecommerce', 'Data', 'Developer', 'Productivity', 'Finance', 'AI']
AUTH_TYPES = ['OAuth2', 'API Key', 'Basic Auth', 'None', 'Hybrid']
API_TYPES = ['REST', 'GraphQL', 'gRPC', 'Webhooks only']

def calculate_readiness_score(app):
    score = 0
    if app.api_surface in ['REST', 'GraphQL']: score += 30
    elif app.api_surface == 'gRPC': score += 20
    else: score += 10
        
    if app.auth == 'OAuth2': score += 25
    elif app.auth == 'API Key': score += 20
    elif app.auth == 'Hybrid': score += 15
        
    if app.self_serve: score += 20
    if app.mcp: score += 15
        
    if 'None' in app.blockers: score += 10
    elif 'Gated' not in app.blockers: score += 5
        
    return score

def generate_mock_data(num_apps=100):
    session = get_session()
    
    apps = []
    for cat in CATEGORIES:
        for i in range(10):
            app_id = str(uuid.uuid4())
            app_name = f"{cat}App_{i+1}"
            summary = f"Enterprise {cat.lower()} solution with extensive third-party integration capabilities."
            
            if cat == 'Developer' and i == 0: 
                app_name = "GitHub"
                summary = "The leading developer platform for version control and CI/CD."
            if cat == 'Communication' and i == 0: 
                app_name = "Slack"
                summary = "Channel-based messaging platform for enterprise collaboration."
            if cat == 'Finance' and i == 0: 
                app_name = "Stripe"
                summary = "Financial infrastructure platform for the internet."
            if cat == 'Finance' and i == 1: 
                app_name = "PitchBook"
                summary = "Financial data provider covering global venture capital and private equity."
            if cat == 'CRM' and i == 0: 
                app_name = "Salesforce"
                summary = "The world's #1 customer relationship management (CRM) platform."
            if cat == 'Helpdesk' and i == 0: 
                app_name = "Zendesk"
                summary = "Customer service software and support ticketing system."
            if cat == 'Marketing' and i == 0: 
                app_name = "HubSpot"
                summary = "Inbound marketing, sales, and service software."
            if cat == 'Finance' and i == 2: 
                app_name = "DealCloud"
                summary = "Deal management and CRM for financial services."
            if cat == 'Productivity' and i == 0: 
                app_name = "Notion"
                summary = "Connected workspace for wiki, docs, and projects."
            if cat == 'Productivity' and i == 1: 
                app_name = "Linear"
                summary = "Purpose-built tool for planning and building products."
            if cat == 'Data' and i == 0: 
                app_name = "Airtable"
                summary = "Low-code platform for building collaborative apps."
            
            auth = random.choice(AUTH_TYPES)
            self_serve = random.choice([True, True, True, False])
            mcp = random.choice([True, False, False, False])
            api_surface = random.choice(API_TYPES)
            
            blockers = random.choice(['None (Docs are perfect)', 'Gated Docs (Requires Login)', 'Enterprise Only API', 'Complex OAuth Flow'])
            
            # Match the prompt's examples
            if "Stripe" in app_name or "GitHub" in app_name or "Slack" in app_name or "Notion" in app_name or "Linear" in app_name or "Airtable" in app_name:
                auth = "OAuth2"
                self_serve = True
                api_surface = "REST"
                blockers = "None (Docs are perfect)"
            elif "PitchBook" in app_name or "DealCloud" in app_name:
                auth = "Basic Auth"
                self_serve = False
                blockers = "Partner gated"
            elif "Salesforce" in app_name or "Zendesk" in app_name or "HubSpot" in app_name:
                auth = "OAuth2"
                self_serve = True
                api_surface = "REST"
                blockers = "Complex OAuth Flow"
            
            app = App(
                id=app_id, app_name=app_name, category=cat, summary=summary,
                auth=auth, self_serve=self_serve, api_surface=api_surface, mcp=mcp, blockers=blockers,
            )
            app.agent_readiness_score = calculate_readiness_score(app)
            
            if app.agent_readiness_score >= 80: app.buildability = "High"
            elif app.agent_readiness_score >= 50: app.buildability = "Medium"
            else: app.buildability = "Low"
                
            app.confidence = round(random.uniform(0.70, 0.99), 2)
            session.add(app)
            apps.append(app)
            
            for field in ['auth', 'api_surface', 'mcp']:
                session.add(Evidence(
                    id=str(uuid.uuid4()), app_id=app_id, field=field,
                    source_url=f"https://developer.{app_name.lower().replace(' ', '')}.com/docs",
                    snippet=f"Supports {getattr(app, field)}"
                ))

    # Stratified Sampling Verifications
    sampled_apps = []
    for cat in CATEGORIES:
        cat_apps = [a for a in apps if a.category == cat]
        sampled_apps.extend(random.sample(cat_apps, 2))
        
    for app in sampled_apps:
        session.add(VerificationRun(
            id=str(uuid.uuid4()), app_id=app.id,
            initial_confidence=random.uniform(0.75, 0.85),
            validated_confidence=random.uniform(0.88, 0.95),
            human_reviewed=True, issues_found=random.randint(0, 3), fixes_made=random.randint(0, 3)
        ))

    insights = [
        Insight(id=str(uuid.uuid4()), category="Quick Wins", title="GitHub, Slack, Notion, Linear, Airtable", reason=json.dumps({"matter": "These platforms command massive market share and require near-zero operational overhead due to excellent docs.", "impact": "Immediate, high-reliability integrations for end users.", "action": "Assign Engineering Pod A to integrate these apps in the current sprint.", "evidence": "100% OAuth2 availability, 98% Readiness Score average."})),
        Insight(id=str(uuid.uuid4()), category="Medium Complexity", title="Salesforce, Zendesk, HubSpot", reason=json.dumps({"matter": "These represent mission-critical enterprise workflows, but their API surfaces are extremely broad and sometimes rate-limited.", "impact": "High customer demand fulfillment, but requires ongoing maintenance.", "action": "Allocate Q3 resources for scoping custom webhook handlers.", "evidence": "Readiness scores avg 75, blocked by complex auth flows."})),
        Insight(id=str(uuid.uuid4()), category="Strategic Outreach", title="PitchBook, DealCloud, FinTech Tools", reason=json.dumps({"matter": "APIs are entirely partner-gated, meaning agents cannot independently build against them.", "impact": "Blocks autonomous integration until business agreements are signed.", "action": "Hand off to Partnerships Team to negotiate API access agreements.", "evidence": "100% failure rate in autonomous sandbox account creation."}))
    ]
    for i in insights: session.add(i)
    
    session.commit()
    export_json(session)
    
def export_json(session):
    apps = session.query(App).all()
    out_apps = []
    for a in apps:
        evs = session.query(Evidence).filter_by(app_id=a.id).all()
        evidence_list = [{"field": e.field, "url": e.source_url, "snippet": e.snippet} for e in evs]
        out_apps.append({
            "id": a.id, "app_name": a.app_name, "category": a.category, "summary": a.summary, "auth": a.auth,
            "self_serve": a.self_serve, "api_surface": a.api_surface, "mcp": a.mcp,
            "buildability": a.buildability, "agent_readiness_score": a.agent_readiness_score,
            "confidence": a.confidence, "blockers": a.blockers, "evidence": evidence_list
        })
        
    data = {
        "apps": out_apps,
        "insights": [{"category": i.category, "title": i.title, "reason": i.reason} for i in session.query(Insight).all()],
        "global_metrics": {
            "initial_accuracy": 81,
            "post_validation": 93,
            "human_reviewed": 97,
            "intervention_rate": 11,
            "verification_lift": 16,
            "apps_analyzed": 100,
            "sources_verified": 342,
            "human_reviews_required": 11,
            "estimated_hours_saved": 240
        },
        "accuracy_by_category": [
            {"name": "CRM", "initial": 75, "final": 96},
            {"name": "Support", "initial": 82, "final": 98},
            {"name": "Ecommerce", "initial": 80, "final": 95},
            {"name": "Finance", "initial": 65, "final": 94},
            {"name": "AI Tools", "initial": 88, "final": 99},
        ],
        "limitations": [
            {"issue": "Enterprise-gated APIs", "impact": "Agents are completely blocked without human sales calls or partner agreements."},
            {"issue": "Missing Documentation", "impact": "Agents hallucinate endpoints when OpenAPI specs are absent, driving false positives."},
            {"issue": "Ambiguous Auth Methods", "impact": "Legacy systems mixing API keys and basic auth caused 30% of initial validation errors."},
            {"issue": "Inconsistent Portals", "impact": "Discovery agents failed on 8% of sites due to nested IFrames in developer portals."},
            {"issue": "MCP Discovery", "impact": "Because MCP is relatively new, many platforms have community servers that agents cannot definitively verify via official docs."},
            {"issue": "Human Review Bottlenecks", "impact": "While the intervention rate is only 11%, evaluating complex SOAP endpoints manually still requires senior engineering time."}
        ],
        "agent_walkthrough": {
            "app_name": "GitHub",
            "steps": [
                {"agent": "Discovery Agent", "action": "Found developer.github.com, docs.github.com, api.github.com"},
                {"agent": "Research Agent", "action": "Extracted REST & GraphQL availability, OAuth App flows"},
                {"agent": "Validator", "action": "Cross-referenced endpoints against live schema (Confidence: 98%)"},
                {"agent": "Contradiction Detector", "action": "Resolved PAT vs OAuth discrepancy in legacy docs"},
                {"agent": "Scoring", "action": "Calculated Readiness Score: 98/100"},
                {"agent": "Final Verdict", "action": "Immediately Integratable"}
            ]
        }
    }
    
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(data_dir, exist_ok=True)
    with open(os.path.join(data_dir, 'foundry_export.json'), 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_mock_data()
