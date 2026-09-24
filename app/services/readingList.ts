import { db } from '@/db'
import { readingList } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const markRLAsRead = (rlId: number) => {
  return db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, rlId))
}
