import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [big, setBig] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a,button,[data-cursor]') as HTMLElement | null
      setBig(!!el)
      setLabel(el?.dataset.cursor ?? '')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [x, y])

  return (
    <motion.div
      style={{ left: sx, top: sy }}
      animate={{ width: label ? 90 : big ? 56 : 12, height: label ? 90 : big ? 56 : 12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="pointer-events-none fixed z-[80] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink font-mono text-[10px] uppercase text-bg mix-blend-difference [@media(pointer:fine)]:flex"
    >
      {label}
    </motion.div>
  )
}
