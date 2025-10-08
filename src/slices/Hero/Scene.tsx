"use client";

import { useRef } from "react";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatCan from "@/components/FloatCan";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene() {
  const isReady = useStore((state) => state.isReady);

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);
  const can6Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);
  const can3GroupRef = useRef<Group>(null);
  const can4GroupRef = useRef<Group>(null);
  const can5GroupRef = useRef<Group>(null);
  const can6GroupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can6Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !can3GroupRef.current ||
      !can4GroupRef.current ||
      !can5GroupRef.current ||
      !can6GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    // Place the visible hero can on the right and space the others around it
    // (can2 is the initially visible hero can; others are arranged with unique offsets)
    gsap.set(can1Ref.current.position, { x: 1.4, y: -0.25, z: 0.1 });
    gsap.set(can1Ref.current.rotation, { z: -0.08 });

    gsap.set(can2Ref.current.position, { x: 1.8, y: -1, z: 0.12 }); // visible on the right
    gsap.set(can2Ref.current.rotation, { z: 0.04 });

    gsap.set(can3Ref.current.position, { x: 2.8, y: 0.18, z: 0.14 });
    gsap.set(can3Ref.current.rotation, { z: 0.06 });

    gsap.set(can4Ref.current.position, { x: 1.0, y: 0.45, z: 0.08 });
    gsap.set(can4Ref.current.rotation, { z: -0.06 });

    gsap.set(can5Ref.current.position, { x: 0.8, y: 0.62, z: 0.09 });
    gsap.set(can5Ref.current.rotation, { z: 0.03 });

    gsap.set(can6Ref.current.position, { x: 3.2, y: -0.05, z: 0.16 });
    gsap.set(can6Ref.current.rotation, { z: -0.04 });

    // record initial X positions so we can return cans to them after reveal
    const initialXs = [
      can1Ref.current.position.x,
      can2Ref.current.position.x,
      can3Ref.current.position.x,
      can4Ref.current.position.x,
      can5Ref.current.position.x,
      can6Ref.current.position.x,
    ];

    // Only show can2 initially; hide the others so they reveal on scroll
    gsap.set(
      [
        can1Ref.current.scale,
        can3Ref.current.scale,
        can4Ref.current.scale,
        can5Ref.current.scale,
        can6Ref.current.scale,
      ],
      { x: 0.001, y: 0.001, z: 0.001 },
    );
    gsap.set(can2Ref.current.scale, { x: 1, y: 1, z: 1 });

    const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (window.scrollY < 30) {
      introTl
        .from(groupRef.current.rotation, { y: -1.2, duration: 2 })
        .from(can2Ref.current.position, { y: 3, duration: 2 }, 0)
        .from(can2Ref.current.rotation, { z: 2, duration: 2 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      // make rotation a full 180 degrees
      .to(groupRef.current.rotation, { y: Math.PI, x: 0.06 }, 0)

      // reveal and position cans into a spaced cluster on the right
      .to(can1Ref.current.position, { x: 1.25, y: -0.22, z: -0.9 }, 0)
      .to(can1Ref.current.rotation, { z: -0.05 }, 0)
      .to(
        can1Ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
        0.12,
      )

      .to(can2Ref.current.position, { x: 2.0, y: -0.15, z: -0.85 }, 0)
      .to(can2Ref.current.rotation, { z: 0.02 }, 0)

      .to(can3Ref.current.position, { x: 2.9, y: 0.18, z: -0.9 }, 0)
      .to(can3Ref.current.rotation, { z: 0.03 }, 0)
      .to(
        can3Ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
        0.18,
      )

      .to(can4Ref.current.position, { x: 1.05, y: 0.42, z: -0.95 }, 0.06)
      .to(can4Ref.current.rotation, { z: -0.06 }, 0.06)
      .to(
        can4Ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
        0.22,
      )

      .to(can5Ref.current.position, { x: 0.8, y: 0.62, z: -0.95 }, 0.09)
      .to(can5Ref.current.rotation, { z: 0.04 }, 0.09)
      .to(
        can5Ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
        0.26,
      )

      .to(can6Ref.current.position, { x: 3.25, y: -0.05, z: -0.88 }, 0.14)
      .to(can6Ref.current.rotation, { z: -0.03 }, 0.14)
      .to(
        can6Ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
        0.3,
      )

      .to(
        groupRef.current.position,
        { x: 0.45, y: 0.12, z: -0.12, duration: 2.4, ease: "sine.inOut" },
        0.9,
      )

      // spin each can and move back to its initial X (keeps final layout aligned to initial positions)
      .to(
        can1Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.05,
      )
      .to(
        can1Ref.current.position,
        { x: initialXs[0], duration: 1.0, ease: "power2.out" },
        1.05,
      )

      .to(
        can2Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.08,
      )
      .to(
        can2Ref.current.position,
        { x: initialXs[1], duration: 1.0, ease: "power2.out" },
        1.08,
      )

      .to(
        can3Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.11,
      )
      .to(
        can3Ref.current.position,
        { x: initialXs[2], duration: 1.0, ease: "power2.out" },
        1.11,
      )

      .to(
        can4Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.14,
      )
      .to(
        can4Ref.current.position,
        { x: initialXs[3], duration: 1.0, ease: "power2.out" },
        1.14,
      )

      .to(
        can5Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.17,
      )
      .to(
        can5Ref.current.position,
        { x: initialXs[4], duration: 1.0, ease: "power2.out" },
        1.17,
      )

      .to(
        can6Ref.current.rotation,
        { y: `+=${Math.PI * 2}`, duration: 1.0, ease: "power2.out" },
        1.2,
      )
      .to(
        can6Ref.current.position,
        { x: initialXs[5], duration: 1.0, ease: "power2.out" },
        1.2,
      );

    const floatCan = (ref: Group, delay = 0) => {
      gsap.to(ref.position, {
        y: "+=0.2",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
      gsap.to(ref.rotation, {
        z: "+=0.05",
        x: "+=0.03",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
    };

    // stagger float delays so each can drifts independently but cohesively
    floatCan(can1Ref.current, 0.6);
    floatCan(can2Ref.current, 0.9);
    floatCan(can3Ref.current, 1.2);
    floatCan(can4Ref.current, 0.7);
    floatCan(can5Ref.current, 1.0);
    floatCan(can6Ref.current, 1.3);
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatCan ref={can1Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      </group>
      <group ref={can2GroupRef}>
        <FloatCan ref={can2Ref} flavor="lemonLime" floatSpeed={FLOAT_SPEED} />
      </group>
      <group ref={can3GroupRef}>
        <FloatCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
      </group>
      <group ref={can4GroupRef}>
        <FloatCan
          ref={can4Ref}
          flavor="strawberryLemonade"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <group ref={can5GroupRef}>
        <FloatCan ref={can5Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      </group>
      <group ref={can6GroupRef}>
        <FloatCan ref={can6Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      </group>
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.8} />
    </group>
  );
}
