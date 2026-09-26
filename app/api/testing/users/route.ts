import { NextResponse, NextRequest } from 'next/server'
import { addUserToDB } from '@/app/services/users'

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }
  const { username, name, password } = await req.json()
  const newUser = await addUserToDB(name, username, password)
  return NextResponse.json(newUser)
}
