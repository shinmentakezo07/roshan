import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../content/data'
import { Label, Page, SplitReveal, ease } from '../components/anim'

export default function Work() {
  const tags = ['All', ...new Set(projects.flatMap((p) => p.tags))]
  const [tag, setTag] = useState('All')
  const list = projects.filter((p) => tag === 'All' || p.tags.includes(tag))

  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Index · {projects.length} projects</Label>
        <h1 className="mt-4 font-display text-[18vw] leading-[0.85] md:text-[11vw]">
          <SplitReveal text="Work" now /> <span className="italic text-accent"><SplitReveal text="archive" now delay={0.15} /></span>
        </h1>
        <div className="mt-12 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`relative rounded-full border px-4 py-2 font-mono text-xs transition-colors ${tag === t ? 'border-accent text-bg' : 'border-line text-mute hover:text-ink'}`}
            >
              {tag === t && <motion.span layoutId="pill" className="absolute inset-0 -z-10 rounded-full bg-accent" />}
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 px-6 py-16 md:grid-cols-2 md:px-10">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            >
              <Link to={`/work/${p.slug}`} data-cursor="Open" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-panel">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ background: `radial-gradient(circle at 70% 30%, ${p.color}cc, transparent 60%), radial-gradient(circle at 20% 90%, ${p.color}44, transparent 50%)` }}
                  />
                  <span className="absolute left-6 top-6 font-mono text-xs">{p.year}</span>
                  <span className="absolute bottom-4 left-6 font-display text-6xl italic opacity-90 md:text-8xl">{p.title}</span>
                  <span className="absolute right-6 top-6 rounded-full bg-bg/60 px-3 py-1 font-mono text-xs backdrop-blur">{p.metric}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="text-mute">{p.desc}</p>
                  <ArrowUpRight className="shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </Page>
  )
}
