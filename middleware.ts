import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const ROBOTS_TXT = `User-Agent: *
Allow: /

Sitemap: https://drsm.vercel.app/sitemap.xml
`;

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse(ROBOTS_TXT, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)", "/(robots\\.txt)"],
};
