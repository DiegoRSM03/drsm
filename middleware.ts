import { NextResponse, NextRequest } from "next/server"

import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const headers = { "accept-language": "en,es;q=0.5" }
const languages = new Negotiator({ headers }).languages()
const locales = ["en", "es"]
const defaultLocale = "en"

match(languages, locales, defaultLocale)

const getLocale = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return pathname

  return defaultLocale
}

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: "/((?!_next).*)",
}
