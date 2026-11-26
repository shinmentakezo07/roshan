import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { posts } from '../content/pages'
import { Label, Page, Reveal, SplitReveal, ease } from '../components/anim'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Writing() {
  const tags = ['All', ...new Set(posts.map((p) => p.tag))]
  const [tag, setTag] = useState('All')
  const list = tag === 'All' ? posts : posts.filter((p) => p.tag === tag)
  const [lead, ...rest] = list

  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Writing</Label>
        <h1 className="mt-4 max-w-6xl font-display text-6xl leading-[0.95] md:text-9xl">
          <SplitReveal text="Notes from" now /> <span className="italic text-accent"><SplitReveal text="production." now delay={0.2} /></span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-mute">Latency, evals, and the unglamorous engineering that keeps LLM systems standing.</p>
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button key={t} onClick={() => setTag(t)} className={`relative rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${tag === t ? 'border-accent text-bg' : 'border-line hover:border-accent'}`}>
              {tag === t && <motion.span layoutId="wtag" className="absolute inset-0 rounded-full bg-accent" transition={{ duration: 0.4, ease }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        {lead && (
          <Reveal>
            <Link to={`/writing/${lead.slug}`} data-cursor="Read" className="group relative block overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent md:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <span className="relative inline-flex rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-bg">Latest · {lead.tag}</span>
              <h2 className="relative mt-6 max-w-4xl font-display text-4xl leading-tight md:text-6xl">{lead.title}</h2>
              <p className="relative mt-5 max-w-2xl text-lg text-mute">{lead.excerpt}</p>
              <div className="relative mt-8 flex items-center justify-between">
                <Meta date={lead.date} read={lead.read} />
                <span className="grid h-12 w-12 place-items-center rounded-full border border-line transition-all group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"><ArrowUpRight className="h-5 w-5" /></span>
              </div>
            </Link>
          </Reveal>
        )}
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <li>
                <Link to={`/writing/${p.slug}`} data-cursor="Read" className="group grid items-center gap-4 py-8 md:grid-cols-[8rem_1fr_auto]">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</span>
                  <div>
                    <h3 className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">{p.title}</h3>
                    <p className="mt-2 max-w-2xl text-mute">{p.excerpt}</p>
                  </div>
                  <Meta date={p.date} read={p.read} />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </Page>
  )
}

function Meta({ date, read }: { date: string; read: string }) {
  return (
    <span className="flex items-center gap-4 font-mono text-xs text-mute">
      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmt(date)}</span>
      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{read}</span>
    </span>
  )
}

export function Post() {
  const { slug } = useParams()
  const i = posts.findIndex((p) => p.slug === slug)
  const p = posts[i]
  if (!p) return <Page><section className="px-6 pt-40 md:px-10"><h1 className="font-display text-6xl">Post not found.</h1><Link to="/writing" className="mt-6 inline-block text-accent">Back to writing</Link></section></Page>
  const next = posts[(i + 1) % posts.length]

  return (
    <Page>
      <article className="mx-auto max-w-3xl px-6 pt-40">
        <Link to="/writing" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mute hover:text-accent">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />All writing
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] md:text-7xl"><SplitReveal text={p.title} now /></h1>
        <div className="mt-8 border-b border-line pb-8"><Meta date={p.date} read={p.read} /></div>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85">
          {p.body.map((b, k) => (
            <Reveal key={k}>
              {b.h && <h2 className="pt-6 font-display text-3xl text-ink">{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.code && <pre className="overflow-x-auto rounded-2xl border border-line bg-black/60 p-5 font-mono text-sm text-accent">{b.code}</pre>}
            </Reveal>
          ))}
        </div>
        <Link to={`/writing/${next.slug}`} className="group mt-20 block rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent">
          <p className="font-mono text-xs uppercase tracking-widest text-mute">Next post</p>
          <p className="mt-3 flex items-center justify-between gap-4 font-display text-3xl">{next.title}<ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></p>
        </Link>
      </article>
    </Page>
  )
}
