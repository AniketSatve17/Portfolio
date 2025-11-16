'use client'

import { useRef, useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import TextScramble from '@/components/TextScramble'
import Tilt from 'react-parallax-tilt'; // <-- Make sure you 'npm install react-parallax-tilt'

// Custom hook for scroll-reveal animation (re-used)
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

export default function Projects() {
  const [ref, isVisible] = useScrollReveal()

  const projects = [
    {
      title: 'Human Work Protocol',
      description: 'A decentralized freelancing platform with escrow smart contracts, dispute resolution, and reputation systems. Built on EVM testnet with Solidity.',
      tech: ['Solidity', 'Web3', 'Smart Contracts', 'Foundry'],
      achievements: ['ETHGlobal New Delhi 2025', 'On-chain Escrow System', 'Dispute Resolution Framework']
    },
    {
      title: 'Secure Enterprise Network Architecture',
      description: 'Architected segmented network infrastructure with VLANs and firewalls, mitigating 90% of internal threats. Configured ACLs and documented security policies.',
      tech: ['Network Security', 'VLANs', 'Firewalls', 'ISO 27001'],
      achievements: ['90% Threat Mitigation', '20+ Attack Scenarios Simulated']
    },
    {
      title: 'Secure Credit Card Registration System',
      description: 'Implemented dynamic and secure credit card registration using ASP.NET C# Razor Pages with encrypted data handling and input validation.',
      tech: ['ASP.NET', 'C#', 'Razor Pages', 'Security'],
      achievements: ['PCI-DSS Compliant Design', 'Input Validation']
    }
  ]

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>

        <TextScramble 
          as="h2"
          className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
        >
          Featured <span className="text-primary">Projects</span>
        </TextScramble>
        
        <div className="w-20 h-1 bg-primary mx-auto mb-12 animate-flicker" />
        
        <div className="max-w-6xl mx-auto space-y-8">
          {projects.map((project, index) => (
            
            // --- NEW: Added <Tilt> component ---
            <Tilt
              key={index}
              className="parallax-effect"
              perspective={1000}
              glareEnable={true}
              glareMaxOpacity={0.15} // More subtle glare
              glareColor="#E50914"
              glarePosition="all"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
            >
              <div
                className="inner-element h-full bg-background border border-primary/30 rounded-sm p-8 transition-all duration-300 hover:border-primary/80 hover:shadow-red-glow group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-text transition-colors group-hover:text-primary mb-2 md:mb-0">
                    {project.title}
                  </h3>
                  <a
                    href="https://github.com/AniketSatve17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Code
                  </a>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="border-t border-primary/20 pt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2 font-mono uppercase">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tilt>
            // --- END NEW ---
            
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/AniketSatve17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-primary text-primary rounded-sm hover:bg-primary/20 transition-all font-mono"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}