const blogs = [
  {
    id: 1,
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.url1.com',
    likes: 0,
  },
  {
    id: 2,
    title: 'Title 2',
    author: 'Author 2',
    url: 'www.url2.com',
    likes: 2,
  },
  {
    id: 3,
    title: 'Title 3',
    author: 'Author 3',
    url: 'www.url3.com',
    likes: 1,
  },
  {
    id: 4,
    title: 'Fullstack course',
    author: 'Author 4',
    url: 'www.url4.com',
    likes: 5,
  },
  {
    id: 5,
    title: 'Nextjs course',
    author: 'Author 5',
    url: 'www.url5.com',
    likes: 3,
  },
]

let nextId = 6

export const getBlogs = (filter: string | undefined) => {
  return filter
    ? blogs.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
    : blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
  return blogs.find(b => b.id === id)
}

export const addOneLike = (id: number) => {
  const blog = blogs.find(b => b.id === id)
  if (blog) {
    blog.likes = blog.likes + 1
  }
}
