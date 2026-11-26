import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowUpRight, Bike, BookOpen, Bot, Boxes, Camera, Cat, Coffee, Cpu, Crown, Flag, Gauge, Headphones, MapPin, Mountain, Network,
  Rocket, SearchCode, SlidersHorizontal, Soup, Sparkles, Wrench, Zap, type LucideIcon,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa'
import {
  SiApachekafka, SiDocker, SiFramer, SiGo, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiRedis, SiRust,
  SiTailwindcss, SiTypescript,
} from 'react-icons/si'
import { principles, profile, skills } from '../content/data'
import { Counter, Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'
import { CalendarClock, GitPullRequest } from 'lucide-react'

const statIcons: LucideIcon[] = [CalendarClock, Rocket, GitPullRequest, Bot]
const orbit: [IconType, string][] = [
  [SiGo, '#00ADD8'], [SiRust, '#DEA584'], [SiPython, '#3776AB'], [SiTypescript, '#3178C6'],
  [SiPostgresql, '#4169E1'], [SiDocker, '#2496ED'], [SiRedis, '#FF4438'], [SiReact, '#61DAFB'],
]

// Highlight key terms in bio copy with an animated underline.
const KEYWORDS = /(Go|Rust|Python|TypeScript|APIs|queues|databases|LLM pipelines|latency budgets|evals|on-call runbooks)/g
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(KEYWORDS).map((part, i) =>
        i % 2 ? (
          <span key={i} className="relative whitespace-nowrap text-fg">
            {part}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left rounded-full bg-accent/70"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.05 }}
            />
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

const terminal = [
  ['$', 'whoami'],
  ['>', 'roshan · full-stack, backend-first'],
  ['$', 'cat focus.txt'],
  ['>', 'llm systems · latency · evals'],
]

const ACCENT = 'var(--color-accent, currentColor)'

// Brand marks (simpleicons colors); concepts without a brand get a lucide glyph in the accent color.
const logos: Record<string, [IconType | LucideIcon, string]> = {
  Go: [SiGo, '#00ADD8'], Python: [SiPython, '#3776AB'], Rust: [SiRust, '#DEA584'], TypeScript: [SiTypescript, '#3178C6'],
  'Node.js': [SiNodedotjs, '#5FA04E'], SQL: [SiPostgresql, '#4169E1'], PostgreSQL: [SiPostgresql, '#4169E1'],
  Redis: [SiRedis, '#FF4438'], Kafka: [SiApachekafka, 'currentColor'], 'Docker / K8s': [SiDocker, '#2496ED'], AWS: [FaAws, '#FF9900'],
  React: [SiReact, '#61DAFB'], 'Next.js': [SiNextdotjs, 'currentColor'], Tailwind: [SiTailwindcss, '#06B6D4'], 'Framer Motion': [SiFramer, '#0055FF'],
  RAG: [SearchCode, ACCENT], Agents: [Bot, ACCENT], Evals: [Gauge, ACCENT], 'Fine-tuning': [SlidersHorizontal, ACCENT],
  'Vector DBs': [Boxes, ACCENT], gRPC: [Network, '#4AA3B8'],
}

const marquee: [IconType, string][] = [
  [SiGo, '#00ADD8'], [SiPython, '#3776AB'], [SiRust, '#DEA584'], [SiTypescript, '#3178C6'], [SiNodedotjs, '#5FA04E'],
  [SiPostgresql, '#4169E1'], [SiRedis, '#FF4438'], [SiApachekafka, 'currentColor'], [SiDocker, '#2496ED'], [FaAws, '#FF9900'],
  [SiReact, '#61DAFB'], [SiNextdotjs, 'currentColor'], [SiTailwindcss, '#06B6D4'], [SiFramer, '#0055FF'],
]

const journey: { y: string; t: string; d: string; Icon: LucideIcon }[] = [
  { y: '2019', t: 'First production API', d: 'Shipped a Node.js booking backend for a local travel agency. Learned what 3am pages feel like.', Icon: Flag },
  { y: '2021', t: 'Went deep on Go', d: 'Rebuilt a payments service in Go, cutting infra cost by 60% and p99 latency by 4x.', Icon: Zap },
  { y: '2023', t: 'LLMs in production', d: 'Built RAG pipelines with evals, guardrails and cost dashboards for two SaaS products.', Icon: Sparkles },
  { y: '2024', t: 'Rust for the hot path', d: 'Wrote a Rust embedding and tokenizer service handling 12k req/s on two small boxes.', Icon: Cpu },
  { y: 'Now', t: 'Agents that behave', d: 'Designing tool-using AI agents with tracing, replay and strict latency budgets.', Icon: Rocket },
]

const current: { k: string; v: string; Icon: LucideIcon }[] = [
  { k: 'Currently building', v: 'An open-source eval harness for LLM agents', Icon: Wrench },
  { k: 'Currently reading', v: 'Designing Data-Intensive Applications (again)', Icon: BookOpen },
  { k: 'Currently learning', v: 'CUDA kernels and inference optimization', Icon: Cpu },
]

const hobbies: [LucideIcon, string][] = [
  [Coffee, 'Pour-over nerd'], [Mountain, 'Himalayan trekker'], [Crown, '1800 on Lichess'], [Headphones, 'Lo-fi while debugging'],
  [Camera, 'Street photography'], [Cat, 'Cat person'], [Bike, 'Weekend cyclist'], [Soup, 'Momo critic'],
]

function Glow({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute rounded-full bg-accent/10 blur-3xl ${className}`} />
}

export default function About() {
  const journeyRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start 80%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Page>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 md:px-10">
        <Glow className="-left-40 top-10 h-[28rem] w-[28rem]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-line,#888)_1px,transparent_1px),linear-gradient(90deg,var(--color-line,#888)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]"
        />
        <div className="relative">
          <Label>About</Label>
          <h1 className="mt-4 max-w-6xl font-display text-6xl leading-[0.95] md:text-9xl">
            <SplitReveal text="Backend brain," now /> <span className="italic text-accent"><SplitReveal text="AI hands." now delay={0.2} /></span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest text-mute"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-accent" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              Open to work
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Backend · LLM systems
            </span>
          </motion.div>
        </div>
      </section>

      {/* Logo marquee */}
      <section aria-hidden className="mt-20 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <motion.div className="flex w-max gap-12" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, ease: 'linear', repeat: Infinity }}>
          {[...marquee, ...marquee].map(([Icon, color], i) => (
            <Icon key={i} className="h-9 w-9 opacity-70 transition hover:opacity-100" style={{ color }} />
          ))}
        </motion.div>
      </section>

      {/* Bio */}
      <section className="grid gap-12 px-6 py-24 md:grid-cols-[1fr_1.3fr] md:px-10">
        <Reveal>
          <TiltCard className="group relative overflow-hidden rounded-3xl border border-line bg-panel">
            <motion.div
              aria-hidden
              className="absolute -inset-1/3 opacity-60"
              style={{ background: 'conic-gradient(from 0deg, #ff5b1f, transparent 25%, #c6f432 50%, transparent 75%, #ff5b1f)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative m-[2px] rounded-[1.4rem] bg-bg/90 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-mute">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                  </span>
                  Online
                </span>
                <span>{new Date().getFullYear()}</span>
              </div>

              {/* Orbiting stack around monogram */}
              <div className="relative mx-auto my-8 grid aspect-square w-full max-w-[18rem] place-items-center">
                <div aria-hidden className="absolute inset-0 rounded-full border border-dashed border-line" />
                <div aria-hidden className="absolute inset-[18%] rounded-full border border-line/60" />
                <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
                  {orbit.map(([Icon, color], i) => {
                    const a = (i / orbit.length) * Math.PI * 2
                    return (
                      <motion.span
                        key={i}
                        className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-line bg-panel shadow-lg"
                        style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      >
                        <Icon className="h-5 w-5" style={{ color }} />
                      </motion.span>
                    )
                  })}
                </motion.div>
                <motion.div
                  className="relative grid h-28 w-28 place-items-center rounded-full bg-accent/10 ring-1 ring-accent/40"
                  animate={{ boxShadow: ['0 0 0 0 rgba(255,91,31,0.35)', '0 0 0 24px rgba(255,91,31,0)'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                >
                  <span className="font-display text-5xl italic text-accent">RK</span>
                </motion.div>
              </div>

              <p className="font-display text-3xl">{profile.name}</p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-mute"><MapPin className="h-3 w-3" /> {profile.location}</p>

              {/* Mini terminal */}
              <div className="mt-6 rounded-xl border border-line bg-panel/80 p-4 font-mono text-xs">
                <div className="mb-3 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                {terminal.map(([p, t], i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.35 }}
                    className={p === '$' ? 'text-fg' : 'text-mute'}
                  >
                    <span className="text-accent">{p}</span> {t}
                  </motion.p>
                ))}
                <motion.span
                  className="mt-1 inline-block h-3.5 w-2 bg-accent align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="flex flex-col justify-center space-y-8">
          {profile.about.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className={`leading-relaxed ${i === 0 ? 'font-display text-3xl md:text-5xl md:leading-tight' : 'text-xl text-mute md:text-2xl'}`}>
                <Highlight text={t} />
              </p>
            </Reveal>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {profile.stats.map((s, i) => {
              const Icon = statIcons[i % statIcons.length]
              return (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-accent/60"
                  >
                    <Glow className="-right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <motion.div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease, delay: 0.3 + i * 0.1 }}
                    />
                    <div className="relative flex items-start justify-between">
                      <p className="font-display text-5xl text-accent md:text-6xl"><Counter to={s.value} /></p>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent group-hover:text-bg">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                    </div>
                    <p className="relative mt-2 font-mono text-xs uppercase tracking-widest text-mute">{s.label}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-24 md:px-10">
        <Label>Toolbox</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="What I work with" /></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08}>
              <TiltCard className="relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent/50">
                <Glow className="-right-20 -top-20 h-56 w-56" />
                <div className="relative flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.group}</h3>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-mute">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="relative mt-6 space-y-3">
                  {g.items.map(([name, lvl], i) => {
                    const [Icon, color] = logos[name] ?? [Boxes, 'currentColor']
                    return (
                      <motion.li
                        key={name}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                        style={{ '--brand': color } as React.CSSProperties}
                        className="group flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-line hover:bg-bg/50"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] ring-1 ring-line transition duration-300 group-hover:scale-110 group-hover:ring-[color-mix(in_srgb,var(--brand)_50%,transparent)] group-hover:[filter:drop-shadow(0_0_12px_color-mix(in_srgb,var(--brand)_45%,transparent))]">
                          <Icon className="h-5 w-5" style={{ color }} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between text-sm"><span>{name}</span><span className="font-mono text-mute">{lvl}</span></div>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                            <motion.div
                              className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-[var(--brand)]"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: lvl / 100 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease, delay: i * 0.06 }}
                            />
                          </div>
                        </div>
                      </motion.li>
                    )
                  })}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-24 md:px-10">
        <Label>Principles</Label>
        <ol className="mt-8">
          {principles.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <li className="group relative flex items-center gap-6 overflow-hidden border-t border-line py-6 last:border-b">
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent/10 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="w-10 font-mono text-xs text-mute transition-colors group-hover:text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display text-4xl transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent md:text-6xl">{p}</span>
                <ArrowUpRight className="h-8 w-8 -translate-x-4 text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Journey */}
      <section className="px-6 py-24 md:px-10">
        <Label>Journey</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="How I got here" /></h2>
        <div ref={journeyRef} className="relative mt-14 pl-12 md:pl-16">
          <div aria-hidden className="absolute left-5 top-0 h-full w-px bg-line md:left-6" />
          <motion.div aria-hidden className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent/20 md:left-6" style={{ scaleY: lineScale }} />
          {journey.map((m, i) => (
            <Reveal key={m.y} delay={i * 0.06} className="group relative pb-10 last:pb-0">
              <span className="absolute -left-12 top-0 grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-bg text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-bg md:-left-16 md:h-12 md:w-12">
                <m.Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
              </span>
              <div className="rounded-2xl border border-line bg-panel/60 p-6 transition-colors group-hover:border-accent/50 md:ml-4">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{m.y}</p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">{m.t}</h3>
                <p className="mt-2 max-w-2xl text-lg text-mute">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Now */}
      <section className="grid gap-6 px-6 py-24 md:grid-cols-3 md:px-10">
        {current.map((c, i) => (
          <Reveal key={c.k} delay={i * 0.1}>
            <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent">
              <Glow className="-right-16 -top-16 h-48 w-48 transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
              <div className="relative flex items-center justify-between">
                <motion.span
                  className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                >
                  <c.Icon className="h-6 w-6" strokeWidth={1.75} />
                </motion.span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Now
                </span>
              </div>
              <p className="relative mt-8 font-mono text-xs uppercase tracking-widest text-mute">{c.k}</p>
              <p className="relative mt-2 font-display text-2xl leading-snug">{c.v}</p>
            </TiltCard>
          </Reveal>
        ))}
      </section>

      {/* Beyond code */}
      <section className="px-6 py-24 md:px-10">
        <Label>Beyond code</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl">Off the <span className="italic text-accent">keyboard</span></h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {hobbies.map(([Icon, t], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-accent"
            >
              <Glow className="-bottom-12 -right-12 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-panel">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="relative mt-6 text-lg">{t}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Page>
  )
}
