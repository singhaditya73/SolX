"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function SolanaModel(props) {
  // This is a placeholder for the actual Solana logo model
  // You would replace this with your actual 3D model
  const mesh = useRef()

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh {...props} ref={mesh}>
      <torusGeometry args={[1.5, 0.5, 16, 100]} />
      <meshStandardMaterial
        color="#9945FF"
        emissive="#14F195"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}
