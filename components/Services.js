'use client'

import { useRef, useEffect, useState } from 'react'
import { Bug, Shield, Lock, Terminal, Network, Fingerprint, Database, Cpu } from 'lucide-react'
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

export default function Services() {
  const [ref, isVisible] = useScrollReveal()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      icon: Bug,
      title: 'Penetration Testing',
      shortDesc: 'Identify vulnerabilities before attackers do',
      description: 'Comprehensive security assessments using industry-standard tools like Kali Linux, Metasploit, and BurpSuite to identify vulnerabilities.',
      tools: ['Kali Linux', 'Metasploit', 'BurpSuite', 'Nmap'],
      process: ['Reconnaissance', 'Scanning', 'Exploitation', 'Reporting'],
      color: 'from-red-500 to-red-700'
    },
    {
      icon: Shield,
      title: 'Threat Intelligence',
      shortDesc: 'Stay ahead of emerging cyber threats',
      description: 'Advanced threat analysis leveraging MITRE ATT&CK framework and NVD to proactively defend against emerging cyber threats.',
      tools: ['MITRE ATT&CK', 'NVD', 'OSINT', 'ThreatConnect'],
      process: ['Collection', 'Analysis', 'Dissemination', 'Feedback'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Lock,
      title: 'Incident Response',
      shortDesc: 'Rapid threat neutralization and recovery',
      description: 'Rapid incident detection and mitigation strategies, reducing response time and minimizing damage through forensic analysis.',
      tools: ['Splunk', 'ELK Stack', 'Volatility', 'Autopsy'],
      process: ['Detection', 'Containment', 'Eradication', 'Recovery'],
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      icon: Terminal,
      title: 'Smart Contract Security',
      shortDesc: 'Secure your blockchain applications',
      description: 'Blockchain security audits for Solidity-based smart contracts, ensuring secure decentralized applications.',
      tools: ['Slither', 'Mythril', 'Echidna', 'Foundry'],
      process: ['Code Review', 'Static Analysis', 'Fuzzing', 'Audit Report'],
      color: 'from-green-500 to-green-700'
    },
    {
      icon: Network,
      title: 'Network Security',
      shortDesc: 'Fortify your network infrastructure',
      description: 'Design and implement secure network architectures with segmentation, firewalls, and intrusion detection systems.',
      tools: ['Wireshark', 'Snort', 'pfSense', 'Cisco ASA'],
      process: ['Assessment', 'Design', 'Implementation', 'Monitoring'],
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Fingerprint,
      title: 'Identity & Access',
      shortDesc: 'Control and monitor access rights',
      description: 'Implement robust identity and access management solutions with multi-factor authentication and zero-trust architecture.',
      tools: ['Okta', 'Azure AD', 'KeyCloak', 'Duo'],
      process: ['Policy Design', 'Implementation', 'Enforcement', 'Audit'],
      color: 'from-pink-500 to-pink-700'
    },
    {
      icon: Database,
      title: 'Data Protection',
      shortDesc: 'Safeguard sensitive information',
      description: 'Comprehensive data protection strategies including encryption, DLP, and compliance with GDPR/CCPA regulations.',
      tools: ['VeraCrypt', 'Symantec DLP', 'AWS KMS', 'HashiCorp Vault'],
      process: ['Classification', 'Encryption', 'Monitoring', 'Compliance'],
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      icon: Cpu,
      title: 'Security Automation',
      shortDesc: 'Automate threat detection and response',
      description: 'Build automated security workflows using SOAR platforms to reduce response time and improve efficiency.',
      tools: ['Splunk SOAR', 'Cortex XSOAR', 'TheHive', 'Python'],
      process: ['Workflow Design', 'Integration', 'Testing', 'Optimization'],
      color: 'from-orange-500 to-orange-700'
    }
  ]

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10`}>
        
        <TextScramble 
          as="h2" 
          className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
        >
          My <span className="text-primary">Services</span>
        </TextScramble>
        
        <div className="w-20 h-1 bg-primary mx-auto mb-6 animate-text-flicker" />
        
        <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto text-lg font-mono">
          // Comprehensive security solutions tailored to your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className={`h-full bg-background border-2 transition-all duration-300 rounded-sm p-6 ${
                hoveredIndex === index 
                  ? 'border-primary shadow-red-glow transform scale-105' 
                  : 'border-primary/30'
              }`}>
                
                {/* Icon with animated background */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 rounded-sm flex items-center justify-center transition-all duration-300 ${
                    hoveredIndex === index ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <service.icon className={`w-8 h-8 transition-all duration-300 ${
                      hoveredIndex === index ? 'text-primary scale-110' : 'text-primary'
                    }`} />
                  </div>
                  
                  {/* Animated corner brackets */}
                  {hoveredIndex === index && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div
                        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                      />
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-text mb-2 font-mono transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>

                {/* Short description - always visible */}
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Expandable content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: hoveredIndex === index ? 'auto' : 0,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-primary/20">
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tools */}
                    <div className="mb-4">
                      <p className="text-xs text-primary font-mono mb-2 uppercase">Tools:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.tools.map((tool, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/30">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <p className="text-xs text-primary font-mono mb-2 uppercase">Process:</p>
                      <div className="space-y-1">
                        {service.process.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="text-primary">{i + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-background border-2 border-primary/30 rounded-sm p-8 max-w-3xl mx-auto shadow-red-glow">
            <h3 className="text-2xl font-bold text-primary mb-4 font-mono">
              // NEED CUSTOM SECURITY SOLUTION?
            </h3>
            <p className="text-gray-300 mb-6">
              Every organization has unique security challenges. Let's discuss how I can help protect your digital assets.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-sm hover:bg-primary-dark transition-all font-mono font-bold"
            >
              <Terminal className="w-5 h-5" />
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}