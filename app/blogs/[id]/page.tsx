import { getBlogById } from '../../services/blogs'
import { notFound } from 'next/navigation'
import { addLikes } from '../../actions/blogs'

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  if (!blog) notFound()
  return (
    <div>
      <h2>{blog.title}</h2>
      <ul>
        <li>author: {blog.author}</li>
        <li>url: {blog.url}</li>
        <li>likes: {blog.likes}</li>
        <form action={addLikes}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit">add one like</button>
        </form>
      </ul>
    </div>
  )
}

export default Blog
