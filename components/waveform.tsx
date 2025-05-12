"use client"

import { useRef, useEffect } from "react"

interface WaveformProps {
  progress: number
  className?: string
}

export function Waveform({ progress, className = "" }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return
      
      // Make canvas fill its container
      canvas.width = container.clientWidth || 1000
      canvas.height = container.clientHeight || 50
      
      // Redraw on resize
      drawWaveform()
    }
    
    // Initial size
    resizeCanvas()
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const drawWaveform = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw waveform
    ctx.fillStyle = "#4ade80" // Green color

    const barWidth = 2
    const barGap = 1
    const totalBars = Math.floor(width / (barWidth + barGap))

    for (let i = 0; i < totalBars; i++) {
      // Generate random height for each bar
      const seed = Math.sin(i * 0.1) * Math.cos(i * 0.3) + 1
      const randomHeight = seed * height * 0.4 + height * 0.1

      // Calculate x position
      const x = i * (barWidth + barGap)

      // Draw bar
      ctx.fillRect(x, (height - randomHeight) / 2, barWidth, randomHeight)
    }

    // Draw progress indicator
    const progressX = width * progress
    ctx.fillStyle = "#3b82f6" // Blue color
    ctx.fillRect(progressX - 1, 0, 2, height)
  }

  useEffect(() => {
    drawWaveform()
  }, [progress])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
