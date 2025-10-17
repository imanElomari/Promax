import React, { FC } from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { Bounded } from "@/components/Bounded";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

const About: FC<AboutProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-[#FFF7F3] py-16 text-[#274690] sm:py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-4xl px-4 text-center">
        {slice.primary?.heading ? (
          <h2 className="text-balance mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <PrismicRichText field={slice.primary.heading} />
          </h2>
        ) : null}

        <div className="mx-auto mb-8 max-w-3xl text-base text-[#374151] sm:text-lg md:text-lg leading-relaxed">
          {slice.primary?.body ? (
            <PrismicRichText field={slice.primary.body} />
          ) : (
            <p>
              We craft delicious, better-for-you sodas with bold flavors and
              mindful ingredients. Small-batch recipes, big personality.
            </p>
          )}
        </div>

      </div>
    </Bounded>
  );
};

export default About;
