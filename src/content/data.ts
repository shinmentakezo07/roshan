// ALL placeholder data lives here. Edit this file only.
export const profile = {
  name: 'Roshan Khatru',
  first: 'Roshan',
  last: 'Khatru',
  role: 'Backend & LLM / AI Engineer',
  tagline: 'I build fast backends and LLM systems that survive production.',
  location: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  email: 'hello@roshankhatru.dev',
  phone: '+977 980-123-4567',
  available: true,
  resume: '/resume',
  about: [
    'I am a full-stack developer who lives closest to the metal: APIs, queues, databases and the LLM pipelines that sit on top of them.',
    'Most of my work is turning fuzzy AI ideas into systems with latency budgets, evals and on-call runbooks. I write Go and Rust when it needs to be fast, Python when it needs to be smart, and TypeScript when people need to see it.',
  ],
  stats: [
    { label: 'Years building', value: 5 },
    { label: 'Projects shipped', value: 30 },
    { label: 'Open-source PRs', value: 120 },
    { label: 'LLM apps in prod', value: 8 },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/shinmentakezo07' },
    { label: 'LinkedIn', url: '' },
    { label: 'X / Twitter', url: '' },
  ],
}

export const services = [
  { n: '01', title: 'Backend systems', desc: 'APIs, microservices, queues and data models built for scale and easy on-call.' },
  { n: '02', title: 'LLM engineering', desc: 'RAG, agents, tool calling, evals and cost/latency tuning for real users.' },
  { n: '03', title: 'Full-stack product', desc: 'Next.js and React frontends wired to solid backends, from idea to deploy.' },
]

export const principles = [
  'Measure first. Evals before vibes.',
  'Boring tech, interesting products.',
  'Latency is a feature.',
  'Ship small, ship often.',
]

export const skills = [
  { group: 'Languages', items: [['Go', 92], ['Python', 95], ['Rust', 78], ['TypeScript', 90], ['Node.js', 88], ['SQL', 85]] },
  { group: 'AI / LLM', items: [['RAG', 94], ['Agents', 90], ['Evals', 86], ['Fine-tuning', 72], ['Vector DBs', 88]] },
  { group: 'Backend & Infra', items: [['PostgreSQL', 90], ['Redis', 86], ['Kafka', 78], ['gRPC', 84], ['Docker / K8s', 82], ['AWS', 80]] },
  { group: 'Frontend', items: [['React', 86], ['Next.js', 85], ['Tailwind', 88], ['Framer Motion', 75]] },
] as { group: string; items: [string, number][] }[]

export type Project = {
  slug: string; title: string; year: string; role: string; desc: string; tags: string[]
  color: string; metric: string; problem: string; solution: string; results: string[]
  link: string; repo: string
}

export const projects: Project[] = [
  {
    slug: 'agentforge', title: 'AgentForge', year: '2025', role: 'Creator', color: '#ff5b1f',
    desc: 'Multi-agent orchestration framework with tool calling, memory and tracing.',
    tags: ['Python', 'LLM', 'FastAPI'], metric: '3.2k ★ on GitHub',
    problem: 'Teams building agents kept rewriting the same glue: tool schemas, retries, memory and traces.',
    solution: 'A small typed framework with a planner/executor loop, pluggable memory and OpenTelemetry traces for every step.',
    results: ['Used by 40+ teams', 'Cut agent prototype time from weeks to days', 'Built-in eval harness'],
    link: '#', repo: '#',
  },
  {
    slug: 'vectorlite', title: 'VectorLite', year: '2025', role: 'Author', color: '#c6f432',
    desc: 'Embeddable vector search engine with HNSW indexing, written in Rust.',
    tags: ['Rust', 'Search'], metric: '1M vectors < 5ms p99',
    problem: 'Small apps needed vector search without running a separate database.',
    solution: 'A single-file embeddable HNSW index with SIMD distance functions and Python bindings.',
    results: ['p99 under 5ms on 1M vectors', 'Zero external services', 'Python + Node bindings'],
    link: '#', repo: '#',
  },
  {
    slug: 'gogateway', title: 'GoGateway', year: '2024', role: 'Lead engineer', color: '#7aa2ff',
    desc: 'High-throughput API gateway with rate limiting and JWT auth in Go.',
    tags: ['Go', 'gRPC', 'Redis'], metric: '80k req/s per node',
    problem: 'An off-the-shelf gateway was the bottleneck and the biggest line on the cloud bill.',
    solution: 'A purpose-built Go gateway with token-bucket limiting in Redis, JWT validation and hot-reloaded routes.',
    results: ['80k req/s per node', '60% lower infra cost', 'Zero-downtime config reloads'],
    link: '#', repo: '#',
  },
  {
    slug: 'documind', title: 'DocuMind', year: '2024', role: 'Full-stack', color: '#f2c94c',
    desc: 'RAG chat over private docs with citations and streaming answers.',
    tags: ['Next.js', 'TypeScript', 'pgvector'], metric: '92% answer accuracy',
    problem: 'Support staff spent hours searching PDFs and wikis for answers.',
    solution: 'Hybrid BM25 + vector retrieval, reranking, cited streaming answers and a feedback loop into evals.',
    results: ['92% accuracy on gold set', 'Answer time from 10 min to 10 s', 'Citations on every answer'],
    link: '#', repo: '#',
  },
  {
    slug: 'promptbench', title: 'PromptBench', year: '2023', role: 'Creator', color: '#e879f9',
    desc: 'Eval harness comparing LLMs on cost, latency and quality.',
    tags: ['Python', 'Evals'], metric: '12 models compared',
    problem: 'Model choices were made on gut feeling and Twitter threads.',
    solution: 'A CLI and dashboard that run the same suites across providers and plot cost vs quality.',
    results: ['Saved 35% on model spend', 'CI-friendly regression checks', 'Adopted company-wide'],
    link: '#', repo: '#',
  },
  {
    slug: 'streamkit', title: 'StreamKit', year: '2023', role: 'Backend', color: '#5eead4',
    desc: 'Realtime event pipeline processing 50k events/sec on Kafka.',
    tags: ['Node.js', 'Kafka'], metric: '50k events/s',
    problem: 'Batch jobs meant analytics were always a day late.',
    solution: 'A Kafka-based streaming pipeline with exactly-once sinks and back-pressure aware consumers.',
    results: ['50k events/s sustained', 'Data freshness from 24h to 2s', 'Replayable by design'],
    link: '#', repo: '#',
  },
]

export const experience = [
  {
    role: 'Senior Backend Engineer', org: 'Acme AI', period: '2023 — Now', place: 'Remote',
    summary: 'Own the LLM platform: routing, caching, evals and the APIs product teams build on.',
    points: ['Led LLM platform serving 2M requests/day', 'Cut inference cost 40% with semantic caching and model routing', 'Built the eval pipeline gating every prompt change'],
    stack: ['Go', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    role: 'Full-Stack Developer', org: 'Nimbus Labs', period: '2021 — 2023', place: 'Kathmandu',
    summary: 'Built services and dashboards for a B2B analytics product.',
    points: ['Built Go microservices and Next.js dashboards', 'Introduced CI/CD and an observability stack', 'Mentored 4 junior engineers'],
    stack: ['Go', 'Next.js', 'Kafka', 'Docker'],
  },
  {
    role: 'Software Engineer', org: 'Startup Co', period: '2019 — 2021', place: 'Kathmandu',
    summary: 'First engineering hire; shipped whatever the product needed.',
    points: ['Shipped Node/TypeScript APIs and React apps', 'Designed the first database schema and auth system'],
    stack: ['Node.js', 'TypeScript', 'React', 'MongoDB'],
  },
]
