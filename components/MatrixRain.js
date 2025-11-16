'use client'

import React, { useRef, useEffect } from 'react'

export default function MatrixRain() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Matrix characters - mix of alphanumeric and symbols for cybersecurity theme
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`"
    const chars = matrix.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize
    
    // Array of drops - one per column
    const drops = []
    
    // Initialize drops at random positions
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
    }

    // Drawing the characters
    function draw() {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = fontSize + "px 'IBM Plex Mono', monospace"

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character to print
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        // Red color for the text - matching your theme
        ctx.fillStyle = "#E50914"
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Add brighter character at the head of the drop
        if (drops[i] * fontSize > fontSize) {
          ctx.fillStyle = "rgba(229, 9, 20, 0.5)"
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)], 
            i * fontSize, 
            (drops[i] - 1) * fontSize
          )
        }

        // Reset drop to top randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Increment Y coordinate
        drops[i]++
      }
    }

    // Animation loop
    const intervalId = setInterval(draw, 33) // ~30fps for smooth performance

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Recalculate columns and reset drops
      const newColumns = Math.floor(canvas.width / fontSize)
      drops.length = 0
      
      for (let x = 0; x < newColumns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-screen pointer-events-none" 
      style={{ 
        zIndex: 1,
        opacity: 0.2 // Subtle but visible
      }}
    />
  )
}