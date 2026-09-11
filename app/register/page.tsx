'use client'

import { registerUser } from '../actions/users'
import { useActionState } from 'react'

const RegistrationPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    error: '',
    values: { name: '', username: '' },
  })
  return (
    <div>
      <h2>Registration form</h2>
      <form action={formAction}>
        <div>
          <label>
            name:{' '}
            <input
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
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            ></input>
          </label>
        </div>
        <div>
          <label>
            password: <input type="password" name="password" required></input>
          </label>
        </div>
        <div>
          <label>
            confirm password:{' '}
            <input type="password" name="passwordConfirm" required></input>
          </label>
        </div>
        <button type="submit">register</button>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </div>
  )
}

export default RegistrationPage
