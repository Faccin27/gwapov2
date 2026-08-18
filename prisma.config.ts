import { defineConfig } from "prisma/config"
import { config } from "dotenv"

config({ path: ".env.local" })

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Plain process.env access (not the `env()` helper) so `prisma generate`
    // doesn't hard-fail in build environments where only DATABASE_URL-less
    // steps run (e.g. CI/Vercel install before env vars are configured).
    // Commands that actually need the DB (migrate, studio) still fail with
    // Prisma's own clear error if this is genuinely unset.
    url: process.env.DATABASE_URL,
  },
})
