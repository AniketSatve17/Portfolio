'use client'

import React, { useRef, useEffect } from 'react'

export default function MatrixRain({ children }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`"
    const chars = matrix.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = []

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
    }

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + "px 'IBM Plex Mono', monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = "#E50914"
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > fontSize) {
          ctx.fillStyle = "rgba(229, 9, 20, 0.5)"
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            i * fontSize,
            (drops[i] - 1) * fontSize
          )
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const intervalId = setInterval(draw, 33)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const newColumns = Math.floor(canvas.width / fontSize)
      drops.length = 0

      for (let x = 0; x < newColumns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Matrix background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
        // style={{
        //   zIndex: 1,
        //   opacity: 0.2,
        // }}

        style={{
          zIndex: 1000,
          opacity: 0.15,
          pointerEvents: "none"
        }}

      />

      {/* Foreground content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
