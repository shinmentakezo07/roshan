import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'
import { SiGo, SiPython, SiRust, SiTypescript, SiNextdotjs, SiNodedotjs } from 'react-icons/si'
import { profile } from '../content/data'
import { Counter, Magnetic, SplitReveal, ease } from './anim'
import { useClock } from './Nav'

const NeuralBg = lazy(() => import('./NeuralBg'))

const roles = ['Backend Engineer', 'LLM / AI Engineer', 'Systems Builder', 'Full-Stack Dev']
const tech = [
  [SiGo, 'Go'], [SiPython, 'Python'], [SiRust, 'Rust'],
  [SiTypescript, 'TypeScript'], [SiNodedotjs, 'Node.js'], [SiNextdotjs, 'Next.js'],
] as const

const code = [
  ['$ ', 'roshan deploy --model rag-v3'],
  ['→ ', 'retriever   hybrid(bm25+vec)  ok'],
  ['→ ', 'reranker    p95 38ms          ok'],
  ['→ ', 'evals       accuracy 0.92     pass'],
  ['✓ ', 'live at api.roshan.dev  (2.1s)'],
]

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400); return () => clearInterval(t) }, [])
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="inline-block text-accent"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Terminal() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= code.length + 3 ? 0 : v + 1)), 700)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 1, duration: 1, ease }}
      whileHover={{ rotate: -1, scale: 1.02 }}
      className="w-full max-w-md rounded-2xl border border-line bg-black"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-mute">~/roshan — zsh</span>
      </div>
      <div className="min-h-[170px] p-5 font-mono text-[12px] leading-6 md:text-[13px]">
        {code.slice(0, Math.min(n, code.length)).map(([p, l], i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="whitespace-pre">
            <span className={i === 0 ? 'text-accent' : i === code.length - 1 ? 'text-[#c6f432]' : 'text-mute'}>{p}</span>
            <span className={i === 0 ? 'text-ink' : 'text-ink/80'}>{l}</span>
          </motion.div>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 140])
  const o = useTransform(scrollY, [0, 600], [1, 0])
  const time = useClock()

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-6 pb-8 pt-28 md:px-10">
      <Suspense fallback={null}><NeuralBg /></Suspense>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div style={{ y, opacity: o }} className="flex flex-1 flex-col">
        {/* top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease }}
          className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-mute"
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-ink">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-accent" /><span className="h-2 w-2 rounded-full bg-accent" /></span>
              Available for work · 2026
            </span>
          )}
          <span className="rounded-full border border-line px-3 py-1.5">📍 {profile.location}</span>
          <span className="rounded-full border border-line px-3 py-1.5">{time} NPT</span>
        </motion.div>

        {/* main grid */}
        <div className="mt-10 grid flex-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-mono text-sm text-accent">
              {'// hello, world — I am'}
            </motion.p>
            <h1 className="mt-3 font-display text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.88] tracking-tight">
              <SplitReveal text={profile.first} now delay={0.35} />
              <span className="italic text-accent"><SplitReveal text={profile.last} now delay={0.5} /></span>
            </h1>
            <p className="mt-6 text-2xl font-medium md:text-4xl">
              <RotatingRole />
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, ease }}
              className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg"
            >
              {profile.tagline} I design APIs, RAG pipelines and agent systems in <span className="text-ink">Go, Rust, Python and TypeScript</span> — with evals, latency budgets and clean on-call.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link to="/work" data-cursor="View" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-bg transition hover:brightness-110">
                  See my work <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-medium transition hover:border-ink">
                  Get in touch
                </Link>
              </Magnetic>
              <a href={profile.resume} className="link-u ml-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">
                <Download size={14} /> Resume
              </a>
            </motion.div>

            {/* tech row */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Stack</span>
              {tech.map(([Icon, name], i) => (
                <motion.span
                  key={name}
                  title={name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.07, ease }}
                  whileHover={{ y: -4, scale: 1.2 }}
                  className="text-2xl text-mute transition-colors hover:text-accent"
                >
                  <Icon />
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Terminal />
          </div>
        </div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, ease }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-[repeat(4,1fr)_auto]"
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-black px-5 py-4">
              <p className="font-display text-3xl text-ink md:text-4xl"><Counter to={s.value} /></p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">{s.label}</p>
            </div>
          ))}
          <a href="#next" className="col-span-2 flex items-center justify-center gap-2 bg-black px-6 py-4 font-mono text-[11px] uppercase tracking-widest text-mute hover:text-accent md:col-span-1">
            Scroll <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowDownRight size={16} /></motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
