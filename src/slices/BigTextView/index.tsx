"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TrueFocus from "@/components/TrueFocus";

export type BigTextProps = SliceComponentProps<Content.BigTextViewSlice>;

const BigText = ({ slice }: BigTextProps): JSX.Element => {
  const defaultWords = ["Dive Into", "Better Taste"];
  const sentence =
    (slice?.primary && (slice.primary as any).sentence) ||
    defaultWords.join(" ");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      /* reduced height: smaller hero block since it's only a sentence */
      className="relative flex h-[28vh] md:h-[34vh] w-full flex-col items-center justify-center overflow-hidden bg-[#FFF7F3] text-[#555B6E] px-4"
    >
      {/* subtle site-matching gradient overlay (warm, but more neutral) */}
      <div className="absolute inset-0 bg-gradient-to-b bg-[#FFD1C4] opacity-80" />

      {/* Text content — slightly scaled down so it fits the shorter block */}
      <div className="relative z-10 text-center font-extrabold uppercase leading-[0.9]">
        <TrueFocus
          sentence={String(sentence)}
          manualMode={false}
          blurAmount={6}
          borderColor="#ff7a7a"
          glowColor="rgba(255,122,122,0.16)"
          animationDuration={0.6}
          pauseBetweenAnimations={0.6}
        />
      </div>
    </section>
  );
};

export default BigText;
