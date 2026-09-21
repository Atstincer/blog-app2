import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}

export const resetToken = async (id: number) => {
  const newToken = crypto.randomUUID()
  console.log('token generated with crypto', newToken)
  await db.update(users).set({ token: newToken }).where(eq(users.id, id))
}

export const getUserByAPIToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  })
}
