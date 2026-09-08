import { serve } from "@hono/node-server";

import { app } from "@/src/app";
import { getServerConfig } from "@/src/config";

const { hostname, port } = getServerConfig();

serve({
  fetch: app.fetch,
  hostname,
  port,
});
