import { Hono } from "hono";
import { sign } from "hono/jwt";
import { getPrisma } from "../utils/getprisma";

import { signupSchema, signinSchema } from "@aditya0257/nexusblog-common";

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signin", async (c) => {
  const body = await c.req.json();
  const parsed = signinSchema.safeParse(body);
  if (!parsed) {
    return c.text("Bad Request", 401);
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  const user = await prisma.user.findUnique({
    where: { email: body.email, password: body.password },
  });
  if (!user) {
    return c.text("User doesn't exist with provided email", 400);
  }

  let n = 60 * 24 * 3;

  // found the user, so email and password are verified there itself -> now, return the jwt token
  const payload = {
    id: user.id,
    name: user.name,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * n, // Token expires in n minutes
  };
  const token = await sign(payload, c.env.JWT_SECRET);

  c.header("Content-Type", "application/json");
  c.header("Authorization", `Bearer ${token}`);

  return c.json(
    {
      message: "User logged in successfully",
    },
    200,
  );
});

userRoute.post("/signup", async (c) => {
  const body = await c.req.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return c.text("Bad Request", 401);
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  // check if user already exists with same mail id
  const foundUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (foundUser) {
    return c.text("User already exists with this email", 400);
  }

  // create user in database
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });

  // console.log(user);

  // return back jwt token
  let n = 60 * 24 * 3; // so that token expires after 3 days
  const payload = {
    id: user.id,
    name: body.name,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * n, // Token expires in n minutes
  };

  const token = await sign(payload, c.env.JWT_SECRET);

  c.header("Content-Type", "application/json");
  c.header("Authorization", `Bearer ${token}`);

  return c.json(
    {
      message: "User created successfully!",
    },
    201,
  );
});

export default userRoute;
