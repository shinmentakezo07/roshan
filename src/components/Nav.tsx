import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile } from '../content/data'
import { ease } from './anim'

const links = [
  ['/', 'Home'], ['/work', 'Work'], ['/about', 'About'], ['/experience', 'Experience'], ['/resume', 'Resume'], ['/contact', 'Contact'],
]

export function useClock() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id) })
  return t
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const time = useClock()
  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="font-display text-2xl italic">RK<sup className="font-sans text-xs not-italic">©</sup></Link>
          <ul className="hidden gap-8 font-mono text-xs uppercase tracking-widest md:flex">
            {links.slice(1).map(([to, l]) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `link-u ${isActive ? 'text-accent' : ''}`}>{l}</NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden font-mono text-xs text-mute md:block">KTM {time}</div>
          <button onClick={() => setOpen(!open)} className="font-mono text-xs uppercase tracking-widest md:hidden">
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-accent px-6 text-bg"
            initial={{ clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ clipPath: 'circle(150% at 95% 3%)' }}
            exit={{ clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.7, ease }}
          >
            {links.map(([to, l], i) => (
              <motion.div key={to} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07, ease }}>
                <Link to={to} className="font-display text-6xl leading-tight">{l}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
