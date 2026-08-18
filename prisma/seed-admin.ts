import { config } from "dotenv"
config({ path: ".env.local" })

import { randomBytes } from "crypto"
import bcrypt from "bcryptjs"

async function main() {
  const { prisma } = await import("../src/lib/prisma")

  const email = process.argv[2] ?? "admin@gwapo.com.br"
  const password = process.argv[3] ?? randomBytes(9).toString("base64url")
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin" },
  })

  console.log("Admin user ready:")
  console.log(`  email:    ${email}`)
  console.log(`  password: ${password}`)
  console.log("Guarde essa senha agora — ela não é salva em texto puro em lugar nenhum.")

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
