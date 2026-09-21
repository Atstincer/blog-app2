import { getUserByAPIToken } from '@/app/services/users'
import { NextResponse, NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  console.log('authHeader', authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'missing or invalid token' },
      { status: 401 },
    )
  }
  const user = await getUserByAPIToken(authHeader.split(' ')[1])
  if (!user) {
    return NextResponse.json({ message: 'user not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs,
  })
}
