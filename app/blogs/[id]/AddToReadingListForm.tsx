'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNotificationContext } from '@/app/components/NotificationContextProvider'
import { addToReadingList } from '@/app/actions/blogs'

const AddToReadingListForm = ({ blogId }: { blogId: number }) => {
  const [state, formAction] = useActionState(addToReadingList, {
    message: '',
    type: '',
  })
  const { setNotification } = useNotificationContext()
  const router = useRouter()

  useEffect(() => {
    setNotification(
      state.message,
      state.type === 'error' ? state.type : undefined,
    )
    if (state.type === 'unauthenticated') {
      router.push('/login')
    }
  }, [state])

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={blogId} />
      <button
        data-testid="add-to-reading-list-button"
        className="bg-green-600 px-2 py-1 hover:scale-105 text-white rounded"
        type="submit"
      >
        add to reading list
      </button>
    </form>
  )
}

export default AddToReadingListForm
