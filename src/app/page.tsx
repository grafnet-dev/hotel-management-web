"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef,useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import  sampleRooms  from '../../types';
import RoomList from '../../components/roomlist';
import {
  Space as  Utensils, Dumbbell, Hotel, ArrowRight, ChevronDown, Wifi,ParkingCircle,Tv2,Baby, Briefcase, Umbrella,
  PhoneCall,Bell,Bath,Waves,Bus,Glasses,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "react-day-picker/style.css";

import BookingSection from '../../components/bookingsection';



const colors = {
  darkTeal: "#1e4e5f",
  teal: "#005D7C",
  lightTeal: "#e0f2f1",
  gold: "#CE9226",
  orange: "#f4a261",
  maroon: "#e76f51",
  white: "#ffffff",
  black: "#1a1a1a",
  gray: "#f8f9fa"
};


type RoomSelection = {
  id: number;       
  adults: number;   
  children: number; 
};

type DateRange = {
  from: Date;
  to?: Date;
};

export default function Home() {
    const galleryImages = [
    {
      category: "Chambres",
      images: [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
      ]
    },
    {
      category: "Restaurant",
      images: [
        "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
        "https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg",
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
      ]
    },
    {
  category: "Spa & Bien-être",
  images: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Spa stones et bambou
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Massage table
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Spa treatment room
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"  // Relaxation spa
  ]
}
  ];

  
const resultsRef = useRef<HTMLDivElement>(null);

const scrollToResults = () => {
  resultsRef.current?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

const handleSearch = (params: {
  date: Date | DateRange | undefined;
  rooms: RoomSelection[];
  isDayUse: boolean;
  totalAdults: number;
  totalChildren: number;
}) => {

  
console.log(params);
  
  scrollToResults();
};

const stars = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => {
      // Seed basée sur l'index pour une génération cohérente
      const seed = (i * 9301 + 49297) % 233280;
      return {
        left: 5 + (seed % 90), // Entre 5% et 95%
        top: 10 + ((seed * 2) % 80), // Entre 10% et 90%
        delay: (seed % 2000) / 1000 // Retard entre 0 et 2s
      };
    }),
  []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const swiperRef = useRef(null);
  const randomValues = useRef({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  });
  const randomLeft = randomValues.current.left;
console.log(randomLeft); // Output: a random value between 0 and 100

const services = [
  {
    title: 'Hébergement de luxe',
    description: 'Chambres spacieuses, climatisées, avec Wi-Fi, TV et service en chambre.',
    icon: <Hotel size={32} />,
  },
  {
    title: 'Restauration',
    description: 'Restaurant gastronomique, buffet et service en chambre 24/7.',
    icon: <Utensils size={32} />,
  },
  {
    title: 'Spa & Bien-être',
    description: 'Massages, soins corporels, hammam et sauna pour votre détente.',
    icon: <Bath  size={32} />,
  },
  {
    title: 'Salle de sport',
    description: 'Espace fitness bien équipé pour garder la forme pendant votre séjour.',
    icon: <Dumbbell size={32} />,
  },
  {
    title: 'Piscine extérieure',
    description: 'Grande piscine avec espace détente et service bar.',
    icon: <Waves size={32} />,
  },
  {
    title: 'Bar & Lounge',
    description: 'Bar élégant avec cocktails, musique et ambiance cosy.',
    icon: <Glasses size={32} />,
  },
  {
    title: 'Navette aéroport',
    description: 'Transferts aller-retour confortables vers l’aéroport.',
    icon: <Bus size={32} />,
  },
  {
    title: 'Réception 24h/24',
    description: 'Accueil chaleureux, check-in rapide et assistance à toute heure.',
    icon: <Bell size={32} />,
  },
  {
    title: 'Wi-Fi haut débit',
    description: 'Connexion rapide et gratuite dans tout l’établissement.',
    icon: <Wifi size={32} />,
  },
  {
    title: 'Parking sécurisé',
    description: 'Parking privé avec vidéosurveillance et gardiennage.',
    icon: <ParkingCircle size={32} />,
  },
  {
    title: 'Télévision par satellite',
    description: 'Accès à des chaînes internationales en HD.',
    icon: <Tv2 size={32} />,
  },
  {
    title: 'Garde d’enfants',
    description: 'Service baby-sitting pour un séjour en toute sérénité.',
    icon: <Baby size={32} />,
  },
  {
    title: 'Conciergerie',
    description: 'Réservations d’activités, taxis, excursions, pressing, etc.',
    icon: < Briefcase size={32} />,
  },
  {
    title: 'Plage privée',
    description: 'Accès direct à la plage avec transats et parasols.',
    icon: <Umbrella size={32} />,
  },
  {
    title: 'Service client',
    description: 'Un personnel dévoué à rendre votre expérience inoubliable.',
    icon: <PhoneCall size={32} />,
  },
];



  return (
     <div className="min-h-screen" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
  {/* Hero Section - Version améliorée */}
  <motion.section
    initial="hidden"
    animate="visible"
    className="relative h-screen overflow-hidden"
  >
    {/* Background Image with Enhanced Overlay */}
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
    >

 
      <Image
        src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
        alt="Bain de Lac Hotel"
        layout="fill"
        objectFit="cover"
        priority
        className="opacity-90"
      />
   
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
           {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          initial={false} // Désactive l'animation initiale
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            boxShadow: "0 0 6px rgba(255, 215, 0, 0.8)"
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay
          }}
        />
      ))}
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl"
          >
            {/* Decorative Line Above Title */}
            <motion.div
              className="w-32 h-0.5 mx-auto mb-8"
              style={{ backgroundColor: colors.gold }}
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1.2 }}
            />

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wide leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 1.0,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              style={{
                background: `linear-gradient(135deg, ${colors.gold} 0%, #FFF8DC 50%, ${colors.gold} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
              }}
            >
              Bienvenue au Bain de Lac
            </motion.h1>

           <motion.p
              className="text-2xl md:text-3xl mb-12 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{ 
                color: colors.white,
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
              }}
            >
              Une expérience unique au bord du lac
              <br />
              <span className="text-xl opacity-90">Où le luxe rencontre la sérénité</span>
            </motion.p>

             <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <div 
              className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-300"
              style={{ 
                backgroundColor: colors.gold,
                zIndex: 0
              }}
            />
            <Button
              size="lg"
              className="relative z-10 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 100%)`,
                border: `1px solid ${colors.gold}`,
                color: colors.white,
                boxShadow: `0 4px 20px ${colors.teal}40`
              }}
            >
                  <span className="relative z-10">Découvrir nos Chambres</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
          
          <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden border-2 group"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: colors.gold,
                    color: colors.maroon,
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="relative z-10">Réserver Maintenant</span>
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: colors.gold }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
          </motion.div>
          
            
</motion.div>

        </div>

        {/* Floating Arrow */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown
            className="h-8 w-8"
            style={{ color: colors.gold }}
          />
        </motion.div>
      </motion.section>

   
{/* Search Section */}
<div ref={resultsRef}>
  <BookingSection 
    rooms={sampleRooms}
    colors={colors}
    onSearch={handleSearch}
  />
</div>

 {/* Section Galerie */}
     <section className="py-20 relative overflow-hidden" style={{ backgroundColor: colors.gray }}>
  {/* Fond décoratif */}
  <div className="absolute inset-0 opacity-5">
    <div 
      className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
      style={{ backgroundColor: colors.teal }}
    />
    <div 
      className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
      style={{ backgroundColor: colors.gold }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="inline-block mb-4">
        <span 
          className="text-sm font-semibold px-4 py-2 rounded-full tracking-wider uppercase"
          style={{ 
            backgroundColor: colors.lightTeal, 
            color: colors.darkTeal 
          }}
        >
          Notre Galerie
        </span>
      </div>
      <h2 
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{ color: colors.darkTeal }}
      >
        Découvrez{' '}
        <span 
          className="bg-gradient-to-r bg-clip-text text-transparent"
          style={{ 
            backgroundImage: `linear-gradient(135deg, ${colors.teal}, ${colors.gold})` 
          }}
        >
          Bain du Lac
        </span>
      </h2>
      <p 
        className="text-xl max-w-2xl mx-auto leading-relaxed"
        style={{ color: colors.black }}
      >
        Une expérience unique vous attend dans un cadre d'exception où luxe et nature se rencontrent
      </p>
    </motion.div>

    {galleryImages.map((category, categoryIndex) => (
      <motion.div
        key={category.category}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
        className="mb-20 last:mb-0"
      >
        {/* En-tête de catégorie */}
        <div className="flex items-center mb-8">
          <div 
            className="w-12 h-1 rounded-full mr-4"
            style={{ backgroundColor: colors.gold }}
          />
          <h3 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: colors.darkTeal }}
          >
            {category.category}
          </h3>
          <div 
            className="flex-1 h-px ml-4"
            style={{ backgroundColor: colors.lightTeal }}
          />
        </div>

        {/* Grille d'images adaptative */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`
                relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group
                ${index === 0 && category.images.length >= 3 ? 'sm:col-span-2 sm:row-span-2 h-80 sm:h-full' : 'h-64'}
                ${index === 1 && category.images.length >= 4 ? 'lg:col-span-2' : ''}
              `}
              style={{
                background: `linear-gradient(135deg, ${colors.lightTeal}20, ${colors.gold}10)`
              }}
            >
              <Image
                src={image}
                alt={`${category.category} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay avec gradient */}
              <div 
                className="absolute inset-0 opacity-60 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkTeal}40, transparent 50%, ${colors.gold}20)`
                }}
              />
              
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, ${colors.white}20 50%, transparent 70%)`
                  }}
                />
              </div>

              {/* Badge numéro pour les grandes images */}
              {index === 0 && (
                <div 
                  className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  style={{ 
                    backgroundColor: colors.gold,
                    color: colors.white
                  }}
                >
                  {index + 1}
                </div>
              )}

              {/* Bordure décorative */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderColor: colors.gold }}
              />
            </motion.div>
          ))}
        </div>

        {/* Ligne décorative entre les catégories */}
        {categoryIndex < galleryImages.length - 1 && (
          <div className="flex items-center justify-center mt-16">
            <div 
              className="w-16 h-px"
              style={{ backgroundColor: colors.teal }}
            />
            <div 
              className="w-3 h-3 rounded-full mx-4"
              style={{ backgroundColor: colors.gold }}
            />
            <div 
              className="w-16 h-px"
              style={{ backgroundColor: colors.teal }}
            />
          </div>
        )}
      </motion.div>
    ))}

    {/* Call-to-action décoratif */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="text-center mt-16"
    >
      <div 
        className="inline-flex items-center px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
        style={{ backgroundColor: colors.white }}
      >
        <span 
          className="text-lg font-semibold mr-3"
          style={{ color: colors.darkTeal }}
        >
          Voir plus de photos
        </span>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: colors.gold }}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke={colors.white}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  </div>
</section>


{/* Rooms Section - Luxury Design */}
<section className="py-24 bg-gradient-to-b from-white to-gray-50 font-sans">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <span className="inline-block px-5 py-2 text-sm font-semibold tracking-wider text-teal-700 bg-teal-100 rounded-full mb-6 uppercase">
        Hébergement exclusif
      </span>
      <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Nos Chambres & Suites
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
       Des espaces raffinés où élégance et confort se marient parfaitement
      </p>
    </div>

    
    <RoomList onBookNow={() => console.log('Book now clicked!')} />

    <div className="mt-20 text-center">
      <button className="px-10 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-md">
        Découvrir toutes nos chambres
      </button>
    </div>
  </div>
</section>


{/* Services Section - Design Premium Enhanced */}
    
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-24 overflow-hidden relative"
  style={{ backgroundColor: colors.lightTeal, fontFamily: 'Bahnschrift, sans-serif' }}
>
  {/* Background Decorative Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-5"
      style={{ backgroundColor: colors.gold }}
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360] 
      }}
      transition={{ 
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.div
      className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-3"
      style={{ backgroundColor: colors.maroon }}
      animate={{ 
        scale: [1.1, 1, 1.1],
        rotate: [360, 180, 0] 
      }}
      transition={{ 
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-4"
      style={{ backgroundColor: colors.teal }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.04, 0.08, 0.04]
      }}
      transition={{ 
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Animated Header with Enhanced Design */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div className="relative inline-block mb-6">
        <motion.span
          className="inline-block px-6 py-2 text-sm font-bold rounded-full tracking-wide relative overflow-hidden"
          style={{
            color: colors.teal,
            backgroundColor: 'white',
            border: `2px solid ${colors.teal}30`,
            boxShadow: `0 4px 20px ${colors.teal}20`
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 6px 25px ${colors.teal}30`
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{ backgroundColor: `${colors.teal}10` }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center">
            <motion.div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: colors.gold }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            Ce que nous offrons
          </span>
        </motion.span>
      </motion.div>

      <motion.h2
        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
        style={{ color: colors.maroon }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Des services{" "}
        <motion.span 
          style={{ 
            background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.orange} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          exceptionnels
        </motion.span>
      </motion.h2>

      <motion.p
        className="text-xl max-w-4xl mx-auto leading-relaxed"
        style={{ color: colors.darkTeal }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Découvrez comment nous rendons votre expérience{" "}
        <motion.span 
          style={{ 
            color: colors.maroon,
            fontWeight: '600'
          }}
          whileHover={{ 
            textShadow: `2px 2px 4px ${colors.maroon}30`
          }}
        >
          inoubliable
        </motion.span>
      </motion.p>

      {/* Decorative Line */}
      <motion.div 
        className="w-24 h-1 mx-auto mt-8 rounded-full"
        style={{ 
          background: `linear-gradient(90deg, ${colors.teal}, ${colors.gold}, ${colors.maroon})`
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </motion.div>

    {/* Enhanced Services Carousel */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={32}
        direction="horizontal"
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="py-12"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.title}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="text-center h-full"
            >
              <motion.div
                className="h-full rounded-2xl overflow-hidden transition-all duration-500 relative group cursor-pointer"
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.gold}20`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 40px ${colors.teal}15, 0 0 0 1px ${colors.gold}30`,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient Overlay Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${colors.teal}03 0%, ${colors.gold}05 50%, ${colors.maroon}03 100%)`
                  }}
                />

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${colors.gold}40 0%, transparent 70%)`
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="p-8 text-center relative z-10">
                  <motion.div
                    className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl mb-6 relative group/icon"
                    style={{
                      backgroundColor: 'white',
                      border: `2px solid ${colors.gold}30`,
                      color: colors.teal,
                      boxShadow: `0 4px 20px ${colors.teal}15`
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      boxShadow: `0 8px 30px ${colors.teal}25`,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {/* Icon Background Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/icon:opacity-100"
                      style={{ backgroundColor: `${colors.teal}08` }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="h-10 w-10 relative z-10" 
                      whileHover={{ 
                        scale: 1.15,
                        filter: `drop-shadow(0 4px 8px ${colors.teal}30)`
                      }}
                    >
                      {service.icon && React.cloneElement(service.icon, {
                        className: "h-10 w-10 transition-all duration-300",
                        style: { color: colors.teal }
                      })}
                    </motion.div>

                    {/* Animated Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover/icon:opacity-60"
                      style={{ borderColor: colors.gold }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold mb-4 transition-all duration-300"
                    style={{ color: colors.maroon }}
                    whileHover={{ 
                      scale: 1.02,
                      textShadow: `2px 2px 4px ${colors.maroon}20`
                    }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="mb-8 leading-relaxed text-base transition-colors duration-300"
                    style={{ color: colors.darkTeal }}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>

                  <motion.button
                    className="inline-flex items-center font-semibold transition-all duration-300 relative group/btn px-4 py-2 rounded-full"
                    style={{ 
                      color: colors.orange,
                      border: `1px solid ${colors.orange}30`
                    }}
                    whileHover={{ 
                      x: 5,
                      backgroundColor: `${colors.orange}08`,
                      borderColor: `${colors.orange}50`,
                      boxShadow: `0 4px 15px ${colors.orange}20`
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">En savoir plus</span>
                    <motion.div
                      className="ml-2"
                      animate={{
                        x: [0, 3, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight
                        className="h-4 w-4 transition-all duration-300"
                        style={{ color: colors.orange }}
                      />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ 
                    background: `linear-gradient(90deg, ${colors.teal}, ${colors.gold}, ${colors.maroon})`
                  }}
                />
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>

    {/* Enhanced CTA Button */}
    <motion.div
      className="mt-20 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="relative px-10 py-4 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group/cta"
        style={{
          background: `linear-gradient(135deg, ${colors.orange}, ${colors.maroon})`,
          color: 'white',
          border: `2px solid transparent`
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 15px 35px -5px ${colors.orange}50, 0 0 0 2px ${colors.gold}30`,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/cta:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${colors.maroon}, ${colors.orange})`
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/cta:opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.gold}60, transparent)`
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <span className="relative z-10 flex items-center justify-center">
          Voir tous nos services
          <motion.div
            className="ml-3"
            animate={{
              x: [0, 5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </span>
      </motion.button>
    </motion.div>
  </div>
</motion.section>

      {/* Restaurant Section */}
      <section className="py-24" style={{ backgroundColor: colors.lightTeal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Texte et informations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 tracking-tight" style={{ color: colors.maroon }}>
                <span style={{ color: colors.gold }}>Savoureux</span> Restaurant
              </h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                Découvrez une expérience gastronomique unique avec notre chef étoilé.
                Une cuisine qui marie tradition béninoise et techniques modernes,
                préparée avec des produits locaux et de saison.
              </p>

              <div className="mb-8 p-6 rounded-xl border"
                style={{
                  backgroundColor: `${colors.gold}11`,
                  borderColor: colors.gold
                }}>
                <h3 className="font-semibold text-lg mb-3" style={{ color: colors.maroon }}>
                  Heures ouvertes :
                </h3>
                <ul className="space-y-2" style={{ color: colors.darkTeal }}>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Petit-déjeuner :</span>
                    <span>7h00 - 10h30 (GMT+1)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Déjeuner :</span>
                    <span>12h00 - 15h00 (GMT+1)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Dîner :</span>
                    <span>18h30 - 23h00 (GMT+1)</span>
                  </li>
                </ul>
              </div>

              <Button
                className="px-8 py-6 text-lg rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white'
                }}
                onClick={() => setIsMenuOpen(true)}
              >
                Découvrir notre menu
              </Button>
              {isMenuOpen && (
                <Link href="/src/app/restaurant/page.tsx" style={{ color: colors.darkTeal }}>
                </Link>
              )}
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
               <Image
    src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
    alt="Restaurant béninois"
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    width={500} 
    height={500}
  />

              <div className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${colors.maroon}30, transparent)`
                }} />

              {/* Badge de spécialités */}
              <div className="absolute bottom-6 left-6 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: `1px solid ${colors.gold}`
                }}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: colors.orange }}>
                    Spécialités locales :
                  </span>
                  <span style={{ color: colors.darkTeal }}>
                    Akassa, Poulet DG, Poisson braisé
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}