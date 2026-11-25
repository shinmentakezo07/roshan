import { motion } from 'framer-motion'
import { principles, profile, skills } from '../content/data'
import { Counter, Label, Page, Reveal, SplitReveal, ease } from '../components/anim'

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
              <div key={s.label} className="bg-bg p-6">
                <p className="font-display text-6xl text-accent"><Counter to={s.value} /></p>
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
              <div className="rounded-2xl border border-line p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.group}</h3>
                <ul className="mt-6 space-y-4">
                  {g.items.map(([name, lvl], i) => (
                    <li key={name}>
                      <div className="flex justify-between text-sm"><span>{name}</span><span className="font-mono text-mute">{lvl}</span></div>
                      <div className="mt-2 h-px bg-line">
                        <motion.div
                          className="h-px origin-left bg-ink"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: lvl / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease, delay: i * 0.06 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
    </Page>
  )
}
