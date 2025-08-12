import './globals.css';
import type { Metadata, Viewport } from 'next'; // Ajoutez Viewport
import { Inter } from 'next/font/google';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { ThemeProvider } from '../../components/theme-provider';
import { Toaster } from '../../components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

export const metadata: Metadata = {
  title: 'Relacs Zone - Hôtel de Luxe',
  description: 'Découvrez notre hôtel de charme au bord du lac, offrant des services haut de gamme pour un séjour inoubliable.',
  
};

// Ajoutez ce nouvel export
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={true} 
          disableTransitionOnChange 
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}