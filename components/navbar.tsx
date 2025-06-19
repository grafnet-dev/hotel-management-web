"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import Image from 'next/image';
import { Avatar } from '../components/ui/avatar';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn] = useState(true); // Simule un utilisateur connecté

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ACCUEIL', href: '/' },
    { label: 'À PROPOS', href: '/about' },
    { label: 'CHAMBRES', href: '/rooms' },
    { label: 'RESTAURANT', href: '/restaurant' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-3' : 'bg-white/90 py-2'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-8">
          
          {/* Logo avec espacement amélioré */}
          <Link href="/" className="flex-shrink-0 mr-12">
            <div className="relative h-50 w-50 transition-transform duration-300 hover:scale-105">
              <Image
                src="/ogo.png"
                alt="Bain du Lac"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Menu desktop - Espacement optimal */}
          <div className="hidden lg:flex items-center justify-between flex-1">
            <div className="flex gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <span className={`font-bold text-lg uppercase tracking-wider transition-colors duration-200 group-hover:text-amber-600 ${scrolled ? 'text-slate-800' : 'text-slate-900'}`}>
                    {item.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-amber-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Zone utilisateur avec espacement */}
            <div className="ml-10 flex items-center gap-6">
              {isLoggedIn ? (
                <>
       <Avatar 
 src="https://i.pravatar.cc/300?img=2"

  name="Sedjro Melodie"
  size="md"
  isOnline={true}
  showName={true}
  className="border-2 border-amber-600"
/>


                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-slate-600 hover:bg-slate-100"
                    aria-label="Profile"
                  >
                    
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3"
                >
                  CONNEXION
                </Button>
              )}
            </div>
          </div>

          {/* Menu mobile - Bouton amélioré */}
          <div className="lg:hidden flex items-center">
            {isLoggedIn && (
              <Avatar 
               src="https://i.pravatar.cc/300?img=2"
                name="Sedjro"
                size="sm"
                isOnline={true}
                className="border-2 border-amber-600 mr-4"
              />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-7 w-7 text-slate-800" />
              ) : (
                <Menu className="h-7 w-7 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile - Version épurée */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-lg mt-2 rounded-lg">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 font-medium text-slate-800 hover:bg-amber-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="px-4 py-3 border-t border-slate-200">
                    <Button 
                      variant="link"
                      className="w-full justify-start text-amber-600 font-bold pl-0"
                    >
                      Mon compte
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3"
                  >
                    RÉSERVER MAINTENANT
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Barre de progression visible */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-amber-500 transition-all duration-300"
        style={{ 
          width: `${typeof window !== 'undefined' ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 : 0}%` 
        }}
      />
    </nav>
  );
}