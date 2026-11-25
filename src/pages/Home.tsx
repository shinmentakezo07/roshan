import Hero from '../components/Hero'
import { Bento, Process, Testimonials, Writing, BigCTA } from '../components/HomeExtras'
import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects, services, skills } from '../content/data'
import { Label, Marquee, Page, Reveal, SplitReveal, ease } from '../components/anim'

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

export default function Home() {
  const all = skills.flatMap((g) => g.items.map(([n]) => n))
  return (
    <Page>
      <Hero />
      <div id="next" className="-rotate-2 border-y border-line bg-accent py-4 font-display text-3xl text-bg md:text-5xl">
        <Marquee items={all} speed={40} />
      </div>
      <FeaturedWork />
      <Statement />
      <Services />
      <Bento />
      <Process />
      <Testimonials />
      <Writing />
      <BigCTA />
    </Page>
  )
}
