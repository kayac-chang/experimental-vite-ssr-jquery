import express from "express";
import { createServer as createViteServer } from "vite";

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (_req, res, next) => {
    try {
      const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(await render());
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  console.log("listen on http://localhost:5173");
  app.listen(5173);
}

createServer();
