import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function brandAssets(): Plugin {
  return {
    name: "brand-assets",
    enforce: "pre",
    transform(code, id) {
      if (!/\.[cm]?[jt]sx?$/.test(id) || !code.includes("/brand/")) return null;
      const imports: string[] = [];
      let index = 0;
      const next = code.replace(
        /(["'`])\/brand\/([^"'`?]+)(?:\?[^"'`]*)?\1/g,
        (_match, _quote: string, file: string) => {
          const name = `__brand_${index++}`;
          const abs = path.join(root, "public/brand", file);
          imports.push(`import ${name} from ${JSON.stringify(abs)};`);
          return `{${name}}`;
        },
      );
      if (!imports.length) return null;
      return `${imports.join("\n")}\n${next}`;
    },
  };
}

export default defineConfig({
  root: path.join(root, "static"),
  publicDir: false,
  plugins: [
    brandAssets(),
    react(),
    tailwindcss(),
    viteSingleFile({
      outputFileName: "paysure-signin.html",
    }),
  ],
  resolve: {
    alias: {
      "@": root,
    },
  },
  build: {
    outDir: path.join(root, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
  },
});
