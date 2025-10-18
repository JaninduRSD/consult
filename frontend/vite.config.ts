import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }) => {
  let taggerPlugin;

  // Only load lovable-tagger in development on Windows
  if (mode === "development" && process.platform === "win32") {
    try {
      const mod = await import("lovable-tagger");
      taggerPlugin = mod.componentTagger();
    } catch {
      console.warn("lovable-tagger skipped (Windows-only dev tool)");
    }
  }

  return {
    server: {
      host: "::",
      port: 3000,
      strictPort: false,
    },
    plugins: [react(), taggerPlugin].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
