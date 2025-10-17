"use client"

import { forwardRef, type ReactNode } from "react"
import { Float } from "@react-three/drei"

import { SodaCan, type SodaCanProps } from "@/components/SodaCan"
import type { Group } from "three"

type FloatCanProps = {
  flavor?: SodaCanProps["flavor"]
  floatSpeed?: number
  rotationIntensity?: number
  floatIntensity?: number
  floatingRange?: [number, number]
  children?: ReactNode
  // new prop to control the rendered can size per-instance
  canScale?: number
}

const FloatCan = forwardRef<Group, FloatCanProps>(
  (
    {
      flavor = "lemonLime",
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      // default to 1 to match updated SodaCan default
      canScale = 1,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCan flavor={flavor} scale={canScale} />
        </Float>
      </group>
    )
  },
)

FloatCan.displayName = "FloatCan"

export default FloatCan
