'use client'

import { useRef, useEffect, useState } from 'react'
import { Shield, Server, Bug, Code, Terminal, Lock, Eye, Zap } from 'lucide-react'
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

export default function About() {
  const [ref, isVisible] = useScrollReveal()
  const [activeTab, setActiveTab] = useState('profile')

  const skills = [
    { name: 'Penetration Testing', level: 95 },
    { name: 'Threat Intelligence', level: 90 },
    { name: 'Network Security', level: 88 },
    { name: 'Smart Contract Auditing', level: 85 },
    { name: 'Incident Response', level: 92 },
    { name: 'Blockchain Security', level: 87 }
  ]

  const experiences = [
    {
      icon: Shield,
      title: 'Security Researcher',
      description: 'Led vulnerability assessments and threat mitigation strategies',
      metrics: ['200+ vulnerabilities found', '40% reduction in threats']
    },
    {
      icon: Terminal,
      title: 'Ethical Hacker',
      description: 'Conducted penetration tests on critical infrastructure',
      metrics: ['50+ systems tested', '100% compliance achieved']
    },
    {
      icon: Lock,
      title: 'Smart Contract Auditor',
      description: 'Audited DeFi protocols and blockchain applications',
      metrics: ['$5M+ in assets secured', '15+ projects audited']
    }
  ]

  const achievements = [
    { icon: Eye, label: 'Threats Neutralized', value: '500+' },
    { icon: Zap, label: 'Response Time', value: '<15min' },
    { icon: Shield, label: 'Systems Secured', value: '100+' },
    { icon: Code, label: 'Code Reviews', value: '1000+' }
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10`}>
        <div className="max-w-7xl mx-auto">
          
          <TextScramble 
            as="h2"
            className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
          >
            About <span className="text-primary">Me</span>
          </TextScramble>
          
          <div className="w-20 h-1 bg-primary mx-auto mb-12 animate-text-flicker" />

          {/* Terminal Tab Navigation */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex gap-2 border-b border-primary/30">
              {['profile', 'experience', 'stats'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-mono text-sm border-t border-x border-primary/30 rounded-t-sm transition-all ${
                    activeTab === tab
                      ? 'bg-primary/20 text-primary border-primary'
                      : 'bg-background/50 text-gray-400 hover:text-primary'
                  }`}
                >
                  $ cat {tab}.txt
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Bio */}
                <motion.div 
                  className="bg-background border border-primary/30 rounded-sm p-8 shadow-red-glow"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-mono text-primary">// PROFILE</h3>
                  </div>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    I'm a <span className="text-primary font-semibold">cybersecurity architect</span> specializing 
                    in identifying and neutralizing threats before they strike. With hands-on experience in 
                    vulnerability assessment and incident response, I've strengthened security frameworks for 
                    organizations while safeguarding critical digital assets.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    My work bridges <span className="text-primary font-semibold">traditional cybersecurity</span> with 
                    emerging <span className="text-primary font-semibold">Web3 technologies</span>, creating secure 
                    decentralized systems for the future.
                  </p>

                  <div className="border-t border-primary/20 pt-6">
                    <h4 className="text-sm text-primary font-mono mb-4 uppercase tracking-wide">
                      Core Competencies
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shield, text: 'Threat Analysis' },
                        { icon: Bug, text: 'Pen Testing' },
                        { icon: Server, text: 'Cloud Security' },
                        { icon: Code, text: 'Smart Contracts' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-400">
                          <item.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right: Skills */}
                <motion.div 
                  className="bg-background border border-primary/30 rounded-sm p-8 shadow-red-glow"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-mono text-primary">// SKILLS</h3>
                  </div>

                  <div className="space-y-6">
                    {skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 font-mono text-sm">{skill.name}</span>
                          <span className="text-primary font-mono text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-background border border-primary/30 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-primary-dark"
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-primary/20">
                    <h4 className="text-xl font-semibold text-primary mb-4 font-mono">
                      Certifications
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        'Certified Ethical Hacker (CEHv12)',
                        'Oracle Certified Foundations Associate',
                        'ISC2 Candidate Badge',
                        'ETHGlobal Hackathon Participant'
                      ].map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-400">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="bg-background border border-primary/30 rounded-sm p-6 shadow-red-glow hover:border-primary/80 transition-all group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                      <exp.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2 font-mono">{exp.title}</h3>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.metrics.map((metric, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <span className="text-primary">▹</span>
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="bg-background border-2 border-primary/30 rounded-sm p-6 text-center shadow-red-glow hover:border-primary transition-all group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all">
                      <achievement.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2 font-mono">{achievement.value}</h3>
                    <p className="text-gray-400 text-sm font-mono">{achievement.label}</p>
                  </motion.div>
                ))}
                
                <motion.div
                  className="md:col-span-2 lg:col-span-4 bg-background border border-primary/30 rounded-sm p-8 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-primary mb-4 font-mono text-center">
                    // KEY ACHIEVEMENTS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">▹</span>
                      <div>
                        <p className="text-gray-200 font-semibold">Cross-Functional Leadership</p>
                        <p className="text-sm text-gray-400">Led teams in strengthening security frameworks across multiple organizations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">▹</span>
                      <div>
                        <p className="text-gray-200 font-semibold">Technical Publications</p>
                        <p className="text-sm text-gray-400">Authored white papers adopted by 200+ security professionals globally</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">▹</span>
                      <div>
                        <p className="text-gray-200 font-semibold">Automation Excellence</p>
                        <p className="text-sm text-gray-400">Reduced manual security checks by 40% through advanced automation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">▹</span>
                      <div>
                        <p className="text-gray-200 font-semibold">Network Architecture</p>
                        <p className="text-sm text-gray-400">Designed segmented infrastructure mitigating 90% of internal threats</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}