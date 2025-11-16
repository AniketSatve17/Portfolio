'use client'

import { useRef, useEffect, useState } from 'react'
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'
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

export default function Contact() {
  const [ref, isVisible] = useScrollReveal()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact from Portfolio: ${formData.name}`,
          from_name: 'Portfolio Contact Form'
        })
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
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

        <div className="w-20 h-1 bg-primary mx-auto mb-6 animate-text-flicker" />
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-mono">
          // Have a project in mind? Let's secure your digital assets together.
        </p>
        
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
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2 font-mono">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2 font-mono">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2 font-mono">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-primary/30 text-text rounded-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                placeholder="Tell me about your security needs..."
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-sm hover:bg-primary-dark transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-500 font-mono">
                  <CheckCircle className="w-5 h-5" />
                  Message sent successfully!
                </div>
              )}
              
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 font-mono">
                  <AlertCircle className="w-5 h-5" />
                  Please fill all fields
                </div>
              )}
            </div>
          </motion.form>

          <div className="flex justify-center gap-6 mt-12">
            <a 
              href="mailto:aniketsatve17@gmail.com"
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

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm font-mono">
              Response time: <span className="text-primary">24-48 hours</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}