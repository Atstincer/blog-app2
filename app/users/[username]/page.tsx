import { getUserByUsername } from '@/app/services/users'

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserByUsername(username)
  return (
    <div>
      <h2>{user?.name}</h2>
      blogs:
      <ul>
        {user?.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
