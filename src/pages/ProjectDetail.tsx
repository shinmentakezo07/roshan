import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../content/data'
import { Label, Page, Reveal, SplitReveal } from '../components/anim'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.25])
  if (idx < 0) return <NotFound />
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  return (
    <Page>
      <motion.div style={{ scaleX: scrollYProgress, background: p.color }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left" />
      <section className="px-6 pt-40 md:px-10">
        <Link to="/work" className="link-u font-mono text-xs uppercase tracking-widest text-mute">← All work</Link>
        <h1 className="mt-6 font-display text-[20vw] leading-[0.85] md:text-[12vw]">
          <SplitReveal text={p.title} now />
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-mute md:text-2xl">{p.desc}</p>
        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          {[['Year', p.year], ['Role', p.role], ['Stack', p.tags.join(', ')], ['Impact', p.metric]].map(([k, v]) => (
            <div key={k}><Label>{k}</Label><p className="mt-2">{v}</p></div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-line bg-panel">
          <motion.div
            style={{ scale, background: `radial-gradient(circle at 70% 30%, ${p.color}, transparent 55%), radial-gradient(circle at 15% 85%, ${p.color}55, transparent 45%)` }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[14vw] italic text-ink/90 mix-blend-overlay">{p.title}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-16 px-6 py-20 md:grid-cols-2 md:px-10">
        <Reveal><Label>The problem</Label><p className="mt-4 font-display text-3xl leading-snug md:text-4xl">{p.problem}</p></Reveal>
        <Reveal delay={0.1}><Label>The solution</Label><p className="mt-4 text-lg leading-relaxed text-mute">{p.solution}</p></Reveal>
      </section>

      <section className="px-6 pb-20 md:px-10">
        <Label>Results</Label>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {p.results.map((r, i) => (
            <Reveal key={r} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line p-8">
                <span className="font-mono text-xs" style={{ color: p.color }}>0{i + 1}</span>
                <p className="mt-10 font-display text-3xl">{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex gap-4">
          <a href={p.link} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-bg transition-colors hover:bg-accent">Live site <ArrowUpRight size={16} /></a>
          <a href={p.repo} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition-colors hover:border-accent hover:text-accent"><FaGithub /> Source</a>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} data-cursor="Next" className="group block border-t border-line px-6 py-20 md:px-10">
        <Label>Next project</Label>
        <p className="mt-4 font-display text-7xl transition-all duration-500 group-hover:translate-x-6 group-hover:italic md:text-[9rem]" style={{ color: next.color }}>
          {next.title} →
        </p>
      </Link>
    </Page>
  )
}
