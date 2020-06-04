import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes/index.routes.ts";

const app = new Application();

app.use(router.allowedMethods());
app.use(router.routes());

console.log("Server on port", 3000);
await app.listen({
  port: 3000
});
