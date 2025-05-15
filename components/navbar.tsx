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
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-md font-[Bahnschrift]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <div className="relative h-50 w-50">
              <Image
                src="/ogo.png"
                alt="Bain du Lac"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2a4d4e] hover:text-[#d35400] px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="ml-4 border-[#a97101] text-[#a97101] hover:bg-[#a97101] hover:text-white transition-colors"
            >
              Se connecter
            </Button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#5d3a00] hover:text-[#f39c12] transition-all"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg transition-all duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[#2a4d4e] hover:text-[#e67e22] px-3 py-2 rounded-md font-medium text-base transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 border-[#a97101] text-[#a97101] hover:bg-[#a97101] hover:text-white transition"
              >
                Se connecter
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
