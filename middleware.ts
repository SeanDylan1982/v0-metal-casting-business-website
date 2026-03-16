import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for admin session cookie
  const sessionCookie = request.cookies.get('admin_session')
  
  // If accessing admin routes without session, redirect to login
  if (pathname.startsWith('/admin')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Verify session is valid (not expired)
    try {
      const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      if (session.exp < Date.now()) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('admin_session')
        return response
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // If accessing login with valid session, redirect to admin
  if (pathname === '/login' && sessionCookie) {
    try {
      const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      if (session.exp > Date.now()) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    } catch {
      // Invalid session, let them access login
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
