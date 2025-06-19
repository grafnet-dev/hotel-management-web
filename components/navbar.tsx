"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Chambres', href: '/rooms' },
    { label: 'Restaurant', href: '/restaurant' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-2' : 'bg-white/90 '}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo avec effet de lumière */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-50 w-50 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/ogo.png"
                alt="Bain du Lac"
                fill
                className="object-contain object-left"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* Menu desktop - Version épurée */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1 group"
              >
                <span className={`text-slate-700 font-medium text-sm uppercase tracking-wider transition-colors duration-200 group-hover:text-amber-600 ${scrolled ? 'text-sm' : 'text-base'}`}>
                  {item.label}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            <Button 
              variant="outline"
              className="ml-4 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors duration-300"
            >
              Connexion
            </Button>
          </div>

          {/* Menu mobile - Icône simplifiée */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md transition-all duration-200 hover:bg-slate-100"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile - Version sobre */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg animate-fade-in">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-slate-700 hover:bg-amber-50 rounded-md font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 transition-colors duration-200"
                >
                  Réserver maintenant
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Barre de progression scroll minimaliste */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300"
        style={{ 
          width: `${typeof window !== 'undefined' ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 : 0}%` 
        }}
      />
    </nav>
  );
}