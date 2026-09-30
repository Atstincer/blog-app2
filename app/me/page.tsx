import { getCurrentUser } from '../services/session'
import { generateToken } from '../actions/users'
import { markAsRead } from '../actions/readingList'
import { redirect } from 'next/navigation'

const Me = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const unread = user.readingList.filter(r => r.read === false)
  const read = user.readingList.filter(r => r.read === true)

  return (
    <div data-testid="user-profile" className="w-xl shadow mx-auto">
      <div className="p-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">My profile</h2>
          <p data-testid="user-name">
            <strong>Name:</strong> {user.name}
          </p>
          <p data-testid="user-username">
            <strong>Username:</strong> {user.username}
          </p>
        </div>
        <div className="border my-5"></div>
        <div data-testid="reading-list-section">
          <h2 className="text-2xl font-bold mb-4">Reading list</h2>
          {unread.length !== 0 || read.length !== 0 ? (
            <div>
              <div data-testid="unread-section">
                <h4 className="font-bold mb-1">Unread ({unread.length})</h4>
                {unread.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {unread.map(r => (
                      <li
                        className="bg-yellow-50 p-2 flex justify-between"
                        key={r.id}
                      >
                        <div className="text-blue-600">{r.blog.title}</div>
                        <form action={markAsRead}>
                          <input
                            type="hidden"
                            name="readingListId"
                            value={r.id}
                          />
                          <button
                            data-testid="mark-read-"
                            className="bg-green-600 text-white px-2 rounded hover:scale-105"
                            type="submit"
                          >
                            mark as read
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div data-testid="no-unread-blogs">no unread blogs</div>
                )}
              </div>
              <div>
                <h4 className="font-bold my-4 mb-1">Read ({read.length})</h4>
                <ul className="flex flex-col gap-2">
                  {read.map(r => (
                    <li className="bg-green-50 p-2 text-blue-600" key={r.id}>
                      {r.blog.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div data-testid="empty-reading-list" className="font-semibold">
              reading list is empty
            </div>
          )}
        </div>
        <div className="border my-5"></div>
        <div data-testid="api-token-section">
          <h2 className="text-2xl font-bold mb-4">API Token</h2>
          <div className="bg-gray-50 p-2">
            <div className="my-2">Current token:</div>
            {user.token ? (
              <div
                data-testid="token-display"
                className="bg-gray-100 my-2 px-2"
              >
                <p data-testid="api-token">{user.token}</p>
              </div>
            ) : (
              <div
                data-testid="no-token-message"
                className="bg-gray-100 my-2 px-2"
              >
                'no token has been generated yet'
              </div>
            )}
          </div>
          <form className="mt-5" action={generateToken}>
            <input type="hidden" name="id" value={user.id} />
            <button
              data-testid="generate-token-button"
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
