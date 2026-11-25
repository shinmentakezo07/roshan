import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Network() {
  const group = useRef<THREE.Group>(null)
  const N = 90
  const { points, lines } = useMemo(() => {
    const pts = new Float32Array(N * 3)
    const vecs: THREE.Vector3[] = []
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 6)
      vecs.push(v)
      pts.set([v.x, v.y, v.z], i * 3)
    }
    const seg: number[] = []
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++)
        if (vecs[i].distanceTo(vecs[j]) < 2.2) seg.push(vecs[i].x, vecs[i].y, vecs[i].z, vecs[j].x, vecs[j].y, vecs[j].z)
    return { points: pts, lines: new Float32Array(seg) }
  }, [])

  useFrame((s, d) => {
    if (!group.current) return
    group.current.rotation.y += d * 0.05
    group.current.rotation.x = s.pointer.y * 0.15
    group.current.position.x = s.pointer.x * 0.3
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ff5b1f" size={0.07} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#f2efe8" transparent opacity={0.12} />
      </lineSegments>
    </group>
  )
}

export default function NeuralBg() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]}>
        <Network />
      </Canvas>
    </div>
  )
}
