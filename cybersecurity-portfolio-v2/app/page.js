'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import CyberMap from '@/components/CyberMap' // ADD THIS
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative z-10 bg-background text-text">
      <Header />
      <Hero />
      <About />
      <Services />
      <CyberMap /> {/* ADD THIS */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}