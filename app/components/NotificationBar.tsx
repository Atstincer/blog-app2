'use client'

import { useNotificationContext } from './NotificationContextProvider'

const NotificationBar = () => {
  const { mesage, type } = useNotificationContext()
  if (!mesage) return null
  //const mesage = 'Some mesage'
  //let type = 'success'
  const notiColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return <div className={`${notiColor} px-1 rounded text-center`}>{mesage}</div>
}

export default NotificationBar
