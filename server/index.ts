import "dotenv/config";

import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createSlug, generateWish } from "../src/lib/content";
import { pool, query } from "./db";

const app = express();
const port = Number(process.env.API_PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || "development-ghadir-secret";

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json({ limit: "12mb" }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

type WishRecord = {
  id: string;
  slug: string;
  name: string;
  recipient: string;
  message: string;
  language: string;
  theme: string;
  createdAt: string;
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const wishes = new Map<string, WishRecord>();
const users = new Map<string, UserRecord>();

const wishSchema = z.object({
  name: z.string().min(1).max(80),
  recipient: z.string().max(80).default(""),
  message: z.string().min(1).max(700),
  language: z.enum(["english", "arabic", "urdu"]),
  theme: z.enum(["radiant", "emerald", "rose", "midnight"])
});

const aiWishSchema = z.object({
  recipient: z.string().max(80).default(""),
  tone: z.enum(["spiritual", "emotional", "formal", "poetic"]),
  language: z.enum(["english", "arabic", "urdu"]),
  sender: z.string().max(80).default("")
});

const authSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(120)
});

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    database: Boolean(pool),
    cloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME)
  });
});

app.post("/api/ai/wish", (request, response) => {
  const payload = aiWishSchema.parse(request.body);
  response.json({
    message: generateWish(payload)
  });
});

app.post("/api/wishes", async (request, response, next) => {
  try {
    const payload = wishSchema.parse(request.body);
    const slug = createSlug(payload.name);
    const record: WishRecord = {
      id: randomUUID(),
      slug,
      ...payload,
      createdAt: new Date().toISOString()
    };

    if (pool) {
      await query(
        `insert into wishes (id, slug, name, recipient, message, language, theme)
         values ($1, $2, $3, $4, $5, $6, $7)`,
        [
          record.id,
          record.slug,
          record.name,
          record.recipient,
          record.message,
          record.language,
          record.theme
        ]
      );
    } else {
      wishes.set(slug, record);
    }

    response.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

app.get("/api/wishes/:slug", async (request, response, next) => {
  try {
    const { slug } = request.params;

    if (pool) {
      const result = await query<WishRecord>(
        `select id, slug, name, recipient, message, language, theme, created_at as "createdAt"
         from wishes
         where slug = $1
         limit 1`,
        [slug]
      );
      const record = result?.rows[0];
      if (!record) {
        response.status(404).json({ error: "Wish not found" });
        return;
      }
      response.json(record);
      return;
    }

    const record = wishes.get(slug);
    if (!record) {
      response.status(404).json({ error: "Wish not found" });
      return;
    }

    response.json(record);
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/register", async (request, response, next) => {
  try {
    const payload = authSchema.parse(request.body);
    const email = payload.email.toLowerCase();

    if (pool) {
      const existing = await query<{ id: string }>("select id from users where email = $1", [email]);
      if (existing?.rows[0]) {
        response.status(409).json({ error: "Email is already registered" });
        return;
      }
    } else if (users.has(email)) {
      response.status(409).json({ error: "Email is already registered" });
      return;
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user: UserRecord = {
      id: randomUUID(),
      name: payload.name || payload.email.split("@")[0],
      email,
      passwordHash
    };

    if (pool) {
      await query(
        `insert into users (id, name, email, password_hash)
         values ($1, $2, $3, $4)`,
        [user.id, user.name, user.email, user.passwordHash]
      );
    } else {
      users.set(user.email, user);
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, {
      expiresIn: "7d"
    });

    response.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (request, response, next) => {
  try {
    const payload = authSchema.omit({ name: true }).parse(request.body);
    const email = payload.email.toLowerCase();
    let user: UserRecord | undefined;

    if (pool) {
      const result = await query<UserRecord>(
        `select id, name, email, password_hash as "passwordHash"
         from users
         where email = $1
         limit 1`,
        [email]
      );
      user = result?.rows[0];
    } else {
      user = users.get(email);
    }

    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      response.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, {
      expiresIn: "7d"
    });

    response.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/posters/upload", async (request, response, next) => {
  try {
    const payload = z
      .object({
        image: z.string().min(100),
        folder: z.string().max(80).optional()
      })
      .parse(request.body);

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      response.status(503).json({ error: "Cloudinary is not configured" });
      return;
    }

    const result = await cloudinary.uploader.upload(payload.image, {
      folder: payload.folder || "ghadir-posters"
    });

    response.status(201).json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof z.ZodError) {
    response.status(400).json({ error: "Validation failed", details: error.flatten() });
    return;
  }

  response.status(500).json({
    error: error instanceof Error ? error.message : "Unexpected server error"
  });
});

app.listen(port, () => {
  console.log(`Ghadir API running on http://localhost:${port}`);
});
