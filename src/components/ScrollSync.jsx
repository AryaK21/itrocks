import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function ScrollSync() {
  const scroll = useScroll()

  useFrame(() => {
    // Broadcast the butter-smooth offset (0 = top, 1 = bottom) every frame
    window.__scrollOffset = scroll.offset
  })

  return null
}
