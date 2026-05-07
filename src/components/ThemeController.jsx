import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function ThemeController() {
  const scroll = useScroll()
  
  // Theme colors to transition between
  const color1 = new THREE.Color('#050a14') // Dark Blue (Start)
  const color2 = new THREE.Color('#1a0b1f') // Purple (Middle)
  const color3 = new THREE.Color('#1f1505') // Golden/Brown (End)

  useFrame(({ scene }) => {
    const offset = scroll.offset // 0 to 1

    let targetColor = new THREE.Color()
    if (offset < 0.5) {
      // Transition from color1 to color2
      const localOffset = offset * 2 // 0 to 1
      targetColor.lerpColors(color1, color2, localOffset)
    } else {
      // Transition from color2 to color3
      const localOffset = (offset - 0.5) * 2 // 0 to 1
      targetColor.lerpColors(color2, color3, localOffset)
    }

    // Apply to fog
    if (scene.fog) {
      scene.fog.color.copy(targetColor)
    }
    // Keep scene.background transparent to show the video behind it!
  })

  return null
}
