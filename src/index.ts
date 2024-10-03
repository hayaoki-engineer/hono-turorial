import { Hono } from 'hono'

const app = new Hono()

let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog1 Posts",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2 Posts",
  },
  {
    id: "3",
    title: "Blog3",
    content: "Blog3 Posts",
  }
]

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/posts", (c) => c.json({ posts: blogPosts }));

app.get("/posts/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((p) => p.id === id);

  if (post) {
    return c.json(post)
  } else {
    return c.json({ message: "not found this page" }, 400);
  }
})

app.post("/posts", async (c) => {
  const { title, content } = await c.req.json<{ title: string; content: string }>();
  const newPost = { id: String(blogPosts.length + 1), title, content }
  blogPosts = [...blogPosts, newPost];
  return c.json(blogPosts, 201)
})

/* The code snippet you provided is handling a PUT request to update a specific blog post based on its
ID. Here's a breakdown of what the code is doing: */
app.put("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  const { title, content } = await c.req.json();
  blogPosts[index] = { ...blogPosts[index], title, content }
  
  return c.json(blogPosts[index])
})

/* The `app.delete("/posts/:id", async (c) => { ... })` function is handling a DELETE request to delete
a specific blog post based on its ID. Here's a breakdown of what the code is doing: */
app.delete("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  blogPosts = blogPosts.filter((p) => p.id !== id)
  
  return c.json({ message: "Blog post Deleted" })
})

export default app
