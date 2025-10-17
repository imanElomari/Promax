"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import clsx from "clsx";
import Scene from "./Scene";

/**
 * Props for `AlternatingCan`.
 */
export type AlternatingCanProps =
  SliceComponentProps<Content.AlternatingCanSlice>;

/**
 * Component for "AlternatingCan" Slices.
 */
const AlternatingCan = ({ slice }: AlternatingCanProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-[#FFE5D4] text-[#274690]"
    >
      <div>
        <div className="relative z-[100] grid">
          

          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",

                  "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30",
                )}
              >
                <h2 className="text-balance text-6xl font-bold">
                  <PrismicText field={item.heading} />
                </h2>
                <div className="mt-4 text-xl">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingCan;