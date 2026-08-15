

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie'; 
import { checkSession } from './lib/api/serverApi'; 

const privateRoutes = ['/notes', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const session = await checkSession(cookieStore.toString());

      if (session.success) {
        const setCookie = session.setCookieHeader;

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);

            if (parsed.value) {
              cookieStore.set(parsed.name, parsed.value, parsed);
            }
          }
        }

        const updatedAccessToken = cookieStore.get('accessToken')?.value;

        if (updatedAccessToken) {
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/notes/filter/all', request.url), {
              headers: {
                'Set-Cookie': cookieStore.toString(), 
              },
            });
          }

          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/notes/filter/all', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function proxy(request: NextRequest) {
//   const token = request.cookies.get('accessToken')?.value;
//   const { pathname } = request.nextUrl;

//   const isAuthRoute =
//     pathname === '/sign-in' || pathname === '/sign-up';
//   const isPrivateRoute =
//     pathname.startsWith('/notes') || pathname.startsWith('/profile');

//   if (!token && isPrivateRoute) {
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   if (token && isAuthRoute) {
//     return NextResponse.redirect(new URL('/notes/filter/all', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };