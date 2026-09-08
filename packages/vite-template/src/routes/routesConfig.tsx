import { Navigate, type RouteObject, redirect } from "react-router-dom";
import App from "@/App";
import RouteErrorFallback from "@/components/ErrorBoundary/RouteErrorFallback";
import { DEFAULT_LOCALE, isSupportedLocale, LOCALIZED_PATHS_MAP } from "@/i18n/locales";
import { localizeHref } from "@/i18n/navigation";
import AboutPage from "@/pages/AboutPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

const aboutSlugs = Object.values(LOCALIZED_PATHS_MAP["/about"]).map((p) => p.slice(1));

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={`/${DEFAULT_LOCALE}`} replace />,
  },
  {
    path: ":locale",
    loader: ({ params, request }) => {
      if (!isSupportedLocale(params.locale ?? "")) {
        const url = new URL(request.url);
        return redirect(localizeHref(url.pathname, DEFAULT_LOCALE));
      }
      return null;
    },
    element: <App />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...aboutSlugs.map((slug) => ({
        path: slug,
        element: <AboutPage />,
      })),
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
