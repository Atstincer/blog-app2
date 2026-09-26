import { db } from '@/db'
import { blogs, users, readingList } from '@/db/schema'

export const resetDB = async () => {
  await db.delete(blogs)
  await db.delete(users)
  await db.delete(readingList)
}
