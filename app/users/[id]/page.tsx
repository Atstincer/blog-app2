import { getUserById } from '@/app/services/users'

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserById(Number(id))
  return <div>user {user?.name} selected</div>
}

export default UserPage
