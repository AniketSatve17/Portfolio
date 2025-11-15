'use client'

import React, { useRef, useEffect } from 'react'

// This component is 100% 2D Canvas. It is *much* faster than three.js
// and will not crash your app.
export default function CursorRain() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -999, y: -999 }) // Start off-screen
  
  // The "rain" logic
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Characters for the rain
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const alphabet = katakana + latin + nums
    
    const fontSize = 16
    const columns = Math.floor(width / fontSize)
    const rainDrops = []

    for (let i = 0; i < columns; i++) {
      rainDrops[i] = 1 // y-coordinate
    }

    let frameCount = 0;

    const draw = () => {
      // Dark, semi-transparent background for a "fading" trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, width, height)
      
      ctx.fillStyle = '#E50914' // Mr. Robot Red
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`

      const mouseCol = Math.floor(mouse.current.x / fontSize)
      
      for (let i = 0; i < rainDrops.length; i++) {
        // Only render 1 in 4 columns for a sparse "code" look
        if (i % 4 !== 0) continue; 

        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)
        
        // This is the "cursify" effect you asked for
        // Make the rain near the mouse fall faster and reset more often
        const isNearMouse = Math.abs(i - mouseCol) < 8 // 8 columns near mouse
        
        let fallSpeed = isNearMouse ? (0.5 + Math.random() * 0.5) : 0.1
        let resetChance = isNearMouse ? 0.95 : 0.01

        if (rainDrops[i] * fontSize > height && Math.random() > resetChance) {
          rainDrops[i] = 0
        }
        
        rainDrops[i] += fallSpeed;
      }
    }

    let animationFrameId;
    
    const animate = () => {
      // Throttle the animation to 20 FPS. This is a "Matrix" trick.
      // It looks more "digital" and saves a *ton* of performance.
      if (frameCount % 3 === 0) {
        draw()
      }
      frameCount++;
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    
    const handleMouseLeave = () => {
       mouse.current = { x: -999, y: -999 } // Move off-screen
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave) // NEW
    
    animate(); // Start the animation

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      // This is the key: z-[-1] puts it *behind* your content
      className="fixed top-0 left-0 w-full h-screen z-[-1] pointer-events-none" 
    />
  )
}