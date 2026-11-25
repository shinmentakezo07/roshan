// Pixel cat that chases the bird cursor. Sprite + logic adapted from oneko.js (MIT, © 2022 adryd).
import { useEffect, useRef } from 'react'

const S: Record<string, [number, number][]> = {
  idle: [[-3, -3]], alert: [[-7, -3]],
  scratch: [[-5, 0], [-6, 0], [-7, 0]], tired: [[-3, -2]], sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]], NE: [[0, -2], [0, -3]], E: [[-3, 0], [-3, -1]], SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]], SW: [[-5, -3], [-6, -1]], W: [[-4, -2], [-4, -3]], NW: [[-1, 0], [-1, -1]],
}

export default function Neko() {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = el.current!
    let nx = 32, ny = 32, mx = 0, my = 0
    let frame = 0, idleTime = 0, idleFrame = 0, lastMove = performance.now()
    const speed = 20
    const set = (name: string, f: number) => {
      const s = S[name][f % S[name].length]
      node.style.backgroundPosition = `${s[0] * 32}px ${s[1] * 32}px`
    }
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; lastMove = performance.now() }

    const idle = () => {
      idleTime++
      // fall asleep after 3 s without mouse movement
      if (performance.now() - lastMove > 3000) {
        if (idleFrame < 8) set('tired', 0)
        else set('sleeping', Math.floor(idleFrame / 4))
        idleFrame++
      } else {
        idleFrame = 0
        set('idle', 0)
      }
    }

    const tick = () => {
      frame++
      const dx = nx - mx, dy = ny - my
      const dist = Math.hypot(dx, dy)
      if (dist < speed || dist < 22) { idle(); return }
      idleFrame = 0
      if (idleTime > 1) { set('alert', 0); idleTime = Math.min(idleTime, 7) - 1; return }
      let dir = dy / dist > 0.5 ? 'N' : dy / dist < -0.5 ? 'S' : ''
      dir += dx / dist > 0.5 ? 'W' : dx / dist < -0.5 ? 'E' : ''
      set(dir, frame)
      nx -= (dx / dist) * speed
      ny -= (dy / dist) * speed
      nx = Math.min(Math.max(16, nx), innerWidth - 16)
      ny = Math.min(Math.max(16, ny), innerHeight - 16)
      node.style.left = `${nx - 16}px`
      node.style.top = `${ny - 16}px`
    }

    node.style.display = 'block'
    window.addEventListener('mousemove', onMove)
    const id = setInterval(tick, 70)
    return () => { clearInterval(id); window.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed z-[79] hidden h-8 w-8"
      style={{ left: 16, top: 16, backgroundImage: 'url(/oneko.gif)', imageRendering: 'pixelated' }}
    />
  )
}
