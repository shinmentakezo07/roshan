import { motion } from 'framer-motion'
import { Printer, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { experience, profile, projects, skills } from '../content/data'
import { Page, ease } from '../components/anim'

const education = [
  { school: 'Tribhuvan University', degree: 'B.Sc. Computer Science & IT', period: '2015 — 2019', place: 'Kathmandu' },
]
const certs = ['AWS Certified Solutions Architect – Associate', 'DeepLearning.AI – LLMOps', 'CKAD – Kubernetes Developer']
const languages = ['Nepali — native', 'English — fluent', 'Hindi — conversational']

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#ff5b1f] print:text-black">
      {children}<span className="h-px flex-1 bg-neutral-300" />
    </h2>
  )
}

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }

export default function Resume() {
  return (
    <Page>
      <section className="px-4 pb-24 pt-32 md:px-10 print:p-0">
        {/* toolbar (hidden on print) */}
        <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between print:hidden">
          <Link to="/" className="link-u inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mute"><ArrowLeft size={14} /> Back</Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-black transition hover:brightness-110">
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>

        {/* paper */}
        <motion.article
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease }}
          style={{ transformPerspective: 1200 }}
          className="resume-paper mx-auto min-h-[297mm] max-w-[210mm] bg-[#fbfaf7] p-[14mm] font-sans text-[13px] leading-relaxed text-neutral-800 shadow-[0_40px_120px_-30px_rgba(255,91,31,0.35)] print:min-h-0 print:max-w-none print:p-[12mm] print:shadow-none"
        >
          <motion.div variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }} initial="hidden" animate="show">
            {/* header */}
            <motion.header variants={item} className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-neutral-900 pb-5">
              <div>
                <h1 className="font-display text-5xl leading-none text-neutral-900">{profile.first} <span className="italic text-[#ff5b1f] print:text-neutral-900">{profile.last}</span></h1>
                <p className="mt-2 text-base font-medium text-neutral-700">{profile.role}</p>
              </div>
              <ul className="space-y-0.5 text-right font-mono text-[11px] text-neutral-600">
                <li>{profile.email}</li>
                <li>{profile.location}</li>
                {profile.socials.map((s) => <li key={s.label}>{s.url.replace('https://', '')}</li>)}
              </ul>
            </motion.header>

            <motion.section variants={item} className="mt-5">
              <H>Summary</H>
              <p>{profile.about.join(' ')}</p>
            </motion.section>

            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_15rem] print:grid-cols-[1fr_15rem]">
              {/* main column */}
              <div>
                <motion.section variants={item}>
                  <H>Experience</H>
                  <div className="space-y-4">
                    {experience.map((e) => (
                      <div key={e.org} className="break-inside-avoid">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-[15px] font-bold text-neutral-900">{e.role} · <span className="font-medium text-neutral-600">{e.org}</span></h3>
                          <span className="font-mono text-[11px] text-neutral-500">{e.period} · {e.place}</span>
                        </div>
                        <p className="mt-0.5 italic text-neutral-600">{e.summary}</p>
                        <ul className="mt-1.5 list-disc space-y-0.5 pl-5 marker:text-[#ff5b1f]">
                          {e.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                        <p className="mt-1 font-mono text-[10.5px] text-neutral-500">{e.stack.join(' · ')}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <motion.section variants={item} className="mt-5">
                  <H>Selected projects</H>
                  <div className="space-y-2.5">
                    {projects.slice(0, 4).map((p) => (
                      <div key={p.slug} className="break-inside-avoid">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-bold text-neutral-900">{p.title} <span className="font-normal text-neutral-500">— {p.role}, {p.year}</span></h3>
                          <span className="font-mono text-[11px] text-[#ff5b1f] print:text-neutral-700">{p.metric}</span>
                        </div>
                        <p>{p.desc} {p.results[0]}.</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* side column */}
              <aside className="space-y-5">
                <motion.section variants={item}>
                  <H>Skills</H>
                  <div className="space-y-3">
                    {skills.map((g) => (
                      <div key={g.group}>
                        <p className="font-mono text-[10.5px] uppercase tracking-wider text-neutral-500">{g.group}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {g.items.map(([n]) => <span key={n} className="rounded border border-neutral-300 px-1.5 py-0.5 text-[11px]">{n}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
                <motion.section variants={item}>
                  <H>Education</H>
                  {education.map((ed) => (
                    <div key={ed.school}>
                      <p className="font-bold text-neutral-900">{ed.degree}</p>
                      <p>{ed.school}</p>
                      <p className="font-mono text-[11px] text-neutral-500">{ed.period} · {ed.place}</p>
                    </div>
                  ))}
                </motion.section>
                <motion.section variants={item}>
                  <H>Certifications</H>
                  <ul className="space-y-1">{certs.map((c) => <li key={c}>{c}</li>)}</ul>
                </motion.section>
                <motion.section variants={item}>
                  <H>Languages</H>
                  <ul className="space-y-1">{languages.map((l) => <li key={l}>{l}</li>)}</ul>
                </motion.section>
              </aside>
            </div>
          </motion.div>
        </motion.article>
      </section>
    </Page>
  )
}
