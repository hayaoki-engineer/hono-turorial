import { Hono } from 'hono'
import posts from "./blogs/blogs"

const app = new Hono()

app.route("/posts", posts);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app;

