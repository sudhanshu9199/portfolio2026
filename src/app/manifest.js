import { siteConfig } from "@/data/seoData";

export default function manifest() {
  return {
    name: siteConfig.title,
    short_name: "Sudhanshu G.",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#fe9f0a",
    icons: [
      {
        src: "/assets/pageLogo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/pageLogo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
