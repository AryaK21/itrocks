import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useRef, useEffect } from 'react'

export default function SnapScroll({ pages = 5 }) {
  const scroll = useScroll()
  const isScrolling = useRef(false)
  const lastOffset = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      isScrolling.current = true
      clearTimeout(timeoutRef.current)
      
      // After user stops scrolling, find the nearest section and snap to it
      timeoutRef.current = setTimeout(() => {
        isScrolling.current = false
        snapToNearest()
      }, 150) // wait 150ms after last scroll event
    }

    // Find Drei's scroll container
    const scroller = document.querySelector('[style*="overflow-y: scroll"]') || 
                     document.querySelector('[style*="overflow-y:scroll"]')
    
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (scroller) scroller.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutRef.current)
    }
  }, [pages])

  const snapToNearest = () => {
    const currentOffset = scroll.offset
    // Each section is at offset: 0, 0.25, 0.5, 0.75, 1.0 (for 5 pages)
    const sectionSize = 1 / (pages - 1)
    const nearestSection = Math.round(currentOffset / sectionSize)
    const targetOffset = nearestSection * sectionSize

    // We can't directly set scroll.offset to animate it easily without damping
    // But we can scroll the DOM element
    const scroller = document.querySelector('[style*="overflow-y: scroll"]') || 
                     document.querySelector('[style*="overflow-y:scroll"]')
    
    if (scroller) {
      const targetScrollTop = targetOffset * (scroller.scrollHeight - scroller.clientHeight)
      scroller.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      })
    }
  }

  return null
}
