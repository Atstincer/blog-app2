'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="w-md p-10 shadow mx-auto">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              className="ml-2 px-2 border"
              type="text"
              name="username"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="ml-2 px-2 border"
              type="password"
              name="password"
              required
            />
          </label>
        </div>
        <button
          data-testid="login-button"
          className="mt-5 px-1 hover:scale-105 bg-blue-500 text-white mx-auto"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}
