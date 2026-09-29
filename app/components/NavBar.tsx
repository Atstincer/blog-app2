'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'

type NavBarButtonProps = {
  href: string
  children: React.ReactNode
}

const NavBarButton = ({ href, children }: NavBarButtonProps) => {
  return (
    <Link
      className="bg-fuchsia-700 px-1 m-1 rounded hover:scale-105"
      href={href}
    >
      {children}
    </Link>
  )
}

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex bg-fuchsia-600 items-center justify-between p-2">
      <div className="flex gap-2">
        <Link className="hover:scale-105" href={'/'}>
          home
        </Link>
        <Link className="hover:scale-105" href={'/blogs'}>
          blogs
        </Link>
        <Link className="hover:scale-105" href={'/users'}>
          users
        </Link>
        {session && (
          <Link className="hover:scale-105" href={'/blogs/new'}>
            new blog
          </Link>
        )}
      </div>
      {session ? (
        <div className="flex items-center gap-4">
          {/*<em>{session.user?.name} logged in</em>*/}
          <Link className="hover:scale-105" href={'/me'}>
            me
          </Link>
          <button
            className="bg-fuchsia-700 px-1 m-1 rounded hover:scale-105"
            onClick={() => signOut()}
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavBarButton href="/login">login</NavBarButton>
          <NavBarButton href="/register">register</NavBarButton>
          {/*<Link
            className="bg-fuchsia-700 px-1 m-1 rounded hover:scale-105"
            href="/login"
          >
            login
          </Link>
          <Link
            className="bg-fuchsia-700 px-1 m-1 rounded hover:scale-105"
            href={'/register'}
          >
            register
          </Link>*/}
        </div>
      )}
    </nav>
  )
}
