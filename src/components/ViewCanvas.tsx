"use client";

import { Canvas } from "@react-three/fiber";
import { SodaCan } from "./SodaCan";
import { Environment, Float, View } from "@react-three/drei";
import FloatCan from "./FloatCan";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((drei) => drei.Loader),
  { ssr: false },
);

type Props = {};

export const ViewCanvas = ({}: Props) => {
  return (
    <>
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1,1.5]}
      gl={{antialias: true}}
      camera={{
        fov: 30
      }}
    >
      {/* Math.PI * 2PI */}
      {/* <mesh rotation={[0.5, 0.5, 0]} position={[1,0,0]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh> */}
      {/* <Float speed={1} rotationIntensity={7} floatIntensity={} floatingRange={[]}>
      <SodaCan />
      </Float> */}
      <Suspense fallback={null}>
      <View.Port />
      </Suspense>
      {/* <Perf /> */}
      {/* <FloatCan /> */}
      {/* <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5}/> */}
      {/* <ambientLight intensity={2} /> */}
      {/* <spotLight intensity={3} position={[1,1,1]} /> */}
    </Canvas>
    <Loader />
    </>
  );
};
