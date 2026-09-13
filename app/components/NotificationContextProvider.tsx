'use client'

import { useState, useContext, createContext } from 'react'

type NotificationType = 'success' | 'error'

type NotificationContextType = {
  mesage: string
  type: NotificationType
  setNotification: (msg: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
  mesage: '',
  type: 'success',
  setNotification: () => {},
})

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mesage, setMesage] = useState('')
  const [type, setType] = useState<NotificationType>('success')

  const setNotification = (msg: string, type: NotificationType = 'success') => {
    setMesage(msg)
    setType(type)
    setTimeout(() => setMesage(''), 3000)
  }
  return (
    <NotificationContext value={{ mesage, type, setNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
