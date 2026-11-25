import Hero from '../components/Hero'
import { Bento, Process, Testimonials, Writing, BigCTA } from '../components/HomeExtras'
import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects, services } from '../content/data'
import { Counter, Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

function FeaturedWork() {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22 }), sy = useSpring(y, { stiffness: 180, damping: 22 })
  const p = projects[active ?? 0]
  return (
    <section className="px-6 py-28 md:px-10" onMouseMove={(e) => { x.set(e.clientX); y.set(e.clientY) }}>
      <div className="mb-12 flex items-end justify-between">
        <div><Label>(01) Selected work</Label><h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="Things I've built" /></h2></div>
        <Link to="/work" className="link-u hidden font-mono text-xs uppercase tracking-widest md:inline">All projects →</Link>
      </div>
      <ul onMouseLeave={() => setActive(null)}>
        {projects.slice(0, 4).map((pr, i) => (
          <li key={pr.slug}>
            <Link
              to={`/work/${pr.slug}`}
              data-cursor="Open"
              onMouseEnter={() => setActive(i)}
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-line py-8 transition-colors last:border-b md:grid-cols-[4rem_1fr_1fr_auto]"
            >
              <span className="font-mono text-xs text-mute">0{i + 1}</span>
              <span className="font-display text-4xl transition-all duration-500 group-hover:translate-x-4 group-hover:italic group-hover:text-accent md:text-6xl">{pr.title}</span>
              <span className="hidden text-sm text-mute md:block">{pr.tags.join(' / ')}</span>
              <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </li>
        ))}
      </ul>
      <motion.div
        style={{ left: sx, top: sy, background: `radial-gradient(circle at 30% 20%, ${p.color}, #000000 75%)` }}
        animate={{ scale: active === null ? 0 : 1, rotate: active === null ? -8 : 0 }}
        transition={{ duration: 0.4, ease }}
        className="pointer-events-none fixed z-30 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 flex-col justify-end rounded-2xl p-6 text-bg md:flex"
      >
        <p className="font-mono text-xs uppercase">{p.year} · {p.role}</p>
        <p className="font-display text-4xl text-ink mix-blend-difference">{p.metric}</p>
      </motion.div>
    </section>
  )
}

function Services() {
  return (
    <section className="px-6 py-28 md:px-10">
      <Label>(02) What I do</Label>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="group h-full">
            <div className="relative h-full overflow-hidden bg-bg p-8 md:p-10">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <div className="relative transition-colors duration-500 group-hover:text-bg">
                <span className="font-mono text-xs">{s.n}</span>
                <h3 className="mt-16 font-display text-4xl">{s.title}</h3>
                <p className="mt-4 text-mute transition-colors duration-500 group-hover:text-bg/80">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section className="px-6 py-32 md:px-10">
      <p className="max-w-5xl font-display text-4xl leading-tight md:text-7xl">
        <SplitReveal text="I turn fuzzy AI ideas into" /> <span className="italic text-accent"><SplitReveal text="reliable systems" delay={0.3} /></span>
        <SplitReveal text="with latency budgets, evals and on-call runbooks." delay={0.45} />
      </p>
      <Reveal delay={0.3} className="mt-10">
        <Link to="/about" className="link-u font-mono text-xs uppercase tracking-widest">More about me →</Link>
      </Reveal>
    </section>
  )
}

function Stack() {
  const items = ['Go', 'Rust', 'Python', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'LangChain', 'pgvector', 'OpenAI', 'Grafana']
  return (
    <section className="px-6 py-28 md:px-10">
      <Label>(03) Daily drivers</Label>
      <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="The stack" /></h2>
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-8">
        {items.map((t, i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.03 }}
            className="group flex aspect-square flex-col items-center justify-center gap-2 bg-bg transition-colors duration-300 hover:bg-accent">
            <span className="font-display text-3xl italic transition-all duration-300 group-hover:scale-110 group-hover:text-bg">{t.slice(0, 2)}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute transition-colors group-hover:text-bg">{t}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="grid gap-6 px-6 py-16 md:grid-cols-4 md:px-10">
      {[{ v: 5, l: 'Years shipping' }, { v: 30, l: 'Projects live' }, { v: 120, l: 'OSS PRs merged' }, { v: 8, l: 'LLM apps in prod' }].map((x, i) => (
        <Reveal key={x.l} delay={i * 0.08}>
          <TiltCard className="rounded-3xl border border-line bg-panel p-8">
            <p className="font-display text-7xl text-accent"><Counter to={x.v} /></p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-mute">{x.l}</p>
          </TiltCard>
        </Reveal>
      ))}
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <div id="next" />
      <Numbers />
      <FeaturedWork />
      <Statement />
      <Services />
      <Stack />
      <Bento />
      <Process />
      <Testimonials />
      <Writing />
      <BigCTA />
    </Page>
  )
}
