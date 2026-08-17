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
      const responseAxios = await checkSession();

      if (responseAxios.status === 200 && responseAxios.data?.success) {
        const setCookie = responseAxios.headers['set-cookie'];

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
            const response = NextResponse.redirect(new URL('/', request.url));
            
            if (setCookie) {
              const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
              for (const cookieStr of cookieArray) {
                response.headers.append('Set-Cookie', cookieStr);
              }
            }
            
            return response;
          }

          if (isPrivateRoute) {
            const response = NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });

            if (setCookie) {
              const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
              for (const cookieStr of cookieArray) {
                response.headers.append('Set-Cookie', cookieStr);
              }
            }

            return response;
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
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
