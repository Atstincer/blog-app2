import { getBlogs } from '../services/blogs'
import Link from 'next/link'
import { searchTitles } from '../actions/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  if (blogs) blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div className="flex justify-end">
        <form action={searchTitles}>
          <input
            className="bg-blue-200 dark:bg-blue-50 mr-2"
            type="text"
            name="search"
          />
          <button className="bg-blue-500 px-1 hover:scale-105" type="submit">
            search
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-3">List of blogs</h2>
      <ul className="flex flex-col gap-2" data-testid={'blogs-list'}>
        {blogs.map(b => (
          <li className="p-1 hover:bg-red-100 dark:hover:text-black" key={b.id}>
            <Link href={`/blogs/${b.id}`}>
              <div className="font-semibold">{b.title}</div>
              <div>
                author: <em className="mr-3">{b.author}</em> likes: {b.likes}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
