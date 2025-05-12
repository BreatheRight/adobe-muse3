"use client"

import { useRef, useEffect, useState } from "react"

interface WaveformProps {
  progress: number
  className?: string
}

export function Waveform({ progress, className = "" }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationFrame, setAnimationFrame] = useState(0)
  const animationSpeed = 0.025

  useEffect(() => {
    let animationId: number

    const animate = () => {
      setAnimationFrame(prev => prev + animationSpeed)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create gradient background for the waveform
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#1e1e1e")
    gradient.addColorStop(1, "#1e1e1e")
    ctx.fillStyle = gradient

    // Fill background
    ctx.fillRect(0, 0, width, height)

    // Configuration for the six lines
    const lines = [
      { color: "#4cc9f0", width: 2, amplitudeFactor: 0.12, frequencyFactor: 5, phaseFactor: 1.0 },   // Wider peaks
      { color: "#4895ef", width: 1.5, amplitudeFactor: 0.08, frequencyFactor: 15, phaseFactor: 0.7 }, // Normal
      { color: "#4361ee", width: 1.8, amplitudeFactor: 0.14, frequencyFactor: 4, phaseFactor: 1.3 },  // Wider peaks
      { color: "#3f37c9", width: 1, amplitudeFactor: 0.06, frequencyFactor: 12, phaseFactor: 0.5 },   // Normal
      { color: "#7209b7", width: 1.5, amplitudeFactor: 0.10, frequencyFactor: 3, phaseFactor: 1.1 },  // Wider peaks
      { color: "#f72585", width: 1.5, amplitudeFactor: 0.07, frequencyFactor: 20, phaseFactor: 0.9 }  // Normal
    ]
    
    // Draw each line
    lines.forEach((line, lineIndex) => {
      ctx.strokeStyle = line.color
      ctx.lineWidth = line.width
      
      // Add slight alpha to make it glow-like
      ctx.globalAlpha = 0.85 

      ctx.beginPath()
      
      const totalPoints = 150
      const phaseOffset = animationFrame * line.phaseFactor + (lineIndex * 3) // Different phase for each line
      
      for (let i = 0; i <= totalPoints; i++) {
        const x = (i / totalPoints) * width
        
        // Create a complex waveform with multiple frequencies
        const wave1 = Math.sin((i / line.frequencyFactor) + phaseOffset) * height * line.amplitudeFactor
        const wave2 = Math.sin((i / (line.frequencyFactor * 2)) + phaseOffset * 0.8) * height * (line.amplitudeFactor * 0.5)
        const wave3 = Math.sin((i / (line.frequencyFactor * 0.5)) + phaseOffset * 1.2) * height * (line.amplitudeFactor * 0.3)
        
        const y = (height / 2) + wave1 + wave2 + wave3
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      ctx.globalAlpha = 1.0 // Reset alpha
    })
    
    // Add subtle glow effect
    ctx.shadowColor = "#4cc9f0";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw progress indicator
    const progressX = width * progress
    ctx.fillStyle = "#ffffff" // White progress indicator
    ctx.fillRect(progressX - 1, 0, 2, height)
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
  }, [progress, animationFrame])

  return <canvas ref={canvasRef} width={1000} height={50} className={`w-full h-full ${className}`} />
}
