import { Scroll } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Image as ImageIcon, ChevronDown } from 'lucide-react'
import AchievementsMarquee from './AchievementsMarquee'
import WinnersWardrobe from './WinnersWardrobe'

// Thin golden divider between sections
function Divider() {
  return (
    <div className="w-full flex items-center justify-center py-0">
      <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-magical-gold/40 to-transparent" />
    </div>
  )
}

export default function Overlay() {
  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* ── SECTION 1: HERO ── full viewport */}
      <section className="w-full h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <motion.h1
            animate={{
              textShadow: [
                '0px 5px 20px rgba(212,175,55,0.5)',
                '0px 10px 60px rgba(255,223,0,1)',
                '0px 5px 20px rgba(212,175,55,0.5)',
              ],
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[8rem] sm:text-[12rem] md:text-[18rem] font-mythical font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#FFF7D6] via-[#D4AF37] to-[#8A5A19] drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] mb-2"
          >
            IT
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl font-mythical font-bold text-gray-200 uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,1)]"
          >
            I Division
          </motion.h2>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-magical-gold/60 text-xs font-mythical uppercase tracking-[0.4em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-8 h-8 text-magical-gold/80" />
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 2: ACHIEVEMENTS ── full viewport */}
      <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <AchievementsMarquee />
      </section>

      <Divider />

      {/* ── SECTION 3: HALL OF WINNERS ── full viewport */}
      <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <WinnersWardrobe />
      </section>

      <Divider />

      {/* ── SECTION 4: MEMORIES COLLAGE ── full viewport */}
      <section className="w-full h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-mythical font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-magical-gold via-white to-magical-gold drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
        >
          Division Memories
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05, type: 'spring' }}
              className="glass-frame aspect-square border border-magical-gold/30 hover:bg-magical-gold/10 hover:border-magical-gold transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.6)]"
            >
              <div className="text-center">
                <ImageIcon className="w-6 h-6 text-magical-gold/50 mx-auto mb-1" />
                <p className="text-xs text-magical-gold/70 font-mythical font-bold px-2">Memory {i}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── SECTION 5: CLASS ROSTER MARQUEE ── last section, tight */}
      <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-mythical font-bold text-magical-gold mb-12 drop-shadow-[0_5px_10px_rgba(0,0,0,1)] text-center px-4"
        >
          The Legends of I Division
        </motion.h2>

        <div className="relative w-full overflow-hidden flex whitespace-nowrap py-4">
          <div className="absolute left-0 top-0 w-16 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-2 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          >
            {[...rosterNames, ...rosterNames].map((name, idx) => (
              <span key={idx} className="text-sm sm:text-base font-cinematic font-light text-gray-200 tracking-wide whitespace-nowrap">
                {name}
                <span className="text-magical-gold mx-3 drop-shadow-[0_0_8px_rgba(203,161,83,0.8)]"> ✦ </span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </Scroll>
  )
}

// I Division — Official Student Roster
const rosterNames = [
  'Aaqib Sayyed', 'Abhishree Bhoj', 'Ajit Ghule', 'Akshad Mulik', 'Akhilesh Gondepatil',
  'Anuja Desai', 'Anushka Chunne', 'Arya Chaskar', 'Arya Kukkadwal', 'Atharva Deokar',
  'Atharva Kachale', 'Chaitali Ingle', 'Chaitali Nannore', 'Devang Telrandhe', 'Disha Mali',
  'Gayatri Yadav', 'Gouri Panchal', 'Harshada Gode', 'Ishwari Bhondve', 'Jemi Jain',
  'Kalyani Jawlekar', 'Liza Kaul', 'Manasi Amane', 'Mayank Shinde', 'Monik Kale',
  'Mrudula Kulkarni', 'Mrunal Dange', 'Munja Bobade', 'Namrata Kanthale', 'Navinya Narkhede',
  'Nikita Jadhav', 'Om Khose', 'Omkar Avhad', 'Parth Gawli', 'Parth Patil',
  'Parth Yeolekar', 'Pavan Bornake', 'Pawankumar Prajapati', 'Pranav Londhe', 'Prathmesh Chaudhari',
  'Priyesh Ghadge', 'Pradnya Birajdar', 'Rahi Padamwar', 'Rahul Machhirke', 'Rishikesh Wadekar',
  'Rudra Sangale', 'Saksham Shukla', 'Samiksha Chavan', 'Samruddhi Palekar', 'Samyak Ghodse',
  'Sanika Satav', 'Sanjana Hodage', 'Sanjana Mangavade', 'Sanchita Todkar', 'Sayli Mane',
  'Shivraj Pisal', 'Shreyash Kumbhar', 'Shrish Sadavarte', 'Shrishal Mahesh', 'Siddhant Deshmukh',
  'Soham Kalbhor', 'Sonali Dongare', 'Srushti Hande', 'Swanand Barapatre', 'Swarali Nazare',
  'Swastik Kalyane', 'Utkarsh Rabade', 'Vedant Gedam', 'Vyankatesh Deshmukh', 'Yash Mahadik',
]
