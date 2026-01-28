import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  // Si estamos en modo mantenimiento y NO estamos ya en la página de mantenimiento
  if (isMaintenanceMode && request.nextUrl.pathname !== '/mantenimiento') {
    return NextResponse.rewrite(new URL('/mantenimiento', request.url));
  }
  
  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware (todas excepto archivos estáticos)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};