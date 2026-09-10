'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addOneLike } from '../services/blogs'
import { auth } from '@/auth'

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  if (!title || title.length < 5)
    return { error: 'Title must be at least 5 characters long' }
  const author = formData.get('author') as string
  if (!author || author.length < 5)
    return { error: 'Author must be at least 5 characters long' }
  const url = formData.get('url') as string
  if (!url || url.length < 5)
    return { error: 'Url must be at least 5 characters long' }
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
