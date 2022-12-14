import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const list = async ctx => {
  const currentRound = ctx.request.query.rod
  const currentGroup = ctx.request.query.grp

  const where = (currentRound || currentGroup) ? {
    rod: currentRound,
    grp: currentGroup
  } : {}

  try {
    const games = await prisma.game.findMany({ where })
    ctx.body = games
    ctx.status = 200
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}