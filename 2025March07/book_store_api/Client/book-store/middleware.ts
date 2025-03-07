import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export default async function Middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const protectedRoutes = ['/dashboard/users', '/dashboard/authors', '/dashboard/carts', '/dashboard/books', '/dashboard/categories', '/dashboard']
  const authRoutes = ['/login']

  const isProtectedRoute = protectedRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path)

  if (isProtectedRoute) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (isAuthRoute) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')
    if (token)
      return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
};
