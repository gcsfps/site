import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rotas que requerem autenticação de promoter
const promoterRoutes = [
  '/events/create',
  '/events/manage',
  '/events/my-events',
  '/events/[id]/edit',
  '/events/[id]/applications',
  '/events/[id]/confirmed',
  '/promoter/dashboard',
];

// Rotas que requerem autenticação de VIP
const vipRoutes = [
  '/events/my-applications',
  '/profile/my-applications',
  '/vip/dashboard',
];

// Rotas que requerem plano Premium ou Ultimate
const premiumRoutes = [
  '/events/analytics',
  '/events/advanced-filters',
];

// Rotas que requerem plano Ultimate
const ultimateRoutes = [
  '/events/priority-management',
  '/events/unlimited',
];

// Rotas públicas
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/about',
  '/events',
  '/promoters',
  '/subscription/plans',
];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  // Permitir acesso a rotas públicas
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Redirecionar para login se não estiver autenticado
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar permissões baseadas no tipo de usuário
  if (promoterRoutes.some(route => path.startsWith(route)) && token.type !== 'promoter') {
    return NextResponse.redirect(new URL('/events', request.url));
  }

  if (vipRoutes.some(route => path.startsWith(route)) && token.type !== 'presenca_vip') {
    return NextResponse.redirect(new URL('/events', request.url));
  }

  // Verificar permissões baseadas no plano (apenas para promoters)
  if (token.type === 'promoter') {
    const subscription = token.subscription?.plan || 'Basic';

    // Verificar rotas Premium
    if (premiumRoutes.some(route => path.startsWith(route)) && 
        !['Premium', 'Ultimate'].includes(subscription)) {
      return NextResponse.redirect(new URL('/subscription/plans?required=premium', request.url));
    }

    // Verificar rotas Ultimate
    if (ultimateRoutes.some(route => path.startsWith(route)) && 
        subscription !== 'Ultimate') {
      return NextResponse.redirect(new URL('/subscription/plans?required=ultimate', request.url));
    }
  }

  return NextResponse.next();
}
