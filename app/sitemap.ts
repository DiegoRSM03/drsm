import { locales, defaultLocale } from "@/i18n/config";
import type { MetadataRoute } from "next";

function localeUrl(locale: string): string {
  const baseUrl = "https://drsm.vercel.app";
  return locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, localeUrl(l)])),
    },
  }));
}
