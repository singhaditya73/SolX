"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text, Html } from "@react-three/drei"
import Loading from "@/components/loading"

export default function TokenScene({ tokenData, step }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <TokenModel tokenData={tokenData} step={step} />
          </Float>

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function TokenModel({ tokenData, step }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Token base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.3, 32]} />
        <meshStandardMaterial color={step === 3 ? "#9945FF" : "#555555"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Token edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial color={step === 3 ? "#14F195" : "#444444"} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Token face */}
      <mesh position={[0, 0, 0.2]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Token symbol */}
      {tokenData.symbol && (
        <Text
          position={[0, 0, 0.25]}
          fontSize={0.8}
          color="#ffffff"
          font="/fonts/Inter_Bold.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {tokenData.symbol}
        </Text>
      )}

      {/* Token name */}
      {tokenData.name && (
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.4}
          color="#ffffff"
          font="/fonts/Inter_Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {tokenData.name}
        </Text>
      )}

      {/* Step indicator */}
      <Html position={[0, 3, 0]} center>
        <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
          {step === 1 ? "Define Token Basics" : step === 2 ? "Add Token Details" : "Review & Create"}
        </div>
      </Html>
    </group>
  )
}
