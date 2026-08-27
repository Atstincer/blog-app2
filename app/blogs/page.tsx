import { getBlogs } from '../services/blogs'
import Link from 'next/link'
import { searchTitles } from '../actions/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>
}) => {
  const { filter } = await searchParams
  const blogs = getBlogs(filter)
  if (blogs) blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <form action={searchTitles}>
        <input type="text" name="search" />
        <button type="submit">search</button>
      </form>
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
