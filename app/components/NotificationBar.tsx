'use client'

import { useNotificationContext } from './NotificationContextProvider'

const NotificationBar = () => {
  const { mesage, type } = useNotificationContext()
  if (!mesage) return null
  return (
    <div style={{ color: type === 'success' ? 'green' : 'red' }}>{mesage}</div>
  )
}

export default NotificationBar
