import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { experience } from '../content/data'
import { Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Career</Label>
        <h1 className="mt-4 font-display text-[16vw] leading-[0.85] md:text-[10vw]">
          <SplitReveal text="Experience" now />
        </h1>
        <Reveal delay={0.3}><p className="mt-8 max-w-2xl text-xl text-mute">Five years across startups and product teams, mostly owning the backend, the data layer and lately the LLM stack on top.</p></Reveal>
      </section>
      <section className="px-6 py-20 md:px-10">
        {experience.map((e, i) => {
          const isOpen = open === i
          return (
            <Reveal key={e.org} delay={i * 0.08}>
              <div className={`border-t border-line transition-colors duration-500 last:border-b ${isOpen ? "bg-panel/60" : ""}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-8 text-left md:grid-cols-[12rem_1fr_1fr_auto]">
                  <span className="font-mono text-xs text-mute">{e.period}</span>
                  <span className="font-display text-4xl transition-colors group-hover:text-accent md:text-6xl">{e.org}</span>
                  <span className="hidden text-mute md:block">{e.role}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ ease }}><Plus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                      <div className="grid gap-8 pb-10 md:grid-cols-[12rem_1fr_1fr]">
                        <span className="font-mono text-xs text-mute">{e.place}</span>
                        <div>
                          <p className="text-xl">{e.role}</p>
                          <p className="mt-2 text-mute">{e.summary}</p>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {e.stack.map((s) => <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">{s}</span>)}
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {e.points.map((p) => <li key={p} className="flex gap-3"><span className="text-accent">✦</span>{p}</li>)}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </section>
      <section className="px-6 py-24 md:px-10">
        <Label>Recognition</Label>
        <h2 className="mt-3 font-display text-5xl md:text-7xl"><SplitReveal text="Certs & wins" /></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { y: '2025', t: 'AWS Solutions Architect – Professional', d: 'Certified in designing distributed systems on AWS.' },
            { y: '2024', t: '1st place · Kathmandu AI Hackathon', d: 'Built a Nepali-language RAG assistant in 36 hours.' },
            { y: '2023', t: 'Speaker · PyCon Nepal', d: 'Talk: “Evals or it didn’t happen” on testing LLM apps.' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <TiltCard className="h-full rounded-3xl border border-line bg-panel p-8">
                <p className="font-mono text-xs text-accent">{c.y}</p>
                <p className="mt-8 font-display text-3xl leading-tight">{c.t}</p>
                <p className="mt-3 text-mute">{c.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  )
}
