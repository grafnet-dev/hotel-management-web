"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Calendar } from '../../components/ui/calendar';
import { cn } from '../../lib/utils';
import { Label } from '../../components/ui/label';
import Link from 'next/link';
import { Space as Spa, Utensils, Dumbbell, Hotel, Star, ArrowRight, CalendarDays, CalendarCheck, ChevronDown, 
  Wine,
  Gamepad2,
  Plane,
  Wifi,
  Lock,ChevronLeft,ChevronRight,MapPin ,User,Heart } from 'lucide-react';
import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

// Définition des couleurs personnalisées
const colors = {
  teal: '#008080',       // Bleu sarcelle
  gold: '#D4AF37',       // Or
  orange: '#FF8C42',     // Orange
  maroon: '#800020',     // Marron
  lightTeal: '#E6F2F2',  // Sarcelle clair
  darkTeal: '#006666',   // Sarcelle foncé
  cream: '#F5F5DC',      // Crème
};

interface Room {
  id: number;
  title: string;
  description: string;
  adults: number;
  children?: number; 
  size: string;
  price: number;
  hourlyPrice?: number;
  halfDayPrice?: number;
  minStay?: number; 
  images: string[];
  amenities: string[];
  services?: string[]; 
  rating: number;
  beds?: number;
  bedType?: string; 
  view?: string; 
  floor?: string; 
  smoking?: boolean; 
}


export default function Home() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState("any");
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
  const swiperRef = useRef<SwiperCore>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Remove this line
const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});



  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(price);
  };
  if (isBookingOpen) {
    console.log('Booking is open');
  }

  if (selectedRoom) {
    console.log(selectedRoom.title);
  }


  
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const rooms: Room[] = [
    {
      id: 1,
      title: "Suite Royale",
      description: "Suite spacieuse avec vue imprenable sur l'océan, décoration raffinée et service haut de gamme. Parfait pour des séjours romantiques ou des occasions spéciales.",
      adults: 2,
      children: 1, 
      size: "45m²",
      beds: 1, 
      bedType: "King Size", 
      price: 180000,
      hourlyPrice: 30000,
      halfDayPrice: 90000,
      minStay: 1,
      images: [
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" 
      ],
      amenities: [
        "Wi-Fi haut débit", 
        "Petit-déjeuner buffet inclus",
        "TV écran plat 55\"",
        "Minibar bien fourni",
        "Coffre-fort électronique",
        "Service en chambre 24h/24",
        "Peignoir et pantoufles",
        "Produits de bain haut de gamme"
      ],
      services: [ 
        "Service de conciergerie",
        "Massage en chambre",
        "Service de blanchisserie"
      ],
      rating: 5,
      view: "Vue mer", 
      floor: "Dernier étage", 
      smoking: false 
    },
    {
      id: 2,
      title: "Chambre Deluxe",
      description: "Confort exceptionnel avec balcon privé offrant une vue sur les jardins de l'hôtel. Décoration contemporaine et équipements haut de gamme.",
      adults: 2,
      children: 2, 
      size: "35m²",
      beds: 2, 
      bedType: "Queen Size", 
      price: 120000,
      hourlyPrice: 20000,
      halfDayPrice: 60000,
      minStay: 1, 
      images: [
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
        "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg" 
      ],
      amenities: [
        "Wi-Fi haut débit",
        "Minibar personnalisable",
        "Climatisation individuelle",
        "TV écran plat 42\"",
        "Machine à café Nespresso",
        "Sèche-cheveux professionnel",
        "Service de réveil"
      ],
      services: [ // Ajouté
        "Service de nettoyage quotidien",
        "Service de pressing express"
      ],
      rating: 4,
      view: "Vue jardin", // Ajouté
      floor: "Étages 3-5", // Ajouté
      smoking: true // Ajouté
    },
    {
      id: 3,
      title: "Suite Présidentielle",
      description: "Le summum du luxe avec espace salon séparé, salle à manger privée et salle de bain en marbre. Service personnalisé et accès au lounge VIP.",
      adults: 4,
      children: 2, // Ajouté
      size: "80m²",
      beds: 2, // Ajouté
      bedType: "King Size x2", // Ajouté
      price: 350000,
      hourlyPrice: 50000,
      halfDayPrice: 175000,
      minStay: 2, // Ajouté
      images: [
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
        "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/271635/pexels-photo-271635.jpeg" // Ajouté
      ],
      amenities: [
        "Service VIP dédié",
        "Jacuzzi privatif",
        "Vue panoramique à 360°",
        "Bar personnel",
        "Système audio haut de gamme",
        "Bureau en acajou",
        "Salle de bain avec télévision",
        "Service de majordome 24/7"
      ],
      services: [ // Ajouté
        "Transfert aéroport en limousine",
        "Check-in/out privé",
        "Service gastronomique en chambre"
      ],
      rating: 5,
      view: "Vue panoramique", // Ajouté
      floor: "Penthouse", // Ajouté
      smoking: false // Ajouté
    },

  ];

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
      icon: <Star className="h-8 w-8" />,
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
      description: "Service de transfert depuis/vers l'aéroport",
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Wi-Fi haut débit",
      description: "Connexion gratuite dans tout l'établissement",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Sécurité 24h/24",
      description: "Surveillance et assistance permanente",
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative h-screen overflow-hidden"
      >
        {/* Background Image with Overlay */}
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
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${colors.maroon}33, ${colors.teal}33)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ 
                color: colors.gold,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Bienvenue au Bain de Lac
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ color: colors.cream }}
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
                className="transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: colors.teal,
                  borderColor: colors.gold,
                  borderWidth: '2px'
                }}
              >
                Découvrir
              </Button>
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
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="py-16 relative"
        style={{ backgroundColor: colors.lightTeal }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.99 }}
          >
            <Card className="-mt-32 relative z-10 p-6 md:p-8 border-0 shadow-xl rounded-2xl overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${colors.gold}`
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {/* Check-in */}
                <motion.div 
                  className="space-y-2 md:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Label className="text-sm font-medium flex items-center"
                    style={{ color: colors.darkTeal }}
                  >
                    <CalendarDays className="h-4 w-4 mr-2" style={{ color: colors.orange }} />
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
                          style={{ borderColor: colors.teal }}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" style={{ color: colors.teal }} />
                          {checkIn ? format(checkIn, "PPP") : <span>Sélectionner</span>}
                        </Button>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start"
                      style={{ borderColor: colors.teal }}
                    >
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        className="rounded-md border"
                        style={{ borderColor: colors.teal }}
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
                  <Label className="text-sm font-medium flex items-center"
                    style={{ color: colors.darkTeal }}
                  >
                    <CalendarCheck className="h-4 w-4 mr-2" style={{ color: colors.orange }} />
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
                          style={{ borderColor: colors.teal }}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" style={{ color: colors.teal }} />
                          {checkOut ? format(checkOut, "PPP") : <span>Sélectionner</span>}
                        </Button>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start"
                      style={{ borderColor: colors.teal }}
                    >
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        className="rounded-md border"
                        style={{ borderColor: colors.teal }}
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
                  <Label className="text-sm font-medium"
                    style={{ color: colors.darkTeal }}
                  >
                    Adultes
                  </Label>
                  <Select
                    value={adults.toString()}
                    onValueChange={(value) => setAdults(parseInt(value))}
                  >
                    <SelectTrigger className="w-full hover:bg-gray-50"
                      style={{ borderColor: colors.teal }}
                    >
                      <SelectValue placeholder="Adultes" />
                    </SelectTrigger>
                    <SelectContent style={{ borderColor: colors.teal }}>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={`adult-${num}`} value={num.toString()}
                          style={{ color: colors.darkTeal }}
                        >
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
                  <Label className="text-sm font-medium"
                    style={{ color: colors.darkTeal }}
                  >
                    Enfants
                  </Label>
                  <Select
                    value={children.toString()}
                    onValueChange={(value) => setChildren(parseInt(value))}
                  >
                    <SelectTrigger className="w-full hover:bg-gray-50"
                      style={{ borderColor: colors.teal }}
                    >
                      <SelectValue placeholder="Enfants" />
                    </SelectTrigger>
                    <SelectContent style={{ borderColor: colors.teal }}>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <SelectItem key={`child-${num}`} value={num.toString()}
                          style={{ color: colors.darkTeal }}
                        >
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
                  <Label className="text-sm font-medium"
                    style={{ color: colors.darkTeal }}
                  >
                    Budget
                  </Label>
                  <Select
                    value={budget}
                    onValueChange={setBudget}
                  >
                    <SelectTrigger className="w-full hover:bg-gray-50"
                      style={{ borderColor: colors.teal }}
                    >
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent style={{ borderColor: colors.teal }}>
                      <SelectItem value="any" style={{ color: colors.darkTeal }}>Tous budgets</SelectItem>
                      <SelectItem value="economy" style={{ color: colors.darkTeal }}>Économique (-200€)</SelectItem>
                      <SelectItem value="standard" style={{ color: colors.darkTeal }}>Standard (200-400€)</SelectItem>
                      <SelectItem value="premium" style={{ color: colors.darkTeal }}>Premium (400-600€)</SelectItem>
                      <SelectItem value="luxury" style={{ color: colors.darkTeal }}>Luxe (600€+)</SelectItem>
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
                      boxShadow: `0 10px 25px -5px ${colors.orange}4D`
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <Button 
                      className="w-full h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                      style={{
                        background: `linear-gradient(to right, ${colors.orange}, ${colors.maroon})`,
                        color: 'white'
                      }}
                    >
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


{/* Rooms Section - Luxury Design */}
<section className="py-24 bg-gradient-to-b from-white to-gray-50 font-sans">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-20">
      <span className="inline-block px-5 py-2 text-sm font-semibold tracking-wider text-teal-700 bg-teal-100 rounded-full mb-6 uppercase">
        Hébergement exclusif
      </span>
      <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Nos Chambres & Suites
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Des espaces raffinés où élégance et confort s'accordent parfaitement
      </p>
    </div>

    {/* Room Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {rooms.map((room) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <Card className="overflow-hidden shadow-lg border border-teal-100">
            <div className="relative h-48 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentImageIndices[room.id] * 100}%)` }}
              >
                {room.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={room.title}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>

            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-teal-800">{room.title}</h3>
                <div className="flex items-center">
                  {[...Array(room.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-amber-800 mb-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{room.adults} adultes</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{room.size}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{room.description}</p>

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-amber-600">
                  {formatPrice(room.price)}
                  <span className="text-xs text-gray-500 ml-1">/nuit</span>
                </p>
                <div className="flex gap-2">
                  <button className="p-2 text-amber-600 hover:text-amber-800">
                    <Heart className="h-5 w-5" />
                  </button>
                  <Button
                    className="bg-teal-700 hover:bg-teal-800 text-sm px-4"
                    onClick={() => {
                      setSelectedRoom(room);
                      setIsBookingOpen(true);
                    }}
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Discover More Button */}
    <div className="mt-20 text-center">
      <button className="px-10 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-md">
        Découvrir toutes nos chambres
      </button>
    </div>
  </div>
</section>


      

     {/* Services Section - Design Premium */}
     <motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-20 overflow-hidden"
  style={{ backgroundColor: colors.lightTeal, fontFamily: 'Bahnschrift, sans-serif' }}
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
        className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 tracking-wide"
        style={{ 
          color: colors.teal,
          backgroundColor: `${colors.teal}20`
        }}
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Ce que nous offrons
      </motion.span>
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        style={{ color: colors.maroon }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Des services <span style={{ color: colors.gold }}>exceptionnels</span>
      </motion.h2>
      <motion.p 
        className="text-xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: colors.darkTeal }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Découvrez comment nous rendons votre expérience <span style={{ color: colors.maroon }}>inoubliable</span>
      </motion.p>
    </motion.div>

    {/* Services Carousel with Infinite Loop */}
    <Swiper
      modules={[ Autoplay]}
      autoplay={{ 
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
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
            <div 
              className="h-full rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-xl relative"
              style={{
                backgroundColor: 'white',
                border: `1px solid ${colors.gold}33`,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20"
                style={{ backgroundColor: colors.teal }}
                initial={{ scale: 0.5 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              ></motion.div>

              <div className="p-8 text-center relative z-10">
                <motion.div
                  className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 shadow-sm group-hover:shadow-md transition-all duration-500"
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${colors.gold}33`,
                    color: colors.teal
                  }}
                  whileHover={{
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.6 },
                  }}
                >
                  <motion.div className="h-8 w-8" whileHover={{ scale: 1.1 }}>
                    {React.cloneElement(service.icon, {
                      className: "h-8 w-8 transition-colors duration-300",
                      style: { color: colors.teal }
                    })}
                  </motion.div>
                </motion.div>

                <h3 
                  className="text-2xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: colors.maroon }}
                >
                  {service.title}
                </h3>
                <p 
                  className="mb-6 leading-relaxed transition-colors duration-300"
                  style={{ color: colors.darkTeal }}
                >
                  {service.description}
                </p>

                <motion.button
                  className="inline-flex items-center font-medium transition-colors"
                  style={{ color: colors.orange }}
                  whileHover={{ x: 3 }}
                >
                  En savoir plus
                  <ArrowRight 
                    className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                    style={{ color: colors.orange }}
                  />
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
        className="px-8 py-3.5 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        style={{
          background: `linear-gradient(to right, ${colors.orange}, ${colors.maroon})`,
          color: 'white'
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: `0 10px 25px -5px ${colors.orange}80`
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center justify-center">
          Voir tous nos services
          <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
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
            Horaires d'ouverture :
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
        <img
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
          alt="Restaurant béninois"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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