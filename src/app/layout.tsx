import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { ThemeProvider } from '../../components/theme-provider';
import { Toaster } from '../../components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bain de Lac - Hôtel de Luxe',
  description: 'Découvrez notre hôtel de charme au bord du lac, offrant des services haut de gamme pour un séjour inoubliable.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}