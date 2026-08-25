import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>List of blogs</h2>
      <ul>
        {blogs.map(b => (
          <li key={b.id}>
            {b.title} {b.author} {b.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
