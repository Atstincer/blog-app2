'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { users } from '@/db/schema'
import { redirect } from 'next/navigation'

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const name = (formData.get('name') as string)?.trim()
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  if (!username || username.length < 4)
    return { error: 'username must be at least 4 characters long' }
  if (!password || password.length < 4)
    return { error: 'password must be at least 4 characters long' }
  if (!passwordConfirm || passwordConfirm !== password)
    return { error: 'password confirmation is not right' }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ name, username, passwordHash })

  redirect('/login')
}
