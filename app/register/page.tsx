'use client'

import { registerUser } from '../actions/users'
import { useActionState } from 'react'

const RegistrationPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: { username: '' },
    values: { name: '', username: '' },
  })
  return (
    <div className="w-md p-10 shadow mx-auto">
      <h2 className="text-2xl font-bold mb-5">Registration form</h2>
      <form className="flex flex-col gap-2" action={formAction}>
        <div>
          <label>
            Name
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
            Username
            <input
              className="ml-2 px-2 border"
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            ></input>
          </label>
          {state.errors.username && (
            <p data-testid="username-error" className="text-red-500 my-1">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label>
            Password
            <input
              className="ml-2 px-2 border"
              type="password"
              name="password"
              required
            ></input>
          </label>
          {state.errors.password && (
            <p className="text-red-500 my-1">{state.errors.password}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password
            <input
              className="ml-2 px-2 border"
              type="password"
              name="passwordConfirm"
              required
            ></input>
          </label>
          {state.errors.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="text-red-500 my-1"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <div className="flex mt-3">
          <button
            data-testid="register-button"
            className="px-1 hover:scale-105 bg-blue-500 text-white mx-auto"
            type="submit"
          >
            register
          </button>
        </div>
      </form>
      {state.errors.db && (
        <p className="text-red-500 my-1">{state.errors.db}</p>
      )}
    </div>
  )
}

export default RegistrationPage
