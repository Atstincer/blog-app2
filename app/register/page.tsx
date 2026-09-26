'use client'

import { registerUser } from '../actions/users'
import { useActionState } from 'react'

const RegistrationPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    error: '',
    values: { name: '', username: '' },
  })
  return (
    <div className="w-md p-10 shadow mx-auto">
      <h2 className="text-2xl font-bold mb-5">Registration form</h2>
      <form className="flex flex-col gap-2" action={formAction}>
        <div>
          <label>
            name:{' '}
            <input
              className="ml-2 px-2 border"
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
            ></input>
          </label>
        </div>
        <div>
          <label>
            username:{' '}
            <input
              className="ml-2 px-2 border"
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            ></input>
          </label>
        </div>
        <div>
          <label>
            password:{' '}
            <input
              className="ml-2 px-2 border"
              type="password"
              name="password"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            confirm password:{' '}
            <input
              className="ml-2 px-2 border"
              type="password"
              name="passwordConfirm"
              required
            ></input>
          </label>
        </div>
        <div className="flex mt-3">
          <button
            className="px-1 hover:scale-105 bg-blue-500 text-white mx-auto"
            type="submit"
          >
            register
          </button>
        </div>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </div>
  )
}

export default RegistrationPage
