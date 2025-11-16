'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TorusKnot } from '@react-three/drei'

function WireframeMask() {
  const ref = useRef()

  // This hook rotates the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.2
    ref.current.rotation.y += delta * 0.1
  })

  // This is a TorusKnot, which looks like a complex "hacker" 3D symbol
  return (
    <TorusKnot ref={ref} args={[1, 0.3, 100, 16]}>
      <meshStandardMaterial 
        color="#E50914"  // Our "Mr. Robot" red
        wireframe={true}  // Makes it a wireframe
        emissive="#B20710" // Gives it a deep red glow
        emissiveIntensity={2} // Makes the glow strong
        toneMapped={false} // Ensures it glows against the dark
      />
    </TorusKnot>
  )
}

// This is the component we will import into the Footer
export default function FooterScene() {
  return (
    <div className="h-48 w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#E50914" />
        
        <Suspense fallback={null}>
          <WireframeMask />
        </Suspense>
        
        {/* This lets you drag to rotate it */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={1.5} 
        />
      </Canvas>
    </div>
  )
}