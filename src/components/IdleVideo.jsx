import { useEffect, useRef, useState } from 'react'

// Plays castle.mp4 when user is idle at the top of the page.
// Fades out as soon as the user starts scrolling.
export default function IdleVideo() {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let idleTimer = null

    const showVideo = () => {
      setVisible(true)
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    }

    const hideVideo = () => {
      setVisible(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }

    const onScroll = () => {
      const offset = window.__scrollOffset ?? 0
      if (offset > 0.01) {
        // User has scrolled away — hide the video
        hideVideo()
        clearTimeout(idleTimer)
      } else {
        // User is back at the top — restart idle timer
        clearTimeout(idleTimer)
        idleTimer = setTimeout(showVideo, 1500) // show after 1.5s of idle at top
      }
    }

    // Poll scroll offset via rAF
    let lastOffset = -1
    let raf
    const tick = () => {
      const offset = window.__scrollOffset ?? 0
      if (offset !== lastOffset) {
        lastOffset = offset
        onScroll()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Auto-play on first load after short delay
    idleTimer = setTimeout(showVideo, 800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <video
        ref={videoRef}
        src="/castle.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle dark overlay so the text above stays readable */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  )
}
