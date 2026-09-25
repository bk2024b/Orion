import type { MetadataRoute } from "next";

const baseUrl = "https://oriondigitalagency.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"];
  const paths = ["", "/websites"];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.9,
    }))
  );
}
