import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  createBlogSchema,
  updateBlogSchema,
} from "@aditya0257/nexusblog-common";
import { getPrisma } from "../utils/getprisma";

const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRoute.use("/*", async (c, next) => {
  // get the header -> verify the token in header -> if header is incorrect, return 403 error, else process, then continue to next route
  const authHeader = c.req.header("Authorization") || "";

  if (authHeader == "") return c.json({ error: "User not logged in!" }, 403);
  const token = authHeader.split(" ")[1];

  const userPayload = await verify(token, c.env.JWT_SECRET);
  if (userPayload.id) {
    c.set("userId", String(userPayload.id));
    // console.log(userPayload);
    await next();
  } else {
    c.status(403);
    return c.json({
      error: "Unauthorized",
    });
  }
});

blogRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    // console.log(body);

    const parsed = createBlogSchema.safeParse(body);
    if (!parsed) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct",
      });
    }

    const prisma = getPrisma(c.env.DATABASE_URL);

    const authorId = c.get("userId");
    // create a blog
    const result = await prisma.$transaction(async (tx) => {
      const counter = await tx.postCounter.update({
        where: { id: 1 },
        data: { count: { increment: 1 } },
        select: { count: true },
      });

      const blog = await tx.post.create({
        data: {
          no: counter.count,
          title: body.title,
          content: body.content,
          // where will we extract userId for being author ? -> in the middleware
          authorId: authorId,
        },
      });

      return blog;
    });
    return c.json({
      id: result.id,
      no: result.no,
    });
  } catch (e) {
    c.status(403);
    return c.text("Some error occurred while posting the blog.");
  }
});

blogRoute.put("/", async (c) => {
  const body = await c.req.json();

  const success = updateBlogSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not corrrect",
    });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  // Fetch the current blog post
  const currentBlog = await prisma.post.findUnique({
    where: {
      id: body.id,
    },
  });

  // Ensure the blog post exists
  if (!currentBlog) {
    return c.text("Blog post not found", 404);
  }

  // update blog
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title !== undefined ? body.title : currentBlog.title,
      content: body.content !== undefined ? body.content : currentBlog.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRoute.get("/no/:no", async (c) => {
  try {
    const number = parseInt(c.req.param("no"));
    const prisma = getPrisma(c.env.DATABASE_URL);

    const blog = await prisma.post.findUnique({
      where: {
        no: number,
      },
      select: {
        no: true,
        title: true,
        content: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) {
      throw new Error("");
    }

    return c.json({ blog });
  } catch (e) {
    c.status(403);
    return c.text("Cant find blog with given no.");
  }
});

// pagination
blogRoute.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  const blogs = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },

    take: 10,
  });

  return c.json({
    blogs,
  });
});

enum Qtype {
  All = "All",
  Author = "Author",
  Content = "Content"
}

// filtered blogs
blogRoute.get("/search", async (c) => {
  let { filter = "", limit, qtype }: any = c.req.query();
  const prisma = getPrisma(c.env.DATABASE_URL);
  let blogs;
  limit = parseInt(limit);
  if(!qtype) {
    qtype = Qtype.All;
  }
  switch(qtype) {
    case Qtype.All: 
      blogs = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: filter } },
            { content: { contains: filter } },
            { author: {
                OR: [
                  { email: { contains: filter } },
                  { name: { contains: filter } },
                ]
              } 
            },
          ]
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        take: limit,
      });
      break;
    case Qtype.Author:
      blogs = await prisma.post.findMany({
        where: {
          OR: [
            { author: {
                OR: [
                  { email: { contains: filter } },
                  { name: { contains: filter } },
                ]
              } 
            },
          ]
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        take: limit
      });
      break;
    case Qtype.Content:
      blogs = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: filter } },
            { content: { contains: filter } },
          ]
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        take: limit,
      });
      break;
    default: 
      console.log("filter query type is not specified, and while taking it to be for all, faced some issue!");
      return c.json({ error: "Invalid query type specified", success: false }, 400);
  }

  return c.json({
    blogs,
    success: true
  });
  
});

blogRoute.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    // console.log(id);
    const prisma = getPrisma(c.env.DATABASE_URL);

    // get blog
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!blog) {
      return c.text("blog with given id doesnt exist");
    }

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});

export default blogRoute;
