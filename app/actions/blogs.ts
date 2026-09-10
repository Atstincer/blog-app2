'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addOneLike } from '../services/blogs'
import { auth } from '@/auth'

type Errors = {
  title: string | undefined
  author: string | undefined
  url: string | undefined
}

export const createBlog = async (
  prevState: {
    errors: Errors
    values: { title: string; author: string; url: string }
  },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  const errors: Errors = { title: undefined, author: undefined, url: undefined }
  if (!title || title.length < 5)
    errors.title = 'Title must be at least 5 characters long'
  if (!author || author.length < 5)
    errors.author = 'Author must be at least 5 characters long'
  if (!url || url.length < 5)
    errors.url = 'Url must be at least 5 characters long'

  if (errors.title || errors.author || errors.url)
    return { errors, values: { title, author, url } }

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
