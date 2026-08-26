import { getBlogs } from '../services/blogs'
import Link from 'next/link'

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>List of blogs</h2>
      <ul>
        {blogs.map(b => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>{b.title}</Link> {b.author} {b.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
