'use client'

import { useState, useEffect, useRef } from 'react'

// --- This is the new, smarter hook ---
const useTextScramble = () => {
  const [scrambledText, setScrambledText] = useState('')
  const [originalText, setOriginalText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  // Step 1: Observer to check when the component is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Start when 50% is visible
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  // Step 2: Once the component exists, get its real text content
  useEffect(() => {
    if (ref.current && !originalText) {
      // This is the fix: We read the text *from the rendered component*
      const text = ref.current.textContent || ''
      setOriginalText(text)
      setScrambledText(text) // Start with the final text
    }
  }, [ref.current]); // Run as soon as the ref is available

  // Step 3: Once it's visible AND we have the text, start the scramble
  useEffect(() => {
    if (!isVisible || !originalText) return; // Don't run yet

    let frame = 0;
    let frameRequest;
    let startText = ' '.repeat(originalText.length).split('');

    const scramble = () => {
      let currentText = originalText.split('');
      let newText = startText; // Start from blank
      let complete = 0;

      for (let i = 0; i < currentText.length; i++) {
        // Scramble phase
        if (frame < i * 3) { // Stagger the scramble
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          newText[i] = randomChar;
        } 
        // Resolve phase
        else {
          newText[i] = currentText[i];
          complete++;
        }
      }

      setScrambledText(newText.join(''));

      if (complete === currentText.length) {
        cancelAnimationFrame(frameRequest);
      } else {
        frame++;
        frameRequest = requestAnimationFrame(scramble);
      }
    };
    
    // Start with blank text, then scramble
    setScrambledText(' '.repeat(originalText.length));
    frameRequest = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(frameRequest);
  }, [isVisible, originalText]); // Re-run if text changes

  return [ref, scrambledText];
};
// --- End of the new hook ---


// Wrapper component
// We change this to pass the *original children* through,
// and let the hook scramble the text.
export default function TextScramble({ children, as: Component = 'h2', ...props }) {
  const [ref, scrambledText] = useTextScramble();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Component ref={ref} {...props}>
      {/* This is the key:
        - On the server, render the real text (for SEO).
        - On the client, once mounted, render the scrambled text.
      */}
      {hasMounted ? scrambledText : children}
    </Component>
  );
}