import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, PerspectiveCamera } from '@react-three/drei'
import Smoke from './Smoke'
import FloatingImages from './FloatingImages'
import ThemeController from './ThemeController'
import ScrollSync from './ScrollSync'
import SnapScroll from './SnapScroll'

export default function Scene({ children }) {
  return (
    <div className="w-full h-screen fixed inset-0 z-0 bg-transparent">
      {/* Note alpha: true makes the canvas background transparent so the video shows through */}
      <Canvas gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
          
          {/* Volumetric Fog Effect (Color managed by ThemeController) */}
          <fogExp2 attach="fog" color="#050a14" density={0.02} />

          {/* Ambient lighting for the smoke and images */}
          <ambientLight intensity={0.5} color="#ffaa00" />
          <pointLight position={[0, 5, 5]} intensity={2} color="#cba153" distance={50} />
          
          {/* 5 full-screen sections = pages 5 */}
          <ScrollControls pages={5} damping={0.3} distance={0.17}>
            <ScrollSync />
            <SnapScroll pages={5} />
            {/* Dynamic Theme Controller MUST be inside ScrollControls */}
            <ThemeController />
            
            {/* 3D Elements (Smoke and Floating Photos) — Reduced count for performance */}
            <Smoke count={300} />
            <FloatingImages />

            {/* HTML Overlay injected through children */}
            {children}
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
