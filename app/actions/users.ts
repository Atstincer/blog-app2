'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { users } from '@/db/schema'
import { redirect } from 'next/navigation'

export const registerUser = async (
  prevState: { error: string; values: {} },
  formData: FormData,
) => {
  const name = (formData.get('name') as string)?.trim()
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  const formValues = { name, username } //i would like the password and passwordConfirm fields allways to reset, so i dont send them back to the form

  if (!username || username.length < 4)
    return {
      error: 'username must be at least 4 characters long',
      values: formValues,
    }
  if (!password || password.length < 4)
    return {
      error: 'password must be at least 4 characters long',
      values: formValues,
    }
  if (!passwordConfirm || passwordConfirm !== password)
    return { error: 'password confirmation is not right', values: formValues }

  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await db.insert(users).values({ name, username, passwordHash })
  } catch (error: any) {
    //    console.error(error)
    //    console.log('********************************************')
    //    console.log('error.cause.detail', error?.cause?.detail)
    if (error?.cause?.detail) {
      return {
        error: `Registration failed...Details: ${error.cause.detail}`,
        values: formValues,
      }
    }
    return {
      error: 'something went wrong while accesing db',
      values: formValues,
    }
  }

  redirect('/login')
}
