/**
 * Verifies the Hono AWS Lambda adapter against a representative proxy integration event.
 */

import type { LambdaEvent } from "hono/aws-lambda";
import { describe, expect, it } from "vitest";

import { handler } from "@/src/lambda";

interface LambdaProxyEventParams {
  /** HTTP method received by the integration. */
  readonly method: string;
  /** Request path received by the integration. */
  readonly path: string;
}

/**
 * Creates a representative Lambda proxy integration event.
 *
 * The adapter auto-detects the event shape at runtime, so this fixture is one example event
 * rather than a guaranteed contract. It mirrors a private REST API Gateway (payload format
 * version 1) integration; adjust the shape locally to match another integration (HTTP API or ALB)
 * if a project uses one instead.
 */
const createLambdaProxyEvent = ({ method, path }: LambdaProxyEventParams): LambdaEvent => {
  return {
    version: "1.0",
    resource: "/{proxy+}",
    path,
    httpMethod: method,
    headers: {
      host: "api.example.gov",
    },
    body: null,
    isBase64Encoded: false,
    requestContext: {
      accountId: "123456789012",
      apiId: "test-api",
      authorizer: {},
      domainName: "api.example.gov",
      domainPrefix: "api",
      extendedRequestId: "test-extended-request",
      httpMethod: method,
      path,
      protocol: "HTTP/1.1",
      requestId: "test-request",
      requestTime: "17/Aug/2026:12:00:00 +0000",
      requestTimeEpoch: 1_787_050_800_000,
      resourceId: "test-resource",
      resourcePath: "/{proxy+}",
      stage: "test",
      identity: {
        sourceIp: "127.0.0.1",
        userAgent: "vitest",
      },
    },
  };
};

describe("AWS Lambda handler", () => {
  it("serves the homepage through a representative proxy integration event", async () => {
    const result = await handler(
      createLambdaProxyEvent({
        method: "GET",
        path: "/",
      }),
    );

    expect(result.statusCode).toBe(200);
    expect(result.headers["content-type"]).toBe("text/html; charset=UTF-8");
    expect(result.body).toContain("<h1>Hello, New Jersey.</h1>");
  });

  it("serves the health contract through a representative proxy integration event", async () => {
    const result = await handler(
      createLambdaProxyEvent({
        method: "GET",
        path: "/health",
      }),
    );

    expect(result.statusCode).toBe(200);
    expect(result.headers["cache-control"]).toBe("no-store");
    expect(result.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(JSON.parse(result.body)).toEqual({
      status: "ok",
      service: "@newjersey/hono-template",
    });
  });
});
