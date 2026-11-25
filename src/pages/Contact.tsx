import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { profile } from '../content/data'
import { Label, Magnetic, Page, Reveal, SplitReveal } from '../components/anim'
import { useClock } from '../components/Nav'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [f, setF] = useState({ name: '', email: '', msg: '' })
  const time = useClock()
  const copy = () => { navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${f.name || 'your site'}`)}&body=${encodeURIComponent(`${f.msg}\n\n— ${f.name} (${f.email})`)}`
  const field = 'w-full border-b border-line bg-transparent py-4 text-2xl outline-none transition-colors placeholder:text-mute/60 focus:border-accent'

  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Contact · KTM {time}</Label>
        <h1 className="mt-4 font-display text-[17vw] leading-[0.85] md:text-[11vw]">
          <SplitReveal text="Let's" now /> <span className="italic text-accent"><SplitReveal text="talk." now delay={0.15} /></span>
        </h1>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={`mailto:${profile.email}`} className="link-u font-display text-3xl md:text-5xl">{profile.email}</a>
          <button onClick={copy} className="rounded-full border border-line p-3 transition-colors hover:border-accent hover:text-accent" aria-label="Copy email">
            <AnimatePresence mode="wait">
              <motion.span key={String(copied)} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="block">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </section>

      <section className="grid gap-16 px-6 py-24 md:grid-cols-[1.5fr_1fr] md:px-10">
        <Reveal>
          <form onSubmit={(e) => { e.preventDefault(); window.location.href = mailto }} className="space-y-6">
            <input required className={field} placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <input required type="email" className={field} placeholder="Your email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            <textarea required rows={4} className={field} placeholder="Tell me about your project" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
            <Magnetic>
              <button data-cursor="Send" className="mt-6 flex h-36 w-36 items-center justify-center rounded-full bg-accent font-mono text-sm uppercase text-bg transition-transform hover:scale-105">
                Send ↗
              </button>
            </Magnetic>
          </form>
        </Reveal>
        <Reveal delay={0.1} className="space-y-10">
          <div><Label>Based in</Label><p className="mt-2 text-xl">{profile.location}</p></div>
          <div><Label>Open to</Label><p className="mt-2 text-xl">Backend, LLM / AI roles, freelance and collaborations</p></div>
          <div>
            <Label>Elsewhere</Label>
            <ul className="mt-2 space-y-2 text-xl">
              {profile.socials.map((s) => (
                <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-1">{s.label}<ArrowUpRight size={16} /></a></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </Page>
  )
}
