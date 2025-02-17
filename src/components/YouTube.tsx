"use client";

import React from "react";

interface YouTubeProps {
  src: string;
  width?: number;
  height?: number;
}

export default function YouTube({
  src,
  width = 315,
  height = 560,
}: YouTubeProps) {
  // Ensure we have a proper absolute URL
  const normalizedSrc = src.startsWith("http") ? src : `https://${src}`;

  let embedUrl = normalizedSrc;

  try {
    const url = new URL(normalizedSrc);
    // If it's a Shorts URL, replace '/shorts/' with '/embed/'
    if (
      url.hostname.includes("youtube.com") &&
      url.pathname.startsWith("/shorts/")
    ) {
      embedUrl = normalizedSrc.replace("/shorts/", "/embed/");
    } else if (url.hostname === "youtu.be") {
      // Handle the youtu.be short URL
      const videoId = url.pathname.slice(1);
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.hostname.includes("youtube.com")) {
      // If it's a standard watch URL, extract the video ID
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      }
      // If it's already an embed URL, we can leave it as is.
    }
  } catch (error) {
    console.error("Invalid URL provided to YouTube component:", normalizedSrc);
  }

  return (
    <>
      <div className="my-8 flex w-full items-center justify-center">
        <iframe
          width={width}
          height={height}
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </>
  );
}
