// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Verificar si el modo mantenimiento está activo en las variables de entorno
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // 2. Definir la ruta de la página de mantenimiento
  const maintenancePath = '/mantenimiento';

  // 3. Si no está en mantenimiento, dejar pasar
  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  // 4. Obtener el path actual
  const { pathname } = req.nextUrl;

  // 5. Permitir el acceso a la propia página de mantenimiento y a los recursos estáticos
  // (imágenes, css, js, favicon) para que la página se vea bien.
  if (
    pathname === maintenancePath ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Archivos como logo.png, favicon.ico
  ) {
    return NextResponse.next();
  }

  // 6. Redirigir cualquier otra ruta a la página de mantenimiento
  return NextResponse.redirect(new URL(maintenancePath, req.url));
}

// Configuración para que el middleware corra en todas las rutas
export const config = {
  matcher: '/:path*',
};