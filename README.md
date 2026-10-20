# Paysure

Sign-in screen for Paysure. The layout follows the Paysure Figma frame, and the page background uses the same kind of motion as the [Yuno](https://y.uno/en) hero: two stacked mesh gradients that drift, distort, and swirl.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Next.js.

## Static file

`dist/paysure-signin.html` is the same sign-in screen in one file. Send that file to someone and they can open it in a browser. No server is required. Rebuild it with:

```bash
npm run static
```

## Background

Yuno paints its first screen with [Paper Shaders](https://github.com/paper-design/shaders) `MeshGradient`:

- A flat field of color underneath
- A back layer at speed `1.5`, distortion `0.95`, swirl `0.8`
- A front layer at 60% opacity, speed `1.2`, distortion `0.7`, swirl `0.55`
- Motion stops when the system requests reduced motion

This page keeps that motion model and swaps Yuno’s blue stops for Paysure lilac (`#f4efff`, `#9670ff`, and the tones between them), so the headline stays readable. The wave lines from the design sit on top of the shader.
