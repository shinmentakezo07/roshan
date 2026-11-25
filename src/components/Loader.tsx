import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from './anim'

/** Intro: counts 0→100, then the black panel slides up. Shown once per session. */
export default function Loader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('intro'))
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!show) return
    const id = setInterval(() => setN((v) => {
      if (v >= 100) { clearInterval(id); setTimeout(() => { sessionStorage.setItem('intro', '1'); setShow(false) }, 300); return 100 }
      return Math.min(100, v + Math.ceil(Math.random() * 9))
    }), 40)
    return () => clearInterval(id)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ y: '-100%' }} transition={{ duration: 0.9, ease }} className="fixed inset-0 z-[90] flex flex-col justify-between bg-black p-6 md:p-10">
          <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-mute">
            <span>Roshan Khatru</span><span>Portfolio © 2026</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="overflow-hidden">
              <motion.p initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }} className="font-display text-5xl italic md:text-7xl">
                Backend <span className="text-accent">×</span> LLM
              </motion.p>
            </div>
            <p className="font-display text-[22vw] leading-[0.8] tabular-nums md:text-[14vw]">{n}</p>
          </div>
          <div className="h-px bg-line"><div className="h-px bg-accent transition-[width]" style={{ width: `${n}%` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
