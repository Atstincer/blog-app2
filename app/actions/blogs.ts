'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addOneLike } from '../services/blogs'

export const createBlog = async (formData: FormData) => {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  addBlog(title, author, url)
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const addLikes = async (formData: FormData) => {
  const id = formData.get('id') as string
  addOneLike(Number(id))
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export const searchTitles = async (formData: FormData) => {
  const search = formData.get('search') as string
  if (search && search !== '') redirect(`/blogs?filter=${search}`)
  else redirect('/blogs')
}
