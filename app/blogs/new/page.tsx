'use client'

import { useActionState, useEffect } from 'react'
import { createBlog } from '../../actions/blogs'
import { useRouter } from 'next/navigation'
import { useNotificationContext } from '@/app/components/NotificationContextProvider'

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { title: undefined, author: undefined, url: undefined },
    result: '',
    values: { title: '', author: '', url: '' },
  })
  const { setNotification } = useNotificationContext()
  const router = useRouter()

  useEffect(() => {
    if (state.result === 'success') {
      setNotification('blog created')
      router.push('/blogs')
    }
  }, [state])

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
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors?.title && (
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
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors?.author && (
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
              defaultValue={state.values?.url}
            />
          </label>
          {state.errors?.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
