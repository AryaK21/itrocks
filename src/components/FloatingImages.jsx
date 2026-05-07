import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Grid-based layout so images NEVER overlap
function generateGrid(count) {
  const items = []
  const cols = 5
  const rows = Math.ceil(count / cols)
  const spacingX = 5    // horizontal gap between images
  const spacingY = 4    // vertical gap between images
  const totalW = (cols - 1) * spacingX
  const totalH = (rows - 1) * spacingY

  let i = 0
  for (let r = 0; r < rows && i < count; r++) {
    for (let c = 0; c < cols && i < count; c++) {
      items.push({
        position: [
          c * spacingX - totalW / 2,          // X: evenly spread horizontally
          -(r * spacingY - totalH / 2),        // Y: evenly spread vertically
          (Math.random() - 0.5) * 2            // Z: tiny depth jitter (max ±1)
        ],
        rotation: [
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.1
        ],
        scale: 1.4 + Math.random() * 0.3,     // slight size variation
        floatSpeed: 0.3 + Math.random() * 0.3,
        floatOffset: Math.random() * Math.PI * 2
      })
      i++
    }
  }
  return items
}

const IMAGE_COUNT = 15

export default function FloatingImages() {
  const groupRef = useRef()
  const scroll = useScroll()

  // Stable grid layout (never regenerates = no overlap ever)
  const images = useMemo(() => generateGrid(IMAGE_COUNT), [])

  useFrame((state) => {
    if (!groupRef.current) return

    const offset = scroll.offset

    // Fade out the entire group as the user scrolls — disappears within the first 15% of scroll
    // offset 0 = fully visible, offset > 0.15 = fully invisible
    const opacity = Math.max(0, 1 - offset / 0.15)
    groupRef.current.children.forEach(child => {
      child.traverse(obj => {
        if (obj.material) obj.material.opacity = obj.userData.baseOpacity * opacity
      })
    })

    // Only animate/float when visible — saves GPU when scrolled away
    if (opacity > 0) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {images.map((img, index) => (
        <group
          key={index}
          position={img.position}
          rotation={img.rotation}
        >
          {/* Outer golden border frame */}
          <mesh scale={[img.scale * 1.6, img.scale, 1]}>
            <planeGeometry />
            <meshBasicMaterial
              color="#cba153"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
              userData={{ baseOpacity: 0.3 }}
            />
          </mesh>

          {/* Inner dark photo area */}
          <mesh position={[0, 0, 0.02]} scale={[img.scale * 1.45, img.scale * 0.88, 1]}>
            <planeGeometry />
            <meshBasicMaterial
              color="#050a14"
              transparent
              opacity={0.85}
              userData={{ baseOpacity: 0.85 }}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
