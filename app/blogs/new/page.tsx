'use client'

import { useActionState } from 'react'
import { createBlog } from '../../actions/blogs'

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, { error: '' })
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            title: <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            author: <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            url: <input type="text" name="url" />
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlogForm
