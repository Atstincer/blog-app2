'use server'

import { markRLAsRead } from '../services/readingList'
import { revalidatePath } from 'next/cache'

export const markAsRead = async (formData: FormData) => {
  const readListId = formData.get('readingListId') as string
  await markRLAsRead(Number(readListId))
  revalidatePath('/me')
}
