import { Inter } from 'next/font/google'
import { Orbitron } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata = {
  title: 'PAL | Preserve Auto Lab',
  description: 'Premium automotive styling and wrap shop based in Los Angeles, featuring an AI wrap consultant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className={`scroll-smooth ${orbitron.className} ${inter.className}`} data-scroll-behavior="smooth">
      <head>
  
        
      </head>
      <body className="bg-venom-dark text-white antialiased selection:bg-venom-green selection:text-black">
        {children}
      </body>
    </html>
  );
}