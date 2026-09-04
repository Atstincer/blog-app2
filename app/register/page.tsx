import { registerUser } from '../actions/users'

const RegistrationPage = () => {
  return (
    <div>
      <h2>Registration form</h2>
      <form action={registerUser}>
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
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default RegistrationPage
