import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function Smoke({ count = 400 }) {
  const pointsRef = useRef()
  const scroll = useScroll()

  // Generate magical thick smoke particles
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    const speed = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Cloud/Smoke distribution (spread out in a wide horizontal tunnel)
      pos[i * 3] = (Math.random() - 0.5) * 50     // X: Wide
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 // Y: Height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100 // Z: Very deep into the screen

      // Particles sizes
      scale[i] = 1.5 + Math.random() * 4
      
      // Individual swirling speed
      speed[i] = 0.5 + Math.random()
    }

    return [pos, scale, speed]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    // Smoke constantly swirling slowly
    pointsRef.current.rotation.z += delta * 0.05
    
    // When you scroll, the smoke rushes PAST the camera incredibly fast!
    const r1 = scroll.range(0, 1)
    pointsRef.current.position.z = r1 * 80
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      {/* Tiny magical dust material instead of giant square orbs */}
      <pointsMaterial
        size={0.08}
        color="#cba153"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
