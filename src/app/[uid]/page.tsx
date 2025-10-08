import { Metadata } from "next";
import { notFound } from "next/navigation";

import React from "react";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}


export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}

export interface PageProps {
  params: { uid: string };
  searchParams?: Record<string, any>;
}

// Minimal dynamic page for /[uid] so Next can resolve the route during build.
// Replace with real data fetching / Prismic fetching later.
export default function Page({ params }: PageProps) {
  const { uid } = params ?? { uid: "unknown" };
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-extrabold">Page: {uid}</h1>
        <p className="mt-4 text-gray-600">
          This is a placeholder dynamic page for <code>/{uid}</code>. Replace
          this file with your full page implementation that fetches Prismic
          content.
        </p>
      </div>
    </main>
  );
}
