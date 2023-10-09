import { MemberStatus, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.member.upsert({
    where: { email: 'hello@example.com' },
    update: {},
    create: {
      email: 'test@test.com',
      fullName: 'Test User',
      password,
      species: 'Human',
      status: MemberStatus.Alive,
      household: {
        create: {},
      },
    },
  })
  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
