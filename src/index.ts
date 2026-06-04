import { Elysia } from "elysia";
import { usersRoute } from "./routes/users-route";

const app = new Elysia()
  .get("/", () => ({
    status: "online",
    message: "Welcome to Elysia, Drizzle, and MySQL API backend!",
    timestamp: new Date().toISOString(),
  }))
  .use(usersRoute)
  .listen(Number(process.env.PORT) || 3000);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);
