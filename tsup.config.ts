import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"], // Don't bundle React
    loader: {
        ".css": "copy", // Ensures CSS files are included in the output
    },
});
