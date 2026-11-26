import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Cpu, Database, GitBranch, Headphones, Sparkles, Zap } from 'lucide-react'
import { SiGo, SiPython, SiRust, SiTypescript, SiNextdotjs, SiNodedotjs, SiPostgresql, SiRedis, SiDocker, SiKubernetes } from 'react-icons/si'
import { profile } from '../content/data'
import { Label, Reveal, SplitReveal, ease } from './anim'
import { useClock } from './Nav'

// ---------- placeholder content (move to data.ts when real) ----------
const process = [
  { n: '01', t: 'Discover', d: 'Map the problem, users and constraints. Define what "good" means with numbers.', icon: Sparkles },
  { n: '02', t: 'Design', d: 'APIs, data models and LLM pipelines on paper first. Latency and cost budgets agreed.', icon: GitBranch },
  { n: '03', t: 'Build', d: 'Small vertical slices, typed end-to-end, evals and tests from day one.', icon: Cpu },
  { n: '04', t: 'Ship & measure', d: 'Observability, dashboards, runbooks. Iterate on real traffic, not vibes.', icon: Zap },
]
const testimonials = [
  { q: 'Roshan rebuilt our LLM backend in three weeks. Costs dropped 40% and nobody got paged.', a: 'Priya S.', r: 'CTO, Acme AI' },
  { q: 'Rare engineer who can talk evals with researchers and SLOs with SREs in the same meeting.', a: 'Daniel K.', r: 'Head of Eng, Nimbus' },
  { q: 'Our RAG went from demo to production with citations and real accuracy numbers.', a: 'Mira T.', r: 'PM, DocuCorp' },
  { q: 'Fast, calm, and writes the docs. Would hire again in a heartbeat.', a: 'Alex R.', r: 'Founder, Startup Co' },
]
const writing = [
  { t: 'Semantic caching cut our LLM bill by 40%', d: 'Nov 2026', m: '8 min' },
  { t: 'Evals before vibes: a practical guide', d: 'Sep 2026', m: '12 min' },
  { t: 'Writing an HNSW index in Rust', d: 'Jun 2026', m: '15 min' },
]
const orbit = [SiGo, SiPython, SiRust, SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql, SiRedis, SiDocker, SiKubernetes]

// ---------- Bento ----------
function Heatmap() {
  const cells = useMemo(() => Array.from({ length: 7 * 26 }, () => Math.random()), [])
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {cells.map((v, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 26) * 0.015 }}
          className="h-2.5 w-2.5 rounded-[2px]"
          style={{ background: v > 0.85 ? '#ff5b1f' : v > 0.6 ? '#ff5b1f99' : v > 0.35 ? '#ff5b1f44' : '#1a1a1a' }}
        />
      ))}
    </div>
  )
}

function Orbit() {
  return (
    <div className="relative mx-auto h-56 w-56">
      {[0, 1].map((ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 rounded-full border border-line"
          style={{ inset: ring * 36 }}
          animate={{ rotate: ring ? -360 : 360 }}
          transition={{ duration: ring ? 26 : 40, repeat: Infinity, ease: 'linear' }}
        >
          {orbit.filter((_, i) => i % 2 === ring).map((Icon, i, arr) => {
            const a = (i / arr.length) * Math.PI * 2
            return (
              <span key={i} className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-black text-lg text-mute"
                style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}>
                <Icon />
              </span>
            )
          })}
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center font-display text-4xl italic">RK</div>
    </div>
  )
}

function Card({ className = '', children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease, delay }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl border border-line bg-panel p-6 transition-colors hover:border-[#333] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Bento() {
  const time = useClock()
  return (
    <section className="px-6 py-28 md:px-10">
      <Label>(04) At a glance</Label>
      <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="A little about" /> <span className="italic text-accent"><SplitReveal text="how I work" delay={0.2} /></span></h2>
      <div className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-4">
        <Card className="md:col-span-2 md:row-span-2">
          <Label>Stack orbit</Label>
          <div className="mt-6"><Orbit /></div>
          <p className="mt-6 text-mute">Go and Rust for speed, Python for AI, TypeScript for people. Postgres, Redis and Kubernetes underneath.</p>
        </Card>
        <Card delay={0.05}>
          <Label>Local time</Label>
          <p className="mt-6 font-display text-5xl tabular-nums">{time.slice(0, 5)}</p>
          <p className="mt-2 font-mono text-xs text-mute">{profile.location} · UTC+5:45</p>
        </Card>
        <Card delay={0.1}>
          <Label>Currently building</Label>
          <p className="mt-6 font-display text-3xl">AgentForge v2</p>
          <div className="mt-4 h-1 overflow-hidden rounded bg-line">
            <motion.div className="h-full bg-accent" initial={{ width: 0 }} whileInView={{ width: '68%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease }} />
          </div>
          <p className="mt-2 font-mono text-xs text-mute">68% · streaming tool calls</p>
        </Card>
        <Card className="md:col-span-2" delay={0.15}>
          <div className="flex items-center justify-between"><Label>Commits · last 6 months</Label><span className="font-mono text-xs text-accent">1,284</span></div>
          <div className="mt-6 overflow-hidden"><Heatmap /></div>
        </Card>
        <Card delay={0.05} className="bg-accent text-black">
          <Database />
          <p className="mt-10 font-display text-5xl">2M+</p>
          <p className="font-mono text-xs uppercase">LLM requests / day served</p>
        </Card>
        <Card delay={0.1}>
          <Label>Latency budget</Label>
          <div className="mt-6 flex h-20 items-end gap-1.5">
            {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
              <motion.span key={i} className="flex-1 rounded-t bg-ink/80" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease }} />
            ))}
          </div>
          <p className="mt-3 font-mono text-xs text-mute">p95 under 120 ms</p>
        </Card>
        <Card className="md:col-span-2" delay={0.15}>
          <Label>Now</Label>
          <ul className="mt-4 space-y-2 text-lg">
            {([
              [BookOpen, 'Reading', 'Designing Data-Intensive Applications (again)'],
              [SiRust, 'Learning', 'async Rust internals'],
              [Headphones, 'Listening', 'lo-fi while debugging Kafka'],
            ] as const).map(([Icon, k, v]) => (
              <li key={k} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><Icon className="h-4 w-4" strokeWidth={2} /></span>
                <span>{k} <span className="text-mute">{v}</span></span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

// ---------- Process: horizontal scroll pinned ----------
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])
  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-10">
          <Label>(05) Process</Label>
          <h2 className="mt-3 font-display text-5xl md:text-7xl">From idea to <span className="italic text-accent">production</span></h2>
        </div>
        <motion.div style={{ x }} className="mt-12 flex gap-6 px-6 md:px-10">
          {process.map((p) => (
            <div key={p.n} className="group relative h-[22rem] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-line bg-panel p-8 md:w-[34rem]">
              <span className="pointer-events-none absolute -right-4 -top-10 font-display text-[12rem] leading-none text-transparent [-webkit-text-stroke:1px_#222] transition-colors group-hover:[-webkit-text-stroke:1px_#ff5b1f]">{p.n}</span>
              <p.icon className="text-accent" size={28} />
              <h3 className="mt-24 font-display text-5xl">{p.t}</h3>
              <p className="mt-4 max-w-sm text-mute">{p.d}</p>
            </div>
          ))}
        </motion.div>
        <div className="mx-6 mt-10 h-px bg-line md:mx-10">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-accent" />
        </div>
      </div>
    </section>
  )
}

// ---------- Testimonials ----------
export function Testimonials() {
  const row = [...testimonials, ...testimonials]
  return (
    <section className="py-28">
      <div className="px-6 md:px-10">
        <Label>(06) Kind words</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="People I've built with" /></h2>
      </div>
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <motion.div className="flex w-max gap-6 px-6" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {row.map((t, i) => (
            <figure key={i} className="w-[22rem] shrink-0 rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent md:w-[28rem]">
              <span className="font-display text-6xl leading-none text-accent">“</span>
              <blockquote className="mt-2 text-xl leading-relaxed">{t.q}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-xs text-black">{t.a.split(' ').map((w) => w[0]).join('')}</span>
                <span><span className="block">{t.a}</span><span className="font-mono text-xs text-mute">{t.r}</span></span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Writing ----------
export function Writing() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section className="px-6 py-28 md:px-10">
      <Label>(07) Writing</Label>
      <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="Notes from the backend" /></h2>
      <ul className="mt-12" onMouseLeave={() => setHover(null)}>
        {writing.map((w, i) => (
          <Reveal key={w.t} delay={i * 0.06}>
            <li onMouseEnter={() => setHover(i)}
              className={`group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line py-7 transition-opacity last:border-b md:grid-cols-[8rem_1fr_6rem_auto] ${hover !== null && hover !== i ? 'opacity-30' : ''}`}>
              <span className="hidden font-mono text-xs text-mute md:block">{w.d}</span>
              <span className="text-2xl transition-transform duration-500 group-hover:translate-x-3 md:text-3xl">{w.t}</span>
              <span className="hidden font-mono text-xs text-mute md:block">{w.m}</span>
              <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent" />
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

// ---------- Big CTA ----------
export function BigCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-40 text-center md:px-10">
      <div className="relative">
        <Label>(08) Next step</Label>
        <h2 className="mx-auto mt-6 max-w-5xl font-display text-6xl leading-[0.95] md:text-9xl">
          <SplitReveal text="Have an idea?" /> <span className="italic text-accent"><SplitReveal text="Let's ship it." delay={0.2} /></span>
        </h2>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }} className="mt-12 inline-block">
          <Link to="/contact" className="group inline-flex h-40 w-40 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-110 md:h-48 md:w-48">
            <span className="font-mono text-xs uppercase tracking-widest">Start a project</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
