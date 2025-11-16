'use client'

import { Github, Linkedin, ChevronDown } from 'lucide-react'
import TextScramble from '@/components/TextScramble' // <-- THIS IS THE FIX
import { useEffect, useState } from 'react'

export default function Hero() {
  const [showPrompt, setShowPrompt] = useState(false)

  // This creates the "typewriter" effect for the sub-headline
  const [subtext, setSubtext] = useState('')
  const fullSubtext = "Cybersecurity Architect | Blockchain Developer | Threat Intelligence Specialist"

  useEffect(() => {
    // Show the "terminal prompt" after a short delay
    setTimeout(() => {
      setShowPrompt(true)
    }, 2500); // Wait for the main scramble to finish

    // Typewriter effect logic
    if (showPrompt && subtext.length < fullSubtext.length) {
      const timer = setTimeout(() => {
        setSubtext(fullSubtext.substring(0, subtext.length + 1))
      }, 50); // Speed of typing
      return () => clearTimeout(timer);
    }
  }, [showPrompt, subtext])
  
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center bg-background text-text overflow-hidden p-6">
      
      {/* This is the UI overlay */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* The H1 title will use the scramble effect */}
        <TextScramble 
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-text mb-6 animate-glitch"
        >
          ANIKET SATVE
        </TextScramble>
        
        {/* The sub-headline will "type" out */}
        <div className="h-16 md:h-24">
          {showPrompt && (
            <div className="flex items-center">
              <span className="text-primary-dark text-xl md:text-3xl font-mono mr-2">$</span>
              <p className="text-xl md:text-3xl text-gray-400 font-mono">
                {subtext}
                <span className="animate-cursor-blink">_</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="https://github.com/AniketSatve17"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-background border border-primary text-primary rounded-sm hover:bg-primary/20 transition-all flex items-center gap-2 font-mono"
          >
            <Github className="w-5 h-5" />
            /github
          </a>
          <a
            href="https://www.linkedin.com/in/aniket-satve-874774222/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-background border border-primary text-primary rounded-sm hover:bg-primary/20 transition-all flex items-center gap-2 font-mono"
          >
            <Linkedin className="w-5 h-5" />
            /linkedin
          </a>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-primary text-black rounded-sm hover:bg-primary-dark transition-all font-mono font-bold"
          >
            contact.sh
          </button>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/50 mx-auto" />
      </div>
    </section>
  )
}