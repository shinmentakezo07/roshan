import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useEffect, useState } from 'react'

type Ripple = { id: number; x: number; y: number }

export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  // dot follows tightly, ring trails behind
  const dx = useSpring(x, { stiffness: 1200, damping: 60 }), dy = useSpring(y, { stiffness: 1200, damping: 60 })
  const rx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 }), ry = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 })

  // stretch the ring in the direction of movement
  const vx = useVelocity(rx), vy = useVelocity(ry)
  const speed = useTransform(() => Math.min(Math.hypot(vx.get(), vy.get()) / 2500, 0.45))
  const angle = useTransform(() => (Math.atan2(vy.get(), vx.get()) * 180) / Math.PI)
  const scaleX = useTransform(speed, (s) => 1 + s)
  const scaleY = useTransform(speed, (s) => 1 - s * 0.6)

  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true) }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a,button,[data-cursor]') as HTMLElement | null
      setHover(!!el)
      setLabel(el?.dataset.cursor ?? '')
    }
    const press = (e: MouseEvent) => {
      setDown(true)
      const r = { id: Date.now(), x: e.clientX, y: e.clientY }
      setRipples((p) => [...p, r])
      setTimeout(() => setRipples((p) => p.filter((q) => q.id !== r.id)), 700)
    }
    const up = () => setDown(false)
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', press)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', press)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  const ringSize = label ? 96 : hover ? 64 : 36

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden [@media(pointer:fine)]:block">
      {/* trailing ring */}
      <motion.div
        style={{ left: rx, top: ry, rotate: label || hover ? 0 : angle, scaleX: label || hover ? 1 : scaleX, scaleY: label || hover ? 1 : scaleY }}
        className="fixed -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: ringSize, height: ringSize,
            opacity: visible ? 1 : 0,
            scale: down ? 0.8 : 1,
            backgroundColor: label ? '#ff5b1f' : hover ? 'rgba(242,239,232,0.08)' : 'rgba(0,0,0,0)',
            borderColor: label ? '#ff5b1f' : hover ? '#ff5b1f' : 'rgba(242,239,232,0.5)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="flex items-center justify-center rounded-full border"
        >
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px] font-medium uppercase tracking-widest text-black"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* precise dot */}
      <motion.div
        style={{ left: dx, top: dy }}
        animate={{ scale: !visible || label ? 0 : hover ? 0.5 : down ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />

      {/* click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: r.x, top: r.y }}
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
