"use client";

import React , { useState,useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Calendar } from '../../components/ui/calendar';
import { cn } from '../../lib/utils';
import { Label } from '../../components/ui/label';
import { Space as Spa, Utensils, Dumbbell, Hotel, Star,ArrowRight,CalendarDays, CalendarCheck,ChevronDown, 
  Wine,
  Gamepad2,
  Plane,
  Wifi,
  Lock } from 'lucide-react';
import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { Swiper, SwiperSlide,SwiperCore } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';


import {  Check } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function Home() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(2);
const [children, setChildren] = useState(0);
const [budget, setBudget] = useState("any");
const swiperRef = useRef<SwiperCore>(null);

useEffect(() => {
  const interval = setInterval(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, 4000); // 4s

  return () => clearInterval(interval);
}, []);

const services = [
  {
    icon: <Hotel className="h-8 w-8" />,
    title: "Hébergement",
    description: "Chambres luxueuses avec vue sur le lac",
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Restaurant",
    description: "Cuisine gastronomique locale",
  },
  {
    icon: <Spa className="h-8 w-8" />,
    title: "Spa",
    description: "Espace bien-être et relaxation",
  },
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Fitness",
    description: "Salle de sport équipée",
  },
  {
    icon: <Star className="h-8 w-8" />, // Lucide ou Heroicons, selon ce que tu utilises
    title: "Piscine",
    description: "Piscine extérieure avec vue panoramique",
  },
  {
    icon: <Wine className="h-8 w-8" />,
    title: "Bar & Lounge",
    description: "Cocktails exotiques et ambiance détendue",
  },
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: "Espace jeux",
    description: "Divertissements pour petits et grands",
  },
  {
    icon: <Plane className="h-8 w-8" />,
    title: "Navette aéroport",
    description: "Service de transfert depuis/vers l’aéroport",
  },
  {
    icon: <Wifi className="h-8 w-8" />,
    title: "Wi-Fi haut débit",
    description: "Connexion gratuite dans tout l’établissement",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Sécurité 24h/24",
    description: "Surveillance et assistance permanente",
  },
];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
     {/* Hero Section with Enhanced Animations */}
<motion.section 
  initial="hidden"
  animate="visible"
  className="relative h-screen overflow-hidden"
>
  {/* Background Image with Parallax Effect */}
  <motion.div 
    className="absolute inset-0"
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <img
      src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
      alt="Bain de Lac Hotel"
      className="w-full h-full object-cover"
    />
    <motion.div 
      className="absolute inset-0 bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1.5 }}
    />
  </motion.div>
  
  {/* Content with Staggered Animation */}
  <div className="relative h-full flex items-center justify-center text-center text-white px-4">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-4xl"
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Bienvenue au Bain de Lac
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Une expérience unique au bord du lac
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 10,
          delay: 0.9
        }}
      >
        <Button 
          size="lg" 
          className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Découvrir
        </Button>
      </motion.div>
    </motion.div>
  </div>

  {/* Subtle Floating Elements */}
  <motion.div 
    className="absolute bottom-10 left-1/2 -translate-x-1/2"
    animate={{ y: [0, -15, 0] }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <ChevronDown className="h-8 w-8 text-white opacity-70" />
  </motion.div>
</motion.section>

{/* Search Section with Refined Animations */}
<motion.section 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ 
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1]
  }}
  className="py-16 bg-gray-50 relative"
>
  {/* Floating Background Elements */}
  <motion.div 
    className="absolute -top-20 left-0 w-full h-20"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent"></div>
  </motion.div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.99 }}
    >
      <Card className="-mt-32 relative z-10 p-6 md:p-8 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
        {/* Floating Particles Background */}
        <motion.div 
          className="absolute inset-0 -z-10 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400"
              style={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 40],
                x: [0, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Check-in */}
          <motion.div 
            className="space-y-2 md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-amber-500" />
              Arrivée
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal hover:bg-gray-50",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : <span>Sélectionner</span>}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Check-out */}
          <motion.div 
            className="space-y-2 md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <CalendarCheck className="h-4 w-4 mr-2 text-amber-500" />
              Départ
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal hover:bg-gray-50",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : <span>Sélectionner</span>}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Adultes */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Label className="text-sm font-medium text-gray-700">Adultes</Label>
            <Select
              value={adults.toString()}
              onValueChange={(value) => setAdults(parseInt(value))}
            >
              <SelectTrigger className="w-full hover:bg-gray-50">
                <SelectValue placeholder="Adultes" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={`adult-${num}`} value={num.toString()}>
                    {num} {num === 1 ? "adulte" : "adultes"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Enfants */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Label className="text-sm font-medium text-gray-700">Enfants</Label>
            <Select
              value={children.toString()}
              onValueChange={(value) => setChildren(parseInt(value))}
            >
              <SelectTrigger className="w-full hover:bg-gray-50">
                <SelectValue placeholder="Enfants" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={`child-${num}`} value={num.toString()}>
                    {num} {num === 1 ? "enfant" : "enfants"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Budget */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Label className="text-sm font-medium text-gray-700">Budget</Label>
            <Select
              value={budget}
              onValueChange={setBudget}
            >
              <SelectTrigger className="w-full hover:bg-gray-50">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Tous budgets</SelectItem>
                <SelectItem value="economy">Économique (-200€)</SelectItem>
                <SelectItem value="standard">Standard (200-400€)</SelectItem>
                <SelectItem value="premium">Premium (400-600€)</SelectItem>
                <SelectItem value="luxury">Luxe (600€+)</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Search Button */}
          <motion.div 
            className="flex items-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              delay: 0.6
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)"
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <Button className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                  className="inline-flex items-center"
                >
                  <SearchIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="hidden sm:inline">Rechercher</span>
                  <span className="sm:hidden">🔍</span>
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  </div>
</motion.section>
     {/* Services Section - Design Premium */}
     <motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Animated Header */}
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block px-4 py-1.5 text-sm font-semibold text-sky-600 bg-sky-100 rounded-full mb-4 tracking-wide"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Ce que nous offrons
      </motion.span>
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Des services <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">exceptionnels</span>
      </motion.h2>
      <motion.p 
        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Découvrez comment nous rendons votre expérience <span className="font-medium text-gray-700">inoubliable</span>
      </motion.p>
    </motion.div>

    {/* Services Grid */}
    <Swiper
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  pagination={{ clickable: true }}
  spaceBetween={30}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  }}
  className="py-8"
>
  {services.map((service, index) => (
    <SwiperSlide key={service.title}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.1,
        }}
        whileHover={{
          y: -10,
          transition: { type: "spring", stiffness: 300 },
        }}
        className="group h-full"
      >
        <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-hover:border-sky-100 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-sky-100 opacity-0 group-hover:opacity-30"
            initial={{ scale: 0.5 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.div>

          <div className="p-8 text-center relative z-10">
            <motion.div
              className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white text-sky-600 group-hover:bg-sky-100 transition-all duration-500 mb-6 shadow-sm group-hover:shadow-md border border-gray-100"
              whileHover={{
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.6 },
              }}
            >
              <motion.div className="h-8 w-8" whileHover={{ scale: 1.1 }}>
                {React.cloneElement(service.icon, {
                  className:
                    "h-8 w-8 transition-colors duration-300 group-hover:text-sky-600",
                })}
              </motion.div>
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {service.description}
            </p>

            <motion.button
              className="inline-flex items-center text-sky-600 font-medium group-hover:text-sky-700 transition-colors"
              whileHover={{ x: 3 }}
            >
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

    {/* CTA Button */}
    <motion.div 
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.button 
        className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        <span className="relative z-10 flex items-center justify-center">
          Voir tous nos services
          <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </span>
      </motion.button>
    </motion.div>
  </div>
</motion.section>
     {/* Rooms Section - Design Premium */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 text-sm font-medium text-sky-600 bg-sky-100 rounded-full mb-4">
        Hébergement exclusif
      </span>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Nos Chambres & Suites
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Des espaces raffinés où élégance et confort s'accordent parfaitement
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Chambre Vue Lac */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -10 }}
        className="group relative"
      >
        <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl border border-gray-100">
          <div className="relative overflow-hidden h-64">
            <img
              src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              alt="Chambre Vue Lac"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-2 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-50">
                Voir les détails
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Chambre Vue Lac</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                35m²
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 5 ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(42 avis)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Vue panoramique', 'WiFi premium', 'Climatisation', 'Petit-déjeuner'].map((feature, i) => (
                <span key={i} className="inline-flex items-center text-xs text-gray-600">
                  <Check className="h-3 w-3 mr-1 text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-2xl font-bold text-sky-600">
                  250€
                  <span className="text-sm font-normal text-gray-500"> /nuit</span>
                </p>
                <p className="text-xs text-gray-500">Taxes incluses</p>
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm hover:shadow-md">
                Réserver
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suite Deluxe */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ y: -10 }}
        className="group relative"
      >
        <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl border border-gray-100">
          <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Plus demandée
          </div>
          <div className="relative overflow-hidden h-64">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
              alt="Suite Deluxe"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-2 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-50">
                Voir les détails
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Suite Deluxe</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                50m²
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 5 ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(68 avis)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Espace lounge', 'Service VIP', 'Salle de bain marbre', 'Mini-bar'].map((feature, i) => (
                <span key={i} className="inline-flex items-center text-xs text-gray-600">
                  <Check className="h-3 w-3 mr-1 text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-2xl font-bold text-sky-600">
                  400€
                  <span className="text-sm font-normal text-gray-500"> /nuit</span>
                </p>
                <p className="text-xs text-gray-500">Taxes incluses</p>
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm hover:shadow-md">
                Réserver
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suite Présidentielle */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ y: -10 }}
        className="group relative"
      >
        <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl border border-gray-100">
          <div className="relative overflow-hidden h-64">
            <img
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
              alt="Suite Présidentielle"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-2 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-50">
                Voir les détails
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Suite Présidentielle</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                80m²
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 5 ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(24 avis)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Terrasse privée', 'Service majordome', 'Spa intégré', 'Vue à 360°'].map((feature, i) => (
                <span key={i} className="inline-flex items-center text-xs text-gray-600">
                  <Check className="h-3 w-3 mr-1 text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-2xl font-bold text-sky-600">
                  600€
                  <span className="text-sm font-normal text-gray-500"> /nuit</span>
                </p>
                <p className="text-xs text-gray-500">Taxes incluses</p>
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm hover:shadow-md">
                Réserver
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="mt-16 text-center">
      <Button variant="outline" className="px-8 py-3 border-sky-600 text-sky-600 hover:bg-sky-50 text-lg">
        Découvrir toutes nos chambres
      </Button>
    </div>
  </div>
</section>

      {/* Restaurant Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Restaurant</h2>
              <p className="text-gray-600 mb-6">
                Découvrez une expérience gastronomique unique avec notre chef étoilé.
                Des plats raffinés préparés avec des produits locaux et de saison.
              </p>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Horaires d'ouverture :</h3>
                <p>Déjeuner : 12h00 - 14h30</p>
                <p>Dîner : 19h00 - 22h30</p>
              </div>
              <Button>Voir le menu</Button>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
                alt="Restaurant"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}