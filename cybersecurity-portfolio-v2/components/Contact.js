'use client'

import { useRef, useEffect, useState } from 'react'
import { Mail, Linkedin, Github, Send } from 'lucide-react'
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

export default function Contact() {
  const [ref, isVisible] = useScrollReveal()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Error: Please fill in all fields.')
      setTimeout(() => setStatus(''), 3000)
      return
    }
    
    console.log('Form Data Submitted:', formData)
    setStatus("Message sent! I'll get back to you soon.")
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div ref={ref} className={`container mx-auto px-6 relative z-10`}>

        <TextScramble 
          as="h2"
          className="text-4xl md:text-5xl font-bold text-text mb-4 text-center"
        >
          Get In <span className="text-primary">Touch</span>
        </TextScramble>

        <div className="w-20 h-1 bg-primary mx-auto mb-12 animate-text-flicker" />
        
        <div className="max-w-2xl mx-auto">
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4 bg-background border border-primary/30 rounded-sm p-8 shadow-red-glow"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2 font-mono">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-primary focus:border-primary"
                placeholder="fsociety"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2 font-mono">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-primary focus:border-primary"
                placeholder="elliot@e-corp.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2 font-mono">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-primary focus:border-primary"
                placeholder="Your encrypted message..."
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-sm hover:bg-primary-dark transition-all font-bold"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
              {status && <p className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>}
            </div>
          </motion.form>

          <div className="flex justify-center gap-6 mt-12">
            <a 
              href="mailto:aniket.satve@example.com" // <-- Replace with your real email
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
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
          </div>

        </div>
      </div>
    </section>
  )
}