import { motion, useMotionValue, useSpring, animate, useInView } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

/** Word-by-word slide-up reveal. */
export function SplitReveal({ text, className = '', delay = 0, now = false }: { text: string; className?: string; delay?: number; now?: boolean }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            {...(now ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true } })}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Element drifts toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 }), sy = useSpring(y, { stiffness: 150, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

export function Marquee({ items, speed = 30, className = '' }: { items: string[]; speed?: number; className?: string }) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="inline-flex" animate={{ x: ['0%', '-50%'] }} transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
        {row.map((t, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            {t}<Sparkle className="h-[0.6em] w-[0.6em] shrink-0 text-accent" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Counter({ to, suffix = '+' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/** Page wrapper: fade + accent curtain wipe on route change. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease }}
      />
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">{children}</p>
}

/** 3D tilt + cursor spotlight card. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 }), sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        ry.set((px - 0.5) * 10); rx.set((0.5 - py) * 10)
        setSpot({ x: px * 100, y: py * 100, on: true })
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); setSpot((s) => ({ ...s, on: false })) }}
      className={`relative overflow-hidden ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={{ opacity: spot.on ? 1 : 0, background: `radial-gradient(400px circle at ${spot.x}% ${spot.y}%, rgba(255,91,31,0.14), transparent 60%)` }} />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
