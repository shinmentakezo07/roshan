import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../content/data'
import { Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.25])
  if (idx < 0) return <NotFound />
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  return (
    <Page>
      <motion.div style={{ scaleX: scrollYProgress, background: p.color }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left" />
      <section className="px-6 pt-40 md:px-10">
        <Link to="/work" className="link-u font-mono text-xs uppercase tracking-widest text-mute">← All work</Link>
        <h1 className="mt-6 font-display text-[20vw] leading-[0.85] md:text-[12vw]">
          <SplitReveal text={p.title} now />
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-mute md:text-2xl">{p.desc}</p>
        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          {[['Year', p.year], ['Role', p.role], ['Stack', p.tags.join(', ')], ['Impact', p.metric]].map(([k, v]) => (
            <div key={k}><Label>{k}</Label><p className="mt-2">{v}</p></div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-line bg-panel">
          <motion.div
            style={{ scale, background: `radial-gradient(circle at 70% 30%, ${p.color}, transparent 55%), radial-gradient(circle at 15% 85%, ${p.color}55, transparent 45%)` }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[14vw] italic text-ink/90 mix-blend-overlay">{p.title}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-16 px-6 py-20 md:grid-cols-2 md:px-10">
        <Reveal><Label>The problem</Label><p className="mt-4 font-display text-3xl leading-snug md:text-4xl">{p.problem}</p></Reveal>
        <Reveal delay={0.1}><Label>The solution</Label><p className="mt-4 text-lg leading-relaxed text-mute">{p.solution}</p></Reveal>
      </section>

      {p.stats && (
        <section className="px-6 pb-24 md:px-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
            {p.stats.map((x, i) => (
              <Reveal key={x.l} delay={i * 0.08} className="group bg-bg p-8 transition-colors hover:bg-panel">
                <p className="font-display text-7xl transition-transform duration-500 group-hover:-translate-y-1" style={{ color: p.color }}>{x.v}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-mute">{x.l}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.inbound && p.outbound && (
        <section className="px-6 pb-24 md:px-10">
          <Label>Routing map</Label>
          <h2 className="mt-3 font-display text-4xl md:text-6xl"><SplitReveal text="Any dialect in, any provider out" /></h2>
          <div className="mt-12 grid items-center gap-8 md:grid-cols-[1fr_auto_1.4fr]">
            <div className="space-y-3">
              {p.inbound.map((d, i) => (
                <motion.div key={d} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  className="rounded-xl border border-line bg-panel px-5 py-4 transition-colors hover:border-current" style={{ color: p.color }}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Inbound</p>
                  <p className="mt-1 text-ink">{d}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-2" style={{ borderColor: p.color }}>
              <motion.span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 60px ${p.color}66` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <motion.span aria-hidden className="absolute inset-3 rounded-full border border-dashed" style={{ borderColor: `${p.color}88` }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
              <div className="text-center"><p className="font-display text-4xl italic">{p.title}</p><p className="font-mono text-[10px] uppercase tracking-widest text-mute">canonical IR</p></div>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {p.outbound.map((d, i) => (
                <motion.span key={d} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.04 }}
                  whileHover={{ y: -3 }} className="rounded-full border border-line bg-panel px-4 py-2 text-sm transition-colors hover:text-bg"
                  onMouseEnter={(e) => (e.currentTarget.style.background = p.color)} onMouseLeave={(e) => (e.currentTarget.style.background = '')}>
                  {d}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.features && (
        <section className="px-6 pb-24 md:px-10">
          <Label>Features</Label>
          <h2 className="mt-3 font-display text-4xl md:text-6xl"><SplitReveal text="What's inside" /></h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {p.features.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <TiltCard className="h-full rounded-2xl border border-line bg-panel p-8">
                  <span className="font-mono text-xs" style={{ color: p.color }}>0{i + 1}</span>
                  <h3 className="mt-8 font-display text-3xl">{f.t}</h3>
                  <p className="mt-3 text-mute">{f.d}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.code && (
        <section className="px-6 pb-24 md:px-10">
          <Label>Quickstart</Label>
          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-mute">~/{p.slug} — zsh</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
              {p.code.split('\n').map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={l.startsWith('#') ? 'text-mute' : ''}>{l.startsWith('#') ? l : <><span style={{ color: p.color }}>$ </span>{l}</>}</motion.div>
              ))}
            </pre>
          </Reveal>
        </section>
      )}

      <section className="px-6 pb-24 md:px-10">
        <Label>Architecture</Label>
        <h2 className="mt-3 font-display text-4xl md:text-6xl"><SplitReveal text="How it flows" /></h2>
        <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          {(p.flow ?? ['Client', 'API Gateway', 'Service layer', 'Queue / Workers', 'Data + Vector DB']).map((n, i, a) => (
            <div key={n} className="flex flex-1 flex-col items-center gap-4 md:flex-row">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.12 }}
                className="w-full rounded-2xl border border-line bg-panel px-5 py-6 text-center transition-colors hover:border-current" style={{ color: p.color }}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-mute">0{i + 1}</p>
                <p className="mt-1 text-lg text-ink">{n}</p>
              </motion.div>
              {i < a.length - 1 && (
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 + 0.3 }} className="shrink-0 rotate-90 text-2xl md:rotate-0" style={{ color: p.color }}>→</motion.span>
              )}
            </div>
          ))}
        </div>
      </section>

      {p.timeline && <section className="px-6 pb-24 md:px-10">
        <Label>Timeline</Label>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {(p.timeline ?? [['Week 1', 'Discovery & load profiling'], ['Week 2–3', 'Core services + data model'], ['Week 4–5', 'LLM layer, evals, guardrails'], ['Week 6', 'Hardening, docs, launch']] as [string, string][]).map(([w, d], i) => (
            <Reveal key={w} delay={i * 0.08} className="group bg-bg p-6 transition-colors hover:bg-panel">
              <p className="font-mono text-xs" style={{ color: p.color }}>{w}</p>
              <p className="mt-6 text-lg">{d}</p>
              <div className="mt-6 h-px w-full bg-line"><motion.div className="h-px origin-left" style={{ background: p.color }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: 0.2 + i * 0.15 }} /></div>
            </Reveal>
          ))}
        </div>
      </section>}

      <section className="px-6 pb-20 md:px-10">
        <Label>Results</Label>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {p.results.map((r, i) => (
            <Reveal key={r} delay={i * 0.1}>
              <TiltCard className="h-full rounded-2xl border border-line bg-panel p-8">
                <span className="font-mono text-xs" style={{ color: p.color }}>0{i + 1}</span>
                <p className="mt-10 font-display text-3xl">{r}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        {p.quote && (
          <Reveal className="mt-16 rounded-3xl border border-line p-8 md:p-12">
            <p className="font-display text-3xl leading-snug md:text-4xl"><span style={{ color: p.color }}>“</span>{p.quote.q}<span style={{ color: p.color }}>”</span></p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mute">— {p.quote.by}</p>
          </Reveal>
        )}
        <div className="mt-10 flex gap-4">
          <a href={p.link} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-bg transition-colors hover:bg-accent">Live site <ArrowUpRight size={16} /></a>
          <a href={p.repo} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition-colors hover:border-accent hover:text-accent"><FaGithub /> Source</a>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} data-cursor="Next" className="group block border-t border-line px-6 py-20 md:px-10">
        <Label>Next project</Label>
        <p className="mt-4 font-display text-7xl transition-all duration-500 group-hover:translate-x-6 group-hover:italic md:text-[9rem]" style={{ color: next.color }}>
          {next.title} →
        </p>
      </Link>
    </Page>
  )
}
