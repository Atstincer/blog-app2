'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addUserToDB, getUserByUsername, resetToken } from '../services/users'

export const registerUser = async (
  prevState: { errors: {}; values: {} },
  formData: FormData,
) => {
  const name = (formData.get('name') as string)?.trim()
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  const formValues = { name, username } //i would like the password and passwordConfirm fields allways to reset, so i dont send them back to the form

  if (!username || username.length < 4)
    return {
      errors: { username: 'username must be at least 4 characters long' },
      values: formValues,
    }
  if (!password || password.length < 4)
    return {
      errors: { password: 'password must be at least 4 characters long' },
      values: formValues,
    }
  if (!passwordConfirm || passwordConfirm !== password)
    return {
      errors: { passwordConfirm: 'password confirmation is not right' },
      values: formValues,
    }

  const user = await getUserByUsername(username)
  if (user) {
    return {
      errors: { username: 'invalid username, it already exist in db' },
      values: formValues,
    }
  }

  try {
    await addUserToDB(name, username, password)
  } catch (error) {
    return {
      errors: { db: 'something went wrong while accesing db' },
      values: formValues,
    }
  }

  redirect('/login')
}

export const generateToken = async (formData: FormData) => {
  const userId = formData.get('id') as string
  await resetToken(Number(userId))
  revalidatePath('/me')
}
