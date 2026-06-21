import { Elysia, t } from "elysia";
import { registerUser, getAllUsers, loginUser, getCurrentUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api" })
  .post(
    "/users",
    async ({ body, set }) => {
      try {
        await registerUser(body);
        return { data: "OK" };
      } catch (error: any) {
        if (error.message === "Email sudah terdaftar") {
          set.status = 400;
          return { error: "Email sudah terdaftar" };
        }
        set.status = 500;
        return { error: error.message || "Internal Server Error" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/users/login",
    async ({ body, set }) => {
      try {
        const token = await loginUser(body);
        return { data: token };
      } catch (error: any) {
        if (error.message === "Email atau password salah") {
          set.status = 400;
          return { error: "Email atau password salah" };
        }
        set.status = 500;
        return { error: error.message || "Internal Server Error" };
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/users", async ({ set }) => {
    try {
      const allUsers = await getAllUsers();
      return {
        success: true,
        data: allUsers,
      };
    } catch (error: any) {
      set.status = 500;
      return {
        success: false,
        error: error.message || "Failed to fetch users",
      };
    }
  })
  .get("/users/current", async ({ headers, set }) => {
    const authorization = headers["authorization"];
    if (!authorization || !authorization.startsWith("Bearer ")) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const token = authorization.substring(7);

    try {
      const user = await getCurrentUser(token);
      return { data: user };
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        set.status = 401;
        return { error: "Unauthorized" };
      }
      set.status = 500;
      return { error: error.message || "Internal Server Error" };
    }
  });
