import { Hono } from "hono";

const SERVICE_NAME = "@newjersey/hono-template";
const HEALTH_RESPONSE = {
  status: "ok",
  service: SERVICE_NAME,
} as const;
const NOT_FOUND_RESPONSE = {
  status: "not_found",
} as const;

const HOMEPAGE = `<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="light dark" name="color-scheme">
    <title>Hello, New Jersey.</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: "Public Sans Web", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #112f4e;
        background: #ffffff;
      }

      body {
        display: grid;
        min-height: 100vh;
        min-height: 100dvh;
        margin: 0;
        place-items: center;
        color: #112f4e;
        background: #ffffff;
      }

      main {
        padding: 1rem;
        text-align: center;
      }

      h1 {
        margin: 0;
        font-size: 2rem;
        line-height: 1.2;
        letter-spacing: 0;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        body {
          color: #ffffff;
          background: #112f4e;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello, New Jersey.</h1>
    </main>
  </body>
</html>`;

export const app = new Hono();

app.get("/", (context) => {
  return context.html(HOMEPAGE);
});

app.get("/health", () => {
  return new Response(JSON.stringify(HEALTH_RESPONSE), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
    status: 200,
  });
});

app.notFound(() => {
  return new Response(JSON.stringify(NOT_FOUND_RESPONSE), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    status: 404,
  });
});
