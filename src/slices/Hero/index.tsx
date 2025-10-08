"use client";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "@/components/Bubbles";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((store) => store.ready);

  useGSAP(() => {
    if (!ready) return;

    // Intro animation
    const introTl = gsap.timeline();
    introTl
      .set(".hero", { opacity: 1 })
      .from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        stagger: 0.9,
        delay: 0.3,
        ease: "power2.in",
      })
      .from(".hero-subheading", { opacity: 0, y: 30 }, "+=.8")
      .from(".hero-body", { opacity: 0, y: 10 })
      .from(".hero-button", { opacity: 0, y: 10, duration: 0.6 });

    // Scroll-based animation (background + text)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .fromTo(
        "body",
        { backgroundColor: "#FFE5D4" }, // light coral
        { backgroundColor: "#FFD1C4", overwrite: "auto" }, // soft sky blue
        1,
      )
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 1,
        ease: "back.out(3)",
        duration: 5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      });
  }, [ready]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {/* restore sticky 3D view overlay so Views are routed into the Canvas and cans are visible */}
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block md:items-center md:justify-end">
        <Scene />
      </View>

      {/* layout: two columns on md+ (text left, can visually on the right via the sticky overlay). on mobile text is centered */}
      <div className="grid h-screen w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Left: Hero Text (centered on mobile, left-aligned on md+) */}
        <div className="grid h-full items-center">
          <div className="grid auto-rows-min place-items-center text-center md:place-items-start md:text-left">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-[#1A2D6C] md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading) || "Fizzy"}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-[#3A3A3A] lg:text-6xl">
              <PrismicRichText
                field={
                  slice.primary.subheading || [
                    { text: "Pure Energy", type: "paragraph" },
                  ]
                }
              />
            </div>
            <div className="hero-body text-2xl font-normal text-gray-600">
              <PrismicRichText
                field={
                  slice.primary.body || [
                    { text: "Fresh. Fun. Fizzy.", type: "paragraph" },
                  ]
                }
              />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text || "Discover!"}
              className="hero-button mt-12 bg-[#f08c71] text-[#1A2D6C] hover:bg-[#f16131]"
            />
          </div>
        </div>

        {/* Right column kept for layout spacing on md (3D view is the sticky overlay above) */}
        <div aria-hidden className="hidden md:block" />

        {/* Scroll Section (kept below main hero on all screen sizes) */}
      </div>

      <div className="text-side relative z-[80] mt-8 grid h-screen items-center gap-4 md:grid-cols-2">
        <PrismicNextImage
          className="w-full md:hidden"
          field={slice.primary.cans_image}
        />
        <div>
          <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-[#3A3A3A] lg:text-8xl">
            <TextSplitter
              text={asText(slice.primary.second_heading) || "More Flavors"}
            />
          </h2>
          <div className="text-side-body mt-4 max-w-xl text-balance font-normal text-gray-600">
            <PrismicRichText
              field={
                slice.primary.second_body || [
                  { text: "Cool. Bold. Unique.", type: "paragraph" },
                ]
              }
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
