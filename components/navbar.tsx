"use client";

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import Image from 'next/image';
import { Avatar } from '../components/ui/avatar';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn] = useState(true);
  const animationFrameId = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);
  
  // Gestion ultra-optimisée du scroll
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY.current;
    lastScrollY.current = currentScrollY;

    if (isScrollingDown) {
      console.log('User is scrolling down');
    }

    const newScrolled = currentScrollY > 5;

    setScrolled((prevScrolled) => {
      if (prevScrolled !== newScrolled) {
        return newScrolled;
      }
      return prevScrolled;
    });
  }, []); 

  useEffect(() => {
    const debounceScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debounceScroll, { passive: true });

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('scroll', debounceScroll);
    };
  }, [handleScroll]);

  const navItems = [
    { label: 'ACCUEIL', href: '/' },
    { label: 'À PROPOS', href: '/about' },
    { label: 'CHAMBRES', href: '/rooms' },
    { label: 'RESTAURANT', href: '/restaurant' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg py-3' : 'bg-gradient-to-r from-amber-50 to-yellow-50 py-4'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 gap-8">
          
          {/* Logo agrandi */}
          <Link href="/" className="flex-shrink-0 mr-12" aria-label="Accueil">
            <div className="relative transition-transform duration-300 hover:scale-105">
              <Image
                src="/ogo.png"
                alt="Bain du Lac"
                width={220}
                height={70}
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Menu desktop */}
          <div className="hidden lg:flex items-center justify-between flex-1">
            <div className="flex gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                  aria-label={item.label}
                >
                  <span className="font-bold text-lg uppercase tracking-wider transition-colors duration-200 text-amber-700 group-hover:text-amber-800">
                    {item.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Zone utilisateur */}
            <div className="ml-10 flex items-center gap-6">
              {isLoggedIn ? (
                <>
                  <Avatar 
                    src="https://i.pravatar.cc/300?img=2"
                    name="Sedjro Melodie"
                    size="md"
                    isOnline={true}
                    showName={true}
                    className="border-2 border-amber-500"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-amber-700 hover:bg-amber-100"
                    aria-label="Profile"
                  />
                </>
              ) : (
                <Button 
                  variant="outline"
                  className="border-2 border-amber-500 text-amber-700 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-white px-8 py-3 font-bold"
                >
                  CONNEXION
                </Button>
              )}
            </div>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden flex items-center">
            {isLoggedIn && (
              <Avatar 
                src="https://i.pravatar.cc/300?img=2"
                name="Sedjro"
                size="sm"
                isOnline={true}
                className="border-2 border-amber-500 mr-4"
              />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-amber-100 transition-colors"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? (
                <X className="h-7 w-7 text-amber-700" />
              ) : (
                <Menu className="h-7 w-7 text-amber-700" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile - Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg mt-2 rounded-lg animate-in fade-in border border-amber-200">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 font-medium text-amber-700 hover:bg-amber-100 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="px-4 py-3 border-t border-amber-200">
                    <Button 
                      variant="link"
                      className="w-full justify-start text-amber-700 font-bold pl-0 hover:text-amber-800"
                    >
                      Mon compte
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3"
                  >
                    RÉSERVER MAINTENANT
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}