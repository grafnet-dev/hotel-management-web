"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Calendar } from '../../components/ui/calendar';
import { cn } from '../../lib/utils';
import { Label } from '../../components/ui/label';
import Link from 'next/link';
import {
  Space as Spa, Utensils, Dumbbell, Hotel, Star, ArrowRight, CalendarDays, CalendarCheck, ChevronDown,
  Wine,
  Gamepad2,
  Plane,
  Wifi,
  Lock
} from 'lucide-react';
import Image from 'next/image';

import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Check } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";

import { fr } from "date-fns/locale";
type Room = {
  adults: number;
  children: number;
};
type Mode = "single" | "range";



/*// Définition des couleurs personnalisées
const colors = {
  teal: '#008080',       // Bleu sarcelle
  gold: '#D4AF37',       // Or
  orange: '#FF8C42',     // Orange
  maroon: '#800020',     // Marron
  lightTeal: '#E6F2F2',  // Sarcelle clair
  darkTeal: '#006666',   // Sarcelle foncé
  cream: '#F5F5DC',      // Crème
};*/
// Palette de couleurs pour un look cohérent
const colors = {
  darkTeal: "#1e4e5f",
  teal: "#2a9d8f",
  lightTeal: "#e0f2f1",
  gold: "#e9c46a",
  orange: "#f4a261",
  maroon: "#e76f51",
  white: "#ffffff",
  black: "#1a1a1a",
  gray: "#f8f9fa"
};

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

  //Gestion des dates
  const [date, setDate] = useState<DateRange | Date | undefined>()
  const [isDayUse, setIsDayUse] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);

  useEffect(() => {
    if (isDayUse && date instanceof Date) {
      console.log("Date sélectionnée (Day Use) :", format(date, "yyyy-MM-dd"));
    }

    if (!isDayUse && (date as DateRange)?.from && (date as DateRange)?.to) {
      console.log("Date sélectionnée :", {
        checkIn: format((date as DateRange).from!, "yyyy-MM-dd"),
        checkOut: format((date as DateRange).to!, "yyyy-MM-dd")
      });
    }
  }, [date, isDayUse]);

//hook perso 
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
  const getLabel = () => {
    if (!date) {
      return isDayUse ? "Sélectionner un jour" : "Sélectionner une période";
    }

    if (isDayUse && date instanceof Date) {
      return format(date, "PPP");
    }

    const range = date as DateRange;

    if (!isDayUse && range?.from && !range?.to) {
      return format(range.from, "PPP");
    }

    if (!isDayUse && range?.from && range?.to) {
      return `${format(range.from, "PPP")} → ${format(range.to, "PPP")}`;
    }

    return isDayUse ? "Sélectionner un jour" : "Sélectionner une période";
  };

  const getFeedback = () => {
  if (!date) return "";

  if (isDayUse && date instanceof Date) {
    return `Vous avez sélectionné le ${format(date, "PPP")}`;
  }

  const range = date as DateRange;
  if (range?.from && range?.to) {
    const nights = differenceInCalendarDays(range.to, range.from);
    return `Vous avez sélectionné ${nights} nuitée${nights > 1 ? "s" : ""} (du ${format(range.from, "PPP")} au ${format(range.to, "PPP")})`;
  }

  return "";
};


const isMobile = useIsMobile();



  const updateRoom = (index: number, field: keyof Room, value: number) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0 }]);
  };

  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);

  const validateGuests = () => {
    console.log("Chambres validées :", rooms);
  };


 const handleSearch = () => {
  // Calcule le total des invités
  const totalGuests = rooms.reduce(
    (acc, room) => {
      acc.adults += room.adults;
      acc.children += room.children;
      return acc;
    },
    { adults: 0, children: 0 }
  );

  const totalRooms = rooms.length;

  let searchPayload: Record<string, any> = {
    stayType: isDayUse ? "dayuse" : "overnight",
    rooms: totalRooms,
    guests: {
      adults: totalGuests.adults,
      children: totalGuests.children,
      total: totalGuests.adults + totalGuests.children,
    },
  };

  if (isDayUse && date instanceof Date) {
    searchPayload = {
      ...searchPayload,
      date: date.toISOString().split("T")[0],
    };
  } else if (
    !isDayUse &&
    typeof date === "object" &&
    date !== null &&
    "from" in date &&
    "to" in date
  ) {
    searchPayload = {
      ...searchPayload,
      from: date.from ? date.from.toISOString().split("T")[0] : null,
      to: date.to ? date.to.toISOString().split("T")[0] : null,
      nights: date.from && date.to
        ? Math.ceil((+date.to - +date.from) / (1000 * 60 * 60 * 24))
        : null,
    };
  }

  console.log("📦 Payload de recherche à envoyer :", searchPayload);
};




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
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className="-mt-32 relative z-10 p-6 md:p-8 border-0 shadow-xl rounded-2xl overflow-hidden bg-white"
              style={{ border: `2px solid ${colors.gold}` }}
            >
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                {/* Date & Day Use */}
                <motion.div
                  className="flex-1 min-w-[240px] space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Label className="text-sm font-medium flex items-center" style={{ color: colors.darkTeal }}>
                    <CalendarDays className="h-4 w-4 mr-2" style={{ color: colors.orange }} />
                    {isDayUse ? "Quel jour ?" : "Quand ?"}

                  </Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal hover:bg-gray-50",
                            !date && "text-muted-foreground"
                          )}
                          style={{ borderColor: colors.teal }}

                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {getLabel()}
                        </Button>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                      style={{ borderColor: colors.teal }}
                    >
                      {isDayUse ? (
                        <DayPicker
                          mode="single"
                          selected={date instanceof Date ? date : undefined}
                          onSelect={(selected: Date | undefined) => {
                            setDate(selected);
                          }}
                           numberOfMonths={isMobile ? 1 : 2}
                         
                          showOutsideDays
                          required={false}
                           disabled={{ before: new Date() }}
                          modifiersClassNames={{
                            selected: "bg-orange-500 text-white",
                          }}
                          className="p-3"
                        />
                      ) : (
                        <DayPicker
                          mode="range"
                          selected={typeof date === 'object' && date && 'from' in date ? date as DateRange : undefined}
                          onSelect={(selected: DateRange | undefined) => {
                            setDate(selected);
                          }}
                         numberOfMonths={isMobile ? 1 : 2}
                          showOutsideDays
                          required={false}
                          disabled={{ before: new Date() }}
                          modifiersClassNames={{
                            selected: "bg-orange-500 text-white",
                            range_start: "rounded-l-md",
                            range_end: "rounded-r-md"
                          }}
                          className="p-3"
                        />
                      )}
                      <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-muted-foreground"
                      >
                      {getFeedback() && (
                        <div className="text-sm text-muted-foreground">
                        {getFeedback()}
                        </div>
                      )}
                      </motion.div>
                    </PopoverContent>
                  </Popover>

                  {/* Toggle Day Use */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="dayuse"
                      checked={isDayUse}
                      onChange={(e) => {
                        setIsDayUse(e.target.checked);
                        setDate(undefined); // reset date
                      }}
                      className="accent-orange-500 h-4 w-4"
                    />
                    <label htmlFor="dayuse" className="text-sm text-gray-600">Réservation de jour (Day use)</label>
                  </div>
                </motion.div>

                {/* Invités et chambres */}
                <motion.div
                  className="flex-1 min-w-[280px] space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Label className="text-sm font-medium" style={{ color: colors.darkTeal }}>
                    Invités & chambres
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal hover:bg-gray-50"
                          style={{ borderColor: colors.teal }}
                        >
                          🛏️ {rooms.length} chambre{rooms.length > 1 ? 's' : ''}, {totalAdults} adulte{totalAdults > 1 ? 's' : ''}, {totalChildren} enfant{totalChildren > 1 ? 's' : ''}
                        </Button>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[320px] p-4 bg-white rounded-xl shadow-xl space-y-4" align="start">
                      {rooms.map((room, index) => (
                        <div key={index} className="space-y-2">
                          <div className="font-medium text-sm text-gray-700">Chambre {index + 1}</div>
                          <div className="flex space-x-4">
                            {/* Adultes */}
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-xs text-gray-500">Adultes</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateRoom(index, 'adults', Math.max(1, room.adults - 1))}
                                  style={{ borderColor: colors.teal }}
                                >
                                  –
                                </Button>
                                <span className="w-6 text-center">{room.adults}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateRoom(index, 'adults', Math.min(4, room.adults + 1))}
                                  style={{ borderColor: colors.teal }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>

                            {/* Enfants */}
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-xs text-gray-500">Enfants</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateRoom(index, 'children', Math.max(0, room.children - 1))}
                                  style={{ borderColor: colors.teal }}
                                >
                                  –
                                </Button>
                                <span className="w-6 text-center">{room.children}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateRoom(index, 'children', Math.min(3, room.children + 1))}
                                  style={{ borderColor: colors.teal }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addRoom}
                        className="w-full text-sm"
                        style={{ borderColor: colors.teal }}
                      >
                        ➕ Ajouter une chambre
                      </Button>
                      <Button
                        onClick={validateGuests}
                        className="w-full bg-orange-500 text-white hover:bg-orange-600"

                      >
                        ✅ Valider
                      </Button>
                    </PopoverContent>
                  </Popover>
                </motion.div>

                {/* Search Button */}
                <motion.div
                  className="flex items-end flex-1 min-w-[240px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: `0 10px 25px -5px ${colors.orange}4D` }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <Button
                      className="w-full h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                      style={{
                        background: `linear-gradient(to right, ${colors.orange}, ${colors.maroon})`,
                        color: 'white'
                      }}
                        onClick={handleSearch}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Chambre Vue Lac */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl border border-gray-100">
                <div className="relative overflow-hidden h-72">
                  <img
                    src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                    alt="Chambre Vue Lac"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 shadow-lg">
                      Voir les détails
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Chambre Vue Lac</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                        35m²
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        2 personnes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-5">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(42 avis)</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Vue panoramique', 'WiFi premium', 'Climatisation', 'Petit-déjeuner'].map((feature, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <Check className="h-3 w-3 mr-1.5 text-teal-600" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <div>
                      <p className="text-3xl font-bold text-teal-700">
                        250€
                        <span className="text-base font-normal text-gray-500"> /nuit</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Taxes incluses</p>
                    </div>
                    <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
                      Réserver
                    </button>
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
              <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl border border-gray-100">
                <div className="absolute top-6 right-6 bg-amber-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                  Plus demandée
                </div>
                <div className="relative overflow-hidden h-72">
                  <img
                    src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                    alt="Suite Deluxe"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 shadow-lg">
                      Voir les détails
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Suite Deluxe</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                        50m²
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        4 personnes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-5">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 5 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(68 avis)</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Espace lounge', 'Service VIP', 'Salle de bain marbre', 'Mini-bar'].map((feature, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <Check className="h-3 w-3 mr-1.5 text-teal-600" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <div>
                      <p className="text-3xl font-bold text-teal-700">
                        400€
                        <span className="text-base font-normal text-gray-500"> /nuit</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Taxes incluses</p>
                    </div>
                    <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
                      Réserver
                    </button>
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
              <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl border border-gray-100">
                <div className="relative overflow-hidden h-72">
                  <img
                    src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
                    alt="Suite Présidentielle"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 shadow-lg">
                      Voir les détails
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Suite Présidentielle</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                        80m²
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        6 personnes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-5">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 5 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(24 avis)</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Terrasse privée', 'Service majordome', 'Spa intégré', 'Vue à 360°'].map((feature, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <Check className="h-3 w-3 mr-1.5 text-teal-600" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <div>
                      <p className="text-3xl font-bold text-teal-700">
                        600€
                        <span className="text-base font-normal text-gray-500"> /nuit</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Taxes incluses</p>
                    </div>
                    <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

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
            modules={[Autoplay]}
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