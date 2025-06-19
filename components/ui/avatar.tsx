"use client";

import Image from 'next/image';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils'; // Utilitaire pour combiner les classes

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isOnline?: boolean;
  showName?: boolean;
}

export function Avatar({ 
  src, 
  alt = 'User avatar', 
  name = '', 
  size = 'md', 
  className = '',
  isOnline = false,
  showName = false
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold",
        sizeClasses[size],
        className
      )}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          initials || <User className="h-1/2 w-1/2 text-amber-600" />
        )}
        {isOnline && (
          <span className={cn(
            "absolute bottom-0 right-0 block rounded-full border-2 border-white bg-green-500",
            size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : 'h-3 w-3'
          )} />
        )}
      </div>
      {showName && name && (
        <span className="font-semibold text-slate-800 whitespace-nowrap">
          {name.split(' ')[0]} {/* Affiche seulement le prénom */}
        </span>
      )}
    </div>
  );
}
