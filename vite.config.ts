import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: "camelCase", // Allows both kebab-case and camelCase imports
            generateScopedName: "[name]__[local]__[hash:base64:5]", // Ensures unique class names
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/global.scss";`, // Applies only if using SCSS
            },
        },
    },
    resolve: {
        alias: {
            "@styles": "/src/styles", // Optional alias for cleaner imports
        },
    },
    optimizeDeps: {
        include: ["@fortawesome/react-fontawesome"], // ✅ Ensures proper pre-bundling for FontAwesome
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true, // ✅ Fixes CommonJS module import issues
        },
    },
});
