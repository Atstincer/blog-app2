import { getBlogById } from '../../services/blogs'
import { notFound } from 'next/navigation'

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))
  if (!blog) notFound()
  return (
    <div>
      <h2>{blog.title}</h2>
      <ul>
        <li>author: {blog.author}</li>
        <li>url: {blog.url}</li>
        <li>likes: {blog.likes}</li>
      </ul>
    </div>
  )
}

export default Blog
