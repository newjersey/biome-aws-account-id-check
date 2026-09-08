/**
 * Verifies the Amplify Hosting deployment manifest.
 */

import { describe, expect, it } from "vitest";

import { createAmplifyDeploymentManifest } from "@/scripts/amplifyManifest";

describe("createAmplifyDeploymentManifest", () => {
  it("routes every request to the bundled Node compute entrypoint", () => {
    expect(
      createAmplifyDeploymentManifest({
        frameworkVersion: "4.13.2",
      }),
    ).toEqual({
      version: 1,
      routes: [
        {
          path: "/*",
          target: {
            kind: "Compute",
            src: "default",
          },
        },
      ],
      computeResources: [
        {
          name: "default",
          runtime: "nodejs22.x",
          entrypoint: "server.mjs",
        },
      ],
      framework: {
        name: "hono",
        version: "4.13.2",
      },
    });
  });
});
