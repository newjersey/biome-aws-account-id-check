/**
 * Input required to create an Amplify Hosting deployment manifest.
 */
export interface AmplifyDeploymentManifestParams {
  /** Hono version represented by the generated compute artifact. */
  readonly frameworkVersion: string;
}

/**
 * Creates the Amplify Hosting compute deployment manifest.
 *
 * @param params Manifest input.
 * @returns Amplify Hosting deployment metadata for the bundled Node server.
 */
export const createAmplifyDeploymentManifest = ({
  frameworkVersion,
}: AmplifyDeploymentManifestParams) => {
  return {
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
      version: frameworkVersion,
    },
  } as const;
};
