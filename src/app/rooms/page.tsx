"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { fr } from 'date-fns/locale';
import { format } from "date-fns";
import { cn } from '../../../lib/utils';
import {  User,  ChevronLeft,Utensils,Coffee,Wine,ShoppingBag ,Sparkles,Star, ChevronRight,Wifi,Users,DollarSign,Settings ,Filter ,RefreshCw ,Snowflake,Tv,Shield, CalendarIcon ,SearchIcon, Bed ,CheckCircle, CalendarDays,Clock } from 'lucide-react';
import { Label } from "../../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import "react-day-picker/style.css";
import type { DateRange } from "react-day-picker";
import { DayPicker } from 'react-day-picker';
import { differenceInCalendarDays } from "date-fns";
import RoomList from '../../../components/roomlist';

const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
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


interface Room {
  children: number;
  adults: number;
}
interface Room {
  id: number;
  adults: number;
 
  images: string[]; 
}

interface Room {
  id: number;
  title: string;
  description: string;
  adults: number;
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
   discount?: number; 
}





export default function Rooms({ allRooms }: { allRooms: Room[] }) {
  
 const [currentPage, setCurrentPage] = useState(1);

  const [date, setDate] = useState<DateRange | Date | undefined>();
  const [isDayUse, setIsDayUse] = useState(false);
   const [isFiltersOpen, setIsFiltersOpen] = useState(false);


const [price, setPrice] = useState(0);
const [rooms, setRooms] = useState([{ id: 1, adults: 2, children: 0 }]);
const [searchRooms, setSearchRooms] = useState([{ id: 1, adults: 2, children: 0 }]);
{searchRooms.map((room, index) => (
  <div key={index}>{room.id} - {room.adults} adults, {room.children} children</div>
))}
const roomsPerPage = 6;
  const totalPages = Math.ceil(allRooms?.length / roomsPerPage);

  const currentRooms = allRooms && allRooms.length > 0
  ? allRooms.slice(
      (currentPage - 1) * roomsPerPage,
      currentPage * roomsPerPage
    )
  : [];

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

 



const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
const useIsMobileDevice = () => {
  const { width } = useWindowSize();
  return width < 640 ? true : false;
};

const isMobileDevice = useIsMobileDevice();
if (isMobileDevice) {
  // render a mobile-specific component or apply a mobile-specific style
}
 
  

const addRoom = () => {
  setSearchRooms(prev => [
    ...prev,
    { id: Date.now(), adults: 2, children: 0 }
  ]);
};

const validateRoomGuests = () => {
  console.log("Chambres validées:", rooms);
  console.log("Chambres validées:", searchRooms);
};
validateRoomGuests();


  
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
  setRooms(prev => {
    const updated = [...prev];
    updated[index] = { ...updated[index], [field]: value };
    return updated;
  });
};

  
   const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);

  const validateGuests = () => {
    console.log("Chambres validées:", rooms);
  };

const handleSearch = () => {
  const totalGuests = rooms.reduce(
    (acc, room) => {
      const roomAsRoom = room as Room;
      acc.adults += roomAsRoom.adults;
      acc.children += roomAsRoom.children;
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
  };

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
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] md:h-[70vh] overflow-hidden">
      {/* Image de fond avec animation */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Chambre d'exception au Bénin"
          className="w-full h-full object-cover"
        />
        
        {/* Dégradé avec les couleurs thématiques */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/10" />
        
        {/* Effet de texture subtil */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(45deg, ${colors.gold}20, ${colors.teal}20, ${colors.orange}20)`,
            backgroundSize: '300% 300%'
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="max-w-4xl mx-auto"
        >
          {/* Titre avec ombre portée et effet de lumière */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Bahnschrift, sans-serif',
              textShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
              color: colors.gold
            }}
            whileHover={{
              textShadow: `0 2px 20px ${colors.gold}80`,
              transition: { duration: 0.3 }
            }}
          >
            Chambres de Prestige
          </motion.h1>
          
        
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8"
            style={{
              fontFamily: 'Bahnschrift, sans-serif',
              color: 'white',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            whileHover={{
              scale: 1.02,
              color: colors.orange
            }}
          >
            Découvrez nos hébergements haut de gamme au cœur du Bénin
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 md:px-10 md:py-4 rounded-full font-medium text-lg shadow-xl"
              style={{
                fontFamily: 'Bahnschrift, sans-serif',
                background: `linear-gradient(45deg, ${colors.orange}, ${colors.maroon})`,
                color: 'white'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 5px 25px ${colors.orange}80`
              }}
              whileTap={{
                scale: 0.98
              }}
            >
              Explorer nos chambres
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

    </section>

  {/* Search Section */}
   {/* Search Section - Using your exact code */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-16 relative"
      >
         <div className="absolute inset-0 rounded-xl backdrop-blur-sm">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: colors.gold }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: colors.teal }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ 
              y: -8,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card
              className="-mt-32 relative z-10 p-8 md:p-10 border-0 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
                border: `3px solid ${colors.gold}`,
                boxShadow: `0 20px 40px -12px rgba(128, 0, 32, 0.3), 0 0 0 1px ${colors.gold}33`
              }}
            >
              {/* Decorative Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="h-6 w-6 mr-2" style={{ color: colors.gold }} />
                  </motion.div>
                  <h2 
                    className="text-2xl md:text-3xl font-bold tracking-wide"
                    style={{ 
                      color: colors.maroon,
                      fontFamily: 'Bahnschrift, sans-serif'
                    }}
                  >
                    Réservez Votre Séjour
                  </h2>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <Sparkles className="h-6 w-6 ml-2" style={{ color: colors.gold }} />
                  </motion.div>
                </div>
                <div 
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: colors.gold }}
                />
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Date & Day Use */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Label 
                    className="text-base font-bold flex items-center tracking-wide" 
                    style={{ 
                      color: colors.darkTeal,
                      fontFamily: 'Bahnschrift, sans-serif'
                    }}
                  >
                    <CalendarDays className="h-5 w-5 mr-3" style={{ color: colors.orange }} />
                    {isDayUse ? "JOUR DE VISITE" : "DATES DE SÉJOUR"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {isDayUse ? "Veuillez choisir une date" : "Veuillez choisir les dates de votre séjour"}
                  </p>

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
                   <motion.div 
                      className="flex items-center gap-3 mt-3 p-3 rounded-lg"
                      style={{ backgroundColor: 'rgba(0, 139, 139, 0.05)' }}
                      whileHover={{ backgroundColor: 'rgba(0, 139, 139, 0.1)' }}
                    >
                      <motion.input
                        type="checkbox"
                        id="dayuse"
                        checked={isDayUse}
                        onChange={(e) => {
                          setIsDayUse(e.target.checked);
                          setDate(undefined);
                        }}
                        className="w-5 h-5 rounded transition-all duration-200"
                        style={{ accentColor: colors.orange }}
                        whileTap={{ scale: 0.9 }}
                      />
                      <label 
                        htmlFor="dayuse" 
                        className="text-sm font-semibold cursor-pointer select-none tracking-wide"
                        style={{ 
                          color: colors.darkTeal,
                          fontFamily: 'Bahnschrift, sans-serif'
                        }}
                      >
                        RÉSERVATION DE JOUR (DAY USE)
                      </label>
                    </motion.div>
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




    {/* Rooms Section  */}
 <section className="py-12 bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/30 min-h-screen">
  <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8">
    <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="w-full lg:w-1/4">
        <button 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="lg:hidden w-full group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white rounded-2xl mb-6 shadow-lg hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 hover:scale-[1.02]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Filter className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg">Filtrer les chambres</span>
            </div>
            <div className="p-1 bg-amber-400 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
        </button>
  

   <aside 
  className={`${isFiltersOpen ? 'block' : 'hidden'} lg:flex lg:flex-col sticky top-24 h-[calc(100vh-120px)] overflow-y-auto`}
>

              

<div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 rounded-t-2xl shadow-xl relative overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Filter className="h-6 w-6" />
                </div>
                Filtres Premium
              </h2>
              <p className="text-teal-100">Trouvez votre chambre idéale</p>
            </div>
          </div>

    {/* Contenu scrollable */}
    <div className="space-y-6 bg-gradient-to-br from-teal-50 to-amber-50/50 p-6 rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-md">
                        <Utensils className="h-5 w-5 text-white" />
                      </div>
                      Options Restauration
                    </h3>
                <div className="p-6 space-y-8">
      {/* Budget */}
     <div className="space-y-6 bg-gradient-to-br from-teal-50 to-amber-50/50 p-6 rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl shadow-md">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      Budget (FCFA)
                    </h3>
        <div className="px-2">
          <div className="relative">
                                 <input 
                          type="range" 
                          min="0" 
                          max="100000" 
                          step="5000"
                          value={price}
                          onChange={(e) => setPrice(+e.target.value)}
                          className="w-full h-3 bg-gradient-to-r from-teal-100 to-amber-100 rounded-full appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(price/100000)*100}%, #f3f4f6 ${(price/100000)*100}%, #f3f4f6 100%)`
                          }}
                        />
                        </div>

        </div>
        <div className="flex justify-between text-sm">
          <span>0 FCFA</span>
          <span>100,000 FCFA</span>
        </div>
      </div>

      {/* Capacité */}
       <div className="space-y-6 bg-gradient-to-br from-amber-50 to-teal-50/50 p-6 rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-md">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      Capacité
                    </h3>
       <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, "6+"].map((num) => (
                        <label key={num} className="relative group cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="absolute opacity-0 h-0 w-0 peer"
                          />
                          <div className="p-4 border-2 border-teal-100 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
                                        peer-checked:border-teal-500 peer-checked:bg-gradient-to-br peer-checked:from-teal-50 peer-checked:to-teal-100 peer-checked:shadow-lg peer-checked:scale-105
                                        hover:border-teal-300 hover:shadow-md hover:scale-102 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-teal-50/50">
                            <div className="relative mb-2">
                              <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-sm">
                                <User className="h-5 w-5 text-white" />
                              </div>
                              {typeof num === 'number' && num > 1 && (
                                <div className="absolute -right-1 -bottom-1 p-1 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg shadow-sm">
                                  <User className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-bold text-teal-800">
                              {typeof num === 'number' ? num : "6+"} 
                            </span>
                            <span className="text-xs text-teal-600">
                              {typeof num === 'number' && num === 1 ? 'personne' : 'personnes'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

      {/* Nouvelle section Restaurant */}
     <div className="space-y-6 bg-gradient-to-br from-teal-50 to-amber-50/50 p-6 rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-md">
                        <Utensils className="h-5 w-5 text-white" />
                      </div>
                      Options Restauration
                    </h3>
        
       <div className="space-y-5">
                      {/* Petit-déjeuner avec toggle premium */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-teal-100/50">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                              <Coffee className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <span className="font-semibold text-teal-800">Petit-déjeuner inclus</span>
                              <p className="text-xs text-teal-600">Buffet premium 6h30-10h30</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-teal-600 transition-all shadow-inner">
                              <div className="absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full shadow-md transition-transform peer-checked:translate-x-7 flex items-center justify-center">
                                <div className="w-2 h-2 bg-teal-500 rounded-full peer-checked:bg-amber-400"></div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
          
          {/* Options de repas */}
         <div className="space-y-3">
                        <h4 className="text-sm font-bold text-teal-700 flex items-center gap-2">
                          <Star className="h-4 w-4 text-amber-500" />
                          Services Premium
                        </h4>
                        {[
                          { id: 'room-service', label: 'Room service 24h/24', icon: <Bed className="h-4 w-4" />, color: 'from-teal-500 to-teal-600' },
                          { id: 'restaurant', label: 'Restaurant gastronomique', icon: <Utensils className="h-4 w-4" />, color: 'from-amber-500 to-amber-600' },
                          { id: 'bar', label: 'Bar lounge premium', icon: <Wine className="h-4 w-4" />, color: 'from-purple-500 to-purple-600' },
                          { id: 'mini-bar', label: 'Mini-bar garni', icon: <ShoppingBag className="h-4 w-4" />, color: 'from-emerald-500 to-emerald-600' },
                       ].map((item) => (
                          <label key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/80 cursor-pointer group transition-all duration-300 hover:shadow-md">
                            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl shadow-md group-hover:shadow-lg transition-all`}>
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium text-teal-800 flex-1">{item.label}</span>
                            <input 
                              type="checkbox" 
                              id={item.id}
                              className="h-5 w-5 text-teal-600 rounded-lg border-2 border-teal-300 focus:ring-teal-500 focus:ring-2"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

      {/* Créneaux horaires */}
      <div className="space-y-6 bg-gradient-to-br from-amber-50 to-teal-50/50 p-6 rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-md">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      Heure d'arrivée
                    </h3>
                    
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "8h-10h", value: "morning_early", period: "Matinée" },
                          { label: "10h-12h", value: "morning_late", period: "Matinée" },
                          { label: "12h-14h", value: "noon_early", period: "Midi" },
                          { label: "14h-16h", value: "noon_late", period: "Après-midi" },
                          { label: "16h-18h", value: "evening_early", period: "Soir" },
                          { label: "18h-20h", value: "evening_late", period: "Soir" },
                        ].map((slot) => (
                          <label key={slot.value} className="relative group cursor-pointer">
                            <input
                              type="radio"
                              name="time-slot"
                              value={slot.value}
                              className="absolute opacity-0 h-0 w-0 peer"
                            />
                            <div className="p-4 border-2 border-teal-100 rounded-xl text-center bg-white transition-all duration-300
                                          peer-checked:border-teal-500 peer-checked:bg-gradient-to-br peer-checked:from-teal-50 peer-checked:to-teal-100 peer-checked:shadow-lg peer-checked:scale-105
                                          hover:border-teal-300 hover:shadow-md group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-teal-50/50">
                              <div className="font-bold text-teal-800 text-lg">{slot.label}</div>
                              <div className="text-xs text-teal-600 mt-1">{slot.period}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      

           <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100/50">
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="flex items-center justify-center mt-1">
                            <input 
                              type="checkbox" 
                              className="h-5 w-5 text-amber-600 rounded-lg border-2 border-amber-300 focus:ring-amber-500 focus:ring-2"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-teal-800 flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-amber-500" />
                              Horaire flexible
                            </p>
                            <p className="text-sm text-teal-600">Nous nous adaptons à vos besoins</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

      {/* Équipements */}
       <div className="space-y-6 bg-gradient-to-br from-teal-50 to-amber-50/50 p-6 rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-teal-800 flex items-center gap-3 text-lg">
                      <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-md">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      Équipements Premium
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { id: 'wifi', label: 'WiFi haut débit gratuit', icon: <Wifi className="h-5 w-5" />, color: 'from-blue-500 to-blue-600' },
                        { id: 'ac', label: 'Climatisation premium', icon: <Snowflake className="h-5 w-5" />, color: 'from-cyan-500 to-cyan-600' },
                        { id: 'tv', label: 'TV écran plat 55"', icon: <Tv className="h-5 w-5" />, color: 'from-purple-500 to-purple-600' },
                        { id: 'safe', label: 'Coffre-fort numérique', icon: <Shield className="h-5 w-5" />, color: 'from-green-500 to-green-600' },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/80 cursor-pointer group transition-all duration-300 hover:shadow-md">
                          <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl shadow-md group-hover:shadow-lg transition-all`}>
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium text-teal-800 flex-1">{item.label}</span>
                          <input 
                            type="checkbox" 
                            id={item.id}
                            className="h-5 w-5 text-teal-600 rounded-lg border-2 border-teal-300 focus:ring-teal-500 focus:ring-2"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

    {/* Boutons fixes en bas */}
   <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-6 border-t border-teal-100">
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 hover:from-teal-700 hover:via-teal-600 hover:to-teal-700 text-white py-4 rounded-2xl font-bold transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-teal-500/25 flex items-center justify-center gap-3 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="relative z-10 text-lg">Appliquer les filtres</span>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Sparkles className="h-5 w-5 text-amber-300" />
                    </div>
                  </button>
     <button className="w-full text-teal-600 hover:text-teal-800 py-3 text-sm font-semibold transition duration-300 flex items-center justify-center gap-2 mt-3 hover:bg-teal-50 rounded-xl">
                    <RefreshCw className="h-4 w-4" />
                    Réinitialiser tous les filtres
                  </button>
                  
    </div>
  </aside>
</div>
 
    
      {/* Main Content - Room Cards */}
      <div className="lg:w-3/4">
        {/* Results Header - Version améliorée */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {currentRooms.length} {currentRooms.length > 1 ? 'chambres disponibles' : 'chambre disponible'}
            </h2>
            <p className="text-teal-700 text-sm mt-1">
             <span className="font-medium">Derniere chambre disponible !</span> - Ne tardez pas à réserver

            </p>
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2 whitespace-nowrap">Trier par :</label>
 <select 
          id="sort"
          className="appearance-none bg-transparent pr-8 text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
        >
          <option value="popularity">Plus populaires</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Meilleures notes</option>
        </select>
          </div>
        </div>

        {/* Room Cards */}
       <RoomList  onBookNow={() => console.log('Book now clicked!')} />


        {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
            aria-label="Page précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page;
            if (totalPages <= 5) page = i + 1;
            else if (currentPage <= 3) page = i + 1;
            else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
            else page = currentPage - 2 + i;

              
              return (
              <button
                key={`page-${page}`}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {page}
              </button>
            );
          })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2 text-gray-400">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
              >
                {totalPages}
              </button>
            </>
          )}
            
             <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
            aria-label="Page suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</section>
  
                    </div>
                  );
                }
