'use client'

import { useRef, useEffect } from 'react'
import { initScene } from './scene'

export default function HoloBackground() {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
    if (typeof window === 'undefined') return // ✅
    if (!canvasRef.current) return

  console.log('🎨 HoloBackground monté, canvas:', canvasRef.current) // ✅
    const cleanup = initScene(canvasRef.current)
    return cleanup
  }, [])
   return (<canvas
    ref={canvasRef}
    style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // ✅
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
   )
}
