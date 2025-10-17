import React, { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Mail, Phone } from "lucide-react";

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>;

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs: FC<ContactUsProps> = ({ slice }) => {
  const emailText = slice.primary?.email ? asText(slice.primary.email) : "";
  const phoneText = slice.primary?.phone ? asText(slice.primary.phone) : "";

  const mailto = emailText ? `mailto:${emailText}` : undefined;
  const tel = phoneText ? `tel:${phoneText.replace(/\s+/g, "")}` : undefined;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-[#FFF7F3] py-12 text-[#274690] sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          {slice.primary?.title ? (
            <h2 className="text-balance mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              <PrismicRichText field={slice.primary.title} />
            </h2>
          ) : null}

          {slice.primary?.body ? (
            <div className="mx-auto text-base text-[#374151] sm:text-lg md:text-lg leading-relaxed">
              <PrismicRichText field={slice.primary.body} />
            </div>
          ) : (
            <p className="mx-auto text-base text-[#374151] sm:text-lg md:text-lg leading-relaxed">
              Have questions about our soda, ingredients, or where to buy? Reach
              out via email or phone and we’ll get back to you shortly.
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact card */}
          <div className="order-2 md:order-1">
            <div className="rounded-xl border border-transparent bg-white p-6 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-[#274690]">
                Get in touch
              </h3>
              <p className="mb-4 text-sm text-[#4B5563]">
                For media inquiries, distribution, or general questions, use the
                options below.
              </p>

              <div className="flex flex-col gap-3">
                {mailto ? (
                  <a
                    href={mailto}
                    className="inline-flex items-center justify-start gap-3 rounded-md bg-[#f08c71] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#f16131]"
                    aria-label="Email us"
                  >
                    <Mail
                      className="h-5 w-5 flex-shrink-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>{emailText}</span>
                  </a>
                ) : null}

                {tel ? (
                  <a
                    href={tel}
                    className="inline-flex items-center justify-start gap-3 rounded-md border border-[#E6E6E6] px-4 py-3 text-sm font-medium text-[#274690] bg-white shadow-sm hover:shadow"
                    aria-label="Call us"
                  >
                    <Phone
                      className="h-5 w-5 flex-shrink-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>{phoneText}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* Simple contact form (visual only) */}
          <div className="order-1 md:order-2">
            <form className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-[#374151]">
                  Name
                </label>
                <input
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-[#374151]">
                  Email
                </label>
                <input
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                  placeholder="you@domain.com"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-[#374151]">
                  Message
                </label>
                <textarea
                  className="h-28 w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                  placeholder="How can we help?"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f08c71] px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:scale-[1.02] hover:bg-[#f16131]"
                >
                  Send message
                </button>

                <small className="text-xs text-[#6B7280]">
                  We reply within 1-2 business days
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ContactUs;
