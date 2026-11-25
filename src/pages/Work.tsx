import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../content/data'
import { Counter, Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

export default function Work() {
  const tags = ['All', ...new Set(projects.flatMap((p) => p.tags))]
  const [tag, setTag] = useState('All')
  const list = projects.filter((p) => tag === 'All' || p.tags.includes(tag))

  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Index · {projects.length} projects</Label>
        <h1 className="mt-4 font-display text-[18vw] leading-[0.85] md:text-[11vw]">
          <SplitReveal text="Work" now /> <span className="italic text-accent"><SplitReveal text="archive" now delay={0.15} /></span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-mute">Production backends, LLM pipelines and the tooling around them. Filter by stack, click in for the full story, metrics and architecture.</p>
        <div className="mt-12 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`relative rounded-full border px-4 py-2 font-mono text-xs transition-colors ${tag === t ? 'border-accent text-bg' : 'border-line text-mute hover:text-ink'}`}
            >
              {tag === t && <motion.span layoutId="pill" className="absolute inset-0 -z-10 rounded-full bg-accent" />}
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 px-6 py-16 md:grid-cols-2 md:px-10">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            >
              <Link to={`/work/${p.slug}`} data-cursor="Open" className="group block">
                <TiltCard className="rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-500 group-hover:border-accent/60">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ background: `radial-gradient(circle at 70% 30%, ${p.color}cc, transparent 60%), radial-gradient(circle at 20% 90%, ${p.color}44, transparent 50%)` }}
                  />
                  <span className="absolute left-6 top-6 font-mono text-xs">{p.year}</span>
                  <span className="absolute bottom-4 left-6 font-display text-6xl italic opacity-90 md:text-8xl">{p.title}</span>
                  <span className="absolute right-6 top-6 rounded-full bg-bg/60 px-3 py-1 font-mono text-xs backdrop-blur">{p.metric}</span>
                  <div className="absolute inset-x-6 bottom-24 flex translate-y-4 flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.tags.map((t) => <span key={t} className="rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase backdrop-blur">{t}</span>)}
                  </div>
                </div>
                </TiltCard>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="text-mute">{p.desc}</p>
                  <ArrowUpRight className="shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
      <section className="px-6 py-24 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {[{ v: 30, l: 'Projects shipped' }, { v: 12, l: 'Production LLM apps' }, { v: 99, l: 'Avg uptime %', s: '.9' }, { v: 40, l: 'Happy clients' }].map((x, i) => (
            <Reveal key={x.l} delay={i * 0.08} className="bg-bg p-8 transition-colors hover:bg-panel">
              <p className="font-display text-6xl text-accent"><Counter to={x.v} suffix={x.s ?? '+'} /></p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-mute">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32 md:px-10">
        <Label>Side quests</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="Small experiments" /></h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { t: 'tinyq', d: 'A 600-line Redis-compatible job queue in Go.', s: 'Go' },
            { t: 'promptdiff', d: 'CLI to diff LLM outputs across prompt versions.', s: 'Python' },
            { t: 'vecbench', d: 'Benchmarks for five vector DBs on real workloads.', s: 'Rust' },
            { t: 'ratelimitd', d: 'Distributed token-bucket rate limiter sidecar.', s: 'Go' },
            { t: 'evalkit', d: 'Lightweight eval harness for RAG pipelines.', s: 'Python' },
            { t: 'kv-wasm', d: 'Embeddable key-value store compiled to WASM.', s: 'Rust' },
          ].map((x, i) => (
            <motion.a key={x.t} href="#" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.06 }}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-panel">
              <div>
                <p className="font-mono text-xs text-accent">{x.s}</p>
                <p className="mt-3 font-display text-3xl">{x.t}</p>
                <p className="mt-2 text-mute">{x.d}</p>
              </div>
              <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
            </motion.a>
          ))}
        </div>
      </section>
    </Page>
  )
}
