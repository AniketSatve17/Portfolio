/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      // --- NEW MR. ROBOT COLOR PALETTE ---
      colors: {
        background: '#0a0a0a', // Almost black
        text: '#f5f5f5',       // Off-white (like a monitor)
        primary: '#E50914',     // Aggressive red (E Corp / fsociety)
        'primary-dark': '#B20710',
        'primary-glow': 'rgba(229, 9, 20, 0.5)',
      },
      // --- NEW ANIMATIONS ---
      animation: {
        glitch: 'glitch 1.5s steps(2, end) infinite alternate-reverse',
        'text-flicker': 'text-flicker 3s linear infinite alternate',
        'crt-flicker': 'crt-flicker 0.15s infinite',
        'cursor-blink': 'cursor-blink 1s steps(2) infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)', opacity: '1' },
          '25%': { transform: 'translate(3px, -2px)', opacity: '0.8' },
          '50%': { transform: 'translate(-3px, 2px)', opacity: '1' },
          '75%': { transform: 'translate(2px, -3px)', opacity: '0.6' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
        'text-flicker': {
          '0%': { opacity: 0.1, textShadow: '0 0 5px #E50914' },
          '30%': { opacity: 1, textShadow: '0 0 10px #E50914' },
          '70%': { opacity: 0.7, textShadow: '0 0 12px #E50914' },
          '100%': { opacity: 1, textShadow: '0 0 10px #E50914' },
        },
        'crt-flicker': {
          '0%': { opacity: 0.95 },
          '50%': { opacity: 0.9 },
          '100%': { opacity: 0.95 },
        },
        'cursor-blink': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        // --- NEW RED GLOW ---
        'red-glow': '0 0 20px rgba(229, 9, 20, 0.5), 0 0 8px rgba(229, 9, 20, 0.4)',
      },
    },
  },
  plugins: [],
}