import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/contexts";
import { LenisProvider } from "@/components/custom/LenisProvider";
import { MotionProvider } from "@/components/custom/MotionProvider";
import { LazyCursor } from "@/components/custom/CustomCursor/lazy-cursor";
import { ToastProvider } from "@/components/common/Toast";
import { locales, defaultLocale } from "@/i18n/config";

import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical:
        locale === defaultLocale ? "https://drsm.vercel.app" : `https://drsm.vercel.app/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          l === defaultLocale ? "https://drsm.vercel.app" : `https://drsm.vercel.app/${l}`,
        ])
      ),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      url:
        locale === defaultLocale ? "https://drsm.vercel.app" : `https://drsm.vercel.app/${locale}`,
      siteName: "Diego Sanchez",
      type: "website",
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <MotionProvider>
              <ToastProvider>
                <LenisProvider>
                  <LazyCursor />
                  {children}
                </LenisProvider>
              </ToastProvider>
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
