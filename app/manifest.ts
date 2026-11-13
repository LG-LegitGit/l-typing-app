import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#2e1065",
    theme_color: "#2e1065",
    icons: [
      { src: "/assets/favicon_io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
