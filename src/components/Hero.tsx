import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { SiGo, SiPython, SiRust, SiTypescript } from 'react-icons/si'
import { profile } from '../content/data'
import { Counter, Magnetic, SplitReveal, ease } from './anim'
import { useClock } from './Nav'

const NeuralBg = lazy(() => import('./NeuralBg'))

const roles = ['Backend Engineer', 'LLM / AI Engineer', 'Systems Builder', 'Full-Stack Dev']
const langs = [[SiGo, 'Go'], [SiRust, 'Rust'], [SiPython, 'Python'], [SiTypescript, 'TypeScript']] as const

const code = [
  ['$', 'roshan deploy --model rag-v3', 'cmd'],
  ['→', 'retriever   hybrid(bm25+vec)', 'ok'],
  ['→', 'reranker    p95 38ms', 'ok'],
  ['→', 'evals       accuracy 0.92', 'pass'],
  ['✓', 'live at api.roshan.dev', '2.1s'],
] as const

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600); return () => clearInterval(t) }, [])
  return (
    <span className="relative inline-grid h-[1.45em] overflow-hidden pt-[0.1em] align-bottom" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="text-ink" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease }}>
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Deploy() {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setInterval(() => setN((v) => (v >= code.length + 4 ? 0 : v + 1)), 650); return () => clearInterval(t) }, [])
  const done = n >= code.length
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease }}
      className="relative w-full max-w-md"
      aria-label="Example deploy log"
    >
      <div aria-hidden className="absolute -inset-px rounded-2xl bg-[conic-gradient(from_180deg,transparent_60%,#ff5b1f_80%,transparent)] opacity-60 blur-[1px]" />
      <div className="relative rounded-2xl bg-black/90 backdrop-blur">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] text-mute">
          <span>~/roshan — zsh</span>
          <span className={`flex items-center gap-2 ${done ? 'text-[#c6f432]' : 'text-accent'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-[#c6f432]' : 'animate-pulse bg-accent'}`} />{done ? 'deployed' : 'deploying'}
          </span>
        </div>
        <ol className="min-h-[176px] space-y-1 p-5 font-mono text-[12.5px] leading-6">
          {code.slice(0, Math.min(n, code.length)).map(([p, l, s], i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-[1rem_1fr_auto] gap-2 whitespace-pre">
              <span className={i === 0 ? 'text-accent' : i === code.length - 1 ? 'text-[#c6f432]' : 'text-mute'}>{p}</span>
              <span className={i === 0 ? 'text-ink' : 'text-ink/75'}>{l}</span>
              {s !== 'cmd' && <span className={i === code.length - 1 ? 'text-mute' : 'text-[#c6f432]'}>{s}</span>}
            </motion.li>
          ))}
          {!done && <li aria-hidden className="inline-block h-4 w-2 animate-pulse bg-accent" />}
        </ol>
        <div className="grid grid-cols-2 border-t border-line">
          {profile.stats.map((s, i) => (
            <div key={s.label} className={`px-5 py-4 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line' : ''}`}>
              <p className="font-display text-3xl leading-none"><Counter to={s.value} /></p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.figure>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 120])
  const o = useTransform(scrollY, [0, 600], [1, 0])
  const nameX = useTransform(scrollY, [0, 700], [0, -80])
  const time = useClock()

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-6 pb-10 pt-28 md:px-10">
      <Suspense fallback={null}><NeuralBg /></Suspense>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[140px]" />

      <motion.div style={{ y, opacity: o }} className="flex flex-1 flex-col">
        {/* status rail */}
        <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-widest text-mute">
          {profile.available && (
            <div className="flex items-center gap-2 text-ink">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-[#c6f432]" /><span className="h-2 w-2 rounded-full bg-[#c6f432]" /></span>
              <dt className="sr-only">Status</dt><dd>Open to work · 2026</dd>
            </div>
          )}
          <div className="flex gap-2"><dt>Based</dt><dd className="text-ink">{profile.location}</dd></div>
          <div className="flex gap-2"><dt>Local</dt><dd className="tabular-nums text-ink">{time} NPT</dd></div>
        </motion.dl>

        <div className="mt-10 grid flex-1 content-center items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-mono text-sm text-accent">
              {'// hello, world — I am'}
            </motion.p>
            <h1 className="mt-4 font-display leading-[0.82] tracking-tight">
              <span className="block text-[clamp(4rem,13vw,11rem)]"><SplitReveal text={profile.first} now delay={0.35} /></span>
              <motion.span style={{ x: nameX }} className="block pl-[8vw] text-[clamp(4rem,13vw,11rem)] italic text-accent">
                <SplitReveal text={profile.last} now delay={0.5} />
              </motion.span>
            </h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease }}
              className="mt-10 grid max-w-3xl gap-5 border-l border-accent pl-6 md:grid-cols-[11rem_1fr] md:items-start md:gap-10">
              <p className="font-mono text-xs uppercase tracking-widest text-mute">Currently<br /><span className="text-base normal-case tracking-normal md:text-lg"><RotatingRole /></span></p>
              <p className="text-base leading-relaxed text-mute md:text-lg">
                {profile.tagline} APIs, RAG pipelines and agents in{' '}
                {langs.map(([Icon, n], i) => (
                  <span key={n} className="whitespace-nowrap text-ink"><Icon aria-hidden className="mr-1 inline align-[-2px]" size={14} />{n}{i < langs.length - 2 ? ', ' : i === langs.length - 2 ? ' and ' : ''}</span>
                ))}
                {' '}— with evals, latency budgets and clean on-call.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, ease }} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link to="/work" data-cursor="View" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent py-2 pl-7 pr-2 font-medium text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  See my work
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-accent transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={18} /></span>
                </Link>
              </Magnetic>
              <Link to="/contact" className="link-u px-4 py-4 font-medium">Get in touch</Link>
              <a href={profile.resume} className="inline-flex items-center gap-2 px-2 py-4 font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-ink">
                <Download size={14} aria-hidden /> Resume
              </a>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end"><Deploy /></div>
        </div>

        <a href="#next" className="mt-14 flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-widest text-mute transition-colors hover:text-accent">
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowDown size={14} /></motion.span>
          Scroll to explore
        </a>
      </motion.div>
    </section>
  )
}
