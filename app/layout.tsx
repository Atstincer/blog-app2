import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href={'/'}>Home</Link>
          {' | '}
          <Link href={'/blogs'}>Blogs</Link>
        </nav>
        <div style={{ marginTop: 10 }}>{children}</div>
      </body>
    </html>
  )
}
