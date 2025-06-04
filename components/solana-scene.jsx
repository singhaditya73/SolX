"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import Loading from "@/components/loading"

export default function SolanaScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14F195" />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <SolanaModel />
        </Float>

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}

function SolanaModel() {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={mesh}>
      <mesh>
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <meshStandardMaterial
          color="#9945FF"
          emissive="#14F195"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
