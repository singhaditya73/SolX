"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text } from "@react-three/drei"
import Loading from "@/components/loading"

export default function WalletScene({ balance }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <SolToken balance={balance} />
          </Float>

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function SolToken({ balance }) {
  const coinRef = useRef()
  const [displayBalance, setDisplayBalance] = useState("0")

  useEffect(() => {
    if (balance) {
      setDisplayBalance(balance)
    }
  }, [balance])

  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group ref={coinRef}>
      {/* Coin body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#9945FF" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Coin edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color="#14F195" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Solana logo on front */}
      <mesh position={[0, 0, 0.15]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Solana logo on back */}
      <mesh position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Balance text */}
      <group position={[0, -3, 0]}>
        <Text font="/fonts/Inter_Bold.ttf" fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
          {displayBalance} SOL
        </Text>
      </group>
    </group>
  )
}
