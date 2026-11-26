import { motion } from 'framer-motion'
import { BookOpen, Hammer, MapPin, Mountain, RefreshCw, Target, type LucideIcon } from 'lucide-react'
import { SiRust } from 'react-icons/si'
import type { ComponentType } from 'react'
import { now } from '../content/pages'
import { Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

const icons: Record<string, LucideIcon | ComponentType<{ className?: string }>> = { Building: Hammer, Learning: SiRust, Reading: BookOpen, Life: Mountain }

export default function Now() {
  const updated = new Date(now.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Now</Label>
        <h1 className="mt-4 max-w-6xl font-display text-6xl leading-[0.95] md:text-9xl">
          <SplitReveal text="What I'm" now /> <span className="italic text-accent"><SplitReveal text="up to." now delay={0.2} /></span>
        </h1>
        <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
            <RefreshCw className="h-3.5 w-3.5" />Updated {updated}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2"><MapPin className="h-3.5 w-3.5 text-accent" />{now.location}</span>
        </div>
      </section>

      <section className="grid gap-6 px-6 py-24 md:grid-cols-2 md:px-10">
        {now.sections.map((s, i) => {
          const Icon = icons[s.k] ?? Hammer
          return (
            <Reveal key={s.k} delay={(i % 2) * 0.1}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent">
                <span className="pointer-events-none absolute -bottom-6 right-4 font-display text-[9rem] leading-none text-ink/[0.04]">{String(i + 1).padStart(2, '0')}</span>
                <div className="relative flex items-center gap-4">
                  <motion.span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}>
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <h2 className="font-display text-3xl">{s.k}</h2>
                </div>
                <ul className="relative mt-6 space-y-3">
                  {s.items.map((t) => (
                    <li key={t} className="flex gap-3 text-lg"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          )
        })}
      </section>

      <section className="px-6 pb-24 md:px-10">
        <Label>Goals this quarter</Label>
        <div className="mt-8 space-y-8">
          {now.goals.map((g, i) => (
            <Reveal key={g.t} delay={i * 0.08}>
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 font-display text-2xl md:text-3xl"><Target className="h-5 w-5 text-accent" />{g.t}</span>
                <span className="font-mono text-sm text-mute">{g.p}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent" initial={{ width: 0 }} whileInView={{ width: `${g.p}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.1 }} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-16 max-w-2xl text-mute">This is a <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="link-u text-ink">now page</a>. If you have your own, send it my way.</p>
      </section>
    </Page>
  )
}
