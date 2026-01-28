import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'En Inventario | [Nombre de tu Joyería]',
  description: 'Actualmente nos encontramos realizando inventario',
};

export default function MantenimientoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Ícono decorativo */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <svg
            className="w-20 h-20 mx-auto text-amber-600 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          Estamos en Inventario
        </h1>
        
        {/* Descripción principal */}
        <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
          Actualmente nos encontramos realizando el inventario de nuestras piezas exclusivas.
        </p>
        
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Durante este proceso, nuestra tienda en línea permanecerá temporalmente cerrada 
          para garantizar la precisión de nuestro catálogo.
        </p>
        
        {/* Divisor decorativo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-px bg-amber-300"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          <div className="w-12 h-px bg-amber-300"></div>
        </div>
        
        {/* Mensaje de cierre */}
        <p className="text-gray-700 font-medium mb-2">
          Estaremos de regreso pronto
        </p>
        <p className="text-sm text-gray-500">
          con toda nuestra colección actualizada
        </p>
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Gracias por su comprensión y preferencia
          </p>
        </div>
      </div>
    </div>
  );
}