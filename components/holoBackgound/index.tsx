'use client'

import { useRef, useEffect } from 'react'
import { initScene } from './scene'

export default function HoloBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!canvasRef.current) return

    // ✅ Délai pour Safari
    const timer = setTimeout(() => {
      if (!canvasRef.current) return
      const cleanup = initScene(canvasRef.current)
      return () => cleanup?.()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}