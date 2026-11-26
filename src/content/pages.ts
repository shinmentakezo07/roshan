export type Post = {
  slug: string
  title: string
  date: string
  read: string
  tag: string
  excerpt: string
  body: { h?: string; p?: string; code?: string }[]
}

export const posts: Post[] = [
  {
    slug: 'rag-p95-38ms',
    title: 'How I cut RAG p95 latency to 38ms',
    date: '2026-10-14',
    read: '8 min',
    tag: 'LLM',
    excerpt: 'Hybrid retrieval, a smaller reranker and aggressive caching: what actually moved the needle and what was noise.',
    body: [
      { p: 'Our retrieval path started at 410ms p95. Most of it was not the vector search. It was everything around it.' },
      { h: 'Measure before you tune' },
      { p: 'Tracing every span with OpenTelemetry showed the reranker and two redundant network hops eating 70% of the budget.' },
      { h: 'Hybrid beats pure vectors' },
      { p: 'BM25 plus vectors with reciprocal rank fusion improved recall and let us shrink top-k from 50 to 20 before reranking.' },
      { code: 'score = sum(1 / (60 + rank_i) for rank_i in ranks)' },
      { h: 'Cache the boring part' },
      { p: 'Embedding cache keyed on normalized query text hit 41% in production. Cheapest win of the project.' },
    ],
  },
  {
    slug: 'evals-that-catch-regressions',
    title: 'Evals that actually catch regressions',
    date: '2026-09-02',
    read: '6 min',
    tag: 'Evals',
    excerpt: 'Golden sets rot. Here is how I keep LLM evals honest, fast and wired into CI.',
    body: [
      { p: 'An eval suite nobody runs is a vibe check with extra steps. Ours runs on every PR in under four minutes.' },
      { h: 'Small, sharp golden sets' },
      { p: 'Two hundred hand-labelled cases beat ten thousand scraped ones. Each case encodes one failure we have actually shipped.' },
      { h: 'Grade with rubrics, not vibes' },
      { p: 'LLM-as-judge works when the rubric is binary and specific. "Cites the source document" is gradeable; "is helpful" is not.' },
    ],
  },
  {
    slug: 'go-grpc-80k',
    title: '80k req/s per node with Go and gRPC',
    date: '2026-07-21',
    read: '7 min',
    tag: 'Backend',
    excerpt: 'Pooling, zero-copy buffers and one surprising GC knob behind a boring, fast service.',
    body: [
      { p: 'The service was simple: auth check, Redis lookup, respond. Getting it to 80k req/s per node was all about not allocating.' },
      { h: 'Profile allocations, not CPU' },
      { p: 'pprof alloc_space pointed at JSON marshaling in a logging middleware. Removing it doubled throughput.' },
      { code: 'GOGC=200 GOMEMLIMIT=1500MiB ./server' },
    ],
  },
  {
    slug: 'kafka-backpressure',
    title: 'Backpressure in Kafka consumers, the boring way',
    date: '2026-05-09',
    read: '5 min',
    tag: 'Backend',
    excerpt: 'Pause partitions, bound your queues and stop pretending memory is infinite.',
    body: [
      { p: 'Most consumer outages I have seen are unbounded in-memory queues meeting a slow downstream.' },
      { h: 'Pause, do not buffer' },
      { p: 'When the worker pool is full, pause the partition. Resume when it drains. Lag is a metric; OOM is an incident.' },
    ],
  },
]

export const uses: { group: string; items: { name: string; note: string }[] }[] = [
  { group: 'Editor & Terminal', items: [
    { name: 'Neovim + LazyVim', note: 'Daily driver, Go and Rust LSPs' },
    { name: 'VS Code', note: 'For notebooks and pairing' },
    { name: 'WezTerm + zsh', note: 'Starship prompt, tmux sessions' },
    { name: 'JetBrains Mono', note: 'Ligatures on, size 14' },
  ]},
  { group: 'Hardware', items: [
    { name: 'MacBook Pro M3 Max', note: '64 GB, runs local models fine' },
    { name: 'Linux box, RTX 4090', note: 'CUDA experiments and fine-tunes' },
    { name: 'Keychron Q1, brown switches', note: 'Quiet enough for calls' },
    { name: 'LG 27" 4K', note: 'Vertical for logs' },
  ]},
  { group: 'AI & Models', items: [
    { name: 'Claude & GPT', note: 'Coding, reviews, drafting' },
    { name: 'Ollama', note: 'Local Llama and Qwen for offline work' },
    { name: 'vLLM', note: 'Serving and throughput benchmarks' },
    { name: 'Langfuse', note: 'Tracing and eval dashboards' },
  ]},
  { group: 'Backend Stack', items: [
    { name: 'Go, Python, Rust', note: 'In that order of frequency' },
    { name: 'PostgreSQL + pgvector', note: 'Default database, default vector store' },
    { name: 'Redis, Kafka', note: 'Caching and streams' },
    { name: 'Docker, Kubernetes', note: 'Deploy everything the same way' },
  ]},
  { group: 'Coffee', items: [
    { name: 'Hario V60', note: '15 g to 250 g, 93°C' },
    { name: 'Comandante C40', note: '24 clicks for pour-over' },
    { name: 'Fellow Stagg EKG', note: 'Gooseneck, temperature hold' },
  ]},
]

export const now = {
  updated: '2026-11-26',
  location: 'Kathmandu, Nepal',
  sections: [
    { k: 'Building', items: ['An open-source eval harness for LLM agents', 'Rewriting AgentForge memory layer for streaming'] },
    { k: 'Learning', items: ['CUDA kernels and inference optimization', 'Async Rust internals: wakers, pinning, executors'] },
    { k: 'Reading', items: ['Designing Data-Intensive Applications (again)', 'Programming Massively Parallel Processors'] },
    { k: 'Life', items: ['Training for an Annapurna circuit trek in spring', 'Chasing 1900 on Lichess', 'Ranking every momo place in Thamel'] },
  ],
  goals: [
    { t: 'Ship eval harness v1', p: 70 },
    { t: 'Write 6 posts this year', p: 66 },
    { t: 'Custom CUDA attention kernel', p: 30 },
  ],
}
