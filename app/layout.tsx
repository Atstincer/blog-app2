import './globals.css'
import AuthSessionProvider from './components/SessionProvider'
import { NotificationContextProvider } from './components/NotificationContextProvider'
import NavBar from './components/NavBar'
import NotificationBar from './components/NotificationBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NotificationContextProvider>
            <NavBar />
            <NotificationBar />
            <div className="px-10 py-5">{children}</div>
          </NotificationContextProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
