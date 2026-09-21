import { getCurrentUser } from '../services/session'
import { generateToken } from '../actions/users'

const Me = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <div className="w-xl shadow mx-auto">
      <div className="p-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">My profile</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>
        <div className="border my-5"></div>
        <div>
          <h2 className="text-2xl font-bold mb-4">API Token</h2>
          <div className="bg-gray-50 p-2">
            <div className="my-2">Current token:</div>
            <div className="bg-gray-100 my-2 px-2">
              {user.token ? user.token : 'no token has been generated yet'}
            </div>
          </div>
          <form className="mt-5" action={generateToken}>
            <input type="hidden" name="id" value={user.id} />
            <button
              className="bg-blue-500 text-white rounded px-2 hover:scale-105"
              type="submit"
            >
              Generate New Token
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Me
