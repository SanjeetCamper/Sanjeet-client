import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "logo.png",
        "bg_img.png",
        "favicon.ico",
        "Campers.png",
        "RO.png",
        "toast-success.mp3",
        "toast-error.mp3",
        "toast-info.mp3",
        "toast-warning.mp3",
        "network-offline.mp3",
        "network-online.mp3",
      ],

      workbox: {
        cleanupOutdatedCaches: true,

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },

      manifest: {
        name: "Sanjeet Water Supplier",
        short_name: "SWS",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#a5f3fc",
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
