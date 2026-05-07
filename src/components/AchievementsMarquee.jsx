import { useRef } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// 📁 UPLOAD YOUR ACHIEVEMENT IMAGES HERE:
//    Place your .jpg/.png files in: public/achievements/
//    Then update the array below with the correct filenames!
// ============================================================
const achievements = [
  { src: '/achievements/achievement-1.jpg', title: 'Hackathon Winners', subtitle: 'Tech Fest 2024' },
  { src: '/achievements/achievement-2.jpg', title: 'Best Project Award', subtitle: 'Annual Exhibition' },
  { src: '/achievements/achievement-3.jpg', title: 'Sports Champions', subtitle: 'Inter-Division 2024' },
  { src: '/achievements/achievement-4.jpg', title: 'Cultural Fest', subtitle: 'First Place' },
  { src: '/achievements/achievement-5.jpg', title: 'Quiz Bowl', subtitle: 'Division Champions' },
  { src: '/achievements/achievement-6.jpg', title: 'Code Sprint', subtitle: '1st & 2nd Place' },
  { src: '/achievements/achievement-1.jpg', title: 'Hackathon Winners', subtitle: 'Tech Fest 2024' },
  { src: '/achievements/achievement-2.jpg', title: 'Best Project Award', subtitle: 'Annual Exhibition' },
  { src: '/achievements/achievement-3.jpg', title: 'Sports Champions', subtitle: 'Inter-Division 2024' },
  { src: '/achievements/achievement-4.jpg', title: 'Cultural Fest', subtitle: 'First Place' },
  { src: '/achievements/achievement-5.jpg', title: 'Quiz Bowl', subtitle: 'Division Champions' },
  { src: '/achievements/achievement-6.jpg', title: 'Code Sprint', subtitle: '1st & 2nd Place' },
]

export default function AchievementsMarquee() {
  return (
    <div className="w-full py-16 overflow-hidden">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-mythical font-bold text-transparent bg-clip-text bg-gradient-to-r from-magical-gold via-white to-magical-gold drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          Achievements
        </h2>
        <p className="text-gray-400 mt-3 font-cinematic tracking-widest uppercase text-sm md:text-base">
          Our Hall of Fame
        </p>
      </motion.div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
        >
          {achievements.map((item, i) => (
            <AchievementCard key={i} item={item} i={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function AchievementCard({ item, i }) {
  return (
    <div
      className="flex-shrink-0 w-52 sm:w-64 md:w-72 group cursor-pointer"
      style={{ perspective: '800px' }}
    >
      <motion.div
        whileHover={{ rotateY: 8, scale: 1.04, z: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-xl overflow-hidden border border-magical-gold/30 bg-black/60 backdrop-blur-sm shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* Placeholder shown when image is missing */}
          <div className="absolute inset-0 flex items-center justify-center text-magical-gold/40 text-xs font-mythical text-center px-2 pointer-events-none">
            {item.title}
          </div>
          {/* Golden shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Caption */}
        <div className="p-3 md:p-4">
          <p className="text-sm md:text-base font-mythical font-bold text-magical-gold truncate">{item.title}</p>
          <p className="text-xs text-gray-400 mt-1 font-cinematic tracking-widest uppercase">{item.subtitle}</p>
        </div>

        {/* Golden border glow on hover */}
        <div className="absolute inset-0 rounded-xl border border-magical-gold/0 group-hover:border-magical-gold/60 transition-all duration-300 pointer-events-none shadow-[inset_0_0_20px_rgba(203,161,83,0)] group-hover:shadow-[inset_0_0_20px_rgba(203,161,83,0.15)]" />
      </motion.div>
    </div>
  )
}
