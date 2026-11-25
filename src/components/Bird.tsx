import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Little flapping bird that replaces the default cursor ring. Faces the way it flies. */
export default function Bird() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 30 }), sy = useSpring(y, { stiffness: 400, damping: 30 })
  const vx = useVelocity(sx), vy = useVelocity(sy)
  const flip = useTransform(vx, (v) => (v < -20 ? -1 : 1))
  const tilt = useTransform(() => Math.max(-25, Math.min(25, vy.get() / 40)))
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY)
      setMoving(true); clearTimeout(t); t = setTimeout(() => setMoving(false), 250)
    }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); clearTimeout(t) }
  }, [x, y])

  return (
    <motion.div
      style={{ left: sx, top: sy, scaleX: flip, rotate: tilt }}
      className="pointer-events-none fixed z-[80] hidden -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:block"
    >
      <motion.svg
        width="30" height="24" viewBox="0 0 30 24"
        animate={{ y: moving ? [0, -2, 0] : [0, -1, 0] }}
        transition={{ duration: moving ? 0.25 : 1.2, repeat: Infinity }}
      >
        {/* back wing */}
        <motion.path
          d="M13 12 Q8 2 3 4 Q8 9 12 14 Z" fill="#b34012"
          style={{ originX: '13px', originY: '12px' }}
          animate={{ scaleY: moving ? [1, -0.6, 1] : [1, 0.85, 1] }}
          transition={{ duration: moving ? 0.18 : 1.2, repeat: Infinity, delay: 0.05 }}
        />
        {/* body */}
        <ellipse cx="15" cy="14" rx="8" ry="5.5" fill="#ff5b1f" />
        {/* tail */}
        <path d="M7 13 L1 10 L3 15 L1 18 L7 16 Z" fill="#ff5b1f" />
        {/* head */}
        <circle cx="22" cy="10" r="4.2" fill="#ff5b1f" />
        <circle cx="23.3" cy="9.2" r="1" fill="#000" />
        <path d="M26 10 L29.5 11 L26 12 Z" fill="#f2c94c" />
        {/* front wing */}
        <motion.path
          d="M15 12 Q11 0 5 1 Q10 8 14 15 Z" fill="#f2efe8"
          style={{ originX: '15px', originY: '12px' }}
          animate={{ scaleY: moving ? [1, -0.7, 1] : [1, 0.8, 1] }}
          transition={{ duration: moving ? 0.18 : 1.2, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  )
}
