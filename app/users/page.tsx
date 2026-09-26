import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">List of users</h2>
      <ul className="flex flex-col gap-2">
        {users.map(u => (
          <li className="p-1 hover:bg-red-100 dark:hover:text-black" key={u.id}>
            <Link className="font-semibold" href={`/users/${u.username}`}>
              {u.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
