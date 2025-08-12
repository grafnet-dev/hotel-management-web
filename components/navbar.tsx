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
    <>
      {/* Import des polices Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-times {
          font-family: 'Times New Roman', serif;
        }
        
        .text-primary {
          color: #014d71;
        }
        
        .text-secondary {
          color: #f0b800;
        }
        
        .bg-primary {
          background-color: #014d71;
        }
        
        .bg-secondary {
          background-color: #f0b800;
        }
        
        .border-primary {
          border-color: #014d71;
        }
        
        .border-secondary {
          border-color: #f0b800;
        }
        
        .hover\\:text-primary:hover {
          color: #014d71;
        }
        
        .hover\\:text-secondary:hover {
          color: #f0b800;
        }
        
        .hover\\:bg-primary:hover {
          background-color: #014d71;
        }
        
        .hover\\:bg-secondary:hover {
          background-color: #f0b800;
        }
        
        .hover\\:border-primary:hover {
          border-color: #014d71;
        }
        
        .hover\\:border-secondary:hover {
          border-color: #f0b800;
        }
        
        .gradient-primary {
          background: linear-gradient(135deg, #014d71 0%, #f0b800 100%);
        }
        
        .gradient-secondary {
          background: linear-gradient(135deg, #f0b800 0%, #014d71 100%);
        }
        
        .bg-light {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .shadow-custom {
          box-shadow: 0 4px 20px rgba(1, 77, 113, 0.15);
        }
      `}</style>

      <nav className={`fixed w-full z-50 transition-all duration-300 font-poppins ${
        scrolled 
          ? 'bg-white shadow-custom py-2 sm:py-3' 
          : 'bg-light py-3 sm:py-4'
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24 gap-4 sm:gap-8">
            
            {/* Logo responsive */}
            <Link href="/" className="flex-shrink-0" aria-label="Accueil">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <Image
                  src="/ogo3.png"
                  alt="Bain du Lac"
                  width={160}
                  height={50}
                  className="object-contain object-left sm:w-[180px] sm:h-[55px] lg:w-[220px] lg:h-[70px]"
                  priority
                />
              </div>
            </Link>

            {/* Menu desktop */}
            <div className="hidden lg:flex items-center justify-between flex-1">
              <div className="flex gap-6 xl:gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                    aria-label={item.label}
                  >
                    <span className="font-poppins font-semibold text-base xl:text-lg uppercase tracking-wide transition-colors duration-200 text-primary group-hover:text-secondary">
                      {item.label}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Zone utilisateur */}
              <div className="ml-6 xl:ml-10 flex items-center gap-4 xl:gap-6">
                {isLoggedIn ? (
                  <>
                    <Link href="/client" className="flex items-center gap-2">
                      <Avatar 
                        src="https://i.pravatar.cc/300?img=2"
                        name="Sedjro Melodie"
                        size="md"
                        isOnline={true}
                        showName={true}
                        className="border-2 border-secondary cursor-pointer hover:border-primary transition-colors"
                      />
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-primary hover:bg-secondary hover:text-white"
                      aria-label="Profile"
                    />
                  </>
                ) : (
                  <Button 
                    variant="outline"
                    className="font-poppins font-semibold border-2 border-secondary text-primary hover:bg-secondary hover:text-white hover:border-secondary px-6 xl:px-8 py-2 xl:py-3 transition-all duration-300"
                  >
                    CONNEXION
                  </Button>
                )}
              </div>
            </div>

            {/* Menu mobile */}
            <div className="lg:hidden flex items-center gap-3">
              {isLoggedIn && (
                <Avatar 
                  src="https://i.pravatar.cc/300?img=2"
                  name="Sedjro"
                  size="sm"
                  isOnline={true}
                  className="border-2 border-secondary"
                />
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-secondary hover:bg-opacity-10 transition-colors"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? (
                  <X className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                ) : (
                  <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Menu mobile - Dropdown */}
          {isOpen && (
            <div className="lg:hidden bg-white shadow-custom mt-2 rounded-lg animate-in fade-in border border-secondary border-opacity-20">
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 font-poppins font-medium text-primary hover:bg-secondary hover:bg-opacity-10 hover:text-secondary rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  {isLoggedIn ? (
                    <div className="px-4 py-3 border-t border-secondary border-opacity-20">
                      <Button 
                        variant="link"
                        className="w-full justify-start text-primary font-poppins font-semibold pl-0 hover:text-secondary"
                      >
                        Mon compte
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full gradient-primary hover:gradient-secondary text-white font-poppins font-bold py-3 transition-all duration-300"
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
    </>
  );
}