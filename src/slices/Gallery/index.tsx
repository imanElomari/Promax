import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import CircularGallery from "@/components/CircularGallery";
import { Bounded } from "@/components/Bounded"; // added to match other slices

/**
 * Props for `Gallery`.
 *
 * Use `any` here when the generated Prismic types are not available for this slice.
 * This avoids build-time type errors when the slice type definition is missing.
 */
export type GalleryProps = SliceComponentProps<any>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery: FC<GalleryProps> = ({ slice }) => {
  // robust image URL extractor (handles typical item.image and some mock shapes)
  const extractImageUrl = (item: any): string | undefined => {
    if (!item) return undefined;
    if (item.image && typeof item.image === "object") {
      if (typeof item.image.url === "string") return item.image.url;
      if (item.image.value && typeof item.image.value.url === "string")
        return item.image.value.url;
      // prismic next image shape
      if (item.image.url) return item.image.url;
    }
    if (typeof item === "string") return item;
    // handle mock shape where item.value is an array of pairs
    if (Array.isArray(item.value)) {
      const pair = item.value.find(
        (p: any) => Array.isArray(p) && p[0] === "image" && p[1]?.url,
      );
      if (pair) return pair[1].url;
    }
    return undefined;
  };

  // prefer slice items; otherwise use local images from public/images (img1..img8)
  const fallbackLocal = Array.from(
    { length: 8 },
    (_, i) => `/images/img${i + 1}.jpg`,
  );
  const imagesFromSlice: string[] =
    (slice.items
      ?.map((it: any) => extractImageUrl(it))
      .filter(Boolean) as string[]) || [];

  const finalImages = imagesFromSlice.length ? imagesFromSlice : fallbackLocal;

  // convert to format CircularGallery expects: { image, text }
  const galleryItems = finalImages.map((src, idx) => ({
    image: src,
    text:
      (slice.items && slice.items[idx] && slice.items[idx].caption) ||
      `Image ${idx + 1}`,
  }));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel alternating-text-container relative bg-[#f5bdad] py-12 text-sky-950 sm:py-16 md:py-20"
    >
      <div className="relative z-[100] mx-auto max-w-6xl px-4 text-center">
        {slice.primary?.heading ? (
          <h2 className="mb-4 text-2xl font-extrabold sm:text-3xl md:text-4xl">
            <PrismicRichText field={slice.primary.heading} />
          </h2>
        ) : null}

        {slice.primary?.subheading ? (
          <div className="mx-auto mb-6 max-w-3xl text-sm text-gray-600 sm:text-base md:text-lg">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        ) : null}
      </div>

      {/* Full-bleed gallery: use 100vw with centered alignment to span the entire screen */}
      <div className="w-full">
        <div
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
          className="h-[48vh] sm:h-[56vh] md:h-[70vh] lg:h-[76vh]"
        >
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>

      {/* View more button */}
      <div className="relative z-[110] mt-8 flex justify-center">
        <a
          href="/gallery"
          className="inline-block rounded-lg bg-[#f08c71] px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#f16131]"
          aria-label="View more gallery"
        >
          View more
        </a>
      </div>
    </Bounded>
  );
};

export default Gallery;
