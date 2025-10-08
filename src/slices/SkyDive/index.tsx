"use client";
import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";

/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>;

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive = ({ slice }: SkyDiveProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="skydive relative h-screen min-h-screen overflow-hidden px-4 sm:px-6 md:px-8"
    >
      <View className="absolute inset-0 h-full w-full">
        {/* ensure sentence is a string (fallback to empty) and flavor optional */}
        <Scene
          sentence={String(slice.primary?.sentence ?? "")}
          flavor={slice.primary?.flavor ?? undefined}
        />
      </View>
    </Bounded>
  );
};
export default SkyDive;
