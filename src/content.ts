/* ============================================================
   content.ts  ::  single source of truth for thebharath.co
   Rules: no em dashes, no invented metrics, NLP-only for
   Compsoft, Artie Labs PRs are opened (never merged),
   MCP Trust Scanner is roadmap (not shipped).
   Ported verbatim from the previous site's content.js.
   ============================================================ */

export type Category =
  | "Agents"
  | "Evals and Observability"
  | "RAG"
  | "Governance and Trust"
  | "Integration"
  | "ML and Research";

export interface Project {
  slug: string;
  name: string;
  desc: string;
  stack: string[];
  tags: Category[];
  repo: string;
  featured?: boolean;
  flagship?: boolean;
  roadmap?: boolean;
  inDev?: boolean;
  badgeLabel?: string;
  facts?: string[];
  perf?: string;
  pypi?: string;
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface ErrorBar {
  claim: string;
  figure: string;
  caveat: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Cert {
  badge: string;
  title: string;
  issuer: string;
  date: string;
}

export interface Publication {
  venue: string;
  meta: string;
  title: string;
  figure: string;
}

export interface Education {
  school: string;
  degree: string;
  detail: string;
}

export interface WritingItem {
  kind: string;
  title: string;
  handle: string;
  desc: string;
  href: string;
}

export const PROFILE = {
  name: "Bharath Kumar Rajesh",
  title: "AI Engineer",
  city: "New York City",
  coords: "40.7128 N, 74.0060 W",
  relocation: ["Bay Area", "Dallas", "Orlando", "Seattle"],
  headline: "AI Engineer building reliable agentic systems.",
  thesis:
    "I build the triage, eval, and governance tooling that makes agents trustworthy in production.",
  quickFacts: ["MS CS, Pace Seidenberg", "GPA 3.87", "New York City", "Open to relocation"],
  roles: ["AI Engineer", "Forward Deployed Engineer", "Software Engineer"],
  sponsorship:
    "On F-1 OPT. Will require H-1B sponsorship in the future.",
  links: {
    github: "https://github.com/thebharathkumar",
    linkedin: "https://linkedin.com/in/thebharathkumar",
    medium: "https://medium.com/@thebharathkumar",
    twitter: "https://twitter.com/passdweed",
    portfolio: "https://thebharath.co",
    email: "bharath.kr702@gmail.com",
    resume: "/resume.pdf",
  },
};

/* ---- SKILLS (categorical, no numeric claims) ---- */
export const SKILLS: SkillGroup[] = [
  { group: "Agentic", items: ["LangGraph", "LangChain", "MCP", "Multi-agent orchestration", "Tool-calling", "Prompt versioning"] },
  { group: "Models", items: ["Claude on Amazon Bedrock", "OpenAI API", "Prompt engineering", "OpenRouter", "LiteLLM", "Fireworks", "Streaming and SSE"] },
  { group: "RAG", items: ["Retrieval pipelines", "Grounded generation", "Span-level citations", "Verifier loops"] },
  { group: "Evals and Observability", items: ["OpenTelemetry", "OpenTelemetry GenAI semconv", "OTLP", "Grafana", "Prometheus", "Eval harnesses", "LLM-as-judge", "Mutation testing", "pytest", "Vitest", "Playwright", "Drift and cost monitoring"] },
  { group: "Backend", items: ["Python", "FastAPI", "Go", "Node.js", "Java / Spring Boot", "Fastify", "Prisma", "BullMQ", "Zod", "gRPC", "GraphQL"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind", "Vite", "TanStack Query"] },
  { group: "Cloud and Infra", items: ["AWS (Bedrock, EC2, S3, Lambda, SageMaker)", "AWS CDK", "ECS", "Azure", "GCP", "Docker", "Docker Compose", "Kubernetes", "Terraform", "GitHub Actions"] },
  { group: "Data", items: ["Postgres", "Redis", "DuckDB", "SQLite"] },
];

/* ---- EXPERIENCE ---- */
export const EXPERIENCE: Experience[] = [
  {
    role: "Applied AI Engineer (Graduate Assistant appointment)",
    org: "Pace University, Seidenberg School",
    period: "Mar 2025 to May 2026",
    points: [
      "Built and ran a production multi-agent platform on LangGraph and Claude (Amazon Bedrock) serving 10,000+ daily users at 99.5% uptime across 12 zero-regression releases.",
      "Built the evaluation pipeline the platform shipped against: 200+ automated grader tests per release scoring per-prompt quality in CI, which caught 4 silent prompt-template regressions before they reached production.",
      "Unified 50,000+ documents into one retrieval pipeline reaching 92% MRR@5 and cutting retrieval latency 60%.",
      "Bridged live systems of record through MCP servers, handling malformed upstream responses, silent tool-call drift, and auth expiry mid-session.",
      "Instrumented the platform with OpenTelemetry and Grafana for latency, token throughput, and quality drift.",
    ],
    stack: ["Python", "LangGraph", "Bedrock", "MCP", "FastAPI", "TypeScript", "React", "Postgres", "OpenTelemetry", "Grafana", "AWS", "Azure"],
  },
  {
    role: "Software Development Intern",
    org: "Let's Be The Change",
    period: "Sep 2023 to May 2024",
    points: [
      "Cut API P99 latency 80%, from 2,000ms to 400ms, by re-architecting query patterns and introducing a Redis cache layer.",
      "Integrated Stripe, SendGrid and Twilio end to end behind Java and Spring Boot APIs and webhooks, with zero post-launch incidents across 1,000+ users.",
      "Shipped an A/B test on recommendation logic in under 3 weeks, producing a 20% retention lift and a 35% reduction in onboarding abandonment.",
    ],
    stack: ["Java", "Spring Boot", "React", "Redis", "Stripe", "SendGrid", "Twilio"],
  },
  {
    role: "ML Research Intern",
    org: "Compsoft Technologies",
    period: "Aug 2023 to Sep 2023",
    points: [
      "Built a sentiment analysis system using NLP, reaching 90% accuracy.",
      "Deployed it as a Flask service on AWS.",
    ],
    stack: ["Python", "NLP", "scikit-learn", "Flask", "AWS"],
  },
  {
    role: "Data Science Intern",
    org: "Pantech E-Learning",
    period: "Jun 2023 to Jul 2023",
    points: [
      "Built data analysis and visualization workflows on customer behavior datasets.",
    ],
    stack: ["Python", "Pandas", "NumPy", "SQL"],
  },
  {
    role: "Software Engineer Intern",
    org: "Alltramatic",
    period: "Dec 2022 to Feb 2023",
    points: [
      "Developed backend REST services and database queries for an e-commerce platform.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "REST"],
  },
  {
    role: "Open Source Contributor",
    org: "Layer5 / Meshery, faramesh-core, Artie Labs",
    period: "2023 to Present",
    points: [
      "Layer5 / Meshery (CNCF): 800+ lines of Go and Python across five merged pull requests.",
      "faramesh-core: 9 pull requests, including merged PR #33 (delegation token policy).",
      "Artie Labs (YC-backed CDC platform): three Go pull requests opened (#1731 contribution guide, #1732 Elasticsearch destination client, #1733 Kinesis source consumer).",
    ],
    stack: ["Go", "Python", "Kubernetes", "CDC", "Governance"],
  },
];

/* ---- NUMBERS, WITH THEIR ERROR BARS ----
   Every row is a figure stated elsewhere on this page, paired with
   the thing it does not mean. */
export const ERRORBARS: ErrorBar[] = [
  {
    claim: "Agent platform scale",
    figure: "10,000+ daily users, 99.5% uptime",
    caveat:
      "University population, not consumer traffic. Load is bursty around the academic calendar, not flat.",
  },
  {
    claim: "Eval pipeline",
    figure: "200+ grader tests, 4 regressions caught",
    caveat:
      "Graders are automated plus rubric-scored, not a held-out human panel. Four caught is four I know about.",
  },
  {
    claim: "loopcheck calibration",
    figure: "precision 1.00, recall 0.33",
    caveat:
      "A 15-file labelled set. The README says outright that 15 files is too small to estimate precision and recall reliably. Recall 0.33 is bad and it is published anyway.",
  },
  {
    claim: "P99 latency",
    figure: "2,000ms to 400ms",
    caveat:
      "Query re-architecture plus a cache on a small service, not a distributed systems rewrite.",
  },
];
export const ERRORBARS_FOOT =
  "Every figure above is published in a public README or came off a committed benchmark report.";

/* ---- PROJECTS ----
   featured: shown under the Featured filter.
   flagship: the single keystone entry, first in the index.
   roadmap:  not built yet, presented as roadmap, never as shipped. */
const gh = "https://github.com/thebharathkumar/";
export const PROJECTS: Project[] = [
  {
    slug: "ForgeSync",
    name: "ForgeSync",
    featured: true,
    flagship: true,
    desc:
      "Reconciliation infrastructure for construction finance. Ingests invoices from four connectors with genuinely different wire formats, normalizes to one canonical model where money is an integer count of minor units, then matches records with five weighted, fully decomposable signals and shows the per-signal breakdown rather than a black-box score. Every mutation to an external system requires human approval and is idempotent at three layers, with an append-only audit trail of before state, after state and actor. 125 unit and 75 integration tests, the integration suite running against real PostgreSQL and Redis rather than fakes.",
    facts: [
      "125 unit tests",
      "75 integration tests",
      "Integration suite runs against real PostgreSQL and Redis, not fakes",
      "Five weighted signals, per-signal breakdown, no black-box score",
      "Human approval on every external mutation, idempotent at three layers",
    ],
    perf:
      "Scoring runs roughly 25x faster than ingestion, so the bottleneck is I/O and not the engine. Measured on a 4 vCPU Xeon at 2.8GHz, single threaded, with everything co-located.",
    stack: ["TypeScript strict", "Fastify", "PostgreSQL", "Prisma", "Redis", "BullMQ", "React", "AWS CDK"],
    tags: ["Governance and Trust", "Integration"],
    repo: gh + "ForgeSync",
  },
  {
    slug: "agent-triage",
    name: "agent-triage",
    featured: true,
    desc:
      "Ranks multi-agent failures by severity, frequency, and recovery from OpenTelemetry or NDJSON traces. CLI, FastAPI dashboard, OTLP receiver, optional LLM root-cause analysis. Typed, with 220+ tests and 93%+ coverage.",
    pypi: "pip install agent-triage",
    stack: ["Python", "FastAPI", "OpenTelemetry", "SQLite"],
    tags: ["Agents", "Evals and Observability"],
    repo: gh + "agent-triage",
  },
  {
    slug: "agent-rx",
    name: "agent-rx",
    desc:
      "Closes the loop on agent-triage: diagnose, propose, A/B test and accept fixes for multi-agent failures, with a learned prioritizer that decides what is worth fixing.",
    stack: ["Python"],
    tags: ["Agents"],
    repo: gh + "agent-rx",
  },
  {
    slug: "loopcheck",
    name: "loopcheck",
    featured: true,
    desc:
      "Verifier-first agent loop that grades its own grader, using mutation testing as ground truth so a test only counts when it catches deliberately broken code. Reports precision 1.00 and recall 0.33 at the 0.85 accept threshold on a 15-file labelled set, published alongside the caveat that 15 files is too small to estimate either number reliably. 86 tests, and a tamper-evident HMAC-chained audit log.",
    stack: ["Python", "Mutation testing", "Confidence scoring", "HMAC audit chain"],
    tags: ["Agents", "Evals and Observability"],
    repo: gh + "loopcheck",
  },
  {
    slug: "costfloor",
    name: "costfloor",
    featured: true,
    desc:
      "Finds the cheapest model per task family that shows no silent regression against the expensive baseline. Six structural detectors and no LLM judge. Reports cost in tokens only and deliberately refuses to quote a dollar saving without an operator-supplied rate card. 1,527 lines, 47 tests all passing, green CI on Python 3.11 and 3.12, with an offline demo that runs in about 0.3 seconds and needs no API key.",
    stack: ["Python"],
    tags: ["Evals and Observability"],
    repo: gh + "costfloor",
  },
  {
    slug: "downgrade",
    name: "downgrade",
    inDev: true,
    badgeLabel: "IN PROGRESS",
    desc:
      "Measures silent quality regression when a model router downgrades a request. Six routing arms across Fireworks FireRouter, Fireworks Nexus, OpenRouter auto and LiteLLM, scored by four structural detectors plus two LLM judges over a six-type regression taxonomy. Instrumented with OpenTelemetry GenAI semantic conventions. Statistical testing is still in progress.",
    stack: ["Python", "OpenTelemetry GenAI Semconv", "OpenRouter", "LiteLLM"],
    tags: ["Evals and Observability"],
    repo: gh + "downgrade",
  },
  {
    slug: "agent-flight-recorder",
    name: "agent-flight-recorder",
    desc:
      "Claude Code skills for agent observability and tamper-evident audit trails: hash-chained audit logs, OTel tracing, deterministic evals, and failure triage. 74 tests, 97% coverage.",
    stack: ["Python", "OpenTelemetry"],
    tags: ["Evals and Observability", "Governance and Trust"],
    repo: gh + "agent-flight-recorder",
  },
  {
    slug: "mcp-otel-audit",
    name: "mcp-otel-audit",
    featured: true,
    desc:
      "Public audit of four MCP OpenTelemetry instrumentations against the official OTel semantic conventions (v1.40.0). Fully reproducible report and writeup.",
    stack: ["Python", "OpenTelemetry"],
    tags: ["Evals and Observability", "Governance and Trust"],
    repo: gh + "mcp-otel-audit",
  },
  {
    slug: "super-mcp-eval",
    name: "super-mcp-eval",
    featured: true,
    desc:
      "Evaluation harness for MCP servers and the agents that use them: schema compliance, tool-selection accuracy with Wilson 95% confidence intervals, DuckDB persistence, Streamlit dashboard.",
    stack: ["Python", "DuckDB", "Streamlit"],
    tags: ["Evals and Observability"],
    repo: gh + "super-mcp-eval",
  },
  {
    slug: "obindoc",
    name: "obindoc",
    featured: true,
    desc:
      "Grounded RAG over a PDF with span-level citations, a verifier loop, and a tamper-evident HMAC-chained audit log. Under 900 lines, 29 tests.",
    stack: ["Python", "RAG"],
    tags: ["RAG", "Governance and Trust"],
    repo: gh + "obindoc",
  },
  {
    slug: "klaviyo-agent-demo",
    name: "klaviyo-agent-demo",
    featured: true,
    desc:
      "LangGraph multi-agent demo: an autonomous marketing campaign generator using tool-calling and orchestration across specialized agents. Live deployment.",
    stack: ["Python", "LangGraph"],
    tags: ["Agents"],
    repo: gh + "klaviyo-agent-demo",
  },
  {
    slug: "streamsense",
    name: "streamsense",
    featured: true,
    desc:
      "Multimodal human activity recognition on PAMAP2: a late-fusion CNN plus transformer with ONNX export, int8 quantization, and a FastAPI inference server for near-real-time inference on wearable IMU streams.",
    stack: ["Python", "PyTorch", "ONNX", "FastAPI"],
    tags: ["ML and Research"],
    repo: gh + "streamsense",
  },
  {
    slug: "MCP-Trust-Scanner",
    name: "MCP Trust Scanner",
    inDev: true,
    roadmap: true,
    badgeLabel: "ROADMAP",
    desc:
      "Roadmap, not built. A public scanner and leaderboard that would audit MCP servers for trust, conformance, and reliability, unifying the observability and governance work already shipped below into one tool.",
    stack: ["Python", "MCP", "OpenTelemetry"],
    tags: ["Governance and Trust"],
    repo: "https://github.com/thebharathkumar",
  },
  /* ---- garage only ---- */
  {
    slug: "vehicle-damage-detection",
    name: "vehicle-damage-detection",
    desc:
      "Vehicle damage instance segmentation. YOLO11s-seg fine-tuned on CarDD reaching 0.753 mask mAP50 held out, with an imbalance ablation, error analysis, a robustness suite, and a FastAPI and Docker inference service.",
    stack: ["Python", "PyTorch", "YOLO", "FastAPI", "Docker", "Streamlit"],
    tags: ["ML and Research"],
    repo: gh + "vehicle-damage-detection",
  },
  {
    slug: "faramesh-core",
    name: "faramesh-core",
    desc: "Runtime governance engine for AI agents.",
    stack: ["Python", "Governance"],
    tags: ["Governance and Trust"],
    repo: gh + "faramesh-core",
  },
  {
    slug: "reconciliation-break-triage-agent",
    name: "reconciliation-break-triage-agent",
    desc: "Agent that triages reconciliation breaks in a fintech clearing workflow.",
    stack: ["Python", "Agents"],
    tags: ["Agents"],
    repo: gh + "reconciliation-break-triage-agent",
  },
  {
    slug: "swe-bench-lite-agent",
    name: "swe-bench-lite-agent",
    desc: "Coding agent targeting the SWE-bench Lite task set.",
    stack: ["Python", "Agents"],
    tags: ["Agents"],
    repo: gh + "swe-bench-lite-agent",
  },
  {
    slug: "Claimtrace",
    name: "Claimtrace",
    desc: "Multi-agent contradiction detection.",
    stack: ["Python"],
    tags: ["Agents"],
    repo: gh + "Claimtrace",
  },
  {
    slug: "bridge-demo",
    name: "bridge-demo",
    desc:
      "Lender Fit Explainer. Eligible, Not, or Borderline verdicts behind deterministic hard filters. Express and vanilla JS, 18 offline smoke tests.",
    stack: ["Express", "JavaScript"],
    tags: ["Governance and Trust"],
    repo: gh + "bridge-demo",
  },
  {
    slug: "project-transfer",
    name: "project-transfer",
    desc: "Pace University course equivalency, migrated to Azure production.",
    stack: ["Azure"],
    tags: ["Integration"],
    repo: gh + "project-transfer",
  },
  {
    slug: "jober",
    name: "jober",
    desc: "Bus factor analysis. 69 tests, MIT.",
    stack: ["Python"],
    tags: ["Governance and Trust"],
    repo: gh + "jober",
  },
  {
    slug: "pm-skill-attribution",
    name: "pm-skill-attribution",
    desc: "Portfolio-manager skill-attribution backtester.",
    stack: ["Python", "Quant"],
    tags: ["ML and Research"],
    repo: gh + "pm-skill-attribution",
  },
  {
    slug: "agentic-observation",
    name: "agentic-observation",
    desc: "Observability experiments for agent runtimes.",
    stack: ["Python", "OpenTelemetry"],
    tags: ["Evals and Observability"],
    repo: gh + "agentic-observation",
  },
  {
    slug: "Eval-harness",
    name: "Eval-harness",
    desc: "Lightweight evaluation harness scaffolding.",
    stack: ["Python"],
    tags: ["Evals and Observability"],
    repo: gh + "Eval-harness",
  },
];

/* ---- WRITING ---- */
export const WRITING: { items: WritingItem[] } = {
  items: [
    {
      kind: "Profile",
      title: "Medium",
      handle: "@thebharathkumar",
      desc: "Notes on agent reliability, evals, and observability.",
      href: PROFILE.links.medium,
    },
    {
      kind: "Writeup",
      title: "mcp-otel-audit",
      handle: "github.com/thebharathkumar/mcp-otel-audit",
      desc:
        "Public audit of four MCP OpenTelemetry instrumentations against the official OTel semantic conventions (v1.40.0). Fully reproducible report and writeup.",
      href: gh + "mcp-otel-audit",
    },
  ],
};

/* ---- EDUCATION ---- */
export const EDUCATION: Education[] = [
  {
    school: "Pace University, Seidenberg School",
    degree: "M.S. Computer Science",
    detail: "GPA 3.87. May 2026.",
  },
  {
    school: "Visvesvaraya Technological University (VTU)",
    degree: "Bachelor of Engineering",
    detail: "Computer Science.",
  },
];

/* ---- CERTIFICATIONS ---- */
export const CERTS: Cert[] = [
  { badge: "ANT", title: "Building with Claude on Amazon Bedrock", issuer: "Anthropic", date: "Mar 2026" },
  { badge: "SAA", title: "AWS Certified Solutions Architect, Associate", issuer: "Amazon Web Services", date: "Jan 2026" },
  { badge: "RH", title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", date: "2022" },
];

/* ---- PUBLICATIONS ---- */
export const PUBLICATIONS: Publication[] = [
  {
    venue: "Springer Nature",
    meta: "ICACECS 2023. Corresponding author.",
    title: "Deep CNN plant and medicinal species classification",
    figure: "89% accuracy",
  },
  {
    venue: "IJARESM",
    meta: "November 2023. Dlib EAR plus Keras CNN, Android app.",
    title: "Driver Drowsiness Detection",
    figure: "93% pass rate",
  },
];
