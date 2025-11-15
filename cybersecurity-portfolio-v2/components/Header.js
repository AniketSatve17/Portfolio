'use client'

import { useState, useEffect } from 'react'
import { Shield, Menu, X } from 'lucide-react'
import Link from 'next/link' // We still use Link, but only for the logo

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- THIS IS THE FIX ---
  // We are back to scrolling to #hash-links
  const navItems = ['About', 'Services', 'CyberMap', 'Projects', 'Contact']

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }
  // --- END OF FIX ---

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary animate-text-flicker" />
            <span className="text-xl font-bold text-text tracking-wider font-mono">ANIKET.DEV</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)} // <-- Use onClick
                className="text-gray-300 hover:text-primary transition-colors font-mono"
              >
                // {item}
              </button>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-text">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)} // <-- Use onClick
                className="block w-full text-left text-gray-300 hover:text-primary transition-colors font-mono"
              >
                // {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}