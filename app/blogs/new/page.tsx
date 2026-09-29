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
    <div className="w-md p-10 shadow mx-auto">
      <h2 className="text-2xl font-bold mb-3">Create a new blog</h2>
      <form className="flex flex-col gap-2" action={formAction}>
        <div>
          <label>
            Title:
            <input
              className="ml-2 px-2 border"
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
            Author:
            <input
              className="ml-2 px-2 border"
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
            Url:
            <input
              className="ml-2 px-2 border"
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
        <div className="mt-3">
          <button
            data-testid="create-blog-button"
            className="px-1 hover:scale-105 bg-blue-500 text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
