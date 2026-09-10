'use client'

import { useActionState } from 'react'
import { createBlog } from '../../actions/blogs'

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { title: undefined, author: undefined, url: undefined },
    values: { title: '', author: '', url: '' },
  })
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            title:{' '}
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values.title}
            />
          </label>
          {state.errors.title && (
            <p style={{ color: 'red' }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <label>
            author:{' '}
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values.author}
            />
          </label>
          {state.errors.author && (
            <p style={{ color: 'red' }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            url:{' '}
            <input
              type="text"
              name="url"
              required
              defaultValue={state.values.url}
            />
          </label>
          {state.errors.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
