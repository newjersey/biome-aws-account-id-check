"""Shared FastAPI application and public response contracts."""

import json

from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.requests import Request
from fastapi.responses import Response

SERVICE_NAME = "@newjersey/fastapi-template"

HOMEPAGE = """<!doctype html>
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
</html>"""

app = FastAPI(docs_url=None, openapi_url=None, redoc_url=None)


@app.api_route("/", methods=["GET", "HEAD"])
def homepage() -> Response:
    """Return the accessible starter homepage."""
    return Response(
        content=HOMEPAGE,
        headers={"Content-Type": "text/html; charset=UTF-8"},
        status_code=200,
    )


@app.get("/health")
def health() -> Response:
    """Return deterministic service health."""
    return Response(
        content=json.dumps({"status": "ok", "service": SERVICE_NAME}),
        headers={
            "Cache-Control": "no-store",
            "Content-Type": "application/json; charset=utf-8",
        },
        status_code=200,
    )


@app.exception_handler(404)
def not_found(_request: Request, _exception: HTTPException) -> Response:
    """Return the public JSON contract for unmatched routes."""
    return Response(
        content=json.dumps({"status": "not_found"}),
        headers={"Content-Type": "application/json; charset=utf-8"},
        status_code=404,
    )
