"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * y.uno's first screen stacks two Paper Shaders MeshGradients on a flat
 * field. The back layer is faster and more distorted; the front layer is
 * slower, swirls less, and sits at 60% opacity. Reduced motion freezes both.
 * Colors here are Paysure lilac so the sign-in type stays readable.
 */
export function MeshField() {
  const [play, setPlay] = useState(1);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlay(media.matches ? 0 : 1);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f4efff]" aria-hidden>
      <div className="mesh-enter absolute inset-0 origin-center animate-[mesh-in_1.15s_cubic-bezier(0.22,1,0.36,1)_both]">
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={["#f6f1ff", "#d9c8ff", "#9670ff", "#cbb6ff", "#efe7ff"]}
          speed={1.5 * play}
          distortion={0.95}
          swirl={0.8}
          grainMixer={0}
          grainOverlay={0}
          fit="cover"
          scale={1.15}
          minPixelRatio={1}
          maxPixelCount={921600}
        />
        <MeshGradient
          className="absolute inset-0 h-full w-full opacity-60"
          colors={["#f4efff", "#c4a6ff", "#b794ff", "#9670ff"]}
          speed={1.2 * play}
          distortion={0.7}
          swirl={0.55}
          grainMixer={0}
          grainOverlay={0}
          fit="cover"
          scale={1.25}
          offsetY={0.08}
          minPixelRatio={1}
          maxPixelCount={921600}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(244,239,255,0.78),transparent_58%)]" />
      </div>
      <img
        src="/brand/waves.svg"
        alt=""
        width={852}
        height={300}
        className="absolute bottom-[7%] left-[-6%] w-[min(920px,78vw)] max-w-none select-none"
      />
    </div>
  );
}
