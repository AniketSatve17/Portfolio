'use client'

import { useRef, useEffect, useState } from 'react'
import { Bug, Shield, Lock, Terminal } from 'lucide-react'
import TextScramble from '@/components/TextScramble' // <-- THIS IS THE FIX
import { motion } from 'framer-motion'

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

export default function Services() {
  const [ref, isVisible] = useScrollReveal()

  const services = [
    {
      icon: Bug,
      title: 'Penetration Testing',
      description: 'Comprehensive security assessments using industry-standard tools like Kali Linux, Metasploit, and BurpSuite to identify vulnerabilities.'
    },
    {
      icon: Shield,
      title: 'Threat Intelligence',
      description: 'Advanced threat analysis leveraging MITRE ATT&CK framework and NVD to proactively defend against emerging cyber threats.'
    },
    {
      icon: Lock,
      title: 'Incident Response',
      description: 'Rapid incident detection and mitigation strategies, reducing response time and minimizing damage through forensic analysis.'
    },
    {
      icon: Terminal,
      title: 'Smart Contract Security',
      description: 'Blockchain security audits for Solidity-based smart contracts, ensuring secure decentralized applications.'
    }
  ]

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        
        <TextScramble 
          as="h2" 
          className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
        >
          My <span className="text-primary">Services</span>
        </TextScramble>
        
        <div className="w-20 h-1 bg-primary mx-auto mb-12 animate-text-flicker" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-background border border-primary/30 rounded-sm p-6 transition-all duration-300 hover:border-primary/80 hover:shadow-red-glow group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-sm flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
                <service.icon className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3 font-mono">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}