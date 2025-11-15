'use client'

import { useRef, useEffect, useState } from 'react'
import { Activity, Globe, Shield, AlertTriangle } from 'lucide-react'
import TextScramble from '@/components/TextScramble'
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

export default function CyberMap() {
  const [ref, isVisible] = useScrollReveal()
  const [isLoading, setIsLoading] = useState(true)
  const [useAlternative, setUseAlternative] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="cybermap" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10`}>
        
        <TextScramble 
          as="h2"
          className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
        >
          Live <span className="text-primary">Cyber Threats</span>
        </TextScramble>
        
        <div className="w-20 h-1 bg-primary mx-auto mb-6 animate-text-flicker" />
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-mono">
          // Real-time visualization of global cyber attacks
        </p>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-6xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div 
            className="bg-background border border-primary/30 rounded-sm p-4 hover:border-primary/80 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-400 font-mono">Status</span>
            </div>
            <p className="text-2xl font-bold text-text font-mono">LIVE</p>
          </motion.div>

          <motion.div 
            className="bg-background border border-primary/30 rounded-sm p-4 hover:border-primary/80 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-400 font-mono">Coverage</span>
            </div>
            <p className="text-2xl font-bold text-text font-mono">GLOBAL</p>
          </motion.div>

          <motion.div 
            className="bg-background border border-primary/30 rounded-sm p-4 hover:border-primary/80 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-400 font-mono">Monitoring</span>
            </div>
            <p className="text-2xl font-bold text-text font-mono">ACTIVE</p>
          </motion.div>

          <motion.div 
            className="bg-background border border-primary/30 rounded-sm p-4 hover:border-primary/80 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-400 font-mono">Threats</span>
            </div>
            <p className="text-2xl font-bold text-text font-mono">24/7</p>
          </motion.div>
        </motion.div>

        {/* Cybermap Container */}
        <motion.div 
          className="relative max-w-7xl mx-auto"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="bg-background border-2 border-primary/30 rounded-sm overflow-hidden shadow-red-glow relative">
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-background/90 z-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                  <p className="text-primary font-mono text-lg">// INITIALIZING THREAT MAP...</p>
                </div>
              </div>
            )}

            {/* Terminal Header */}
            <div className="bg-primary/10 border-b border-primary/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                </div>
                <span className="text-primary font-mono text-sm ml-4">
                  $ cyber_threat_map --live --global
                </span>
              </div>
              <button
                onClick={() => setUseAlternative(!useAlternative)}
                className="text-xs text-primary hover:text-primary-dark font-mono px-2 py-1 border border-primary/30 rounded"
              >
                {useAlternative ? 'View 1' : 'View 2'}
              </button>
            </div>

            {/* Iframe Container */}
            <div className="relative w-full bg-black" style={{ height: '600px' }}>
              {!useAlternative ? (
                <iframe
                  src="https://cybermap.kaspersky.com/en/widget/dynamic/dark"
                  className="w-full h-full"
                  style={{ border: 'none', background: '#000' }}
                  title="Kaspersky Cyber Threat Map"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    console.log('Primary iframe failed, switching to alternative');
                    setUseAlternative(true);
                  }}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <iframe
                  src="https://threatmap.checkpoint.com/ThreatPortal/livemap.html"
                  className="w-full h-full"
                  style={{ border: 'none', background: '#000' }}
                  title="Alternative Cyber Threat Map"
                  onLoad={() => setIsLoading(false)}
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-primary/10 border-t border-primary/30 p-3">
              <p className="text-xs text-gray-400 font-mono">
                <span className="text-primary">WARNING:</span> Real-time data feed. Cyber threats detected globally.
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-background border border-primary/30 rounded-sm p-6">
            <h3 className="text-xl font-bold text-primary mb-3 font-mono">
              // ABOUT THIS VISUALIZATION
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              This live threat map displays real-time cyber attacks detected by global security networks. 
              Each connection represents an active threat, showing the source and target of malicious activities 
              across the internet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <div>
                  <p className="text-gray-200 font-semibold">Real-Time Detection</p>
                  <p className="text-sm text-gray-400">Live data from millions of endpoints worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <div>
                  <p className="text-gray-200 font-semibold">Global Coverage</p>
                  <p className="text-sm text-gray-400">Monitoring threats from every continent</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Multiple Source Links */}
        <motion.div 
          className="text-center mt-12 flex flex-wrap justify-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <a
            href="https://cybermap.kaspersky.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-primary text-primary rounded-sm hover:bg-primary/20 transition-all font-mono"
          >
            <Globe className="w-5 h-5" />
            Kaspersky Threat Map
          </a>
          <a
            href="https://threatmap.checkpoint.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-primary text-primary rounded-sm hover:bg-primary/20 transition-all font-mono"
          >
            <Globe className="w-5 h-5" />
            CheckPoint ThreatMap
          </a>
        </motion.div>
      </div>
    </section>
  )
}