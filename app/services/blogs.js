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
]

export const getBlogs = () => {
  return blogs
}
