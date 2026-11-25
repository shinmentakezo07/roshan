import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Database, Sparkles } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiGo, SiRust, SiPython, SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql, SiRedis, SiApachekafka, SiDocker, SiKubernetes, SiGrafana, SiLangchain } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { services } from '../content/data'
import { Label, Reveal, SplitReveal, ease } from './anim'

const meta = [
  { tags: ['gRPC', 'Kafka', 'Postgres', 'SLOs'], kpi: '80k', unit: 'req/s per node' },
  { tags: ['RAG', 'Agents', 'Evals', 'Caching'], kpi: '−40%', unit: 'LLM cost' },
  { tags: ['Next.js', 'React', 'Types', 'CI/CD'], kpi: '0→1', unit: 'idea to deploy' },
]

export function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="px-6 py-28 md:px-10" aria-labelledby="services-h">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Label>(02) What I do</Label>
          <h2 id="services-h" className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">
            <SplitReveal text="Three ways" /> <span className="italic text-accent"><SplitReveal text="I help" delay={0.2} /></span>
          </h2>
          <p className="mt-6 max-w-xs text-mute">Pick a lane, or all three. Most projects end up touching every layer.</p>
        </div>
        <ul className="border-t border-line">
          {services.map((s, i) => {
            const on = open === i, m = meta[i]
            return (
              <li key={s.n} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`svc-${i}`}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                  className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent md:grid-cols-[5rem_1fr_auto]"
                >
                  <span className={`font-mono text-xs transition-colors duration-300 ${on ? 'text-accent' : 'text-mute'}`}>{s.n}</span>
                  <span className={`font-display text-4xl transition-all duration-500 md:text-6xl ${on ? 'translate-x-2 italic text-ink' : 'text-ink/50'}`}>{s.title}</span>
                  <span aria-hidden className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${on ? 'rotate-45 border-accent bg-accent text-bg' : 'border-line text-mute'}`}>
                    <ArrowUpRight size={16} />
                  </span>
                </button>
                <motion.div id={`svc-${i}`} initial={false} animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                  <div className="grid gap-6 pb-10 pl-16 md:grid-cols-[1fr_auto] md:pl-24">
                    <div>
                      <p className="max-w-md text-lg leading-relaxed text-ink/80">{s.desc}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {m.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mute">{t}</li>)}
                      </ul>
                    </div>
                    <div className="md:text-right">
                      <p className="font-display text-6xl leading-none text-accent">{m.kpi}</p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-mute">{m.unit}</p>
                    </div>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

const layers: { name: string; note: string; items: [string, IconType][] }[] = [
  { name: 'Languages', note: 'speed · AI · people', items: [['Go', SiGo], ['Rust', SiRust], ['Python', SiPython], ['TypeScript', SiTypescript]] },
  { name: 'Product', note: 'what users touch', items: [['Node.js', SiNodedotjs], ['Next.js', SiNextdotjs]] },
  { name: 'Data', note: 'state & streams', items: [['PostgreSQL', SiPostgresql], ['Redis', SiRedis], ['Kafka', SiApachekafka], ['pgvector', Database as IconType]] },
  { name: 'Infra', note: 'run & observe', items: [['Docker', SiDocker], ['Kubernetes', SiKubernetes], ['AWS', FaAws], ['Grafana', SiGrafana]] },
  { name: 'AI', note: 'models & glue', items: [['LangChain', SiLangchain], ['OpenAI', Sparkles as IconType]] },
]

export function Stack() {
  return (
    <section className="px-6 py-28 md:px-10" aria-labelledby="stack-h">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Label>(03) Daily drivers</Label>
          <h2 id="stack-h" className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="The stack," /> <span className="italic text-accent"><SplitReveal text="layered" delay={0.2} /></span></h2>
        </div>
        <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-widest text-mute">16 tools · 5 layers — read top to bottom like a request</p>
      </div>
      <ol className="mt-14">
        {layers.map((l, li) => (
          <li key={l.name} className="group border-t border-line last:border-b">
            <Reveal delay={li * 0.06} className="grid gap-4 py-6 md:grid-cols-[16rem_1fr] md:items-center">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-mute">L{li + 1}</span>
                <span className="font-display text-3xl transition-colors duration-300 group-hover:text-accent">{l.name}</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-mute lg:inline">{l.note}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {l.items.map(([t, Icon]) => (
                  <li key={t} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                    <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-line text-sm"><Icon size={14} /></span>
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
