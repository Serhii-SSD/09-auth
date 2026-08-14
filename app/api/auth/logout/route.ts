import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    await api.post('auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken || ''}; refreshToken=${refreshToken || ''}`,
      },
    });

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    response.headers.append(
      'Set-Cookie',
      'accessToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax'
    );
    response.headers.append(
      'Set-Cookie',
      'refreshToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax'
    );

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
