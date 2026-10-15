"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * y.uno's first screen stacks two Paper Shaders MeshGradients on a flat
 * field. The back layer is faster and more distorted; the front layer is
 * slower, swirls less, and sits at 60% opacity. Reduced motion freezes both.
 * Stops stay in the #9670FF family: deeper violets for the field,
 * the theme color and lighter lilacs for the bright ribbons.
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#5c35d6]" aria-hidden>
      <div className="mesh-enter absolute inset-0 origin-center animate-[mesh-in_1.15s_cubic-bezier(0.22,1,0.36,1)_both]">
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={["#4a2bc0", "#6a45e8", "#9670ff", "#c9b6ff", "#5c35d6"]}
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
          colors={["#5c35d6", "#9670ff", "#ddd2ff", "#7c5cff"]}
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
