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
      className="relative flex h-[60vh] md:h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#FFD1C4] text-[#1e1e1e] px-4"
    >
      {/* Decorative subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE5DC] via-[#FFD1C4] to-[#FFC3AD] opacity-70" />

      {/* Text content */}
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
