import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const clearPrismaDatabase = async () => {
  await prisma.postReaction.deleteMany({})
  await prisma.commentReaction.deleteMany({})
  await prisma.activateToken.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.image.deleteMany({})
  await prisma.user.deleteMany({})
}

export { clearPrismaDatabase, prisma }
