/**
 * Validated Node server listener configuration.
 */
export interface ServerConfig {
  /** Hostname or address on which the server listens. */
  readonly hostname: string;
  /** TCP port on which the server listens. */
  readonly port: number;
}

const DEFAULT_HOSTNAME = "0.0.0.0";
const DEFAULT_PORT = 3000;
const MINIMUM_PORT = 1;
const MAXIMUM_PORT = 65_535;

/**
 * Parses and validates the server port.
 *
 * @param value Raw environment value, when configured.
 * @returns A valid TCP port.
 */
const parsePort = (value: string | undefined): number => {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < MINIMUM_PORT || port > MAXIMUM_PORT) {
    throw new Error(`PORT must be an integer from ${MINIMUM_PORT} through ${MAXIMUM_PORT}.`);
  }

  return port;
};

/**
 * Reads and validates the Node server listener environment.
 *
 * @returns Valid server configuration.
 */
export const getServerConfig = (): ServerConfig => {
  // biome-ignore lint/style/noProcessEnv: This module is the environment boundary.
  const hostname = process.env.HOST?.trim() || DEFAULT_HOSTNAME;
  // biome-ignore lint/style/noProcessEnv: This module is the environment boundary.
  const port = parsePort(process.env.PORT);

  return {
    hostname,
    port,
  };
};
