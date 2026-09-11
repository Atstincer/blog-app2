'use client'

import { registerUser } from '../actions/users'
import { useActionState } from 'react'

const RegistrationPage = () => {
  const [state, formAction] = useActionState(registerUser, { error: '' })
  return (
    <div>
      <h2>Registration form</h2>
      <form action={formAction}>
        <div>
          <label>
            name: <input type="text" name="name" required></input>
          </label>
        </div>
        <div>
          <label>
            username: <input type="text" name="username" required></input>
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
