import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!token && !isAuthPage) {
    // Se não estiver autenticado e não estiver em uma página de auth, redireciona para o login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    // Se estiver autenticado e tentar acessar página de auth, redireciona para home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Em caso de logout, redireciona para a página principal
  if (request.nextUrl.pathname === '/api/auth/signout') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/api/auth/signout'
  ]
};
