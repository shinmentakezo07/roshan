import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Copy, Check, MapPin, Clock, Zap, Plus, Phone } from 'lucide-react'
import { profile } from '../content/data'
import { Label, Magnetic, Page, Reveal, SplitReveal } from '../components/anim'
import { useClock } from '../components/Nav'
import { SocialIcon } from '../components/SocialIcon'

const TOPICS = ['Backend / APIs', 'LLM / RAG system', 'AI agents', 'Full-stack app', 'Performance audit', 'Full-time role']
const BUDGETS = ['< $2k', '$2k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']
const FAQ = [
  { q: 'How fast do you reply?', a: 'Usually within 24 hours on weekdays. If it is urgent, say so in the subject and I will get to it sooner.' },
  { q: 'Do you work across timezones?', a: 'Yes. I am in Kathmandu (UTC+5:45) and keep a few hours of overlap with Europe and US East for calls.' },
  { q: 'What does a typical engagement look like?', a: 'A short discovery call, a written scope with milestones, then weekly demos. I deliver code, docs, tests and a runbook, not just a repo.' },
  { q: 'Can you join an existing team?', a: 'Gladly. I am comfortable working in your codebase, CI and review process from day one.' },
]

function Chip({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 active:scale-95 ${active ? 'border-accent bg-accent text-bg shadow-[0_0_24px_-6px_rgba(255,91,31,0.7)]' : 'border-line bg-bg/50 text-mute hover:-translate-y-0.5 hover:border-ink/60 hover:text-ink'}`}
    >
      {active && <Check size={14} />}
      {children}
    </button>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [f, setF] = useState({ name: '', email: '', msg: '' })
  const [topics, setTopics] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [open, setOpen] = useState<number | null>(0)
  const time = useClock()

  const copy = () => { navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const toggle = (t: string) => setTopics((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))
  const body = [
    f.msg,
    '',
    topics.length ? `Interested in: ${topics.join(', ')}` : '',
    budget ? `Budget: ${budget}` : '',
    '',
    `— ${f.name} (${f.email})`,
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n')
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${f.name || 'your site'}`)}&body=${encodeURIComponent(body)}`

  const field = 'peer w-full rounded-xl border border-line bg-bg/70 px-4 pb-3 pt-7 text-lg outline-none transition-all duration-300 placeholder:text-transparent hover:border-mute/40 focus:border-accent focus:bg-bg focus:ring-4 focus:ring-accent/10'
  const float = 'pointer-events-none absolute left-4 top-[1.15rem] text-base text-mute transition-all duration-300 peer-focus:top-2 peer-focus:font-mono peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest'
  const done = [topics.length > 0, !!budget, !!(f.name && f.email && f.msg)]
  const progress = done.filter(Boolean).length
  const Step = ({ n, t, ok }: { n: string; t: string; ok: boolean }) => (
    <div className="flex items-center gap-3">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-300 ${ok ? 'border-accent bg-accent text-bg' : 'border-line text-mute'}`}>{ok ? <Check size={14} /> : n}</span>
      <p className="font-mono text-xs uppercase tracking-widest text-ink">{t}</p>
    </div>
  )

  return (
    <Page>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 md:px-10">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="flex flex-wrap items-center gap-4">
          <Label>Contact · KTM {time}</Label>
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-mute">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new work
            </span>
          )}
        </div>
        <h1 className="mt-4 font-display text-[17vw] leading-[0.85] md:text-[11vw]">
          <SplitReveal text="Let's" now /> <span className="italic text-accent"><SplitReveal text="talk." now delay={0.15} /></span>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-xl text-mute md:text-2xl">
            Have a backend that needs to be faster, or an LLM idea that needs to survive production? Tell me what you are building and I will tell you how I would ship it.
          </p>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={`mailto:${profile.email}`} className="link-u font-display text-3xl md:text-5xl">{profile.email}</a>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 font-mono text-xs uppercase transition-colors hover:border-accent hover:text-accent" aria-label="Copy email">
            <AnimatePresence mode="wait">
              <motion.span key={String(copied)} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="block">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </motion.span>
            </AnimatePresence>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Quick facts */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, k: 'Based in', v: profile.location },
            { icon: Clock, k: 'Local time', v: `${time} · UTC+5:45` },
            { icon: Zap, k: 'Response time', v: 'Within 24 hours' },
            { icon: Phone, k: 'Phone / WhatsApp', v: profile.phone },
          ].map(({ icon: Icon, k, v }, i) => (
            <Reveal key={k} delay={i * 0.08} className="group bg-bg p-6 transition-colors hover:bg-panel md:p-8">
              <Icon size={20} className="text-accent transition-transform duration-500 group-hover:rotate-12" />
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mute">{k}</p>
              <p className="mt-1 text-xl">{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + side */}
      <section className="grid gap-16 px-6 py-24 md:grid-cols-[1.5fr_1fr] md:px-10">
        <Reveal>
          <form onSubmit={(e) => { e.preventDefault(); window.location.href = mailto }} className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-panel to-bg p-6 shadow-[0_30px_80px_-40px_rgba(255,91,31,0.35)] md:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="relative mb-10 flex items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">Start a <span className="italic text-accent">project</span></h2>
                <p className="mt-1 text-sm text-mute">Takes about a minute.</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-mute">{progress}/3 done</p>
                <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-line">
                  <motion.div className="h-full bg-accent" animate={{ width: `${(progress / 3) * 100}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>
            </div>
            <div className="relative">
            <Step n="01" t="What do you need?" ok={done[0]} />
            <div className="mt-4 flex flex-wrap gap-2">
              {TOPICS.map((t) => <Chip key={t} active={topics.includes(t)} onClick={() => toggle(t)}>{t}</Chip>)}
            </div>

            <div className="mt-10"><Step n="02" t="Budget" ok={done[1]} /></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {BUDGETS.map((b) => <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? '' : b)}>{b}</Chip>)}
            </div>

            <div className="mt-10"><Step n="03" t="About you" ok={done[2]} /></div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <label className="relative block">
                <input required id="name" placeholder="Name" className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                <span className={float}>Your name</span>
              </label>
              <label className="relative block">
                <input required type="email" placeholder="Email" className={field} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                <span className={float}>Your email</span>
              </label>
            </div>
            <label className="relative mt-4 block">
              <textarea required rows={5} maxLength={1000} placeholder="Message" className={`${field} resize-none`} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
              <span className={float}>Tell me about your project</span>
              <span className="absolute bottom-3 right-4 font-mono text-xs text-mute">{f.msg.length}/1000</span>
            </label>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
              <p className="max-w-xs text-sm text-mute">Opens your mail app with everything pre-filled. No trackers, no spam.</p>
              <Magnetic>
                <button data-cursor="Send" className="group flex h-32 w-32 items-center justify-center rounded-full bg-accent font-mono text-sm uppercase text-bg transition-transform hover:scale-105">
                  Send <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
            </div>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-12">
          <div>
            <Label>Open to</Label>
            <ul className="mt-4 space-y-3 text-xl">
              {['Backend & platform roles', 'LLM / AI engineering', 'Freelance projects', 'Open-source collaborations'].map((x) => (
                <li key={x} className="flex items-center gap-3"><span className="text-accent">✦</span>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Elsewhere</Label>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4 text-xl transition-colors hover:text-accent">
                      <span className="inline-flex items-center gap-3"><SocialIcon label={s.label} size={20} />{s.label}</span>
                      <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 py-4 text-xl text-mute"><SocialIcon label={s.label} size={20} />{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <Label>Prefer a call?</Label>
            <p className="mt-3 text-mute">Send a note with two or three time slots and I will send an invite. Calls are 30 minutes, no prep needed.</p>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="px-6 py-32 md:px-10">
        <Label>Process</Label>
        <h2 className="mt-4 font-display text-5xl md:text-7xl">How we'll <span className="italic text-accent">work.</span></h2>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { t: 'Discovery', d: 'A 30-minute call to understand the problem, constraints and success metrics.', w: 'Day 1' },
            { t: 'Scope', d: 'Written plan with milestones, architecture sketch and a fixed estimate.', w: 'Day 2–3' },
            { t: 'Build', d: 'Weekly demos, async updates and a staging link you can poke at anytime.', w: 'Week 1–6' },
            { t: 'Handoff', d: 'Docs, tests, dashboards and a runbook so your team owns it confidently.', w: 'Final week' },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-all duration-500 hover:-translate-y-2 hover:border-accent">
              <span className="absolute -right-2 -top-6 font-display text-[8rem] leading-none text-line transition-colors duration-500 group-hover:text-accent/20">{i + 1}</span>
              <p className="relative font-mono text-xs uppercase tracking-widest text-accent">{s.w}</p>
              <h3 className="relative mt-10 font-display text-3xl">{s.t}</h3>
              <p className="relative mt-3 text-mute">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="grid gap-6 px-6 pb-32 md:grid-cols-3 md:px-10">
        {[
          { q: 'Roshan cut our API p95 from 900ms to 120ms in two weeks. Calm, clear and ridiculously fast.', n: 'Aarav Shrestha', r: 'CTO, Paywise' },
          { q: 'Our RAG pipeline went from demo-ware to production with evals and alerts. Best hire we made this year.', n: 'Maya Lin', r: 'Head of AI, Notely' },
          { q: 'Great communicator across timezones. Every week we had something real to look at.', n: 'Lukas Weber', r: 'Founder, Stackhaus' },
        ].map((t, i) => (
          <Reveal key={t.n} delay={i * 0.1} className="flex flex-col justify-between rounded-3xl border border-line p-8 transition-colors hover:bg-panel">
            <p className="font-display text-2xl leading-snug"><span className="text-accent">“</span>{t.q}<span className="text-accent">”</span></p>
            <div className="mt-10 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-mono text-sm text-bg">{t.n.split(' ').map((w) => w[0]).join('')}</span>
              <div><p>{t.n}</p><p className="font-mono text-xs uppercase tracking-widest text-mute">{t.r}</p></div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32 md:px-10">
        <Label>FAQ</Label>
        <h2 className="mt-4 font-display text-5xl md:text-7xl">Before you <span className="italic text-accent">ask.</span></h2>
        <div className="mt-12 border-t border-line">
          {FAQ.map((item, i) => (
            <div key={item.q} className="border-b border-line">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl transition-colors hover:text-accent md:text-2xl">
                <span><span className="mr-4 font-mono text-sm text-mute">0{i + 1}</span>{item.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }}><Plus size={22} /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pl-10 text-lg text-mute">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}
