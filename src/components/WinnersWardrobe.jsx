import { useRef } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// 📁 UPLOAD YOUR POSTER IMAGES HERE:
//    Place your .jpg/.png files in: public/posters/
//    Then update the array below with the correct filenames
//    and the winner's name!
// ============================================================
const posters = [
  { src: '', event: 'Event I', winner: 'Division Champion' },
  { src: '', event: 'Event II', winner: 'Division Champion' },
  { src: '', event: 'Event III', winner: 'Division Champion' },
  { src: '', event: 'Event IV', winner: 'Division Champion' },
  { src: '', event: 'Event V', winner: 'Division Champion' },
  { src: '', event: 'Event VI', winner: 'Division Champion' },
  // duplicated for seamless loop
  { src: '', event: 'Event I', winner: 'Division Champion' },
  { src: '', event: 'Event II', winner: 'Division Champion' },
  { src: '', event: 'Event III', winner: 'Division Champion' },
  { src: '', event: 'Event IV', winner: 'Division Champion' },
  { src: '', event: 'Event V', winner: 'Division Champion' },
  { src: '', event: 'Event VI', winner: 'Division Champion' },
]

export default function WinnersWardrobe() {
  return (
    <div className="w-full py-16 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 px-4"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-mythical font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7D6] via-[#D4AF37] to-[#8A5A19] drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          Hall of Winners
        </h2>
        <p className="text-gray-400 mt-3 font-cinematic tracking-widest uppercase text-sm md:text-base">
          I Division's Finest Moments
        </p>
      </motion.div>

      {/* 3D Wardrobe Marquee */}
      <div className="relative overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Edge fades */}
        <div className="absolute left-0 top-0 w-16 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <motion.div
          className="flex gap-6 md:gap-8 items-end py-8 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
        >
          {posters.map((poster, i) => (
            <PosterCard key={i} poster={poster} i={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function PosterCard({ poster, i }) {
  // Alternate vertical positions for a staggered 3D wardrobe feel
  const yOffset = i % 2 === 0 ? 0 : 30
  const rotateY = i % 3 === 0 ? -8 : i % 3 === 1 ? 0 : 8

  return (
    <motion.div
      className="flex-shrink-0 w-44 sm:w-52 md:w-64 group cursor-pointer"
      style={{ translateY: yOffset, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.06, rotateY: 0, z: 60, translateY: yOffset - 15 }}
      animate={{ rotateY }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* Poster frame */}
      <div className="relative rounded-lg overflow-hidden border-2 border-magical-gold/40 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(203,161,83,0.15)] group-hover:border-magical-gold/80 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_40px_rgba(203,161,83,0.4)] transition-all duration-300">
        {/* Trophy ribbon badge */}
        <div className="absolute top-2 right-2 z-10 bg-magical-gold text-black text-xs font-mythical font-bold px-2 py-1 rounded-full shadow-lg">
          🏆
        </div>

        {/* Poster image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          <img
            src={poster.src}
            alt={poster.event}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-300 group-hover:scale-105 transition-transform"
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-magical-gold/30 text-xs font-mythical text-center px-2 pointer-events-none gap-2">
            <span className="text-3xl">🎭</span>
            <span>{poster.event}</span>
          </div>
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* Event + Winner name plate */}
        <div className="px-3 py-3 md:px-4 md:py-4 bg-black/80 border-t border-magical-gold/20">
          <p className="text-magical-gold font-mythical font-bold text-xs md:text-sm truncate">{poster.event}</p>
          <p className="text-white/80 font-cinematic text-xs mt-1 tracking-widest">✦ {poster.winner}</p>
        </div>
      </div>

      {/* Drop shadow beneath the poster */}
      <div className="mx-auto mt-2 w-4/5 h-2 bg-magical-gold/20 rounded-full blur-md group-hover:bg-magical-gold/40 transition-colors duration-300" />
    </motion.div>
  )
}
