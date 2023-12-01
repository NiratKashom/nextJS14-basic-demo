import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from "jose";

import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value ?? '';
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    };
    const secretKey = await importJWK(secretJWK, 'HS256');
    const { payload } = await jwtVerify(token, secretKey);
    if (payload.email !== 'eiei@eiei.com') {
      throw new Error('email incorrect');
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user', JSON.stringify({ email: payload.email }));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/manage/user/:path*',
};