'use client' // This file must be a client component for the cursor
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import CursorRain from '@/components/CursorRain' // <-- NEW: Import the rain

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
})

// We must remove metadata export from client components
// export const metadata = { ... }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Aniket Satve | Cybersecurity Architect</title>
        <meta name="description" content="Cybersecurity professional specializing in threat intelligence, penetration testing, and blockchain security." />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <CursorRain /> {/* <-- NEW: Add the component here */}
        {children}
      </body>
    </html>
  )
}