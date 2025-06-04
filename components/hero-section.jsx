"use client"

import { Suspense, useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { AdditiveBlending } from "three"
import Loading from "@/components/loading"

export default function HeroScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] to-[#0f0326]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={<Loading />}>
          <NightSky />
          <ShootingStars />
        </Suspense>
      </Canvas>
    </div>
  )
}

function NightSky() {
  const starsRef = useRef()
  const starCount = 300 // Increased number of stars

  // Create stars with different sizes and colors
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const size = Math.random() * 0.05 + 0.01

      // Determine color - mostly white/blue with occasional purple
      const color =
        Math.random() > 0.85
          ? "#9945FF" // Solana purple for some stars
          : Math.random() > 0.7
            ? "#14F195" // Solana teal for some stars
            : Math.random() > 0.5
              ? "#ffffff" // White for most stars
              : "#a0c0ff" // Light blue for some stars

      temp.push({
        id: i,
        position: [x, y, z],
        size,
        color,
        blinking: Math.random() > 0.7, // Some stars will blink
        blinkSpeed: Math.random() * 2 + 0.5,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      // Subtle rotation of the entire star field
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01

      // Update each star's material for blinking effect
      starsRef.current.children.forEach((star, i) => {
        if (stars[i].blinking && star.material) {
          const blinkFactor = Math.sin(state.clock.getElapsedTime() * stars[i].blinkSpeed) * 0.3 + 0.7
          star.material.opacity = blinkFactor
        }
      })
    }
  })

  return (
    <group ref={starsRef}>
      {stars.map((star) => (
        <mesh key={star.id} position={star.position} scale={star.size}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={star.color} transparent opacity={0.8} blending={AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

function ShootingStars() {
  const [shootingStars, setShootingStars] = useState([])
  const nextId = useRef(0)

  // Create a new shooting star every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        // 50% chance to create a shooting star
        const x = (Math.random() - 0.5) * 30
        const y = (Math.random() - 0.5) * 30 + 10 // Start higher up
        const z = (Math.random() - 0.5) * 10

        const directionX = Math.random() * -3 - 1 // Always move left to right
        const directionY = Math.random() * -3 - 1 // Always move top to bottom

        const newStar = {
          id: nextId.current++,
          position: [x, y, z],
          direction: [directionX, directionY, 0],
          size: Math.random() * 0.1 + 0.05,
          speed: Math.random() * 0.5 + 0.5,
          color: Math.random() > 0.5 ? "#ffffff" : "#9945FF",
          lifetime: 0,
          maxLifetime: Math.random() * 2 + 1, // 1-3 seconds
        }

        setShootingStars((prev) => [...prev, newStar])
      }
    }, 2000) // Try to create a new shooting star every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useFrame((state, delta) => {
    setShootingStars(
      (prev) =>
        prev
          .map((star) => {
            // Update position based on direction and speed
            const newX = star.position[0] + star.direction[0] * star.speed * delta
            const newY = star.position[1] + star.direction[1] * star.speed * delta
            const newZ = star.position[2]

            // Update lifetime
            const newLifetime = star.lifetime + delta

            return {
              ...star,
              position: [newX, newY, newZ],
              lifetime: newLifetime,
            }
          })
          .filter((star) => star.lifetime < star.maxLifetime), // Remove stars that have lived their full life
    )
  })

  return (
    <group>
      {shootingStars.map((star) => (
        <ShootingStar key={star.id} star={star} />
      ))}
    </group>
  )
}

function ShootingStar({ star }) {
  const tailRef = useRef()
  const headRef = useRef()

  // Calculate opacity based on lifetime (fade in and out)
  const opacity =
    star.lifetime < 0.2
      ? star.lifetime * 5 // Fade in
      : star.lifetime > star.maxLifetime - 0.3
        ? (star.maxLifetime - star.lifetime) / 0.3 // Fade out
        : 1 // Full opacity

  useFrame(() => {
    if (tailRef.current && headRef.current) {
      tailRef.current.material.opacity = opacity * 0.6
      headRef.current.material.opacity = opacity
    }
  })

  return (
    <group position={star.position}>
      {/* Head of the shooting star */}
      <mesh ref={headRef}>
        <sphereGeometry args={[star.size, 8, 8]} />
        <meshBasicMaterial color={star.color} transparent opacity={opacity} blending={AdditiveBlending} />
      </mesh>

      {/* Tail of the shooting star */}
      <mesh
        ref={tailRef}
        position={[star.direction[0] * -0.5, star.direction[1] * -0.5, 0]}
        scale={[1, 3, 1]}
        rotation={[0, 0, Math.atan2(star.direction[1], star.direction[0]) + Math.PI / 2]}
      >
        <planeGeometry args={[star.size * 0.8, star.size * 4]} />
        <meshBasicMaterial color={star.color} transparent opacity={opacity * 0.6} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}
