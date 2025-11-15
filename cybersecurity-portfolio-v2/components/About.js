'use client'

import { useRef, useEffect, useState } from 'react'
import { Shield, Server, Bug, Code } from 'lucide-react'
import TextScramble from '@/components/TextScramble' // <-- THIS IS THE FIX
import { motion } from 'framer-motion' 

// Custom hook for scroll-reveal animation
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return [ref, isVisible]
}

export default function About() {
  const [ref, isVisible] = useScrollReveal()

  // Animation variants for Framer Motion
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }
  
  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  }

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10`}>
        <div className="max-w-6xl mx-auto">
          
          <TextScramble 
            as="h2"
            className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
          >
            About <span className="text-primary">Me</span>
          </TextScramble>
          
          <div className="w-20 h-1 bg-primary mx-auto mb-12 animate-text-flicker" />
          
          {/* --- NEW 2-COLUMN LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT COLUMN: Hacker Graphic */}
            <motion.div 
              variants={leftVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="bg-background border border-primary/30 rounded-sm p-8 shadow-red-glow h-full"
            >
              <h3 className="text-2xl font-mono text-primary mb-4">Core Competencies</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 font-mono">Threat Analysis & Intel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bug className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 font-mono">Penetration Testing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 font-mono">Network & Cloud Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 font-mono">Smart Contract Auditing</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-6 italic">
                // My work bridges traditional cybersecurity with emerging Web3 technologies, creating secure decentralized systems for the future.
              </p>
            </motion.div>

            {/* RIGHT COLUMN: Bio & Certs */}
            <motion.div 
              variants={rightVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="bg-background border border-primary/30 rounded-sm p-8 shadow-red-glow h-full"
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a cybersecurity professional specializing in identifying and neutralizing threats. With hands-on experience in vulnerability assessment and incident response, I've strengthened security frameworks for organizations while safeguarding critical digital assets.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I've led cross-functional teams, authored technical white papers adopted by 200+ professionals, and reduced manual security checks by 40% through advanced automation.
              </p>

              <div className="mt-8 pt-8 border-t border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 font-mono">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Certified Ethical Hacker (CEHv12)',
                    'Oracle Certified Foundations Associate',
                    'ISC2 Candidate Badge',
                    'ETHGlobal Hackathon Participant'
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-400">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          {/* --- END NEW 2-COLUMN LAYOUT --- */}
        </div>
      </div>
    </section>
  )
}