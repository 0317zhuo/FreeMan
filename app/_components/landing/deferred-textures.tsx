"use client";

import { useEffect } from "react";
import { assetUrl } from "@/lib/assets";

const textures = [
  { id: "collaboration", property: "--collaboration-texture", path: "/images/collaboration-halftone-optimized.webp" },
  { id: "courses", property: "--course-texture", path: "/images/course-grain-optimized.webp" },
];

export default function DeferredTextures() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const texture = textures.find((item) => item.id === entry.target.id);
        if (texture) (entry.target as HTMLElement).style.setProperty(texture.property, `url("${assetUrl(texture.path)}")`);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "200px" });
    for (const texture of textures) {
      const section = document.getElementById(texture.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
