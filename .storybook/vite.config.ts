import { mergeConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import baseViteConfig from "../vite.config"; // Import main Vite config

export default mergeConfig(baseViteConfig, defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: "camelCase", // Allow both kebab-case and camelCase class names
            generateScopedName: "[name]__[local]__[hash:base64:5]",
        },
    },
}));
