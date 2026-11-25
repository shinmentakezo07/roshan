import { motion } from 'framer-motion'
import { principles, profile, skills } from '../content/data'
import { Counter, Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

export default function About() {
  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>About</Label>
        <h1 className="mt-4 max-w-6xl font-display text-6xl leading-[0.95] md:text-9xl">
          <SplitReveal text="Backend brain," now /> <span className="italic text-accent"><SplitReveal text="AI hands." now delay={0.2} /></span>
        </h1>
      </section>

      <section className="grid gap-12 px-6 py-24 md:grid-cols-[1fr_1.4fr] md:px-10">
        <Reveal>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-panel">
            <motion.div
              className="absolute inset-0"
              style={{ background: 'conic-gradient(from 0deg, #ff5b1f, #000000, #c6f432, #000000, #ff5b1f)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-3 flex items-end rounded-[1.2rem] bg-bg/85 p-6 backdrop-blur-xl">
              <div>
                <p className="font-display text-5xl italic">RK</p>
                <p className="mt-2 font-mono text-xs text-mute">Photo goes here · {profile.location}</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="space-y-8">
          {profile.about.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}><p className="text-2xl leading-relaxed md:text-3xl">{t}</p></Reveal>
          ))}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line pt-0">
            {profile.stats.map((s) => (
              <div key={s.label} className="group bg-bg p-6 transition-colors hover:bg-panel">
                <p className="font-display text-6xl text-accent transition-transform duration-500 group-hover:-translate-y-1"><Counter to={s.value} /></p>
                <p className="mt-1 font-mono text-xs uppercase text-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <Label>Toolbox</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="What I work with" /></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08}>
              <TiltCard className="rounded-2xl border border-line bg-panel p-8 transition-colors hover:border-accent/50">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.group}</h3>
                <ul className="mt-6 space-y-4">
                  {g.items.map(([name, lvl], i) => (
                    <li key={name}>
                      <div className="flex justify-between text-sm"><span>{name}</span><span className="font-mono text-mute">{lvl}</span></div>
                      <div className="mt-2 h-px bg-line">
                        <motion.div
                          className="h-px origin-left bg-gradient-to-r from-accent to-ink"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: lvl / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease, delay: i * 0.06 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <Label>Principles</Label>
        <ol className="mt-8">
          {principles.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <li className="group flex items-baseline gap-6 border-t border-line py-6">
                <span className="font-mono text-xs text-mute">0{i + 1}</span>
                <span className="font-display text-4xl transition-colors group-hover:text-accent md:text-6xl">{p}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="px-6 py-24 md:px-10">
        <Label>Journey</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="How I got here" /></h2>
        <div className="relative mt-14 pl-8 md:pl-12">
          <motion.div aria-hidden className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-line to-transparent" style={{ height: '100%' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
          {[
            { y: '2019', t: 'First production API', d: 'Shipped a Node.js booking backend for a local travel agency. Learned what 3am pages feel like.' },
            { y: '2021', t: 'Went deep on Go', d: 'Rebuilt a payments service in Go, cutting infra cost by 60% and p99 latency by 4x.' },
            { y: '2023', t: 'LLMs in production', d: 'Built RAG pipelines with evals, guardrails and cost dashboards for two SaaS products.' },
            { y: '2024', t: 'Rust for the hot path', d: 'Wrote a Rust embedding and tokenizer service handling 12k req/s on two small boxes.' },
            { y: 'Now', t: 'Agents that behave', d: 'Designing tool-using AI agents with tracing, replay and strict latency budgets.' },
          ].map((m, i) => (
            <Reveal key={m.y} delay={i * 0.08} className="group relative pb-12 last:pb-0">
              <span className="absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-accent bg-bg transition-all duration-300 group-hover:scale-150 group-hover:bg-accent md:-left-12" />
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{m.y}</p>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">{m.t}</h3>
              <p className="mt-2 max-w-2xl text-lg text-mute">{m.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-6 px-6 py-24 md:grid-cols-3 md:px-10">
        {[
          { k: 'Currently building', v: 'An open-source eval harness for LLM agents', e: '🛠️' },
          { k: 'Currently reading', v: 'Designing Data-Intensive Applications (again)', e: '📚' },
          { k: 'Currently learning', v: 'CUDA kernels and inference optimization', e: '⚡' },
        ].map((c, i) => (
          <Reveal key={c.k} delay={i * 0.1}>
            <TiltCard className="h-full rounded-3xl border border-line bg-panel p-8">
              <motion.span className="inline-block text-4xl" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>{c.e}</motion.span>
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-mute">{c.k}</p>
              <p className="mt-2 font-display text-2xl leading-snug">{c.v}</p>
            </TiltCard>
          </Reveal>
        ))}
      </section>

      <section className="px-6 py-24 md:px-10">
        <Label>Beyond code</Label>
        <div className="mt-8 flex flex-wrap gap-3">
          {['☕ Pour-over nerd', '🏔️ Himalayan trekker', '♟️ 1800 on Lichess', '🎧 Lo-fi while debugging', '📸 Street photography', '🐈 Cat person', '🚴 Weekend cyclist', '🍜 Momo critic'].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, rotate: i % 2 ? 2 : -2 }}
              className="rounded-full border border-line bg-panel px-5 py-3 text-lg transition-colors hover:border-accent"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </section>
    </Page>
  )
}
