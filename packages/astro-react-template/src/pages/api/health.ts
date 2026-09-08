/**
 * Exposes a minimal production health check for the server adapter.
 */

import type { APIRoute } from "astro";

const HEALTH_RESPONSE = {
  status: "ok",
  service: "@newjersey/astro-react-template",
} as const;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(HEALTH_RESPONSE), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
    status: 200,
  });
};
