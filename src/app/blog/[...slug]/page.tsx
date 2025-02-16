import React from "react";
import { Metadata } from "next";
import { blogs as allBlogs } from "#site/content";
import { cn, formatDate } from "@/lib/utils";
import "@/styles/mdx.css";

import Image from "next/image";
import { Mdx } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface BlogPageItemProps {
  params: {
    slug: string[];
  };
}

async function getBlogFromParams(params: BlogPageItemProps["params"]) {
  const slug = params?.slug?.join("/");
  const blog = allBlogs.find((blog) => blog.slug === slug);
  if (!blog) {
    return null;
  }
  return blog;
}

export async function generateMetadata({
  params,
}: BlogPageItemProps): Promise<Metadata> {
  const blog = await getBlogFromParams(params);
  if (!blog) {
    return {};
  }

  // Create OpenGraph image URL with query parameters
  const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/og`);
  ogUrl.searchParams.set("title", blog.title);
  ogUrl.searchParams.set("description", blog.description);
  ogUrl.searchParams.set("dsa", blog.achievements?.dsa?.toString() || "0");
  ogUrl.searchParams.set("money", blog.achievements?.money?.toString() || "0");
  ogUrl.searchParams.set(
    "workout",
    blog.achievements?.workout?.toString() || "false"
  );

  return {
    title: blog.title,
    description: blog.description,
    authors: {
      name: blog.author,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogUrl.toString()],
    },
  };
}
export async function generateStaticParams(): Promise<
  BlogPageItemProps["params"][]
> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPageItem({ params }: BlogPageItemProps) {
  const blog = await getBlogFromParams(params);
  if (!blog) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <div>
        {blog.date && (
          <time
            dateTime={blog.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(blog.date)}
          </time>
        )}

        <h1 className="mt-2 inline-block text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
          {blog.title}
        </h1>

        {/* Achievement tags */}
        <div className="my-4 flex gap-2">
          <span className="rounded-md border px-2 py-1 text-xs">
            ❓: {blog.achievements?.dsa ?? 0}
          </span>
          <span className="rounded-md border px-2 py-1 text-xs">
            💸: {blog.achievements?.money ?? 0}
          </span>
          <span className="rounded-md border px-2 py-1 text-xs">
            💪🏻: {blog.achievements?.workout ? "🔥" : "😭"}
          </span>
        </div>

        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}

        <Mdx code={blog.body} />

        <hr className="mt-12" />

        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 size-4" />
            See all Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
