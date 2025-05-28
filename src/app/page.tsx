"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { Label } from '../../components/ui/label';
import RoomList from '../../components/roomlist';
import {
  Space as  Utensils, Dumbbell, Hotel, ArrowRight, CalendarDays, ChevronDown, Wifi,ParkingCircle,Tv2,Baby, Briefcase, Umbrella,
  PhoneCall,Bell,Bath,Waves,Bus,Glasses 
} from 'lucide-react';
import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";
import { fr } from "date-fns/locale";



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

interface SearchPayload {
  stayType: string;
  rooms: number;
  guests: {
    adults: number;
    children: number;
    total: number;
  };
}



export default function Home() {
  const [date, setDate] = useState<DateRange | Date | undefined>();
  const [isDayUse, setIsDayUse] = useState(false);
  const [rooms, setRooms] = useState<{ id: number; adults: number; children: number; }[]>([]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const swiperRef = useRef(null);

  

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
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const isMobile = useIsMobile();
  const getLabel = () => {
    if (!date) {
      return isDayUse ? "Sélectionner un jour" : "Sélectionner une période";
    }

    if (isDayUse && date instanceof Date) {
      return format(date, "PPP", { locale: fr });
    }

    const range = date as DateRange;

    if (!isDayUse && range?.from && !range?.to) {
      return format(range.from, "PPP", { locale: fr });
    }

    if (!isDayUse && range?.from && range?.to) {
      return `${format(range.from, "PPP", { locale: fr })} → ${format(range.to, "PPP", { locale: fr })}`;
    }

    return isDayUse ? "Sélectionner un jour" : "Sélectionner une période";
  };

 const addRoom = () => {
  setRooms([...rooms, { id: Date.now(), adults: 1, children: 0 }]);
};

  const getFeedback = () => {
    if (!date) return "";

    if (isDayUse && date instanceof Date) {
      return `Vous avez sélectionné le ${format(date, "PPP", { locale: fr })}`;
    }

    const range = date as DateRange;
    if (range?.from && range?.to) {
      const nights = differenceInCalendarDays(range.to, range.from);
      return `${nights} nuitée${nights > 1 ? "s" : ""} (du ${format(range.from, "PPP", { locale: fr })} au ${format(range.to, "PPP", { locale: fr })})`;
    }

    return "";
  };

  const updateRoom = (index: number, field: 'adults' | 'children', value: number) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };



  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);

  const validateGuests = () => {
    console.log("Chambres validées:", rooms);
  };

  const handleSearch = () => {
    const totalGuests = rooms.reduce(
      (acc, room) => {
        acc.adults += room.adults;
        acc.children += room.children;
        return acc;
      },
      { adults: 0, children: 0 }
    );

    const totalRooms = rooms.length;
    
const searchPayload = {
  stayType: isDayUse ? "dayuse" : "overnight",
  rooms: totalRooms,
  guests: {
    adults: totalGuests.adults,
    children: totalGuests.children,
    total: totalGuests.adults + totalGuests.children,
  },
} 

type UpdatedSearchPayload = SearchPayload & {
  date: string;
  from?: string;
  to?: string;
  nights?: number;
};

let updatedSearchPayload: UpdatedSearchPayload = { ...searchPayload } as UpdatedSearchPayload;

if (isDayUse && date instanceof Date) {
  updatedSearchPayload = {
    ...updatedSearchPayload,
    date: date.toISOString().split("T")[0],
  };
} else if (
  !isDayUse &&
  typeof date === "object" &&
  date !== null &&
  "from" in date &&
  "to" in date
) {
  updatedSearchPayload = {
    ...updatedSearchPayload,
   from: date.from ? date.from.toISOString().split("T")[0] : undefined,
   to: date.to ? date.to.toISOString().split("T")[0] : undefined,
nights: date.from?.getTime() && date.to?.getTime()
  ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
  : undefined,
  };
}

console.log("📦 Payload de recherche à envoyer :", updatedSearchPayload);
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
          initial={{ scale: 1.1, rotate: 0.5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        >
  <Image
    src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
    alt="Bain de Lac Hotel"
    layout="fill"
    objectFit="cover"
  />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 6px rgba(255, 215, 0, 0.8)'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
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
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1.6
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 100%)`,
                    border: `2px solid ${colors.gold}`,
                    color: colors.white,
                    boxShadow: '0 10px 30px rgba(0, 139, 139, 0.4)',
                    position: 'relative'
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
                    color: colors.gold,
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
          <motion.div
              className="flex flex-col sm:flex-row justify-center items-center mt-16 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              {[
                { icon: "★", text: "5 Étoiles", desc: "Excellence" },
                { icon: "🏨", text: "Luxe Premium", desc: "Confort" },
                { icon: "🌊", text: "Vue sur Lac", desc: "Sérénité" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl backdrop-blur-md border"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderColor: colors.gold + '40',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    minWidth: '140px'
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 + index * 0.15 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(0, 139, 139, 0.2)',
                    boxShadow: '0 12px 40px rgba(255, 215, 0, 0.2)'
                  }}
                >
                  <motion.div 
                    className="text-3xl mb-3"
                    style={{ color: colors.gold }}
                    animate={{ 
                      textShadow: [
                        '0 0 5px rgba(255, 215, 0, 0.5)',
                        '0 0 20px rgba(255, 215, 0, 0.8)',
                        '0 0 5px rgba(255, 215, 0, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.div>
                  <div 
                    className="text-sm font-semibold uppercase tracking-wider mb-1"
                    style={{ color: colors.gold }}
                  >
                    {item.text}
                  </div>
                  <div 
                    className="text-xs opacity-80"
                    style={{ color: colors.white }}
                  >
                    {item.desc}
                  </div>
                </motion.div>
              ))}
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
                          onSelect={setDate}
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
                          onSelect={setDate}
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
                        setDate(undefined);
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
ref={swiperRef}
  modules={[Autoplay]}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
  loop={true}
  spaceBetween={30}
  direction="horizontal"
  slidesPerView={1}
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
      key={service.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="text-center"
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
                      {service.icon && React.cloneElement(service.icon, {
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