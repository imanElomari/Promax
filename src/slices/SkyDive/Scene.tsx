"use client"

import { Cloud, Clouds, Environment, Text } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import FloatCan from "@/components/FloatCan"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type SkyDiveProps = {
  sentence: string
  flavor?: string
}

export default function SkyDive({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cansRef = useRef<THREE.Group[]>([])
  const cloud1Ref = useRef<THREE.Group>(null)
  const cloud2Ref = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Group>(null)
  const wordsRef = useRef<THREE.Group>(null)

  const ANGLE = 75 * (Math.PI / 180)

  const isDesktop = useMediaQuery("(min-width: 950px)", true)
  const isTablet = useMediaQuery("(min-width: 600px)", false) && !isDesktop
  const sizeScale = isDesktop ? 1 : isTablet ? 0.75 : 0.6

  const CAN_BASE_DIST = 3.5 * sizeScale
  const CAN_STEP = 0.9 * sizeScale
  const WORD_DIST = 7 * sizeScale
  const CLOUD_DISTANCE = isDesktop ? 12 : isTablet ? 10 : 8
  const CLOUD_SCALE = isDesktop ? 7 : isTablet ? 6.5 : 6
  const CLOUD_START_Z = isDesktop ? 8 : isTablet ? 7 : 4
  const CLOUD_REVEAL_Z = isDesktop ? 0.5 : isTablet ? 0.6 : 0.5
  const CLOUD_FINAL_Z = isDesktop ? 6 : isTablet ? 5 : 3

  const getXYFromAngle = (distance: number, angleRad: number) => ({
    x: distance * Math.cos(angleRad),
    y: distance * Math.sin(-angleRad),
  })

  const CAN_COUNT = 5

  const CAN_FLAVORS = ["blackCherry", "lemonLime", "grape", "strawberryLemonade"] as const

  useGSAP(() => {
    let raf = 0
    let scrollTl: gsap.core.Timeline | undefined

    const tryInit = () => {
      if (!cloudsRef.current || !wordsRef.current || !cloud1Ref.current || !cloud2Ref.current) {
        raf = requestAnimationFrame(tryInit)
        return
      }

      gsap.set(cloudsRef.current.position, {
        z: CLOUD_START_Z * (isDesktop ? 1 : 0.7),
      })
      gsap.set(
        wordsRef.current.children.map((word) => word.position),
        { ...getXYFromAngle(WORD_DIST, ANGLE), z: 2 * sizeScale },
      )

      cansRef.current.forEach((canGroup, i) => {
        if (!canGroup) return
        const angleOffset = ANGLE + (i - (CAN_COUNT - 1) / 2) * 0.45
        const dist = -(CAN_BASE_DIST + i * CAN_STEP)
        const pos = getXYFromAngle(dist, angleOffset)
        gsap.set(canGroup.position, {
          ...pos,
          z: 2 * sizeScale + i * 0.5 * sizeScale,
        })
        gsap.to(canGroup.rotation, {
          y: Math.PI * 2,
          duration: 1.7 + i * 0.25,
          repeat: -1,
          ease: "none",
        })
      })

      gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], () => {
        const p = getXYFromAngle(CLOUD_DISTANCE, ANGLE)
        return { ...p, z: CLOUD_START_Z * (isDesktop ? 1 : 0.75) }
      })

      gsap.to(cloud1Ref.current.position, {
        y: `+=${getXYFromAngle(CLOUD_DISTANCE * 2, ANGLE).y * (isDesktop ? 1 : 0.9)}`,
        x: `+=${getXYFromAngle(CLOUD_DISTANCE * -2, ANGLE).x * (isDesktop ? 1 : 0.9)}`,
        ease: "none",
        repeat: -1,
        duration: 6,
      })

      gsap.to(cloud2Ref.current.position, {
        y: `+=${getXYFromAngle(CLOUD_DISTANCE * 2, ANGLE).y * (isDesktop ? 1 : 0.9)}`,
        x: `+=${getXYFromAngle(CLOUD_DISTANCE * -2, ANGLE).x * (isDesktop ? 1 : 0.9)}`,
        ease: "none",
        repeat: -1,
        delay: 3,
        duration: 6,
      })

      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skydive",
          pin: true,
          start: "top top",
          end: "+=2000",
          scrub: 1.5,
        },
      })

      scrollTl
        .to("body", {
          backgroundColor: "#C0F0F5",
          overwrite: "auto",
          duration: 0.1,
        })
        .to(cloudsRef.current.position, { z: CLOUD_REVEAL_Z, duration: 0.3 }, 0)

      cansRef.current.forEach((can, i) => {
        if (!can) return
        const centerOffsetX = (i - (CAN_COUNT - 1) / 2) * (0.6 * sizeScale)
        const centerOffsetY = i % 2 === 0 ? 0.25 * sizeScale : -0.25 * sizeScale
        scrollTl!.to(
          can.position,
          {
            x: centerOffsetX,
            y: centerOffsetY,
            z: -1 * sizeScale,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0 + i * 0.18,
        )
      })

      if (wordsRef.current) {
        scrollTl.to(
          wordsRef.current.children.map((word) => word.position),
          {
            keyframes: [
              { x: 0, y: 0, z: -1 * sizeScale },
              { ...getXYFromAngle(-WORD_DIST, ANGLE), z: -7 * sizeScale },
            ],
            stagger: 0.3,
          },
          0,
        )
      }

      cansRef.current.forEach((can, i) => {
        if (!can) return
        const angleOffset = ANGLE + (i - (CAN_COUNT - 1) / 2) * 0.6
        const outDist = (3.5 + i * 0.7) * sizeScale
        const outPos = getXYFromAngle(outDist, angleOffset)
        scrollTl!.to(
          can.position,
          {
            x: outPos.x,
            y: outPos.y,
            z: 2 * sizeScale,
            duration: 0.6,
            ease: "back.in(1.7)",
          },
          0.9 + i * 0.12,
        )
      })

      scrollTl.to(cloudsRef.current.position, { z: CLOUD_FINAL_Z * (isDesktop ? 1 : 0.9), duration: 0.6 }, 0.9)
    }

    tryInit()

    return () => {
      cancelAnimationFrame(raf)
      if (scrollTl) {
        try {
          scrollTl.scrollTrigger && (scrollTl.scrollTrigger as any).kill()
        } catch (e) {}
        scrollTl.kill()
      }
    }
  }, [isDesktop, isTablet, sizeScale])

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        {Array.from({ length: CAN_COUNT }).map((_, i) => (
          <FloatCan
            key={`float-can-${i}`}
            ref={(el) => {
              cansRef.current[i] = el as unknown as THREE.Group
            }}
            flavor={CAN_FLAVORS[i % CAN_FLAVORS.length] as any}
            rotationIntensity={0}
            floatIntensity={1.5}
            floatSpeed={2 + i * 0.4}
            canScale={(1 - i * 0.08) * Math.max(0.75, sizeScale)}
          >
            <pointLight intensity={10 - i * 1.2} color="#8C0413" decay={0.6} />
          </FloatCan>
        ))}
      </group>

      <Clouds ref={cloudsRef}>
        <group ref={cloud1Ref} frustumCulled={false}>
          <Cloud
            opacity={0.6}
            speed={isDesktop ? 0.18 : 0.22}
            bounds={[
              CLOUD_DISTANCE * (isDesktop ? 2.5 : isTablet ? 2.0 : 1.5),
              CLOUD_DISTANCE * (isDesktop ? 1.4 : isTablet ? 1.2 : 1.0),
              CLOUD_DISTANCE * (isDesktop ? 1.0 : isTablet ? 0.9 : 0.8),
            ]}
            segments={isDesktop ? 48 : isTablet ? 36 : 28}
            scale={CLOUD_SCALE}
            color="#ffffff"
          />
        </group>
        <group ref={cloud2Ref} frustumCulled={false}>
          <Cloud
            opacity={0.5}
            speed={isDesktop ? 0.22 : 0.26}
            bounds={[
              CLOUD_DISTANCE * (isDesktop ? 2.2 : isTablet ? 1.8 : 1.3),
              CLOUD_DISTANCE * (isDesktop ? 1.5 : isTablet ? 1.3 : 1.1),
              CLOUD_DISTANCE * (isDesktop ? 1.1 : isTablet ? 1.0 : 0.9),
            ]}
            segments={isDesktop ? 44 : isTablet ? 34 : 26}
            scale={CLOUD_SCALE * (isDesktop ? 0.95 : 0.9)}
            color="#e0f7ff"
          />
        </group>
      </Clouds>

      <group ref={wordsRef}>
        <ThreeText sentence={sentence} color="#F97315" />
      </group>

      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  )
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string
  color?: string
}) {
  const words = sentence.toUpperCase().split(" ")
  const material = new THREE.MeshLambertMaterial()
  const isDesktop = useMediaQuery("(min-width: 950px)", true)

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.'"
    >
      {word}
    </Text>
  ))
}
