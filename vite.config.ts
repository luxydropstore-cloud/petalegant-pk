// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Photo pointers (.asset.json) hold site-relative "/__l5e/..." paths that only Lovable hosting
// serves. Rewrite them to the absolute Lovable address so photos also load when the site is
// hosted elsewhere (e.g. Netlify).
const ASSET_HOST = "https://petalegant-pk.lovable.app";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "absolute-asset-urls",
        enforce: "pre",
        transform(code: string, id: string) {
          if (!id.split("?")[0]!.endsWith(".asset.json")) return null;
          return { code: code.replace(/"\/__l5e\//g, `"${ASSET_HOST}/__l5e/`), map: null };
        },
      },
    ],
  },
});
