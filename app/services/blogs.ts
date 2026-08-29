import { blogs } from '../../db/schema'
import { db } from '../../db'
import { eq, ilike } from 'drizzle-orm'

export const getBlogs = async (filter: string | undefined) => {
  return filter
    ? db.query.blogs.findMany({ where: ilike(blogs.title, `%${filter}%`) })
    : db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({ where: eq(blogs.id, id) })
}

export const addOneLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
