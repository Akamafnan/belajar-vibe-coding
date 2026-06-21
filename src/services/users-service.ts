import { db } from "../db";
import { users, sessions } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { InferInsertModel } from "drizzle-orm";

export type RegisterUserPayload = InferInsertModel<typeof users>;
export type LoginUserPayload = Pick<RegisterUserPayload, "email" | "password">;

export async function registerUser(payload: RegisterUserPayload) {
  // 1. Cek apakah email sudah terdaftar
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, payload.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("Email sudah terdaftar");
  }

  // 2. Hash password menggunakan bcrypt
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 3. Simpan data user baru ke database
  await db.insert(users).values({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });
}

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function loginUser(payload: LoginUserPayload) {
  // 1. Cari user di database berdasarkan email
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, payload.email))
    .limit(1);

  if (existingUser.length === 0) {
    throw new Error("Email atau password salah");
  }

  const user = existingUser[0];

  // 2. Bandingkan password dari input dengan password di database
  const passwordMatch = await bcrypt.compare(payload.password, user.password);
  if (!passwordMatch) {
    throw new Error("Email atau password salah");
  }

  // 3. Generate token UUID
  const token = crypto.randomUUID();

  // 4. Simpan token beserta user_id ke tabel sessions
  await db.insert(sessions).values({
    token: token,
    userId: user.id,
  });

  // 5. Kembalikan token
  return token;
}

export async function getCurrentUser(token: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.token, token))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Unauthorized");
  }

  return result[0];
}
