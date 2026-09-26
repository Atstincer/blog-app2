import { blogs, readingList } from '../../db/schema'
import { db } from '../../db'
import { eq, ilike } from 'drizzle-orm'
import { getCurrentUser } from './session'

export const getBlogs = async (filter: string | undefined) => {
  return filter
    ? db.query.blogs.findMany({ where: ilike(blogs.title, `%${filter}%`) })
    : db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  //const user = await db.query.users.findFirst({ orderBy: sql`RANDOM()` })
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('no logged in')
  }

  const justAdded = await db
    .insert(blogs)
    .values({ title, author, url, userId: user ? user.id : 1 })
    .returning({ id: blogs.id })

  console.log('blog id just added', justAdded[0].id)

  await db
    .insert(readingList)
    .values({ userId: user.id, blogId: justAdded[0].id })
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

export const addToReadingList = async (blogId: number) => {
  const currentUser = await getCurrentUser()
  try {
    if (currentUser) {
      if (!currentUser.readingList.find(r => r.blogId === blogId)) {
        await db
          .insert(readingList)
          .values({ userId: currentUser.id, blogId: blogId })
        return { message: 'Blog added to reading list', type: 'success' }
      } else {
        return {
          message: 'Blog already exist in reading list',
          type: 'success',
        }
      }
    } else {
      return {
        message: 'User not logged in or not exist in database',
        type: 'error',
      }
    }
  } catch (error) {
    console.error(error)
    return { message: 'Some issue wrinting into the database', type: 'error' }
  }
}
