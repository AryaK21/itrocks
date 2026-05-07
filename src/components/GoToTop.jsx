import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_CONTAINER_ID = 'drei-scroll-container'

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const rafRef = useRef(null)

  // Show button only after user has scrolled down a bit
  useEffect(() => {
    // The Drei ScrollControls creates a div with overflow-y: scroll
    // We watch the window scroll for now (works with Drei's internal scroller)
    const handleScroll = () => {
      const scroller = document.querySelector('[style*="overflow-y: scroll"], [style*="overflow-y:scroll"]')
      const scrollTop = scroller ? scroller.scrollTop : window.scrollY
      setVisible(scrollTop > 80)
    }

    // Poll for it since the scroller is created asynchronously
    const interval = setInterval(() => {
      const scroller = document.querySelector('[style*="overflow-y: scroll"], [style*="overflow-y:scroll"]')
      if (scroller) {
        scroller.addEventListener('scroll', handleScroll, { passive: true })
        clearInterval(interval)
      }
    }, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  const handleGoToTop = () => {
    if (isAnimating) return
    setIsAnimating(true)

    // Find the Drei scroll container
    const scroller = document.querySelector('[style*="overflow-y: scroll"], [style*="overflow-y:scroll"]') || window
    
    const startScrollTop = scroller === window ? window.scrollY : scroller.scrollTop
    const startTime = performance.now()
    const duration = 1800 // ms — smooth cinematic scroll back to top

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-in-out cubic
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

      const newScrollTop = startScrollTop * (1 - eased)
      
      if (scroller === window) {
        window.scrollTo(0, newScrollTop)
      } else {
        scroller.scrollTop = newScrollTop
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="go-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={handleGoToTop}
          disabled={isAnimating}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[100] group"
          aria-label="Go to top"
        >
          <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-magical-gold/60 bg-black/70 backdrop-blur-md shadow-[0_0_20px_rgba(203,161,83,0.4)] group-hover:border-magical-gold group-hover:shadow-[0_0_35px_rgba(203,161,83,0.7)] transition-all duration-300">
            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-magical-gold/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Arrow icon */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-magical-gold"
              animate={isAnimating ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
            >
              <polyline points="18 15 12 9 6 15" />
            </motion.svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
