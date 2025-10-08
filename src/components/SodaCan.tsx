"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

useGLTF.preload("/gltf-models/model.gltf");

const flavorTextures = {
  lemonLime: "/labels/promax-original.png",
  grape: "/labels/promax-zoomkoom.png",
  blackCherry: "/labels/promax-premium.png",
  strawberryLemonade: "/labels/promax-premium.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  // new default scale reduced to better match the slimmer/longer model
  scale = 1,
  ...props
}: SodaCanProps) {
  // Load the new model
  const gltf: any = useGLTF("/gltf-models/model.gltf");

  // Robust texture loading: load as an array then map back to keys
  const entries = useMemo(() => Object.entries(flavorTextures), []);
  const textures = useTexture(entries.map(([, path]) => path));
  const labels = useMemo(() => {
    const map: Record<string, THREE.Texture | undefined> = {};
    entries.forEach(([key], i) => {
      const tex = textures && textures[i] ? textures[i] : undefined;
      if (tex) tex.flipY = false;
      map[key] = tex;
    });
    return map;
  }, [textures, entries]);

  // Helper: find mesh by material name in the loaded scene
  const { metalMesh, labelMesh, tabMesh } = useMemo(() => {
    const result: {
      metalMesh?: THREE.Mesh;
      labelMesh?: THREE.Mesh;
      tabMesh?: THREE.Mesh;
    } = {};
    if (!gltf?.scene) return result;

    gltf.scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const matName = child.material?.name;
      if (matName === "alum") {
        result.metalMesh = child;
      } else if (matName === "label_0" || matName === "label") {
        result.labelMesh = child;
      } else if (child.name?.toLowerCase().includes("tab")) {
        result.tabMesh = child;
      }
    });

    return result;
  }, [gltf]);

  const label = labels[flavor];

  // If expected parts are missing, render a safe fallback
  if (!metalMesh && !labelMesh) {
    return (
      <group
        {...props}
        dispose={null}
        scale={scale}
        // show the front side more turned to reveal the label
        rotation={[0, Math.PI * 1.6, 0]}
      >
        {/* Fallback metal body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <meshStandardMaterial roughness={0.3} metalness={1} color="#bbbbbb" />
        </mesh>

        {/* Fallback label */}
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[1.0, 0.8]} />
          <meshStandardMaterial
            map={label ?? undefined}
            roughness={0.15}
            metalness={0.0}
          />
        </mesh>
      </group>
    );
  }

  return (
    // rotate more to present the front side (increased from Math.PI * 0.15)
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0, Math.PI * 1.6, 0]}
    >
      {metalMesh ? (
        <mesh
          castShadow
          receiveShadow
          geometry={metalMesh.geometry}
          material={metalMaterial}
        />
      ) : null}

      {labelMesh ? (
        <mesh castShadow receiveShadow geometry={labelMesh.geometry}>
          <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
        </mesh>
      ) : null}

      {tabMesh ? (
        <mesh
          castShadow
          receiveShadow
          geometry={tabMesh.geometry}
          material={metalMaterial}
        />
      ) : null}
    </group>
  );
}
