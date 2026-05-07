import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 300

export default function ImageSequence() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const [loaded, setLoaded] = useState(0)
  const loadedCountRef = useRef(0)

  const drawFrame = (index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalHeight === 0) return
    const ctx = canvas.getContext('2d')
    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
    const x = (canvas.width - img.width * ratio) / 2
    const y = (canvas.height - img.height * ratio) / 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
  }

  // Preload all frames
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`
      img.onload = () => {
        loadedCountRef.current++
        setLoaded(Math.floor((loadedCountRef.current / FRAME_COUNT) * 100))
        // Draw frame 1 as soon as it loads (start from beginning)
        if (i === 1) drawFrame(0)
      }
      imagesRef.current.push(img)
    }
  }, [])

  // rAF loop — scroll forward = frame 1 → 300, no reversal
  useEffect(() => {
    let raf
    let lastIndex = -1
    const tick = () => {
      const offset = window.__scrollOffset ?? 0
      // offset 0 (top) → frame 0, offset 1 (bottom) → frame 299
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(offset * FRAME_COUNT)))
      if (index !== lastIndex) {
        lastIndex = index
        drawFrame(index)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Canvas resize
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <>
      {loaded < 100 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <h2 className="text-magical-gold font-mythical text-3xl sm:text-4xl mb-6 animate-pulse text-center px-4">
            Loading Cinematic Experience
          </h2>
          <div className="w-56 sm:w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-magical-gold transition-all duration-200" style={{ width: `${loaded}%` }} />
          </div>
          <p className="text-gray-500 mt-3 text-xs sm:text-sm">{loaded}% — {FRAME_COUNT} frames</p>
        </div>
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
    </>
  )
}
