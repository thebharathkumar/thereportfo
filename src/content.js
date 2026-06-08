/* ============================================================
   content.js  ::  single source of truth
   thebharath.co  //  AI Engineer portfolio (GTA homage)
   Rules honored: no em dashes, no invented metrics, NLP-only
   for Compsoft, MCP Trust Scanner is in development.
   ============================================================ */

window.PROFILE = {
  name: "Bharath Kumar Rajesh",
  title: "AI Engineer",
  city: "New York City",
  coords: "40.7128 N, 74.0060 W",
  relocation: ["Bay Area", "Dallas", "Orlando", "Seattle"],
  headline: "AI Engineer building reliable agentic systems.",
  thesis:
    "I build the triage, eval, and governance tooling that makes agents trustworthy in production.",
  quickFacts: ["MS CS, Pace Seidenberg", "GPA 3.86", "New York City", "Open to relocation"],
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
    resume: "resume.pdf",
  },
};

/* category palette (used for project tags + filters) */
window.CATS = {
  Flagship: "var(--cat-flagship)",
  Agents: "var(--cat-agents)",
  "Evals and Observability": "var(--cat-evals)",
  RAG: "var(--cat-rag)",
  "Governance and Trust": "var(--cat-govern)",
  "ML and Research": "var(--cat-ml)",
};

/* ---- BOOT sequence lines ---- */
window.BOOT = [
  "initializing thebharath.co",
  "loading agent runtime ...... ok",
  "mounting eval harness ....... ok",
  "tracing via opentelemetry ... ok",
  "press any key to enter",
];

/* ---- SKILLS :: stat panel (categorical, no numeric claims) ---- */
window.SKILLS = [
  { group: "Agentic", items: ["LangGraph", "LangChain", "MCP", "Multi-agent orchestration", "Tool-calling"] },
  { group: "Models", items: ["Claude on Amazon Bedrock", "OpenAI API", "Prompt engineering"] },
  { group: "RAG", items: ["Retrieval pipelines", "Grounded generation", "Span-level citations", "Verifier loops"] },
  { group: "Evals and Observability", items: ["OpenTelemetry", "OTLP", "Eval harnesses", "LLM-as-judge", "Drift and cost monitoring"] },
  { group: "Backend", items: ["Python", "FastAPI", "Go", "Node.js", "Java / Spring Boot", "gRPC", "GraphQL"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js"] },
  { group: "Cloud and Infra", items: ["AWS (Bedrock, EC2, S3, Lambda, SageMaker)", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { group: "Data", items: ["Postgres", "DuckDB", "SQLite"] },
];

/* ---- EXPERIENCE :: mission log ---- */
window.EXPERIENCE = [
  {
    code: "M-01",
    status: "ACTIVE",
    role: "Graduate Assistant, AI Engineering",
    org: "Pace University, Seidenberg School",
    period: "Mar 2025 to Present",
    points: [
      "Building a production multi-agent chatbot platform using LangGraph orchestration, Claude on Amazon Bedrock, and custom MCP tool servers, serving multiple university departments with department-specific knowledge bases and routing.",
      "Built an LLM observability dashboard for production workflows: trace capture, eval harness, cost tracking, and drift monitoring.",
    ],
    stack: ["Python", "LangGraph", "Bedrock", "MCP", "FastAPI", "TypeScript", "React", "Postgres", "AWS", "Azure"],
  },
  {
    code: "M-02",
    status: "CLEARED",
    role: "Software Development Intern",
    org: "Let's Be The Change",
    period: "Sep 2023 to May 2024",
    points: [
      "Shipped product features in Java, Spring Boot, and React.",
      "Integrated Stripe, SendGrid, and Twilio across the platform.",
      "Reduced P99 latency by 80%.",
    ],
    stack: ["Java", "Spring Boot", "React", "Stripe", "Twilio"],
  },
  {
    code: "M-03",
    status: "CLEARED",
    role: "ML Research Intern",
    org: "Compsoft Technologies",
    period: "Aug 2023 to Sep 2023",
    points: [
      "Built a sentiment analysis model using NLP, reaching 90% accuracy.",
    ],
    stack: ["Python", "NLP", "scikit-learn"],
  },
  {
    code: "M-04",
    status: "CLEARED",
    role: "Data Science Intern",
    org: "Pantech E-Learning",
    period: "Jun 2023 to Jul 2023",
    points: [
      "Built data analysis and visualization workflows on customer behavior datasets.",
    ],
    stack: ["Python", "Pandas", "NumPy", "SQL"],
  },
  {
    code: "M-05",
    status: "CLEARED",
    role: "Software Engineer Intern",
    org: "Alltramatic",
    period: "Dec 2022 to Feb 2023",
    points: [
      "Developed backend REST services and database queries for an e-commerce platform.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "REST"],
  },
  {
    code: "OSS",
    status: "ONGOING",
    role: "Open Source Contributor",
    org: "Layer5 / Meshery, Artie Labs, Faramesh Labs",
    period: "2023 to Present",
    points: [
      "Layer5 / Meshery (CNCF): 800+ lines across Go and Python over five merged PRs.",
      "Artie Labs (YC-backed CDC platform): three merged Go PRs.",
      "Faramesh Labs (open-source agent governance layer): roughly 1,900 lines across stacked PRs.",
    ],
    stack: ["Go", "Python", "Kubernetes", "CDC", "Governance"],
  },
];

/* ---- PROJECTS :: heist board + garage ----
   featured: shown large on the heist board.
   tags[0] drives the card accent color.                    */
const gh = "https://github.com/thebharathkumar/";
window.PROJECTS = [
  {
    slug: "MCP-Trust-Scanner",
    name: "MCP Trust Scanner",
    inDev: true,
    featured: true,
    flagship: true,
    desc:
      "The keystone. A public scanner and leaderboard that audits MCP servers for trust, conformance, and reliability, unifying the observability and governance work below into one tool.",
    stack: ["Python", "MCP", "OpenTelemetry"],
    tags: ["Flagship", "Governance and Trust"],
    repo: "https://github.com/thebharathkumar",
  },
  {
    slug: "agent-triage",
    name: "agent-triage",
    featured: true,
    desc:
      "Ranks multi-agent failures by severity, frequency, and recovery from OpenTelemetry or NDJSON traces. CLI, FastAPI dashboard, OTLP receiver, optional LLM root-cause analysis. pip-installable, typed, tested.",
    stack: ["Python", "FastAPI", "OpenTelemetry", "SQLite"],
    tags: ["Agents", "Evals and Observability"],
    repo: gh + "agent-triage",
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
  /* ---- garage only ---- */
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

window.FILTERS = ["All", "Flagship", "Agents", "Evals and Observability", "RAG", "Governance and Trust", "ML and Research"];

/* ---- EDUCATION ---- */
window.EDUCATION = [
  {
    school: "Pace University, Seidenberg School",
    degree: "MS, Computer Science",
    detail: "GPA 3.86. Graduating May 2026.",
  },
  {
    school: "Visvesvaraya Technological University (VTU)",
    degree: "Bachelor of Engineering",
    detail: "Computer Science.",
  },
];

/* ---- CERTIFICATIONS :: trophy case ---- */
window.CERTS = [
  { badge: "ANT", title: "Building with Claude on Amazon Bedrock", issuer: "Anthropic", date: "Mar 2026" },
  { badge: "SAA", title: "AWS Certified Solutions Architect, Associate", issuer: "Amazon Web Services", date: "Jan 2026" },
  { badge: "RH", title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", date: "2022" },
];

/* ---- PUBLICATIONS :: trophy case ---- */
window.PUBLICATIONS = [
  {
    venue: "Springer Nature",
    meta: "ICACECS 2023, Corresponding Author",
    title: "Deep CNN-based identification of medicinal and edible plants",
  },
  {
    venue: "IJARESM",
    meta: "2023",
    title: "Driver Drowsiness Detection using AI",
  },
];

window.NAV = [
  { id: "loadout", label: "Skills" },
  { id: "missions", label: "Experience" },
  { id: "heist", label: "Projects" },
  { id: "garage", label: "Garage" },
  { id: "trophies", label: "Trophies" },
  { id: "safehouse", label: "Contact" },
];
