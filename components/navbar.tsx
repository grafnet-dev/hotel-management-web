"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Chambres & Suites', href: '/rooms' },
    { label: 'Réservation', href: '/booking' },
    { label: 'Restaurant', href: '/restaurant' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20"> {/* Augmentez la hauteur à h-20 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center h-full">
              {/* Version optimisée avec Next.js Image */}
              <div className="relative h-50 w-50"> {/* Conteneur avec dimensions fixes */}
                <Image
                  src="/ogo.png"
                  alt="Bain de Lac"
                  fill
                  className="object-contain object-left" /* Ajustez le positionnement */
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" className="ml-4">
              Se connecter
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-sky-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Se connecter
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}