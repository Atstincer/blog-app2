import { NextResponse } from 'next/server'
import { resetDB } from '@/app/services/test'

export const DELETE = async () => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }
  await resetDB()
  return NextResponse.json({ message: 'Database reset OK' }, { status: 200 })
}
