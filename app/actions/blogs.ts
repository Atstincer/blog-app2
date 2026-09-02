'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addOneLike } from '../services/blogs'
import { auth } from '@/auth'

export const createBlog = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  await addBlog(title, author, url)
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const addLikes = async (formData: FormData) => {
  const id = formData.get('id') as string
  await addOneLike(Number(id))
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export const searchTitles = async (formData: FormData) => {
  const search = formData.get('search') as string
  if (search && search !== '') redirect(`/blogs?filter=${search}`)
  else redirect('/blogs')
}
