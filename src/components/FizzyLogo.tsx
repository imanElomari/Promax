import React from "react";
import clsx from "clsx";

export function FizzyLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className, alt = "Fizzy", width, height, ...rest } = props;

  const src =
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-300x62.png";
  const srcSet =
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-300x62.png 300w, " +
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-1024x213.png 1024w, " +
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-768x160.png 768w, " +
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-1536x320.png 1536w, " +
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-2048x427.png 2048w, " +
    "https://promaxdrinks.com/wp-content/uploads/2021/09/logo1-1568x327.png 1568w";

  // default responsive sizing (callers can override with className or explicit width/height)
  const defaultClass =
    "block w-auto h-auto max-w-[140px] sm:max-w-[200px] md:max-w-[260px]";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={src}
      srcSet={srcSet}
      sizes={
        props.sizes ??
        "(max-width: 640px) 140px, (max-width: 1024px) 200px, 260px"
      }
      alt={alt}
      width={width}
      height={height}
      className={clsx(defaultClass, className)}
      loading={props.loading ?? "lazy"}
      decoding="async"
      role={props.role ?? "img"}
    />
  );
}
