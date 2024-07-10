import { Hono } from "hono";
import { cors } from "hono/cors";

import userRouter from "./routes/user";
import blogRouter from "./routes/blog";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexusblog-b37gj34hc-adityas-projects-ca55bea2.vercel.app",
    ],
    exposeHeaders: ["Authorization"],
  }),
);

app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/user", userRouter);

export default app;
