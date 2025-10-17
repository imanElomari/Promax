import React from "react";
import { FizzyLogo } from "./FizzyLogo";
import CircleText from "./CircleText";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

type Props = {};

export default function Footer({}: Props) {
  const socials = [
    { name: "Instagram", href: "https://www.instagram.com/promaxdrinks/", icon: Instagram },
    { name: "Twitter", href: "https://twitter.com/promaxdrinks", icon: Twitter },
    { name: "Facebook", href: "https://www.facebook.com/Promaxdrinks/", icon: Facebook },
    { name: "YouTube", href: "https://www.youtube.com/@promaxdrinks", icon: Youtube },
  ];

  return (
    <footer className="bg-[#FFE5D4] text-[#274690]">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-8 sm:py-10">
        <div className="mb-4">
          <FizzyLogo />
        </div>

        {/* Social links */}
        <div className="mb-4 flex gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-[#274690] shadow-sm transition-transform hover:scale-105 hover:text-[#f16131]"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Legal / small text */}
        <div className="text-center text-xs text-[#6B7280]">
          <div>© {new Date().getFullYear()} Promax Drink. All rights reserved.</div>
          <div className="mt-1">
            <a href="/privacy" className="underline underline-offset-2">
              Privacy
            </a> &middot;{" "}
            <a href="/terms" className="underline underline-offset-2">
              Terms
            </a>
          </div>
        </div>

        {/* decorative circle (kept commented for now) */}
        {/* <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
          <CircleText />
        </div> */}
      </div>
    </footer>
  );
}

