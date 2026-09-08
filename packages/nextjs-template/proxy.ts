/**
 * Applies next-intl locale routing to application requests.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const NEXT_INTL_LOCALE_HEADER = "x-next-intl-locale";

export type I18nProxy = (request: NextRequest) => NextResponse;

const handleI18nRouting = createMiddleware(routing);

/**
 * Checks whether next-intl already rewrote an unprefixed route to the internal default-locale path.
 *
 * @param request Request received by the proxy.
 * @returns Whether the request is an internal default-locale rewrite.
 */
const isInternalDefaultLocaleRewrite = (request: NextRequest): boolean => {
  const localePrefix = `/${routing.defaultLocale}`;
  const isDefaultLocalePath =
    request.nextUrl.pathname === localePrefix ||
    request.nextUrl.pathname.startsWith(`${localePrefix}/`);

  return (
    isDefaultLocalePath && request.headers.get(NEXT_INTL_LOCALE_HEADER) === routing.defaultLocale
  );
};

/**
 * Applies locale routing while allowing next-intl's internal default-locale rewrite to resolve.
 *
 * @param request Request received by the proxy.
 * @returns A rewrite, redirect, or pass-through response.
 */
const proxy: I18nProxy = (request) => {
  if (isInternalDefaultLocaleRewrite(request)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
};

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
