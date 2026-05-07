import Scene from './components/Scene'
import Overlay from './components/Overlay'
import ImageSequence from './components/ImageSequence'
import GoToTop from './components/GoToTop'
import IdleVideo from './components/IdleVideo'

function App() {
  return (
    <main className="relative w-full h-screen text-white font-cinematic overflow-hidden bg-black">
      {/* Vignette Layer 1 — radial center fade */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.9)_100%)]" />
      {/* Vignette Layer 2 — hard border darkening on all 4 edges */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{
          boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.95)',
        }}
      />

      {/* Frame sequence background (driven by scroll) */}
      <ImageSequence />

      {/* Idle video — plays castle.mp4 when user is at top and not scrolling */}
      <IdleVideo />

      {/* 3D Atmosphere Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Scene>
          <Overlay />
        </Scene>
      </div>

      {/* Go To Top Button — fixed, outside the 3D canvas */}
      <GoToTop />
    </main>
  )
}

export default App
