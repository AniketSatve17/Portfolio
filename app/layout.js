'use client'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import MatrixRain from '@/components/MatrixRain'
// import MatrixRain from '@/components/MatrixRain' // COMMENTED OUT FOR NOW

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Aniket Satve | Cybersecurity Architect</title>
        <meta name="description" content="Cybersecurity professional specializing in threat intelligence, penetration testing, and blockchain security." />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {/* <MatrixRain /> */} {/* COMMENTED OUT FOR NOW */}
       <MatrixRain /> 
        {children}
      </body>
    </html>
  )
}