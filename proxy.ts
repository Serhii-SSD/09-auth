import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname === '/sign-in' || pathname === '/sign-up';
  const isPrivateRoute =
    pathname.startsWith('/notes') || pathname.startsWith('/profile');

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/notes/filter/all', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};