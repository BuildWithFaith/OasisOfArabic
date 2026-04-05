import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oasis of Arabic",
    short_name: "Oasis of Arabic",
    description:
      "Learn Arabic online with premium courses and live Zoom classes.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#27247b",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
