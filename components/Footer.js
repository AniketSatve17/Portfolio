'use client' // This file now needs to be a client component

import { Suspense } from 'react'
import { Github, Linkedin, Mail, Shield } from 'lucide-react'
import FooterScene from './FooterMask' // <-- NEW: Import our 3D scene

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20 pt-12 pb-8">
      <div className="container mx-auto px-6 text-center">
        
        {/* --- NEW: 3D Scene --- */}
        <div className="max-w-xs mx-auto">
          {/* We add Suspense for good loading practice */}
          <Suspense fallback={<div className="h-48" />}>
            <FooterScene />
          </Suspense>
        </div>
        {/* --- END: 3D Scene --- */}

        <div className="flex justify-center items-center space-x-2 my-6">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-text tracking-wider font-mono">ANIKET.DEV</span>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://www.linkedin.com/in/aniket-satve-874774222/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/AniketSatve17" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="mailto:aniket.satve@example.com" // <-- Replace with your real email
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        <p className="text-gray-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} Aniket Satve. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2 font-mono">
          Built with Next.js & Tailwind CSS. Hosted on Vercel.
        </p>
      </div>
    </footer>
  )
}