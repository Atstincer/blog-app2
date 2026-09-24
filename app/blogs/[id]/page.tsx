import { getBlogById } from '../../services/blogs'
import { notFound } from 'next/navigation'
import { addLikes } from '../../actions/blogs'
import { getCurrentUser } from '@/app/services/session'
import AddToReadingListForm from './AddToReadingListForm'

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const currentUser = await getCurrentUser()

  const showAddToReadingList = blog?.userId !== currentUser?.id

  if (!blog) notFound()
  return (
    <div className="w-xl mx-auto shadow p-4">
      <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>

      <ul className="flex flex-col gap-3 text-xl">
        <li>by {blog.author}</li>
        <li className="flex gap-4 items-center">
          <div>likes: {blog.likes}</div>
          <form action={addLikes}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              className="bg-blue-600 px-2 py-1 hover:scale-105 text-white rounded"
              type="submit"
            >
              like
            </button>
          </form>
          {showAddToReadingList && <AddToReadingListForm blogId={blog.id} />}
        </li>
        <li className="text-blue-700 mt-1">{blog.url}</li>
      </ul>
    </div>
  )
}

export default Blog
