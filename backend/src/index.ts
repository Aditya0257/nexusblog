import { Hono } from "hono";
import { cors } from "hono/cors";

import userRouter from "./routes/user";
import blogRouter from "./routes/blog";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    exposeHeaders: ["Authorization"],
  }),
);

app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/user", userRouter);

export default app;
