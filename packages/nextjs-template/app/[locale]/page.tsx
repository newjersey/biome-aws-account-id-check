/**
 * Composes the localized Grove starter homepage.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/LandingPage";
import { resolveFeedbackWidgetConfig } from "@/config/feedbackWidget";
import { MESSAGE_CATALOG } from "@/content/messages/catalog";
import { hasAppLocale } from "@/i18n/locales";

/**
 * Describes route parameters received by the homepage.
 */
interface HomePageParams {
  /** Locale segment selected for the request. */
  readonly locale: string;
}

/**
 * Describes route input received by the homepage.
 */
interface HomePageProps {
  /** Asynchronous route parameters supplied by Next.js. */
  readonly params: Promise<HomePageParams>;
}

/**
 * Resolves validated localized messages for the homepage.
 *
 * @param props Homepage route input.
 * @param props.params Locale route parameters.
 * @returns The validated locale and composed topic messages.
 */
const loadHomePageMessages = async ({ params }: HomePageProps) => {
  const { locale } = await params;

  if (!hasAppLocale(locale)) {
    notFound();
  }

  return { locale, messages: MESSAGE_CATALOG[locale] };
};

/**
 * Generates localized homepage metadata.
 *
 * @param props Homepage route input.
 * @returns Localized browser and social metadata.
 */
export const generateMetadata = async (props: HomePageProps): Promise<Metadata> => {
  const { messages } = await loadHomePageMessages(props);

  return {
    title: messages.home.metadataTitle,
    description: messages.home.metadataDescription,
  };
};

/**
 * Renders the accessible localized Grove starter page.
 *
 * @param props Homepage route input.
 * @returns The starter page composed from localized presentation components.
 */
const HomePage = async (props: HomePageProps) => {
  const { locale, messages } = await loadHomePageMessages(props);
  const feedbackWidgetConfig = resolveFeedbackWidgetConfig({ locale });

  return (
    <LandingPage feedbackWidgetConfig={feedbackWidgetConfig} locale={locale} messages={messages} />
  );
};

export default HomePage;
