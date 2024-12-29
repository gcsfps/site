import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isLogoutPage = request.nextUrl.pathname.startsWith('/api/auth/signout');

  // Se estiver fazendo logout, deixa prosseguir
  if (isLogoutPage) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e tentar acessar uma página protegida
  if (!token && !isAuthPage) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Se estiver autenticado e tentar acessar página de login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/events/:path*',
    '/login',
    '/api/auth/signout',
    '/api/profile/:path*'
  ]
};
