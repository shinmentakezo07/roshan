import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../content/data'
import { Magnetic } from './anim'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Link to="/contact" data-cursor="Say hi" className="block py-14 font-display text-7xl italic text-ink transition-colors hover:text-accent md:text-[10rem]">
        <span className="block px-6 md:px-10">Let's build something ↗</span>
      </Link>
      <div className="flex flex-col gap-6 border-t border-line px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-1">
              {s.label}<ArrowUpRight size={12} />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-mute">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <Magnetic>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-line px-4 py-2 hover:border-accent hover:text-accent">
              ↑ Top
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
