import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "logo.png",
        "bg_img.png",
        "hand_wave.png",
        "header_img.png",
        "favicon.ico",
      ],

      manifest: {
        name: "Sanjeet Water Supplier",
        short_name: "SWS",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff", // splash background
        theme_color: "#a5f3fc", // light aqua
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
