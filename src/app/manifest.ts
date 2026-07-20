import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NOKI Service",
    short_name: "NOKI",
    description: "COD and e-commerce operations platform for Africa.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#050810",
    theme_color: "#050810",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
