'use client' // This page MUST be a client component for the Hero/Scramble hooks

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
// We removed the unused TextScramble import

export default function Home() {
  return (
    // We are back to a single, scrolling page
    <main className="relative z-10 bg-background text-text">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}