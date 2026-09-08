/**
 * Resolves locale-specific messages for each next-intl request.
 */

import { notFound } from "next/navigation";
import { locale as getRootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { MESSAGE_CATALOG } from "@/content/messages/catalog";
import { routing } from "@/i18n/routing";

/**
 * Loads the validated locale and its composed topic messages.
 *
 * @param context next-intl request context.
 * @param context.locale Explicit locale supplied by a server-side caller.
 * @returns The locale and messages used for the request.
 */
const resolveRequestConfig = async ({ locale: localeOverride }: { locale?: string }) => {
  const locale = localeOverride ?? (await getRootLocale());

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return {
    locale,
    messages: MESSAGE_CATALOG[locale],
  };
};

export default getRequestConfig(resolveRequestConfig);
