"use client";

import React, { FC } from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";

export type GalleryProps = SliceComponentProps<any>;

const DEFAULT_DATA = [
  { imageLink: "images/img1.jpg" },
  { imageLink: "images/img2.jpg" },
  { imageLink: "images/img3.jpg" },
  // { imageLink: "images/img4.jpg" },
  { imageLink: "images/img5.jpg" },
  //{ imageLink: "images/img6.jpg" },
  //{ imageLink: "images/img7.jpg" },
  //{ imageLink: "images/img8.jpg" },
];

const extractImageUrl = (item: any): string | undefined => {
  if (!item) return undefined;
  if (typeof item === "string") return item;
  if (item.image) {
    if (typeof item.image === "string") return item.image;
    if (typeof item.image.url === "string") return item.image.url;
    if (item.image.value && typeof item.image.value.url === "string")
      return item.image.value.url;
  }
  if (Array.isArray(item?.value)) {
    const pair = item.value.find(
      (p: any) => Array.isArray(p) && p[0] === "image" && p[1]?.url
    );
    if (pair) return pair[1].url;
  }
  if (item.url && typeof item.url === "string") return item.url;
  return undefined;
};

const Gallery: FC<GalleryProps> = ({ slice }) => {
  const fromSlice =
    (slice.items
      ?.map((it: any, idx: number) => {
        const url = extractImageUrl(it);
        if (!url) return null;
        return { imageLink: url, caption: it?.caption || `Image ${idx + 1}` };
      })
      .filter(Boolean) as { imageLink: string; caption?: string }[]) || [];

  const images = fromSlice.length ? fromSlice : DEFAULT_DATA;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-[#FFF0E8] py-8 text-[#274690] sm:py-10 md:py-12"
    >
      {/* Title + Subtitle */}
      <div className="relative z-[100] mx-auto max-w-5xl px-4 text-center">
        {slice.primary?.heading && (
          <h2 className="text-balance mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            <PrismicRichText field={slice.primary.heading} />
          </h2>
        )}

        {slice.primary?.subheading && (
          <div className="mx-auto mb-8 max-w-2xl text-sm text-gray-600 sm:text-base">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        )}
      </div>

      {/* Gallery grid (images larger) */}
      <div className="w-full">
        <div
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
          className="py-5"
        >
          <div className="mx-auto w-full max-w-[1000px] px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map(({ imageLink }, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="aspect-square w-full">
                    <img
                      className="w-full h-full rounded-xl object-cover object-center transition-transform duration-500 ease-in-out hover:scale-110"
                      src={imageLink}
                      alt={`gallery-photo-${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View more button: text-style with arrow */}
      <div className="relative z-[110] mt-8 flex justify-center">
        <a
          href="/gallery"
          aria-label="View more gallery"
          className="inline-block"
        >
          <button
            type="button"
            className="flex items-center gap-2 text-lg font-semibold text-[#f08c71] transition-colors duration-150 hover:text-[#f16131]"
          >
            View More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </a>
      </div>
    </Bounded>
  );
};

export default Gallery;
