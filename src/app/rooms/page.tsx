"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { fr } from 'date-fns/locale';
import { format } from "date-fns";
import { cn } from '../../../lib/utils';
import { Star, ArrowLeft, ArrowRight, Calendar, User, MapPin, ChevronLeft,Utensils,Coffee,Wine,ShoppingBag , ChevronRight,Lock,Wifi,Users,DollarSign,Settings ,Filter ,RefreshCw ,Snowflake,Tv,Shield, Check,CalendarIcon , CreditCard,SearchIcon, Smartphone,Bed, Wallet ,X,CheckCircle, CalendarDays,IdCard,MessageSquare,Hotel,Banknote,Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useToast } from "../../../hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Textarea } from "../../../components/ui/textarea";
import Image from "next/image";
import "react-day-picker/style.css";
import type { DateRange } from "react-day-picker";
import { DayPicker } from 'react-day-picker';
import { useMemo } from 'react';
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

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  bookingType: 'night' | 'half-day' | 'hourly';
  hours?: number;
  nights: number;
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idType: string;
  idNumber: string;
  specialRequests: string;
  paymentMethod: string;
  paymentOption: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  mobileProvider?: string;
  mobileNumber?: string;
  bankName?: string;
  accountNumber?: string;
}



export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});
 const [currentPage, setCurrentPage] = useState(1);
const bookingTypes = ['night', 'half-day', 'hourly'] as const;
  const [date, setDate] = useState<DateRange | Date | undefined>();
  const [isDayUse, setIsDayUse] = useState(false);
const [price, setPrice] = useState(0);
const [rooms, setRooms] = useState<{ id: number; adults: number; children: number; }[]>([]);
const [searchRooms, setSearchRooms] = useState([{ id: 1, adults: 2, children: 0 }]);




const [favorites, setFavorites] = useState<number[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));


function formatPriceFCFA(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0
  }).format(price).replace('CFA', 'FCFA');
}

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
  
const toggleFavorite = (roomId: number) => {
  if (favorites.includes(roomId)) {
    setFavorites(favorites.filter(id => id !== roomId));
  } else {
    setFavorites([...favorites, roomId]);
  }
};



  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: '',
    checkOut: '',
    bookingType: 'night',
    nights: 0,
    total: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'cni',
    idNumber: '',
    specialRequests: '',
    paymentMethod: 'full',
    paymentOption: 'mobile'
  });
  
  
  if (!bookingTypes.includes(bookingDetails.bookingType)) {
    console.error('Invalid booking type');
  }
  const { toast } = useToast();
  
  
  const room = useMemo(() => [
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
    {
      id: 4,
      title: "Chambre Standard",
      description: "Confort moderne pour un séjour agréable avec tout le nécessaire pour voyageurs individuels ou couples. Lumineuse et fonctionnelle.",
      adults: 2,
      children: 0, // Ajouté
      size: "28m²",
      beds: 1, // Ajouté
      bedType: "Double", // Ajouté
      price: 80000,
      hourlyPrice: 15000,
      halfDayPrice: 40000,
      minStay: 1, // Ajouté
      images: [
        "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
        "https://images.pexels.com/photos/271616/pexels-photo-271616.jpeg",
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg" // Ajouté
      ],
      amenities: [
        "Wi-Fi gratuit",
        "Climatisation",
        "Salle de bain privée avec douche",
        "TV écran plat 32\"",
        "Bouilloire électrique",
        "Sèche-cheveux",
        "Service de ménage quotidien"
      ],
      services: [ // Ajouté
        "Service de bagagerie",
        "Réveil matinal sur demande"
      ],
      rating: 3,
      view: "Vue cour intérieure", // Ajouté
      floor: "Étages 1-3", // Ajouté
      smoking: false // Ajouté
    },
    {
      id: 5,
      title: "Suite Familiale",
      description: "Espace idéal pour les familles avec deux chambres séparées, espace jeu pour enfants et coin détente pour parents. Petit-déjeuner familial inclus.",
      adults: 4,
      children: 3, // Ajouté
      size: "60m²",
      beds: 3, // Ajouté
      bedType: "Queen + 2 lits simples", // Ajouté
      price: 200000,
      hourlyPrice: 35000,
      halfDayPrice: 100000,
      minStay: 2, // Ajouté
      images: [
        "https://images.pexels.com/photos/271635/pexels-photo-271635.jpeg",
        "https://images.pexels.com/photos/271638/pexels-photo-271638.jpeg",
        "https://images.pexels.com/photos/271640/pexels-photo-271640.jpeg",
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" // Ajouté
      ],
      amenities: [
        "2 chambres communicantes",
        "Espace jeu sécurisé",
        "Petit-déjeuner buffet familial",
        "TV dans chaque chambre",
        "Réfrigérateur",
        "Micro-ondes",
        "Lit bébé sur demande",
        "Jeux de société"
      ],
      services: [ // Ajouté
        "Service de baby-sitting",
        "Menu enfants disponible",
        "Location de poussette"
      ],
      rating: 4,
      view: "Vue piscine", // Ajouté
      floor: "Rez-de-chaussée", // Ajouté
      smoking: false // Ajouté
    },
    {
      id: 6,
      title: "Chambre Exécutive",
      description: "Espace de travail et détente combinés avec bureau ergonomique, espace lounge et accès prioritaire aux services business de l'hôtel.",
      adults: 2,
      children: 0, // Ajouté
      size: "32m²",
      beds: 1, // Ajouté
      bedType: "King Size", // Ajouté
      price: 150000,
      hourlyPrice: 25000,
      halfDayPrice: 75000,
      minStay: 1, // Ajouté
      images: [
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg",
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" // Ajouté
      ],
      amenities: [
        "Bureau équipé avec prise multiple",
        "Wi-Fi haut débit illimité",
        "Service 24h/24",
        "Imprimante/scanner sur demande",
        "Téléphone avec ligne directe",
        "Coffre-fort pour ordinateur",
        "Service de secrétariat"
      ],
      services: [ // Ajouté
        "Accès au salon business",
        "Service de fax/copie",
        "Service de traduction"
      ],
      rating: 4,
      view: "Vue ville", // Ajouté
      floor: "Étage business", // Ajouté
      smoking: false // Ajouté
    }
 ], []);
  
  useEffect(() => {
  const initialIndices = rooms.reduce((acc, room) => {
  acc[(room as Room).id] = 0;
  return acc;
}, {} as Record<number, number>);
  setCurrentImageIndices(initialIndices);
}, [rooms]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(price);
  };

   const addRoom = () => {
    setSearchRooms([...searchRooms, { id: Date.now(), adults: 2, children: 0 }]);
    addRoom();
  };

  const handleBookNow = () => {
    toast({
      title: "Réservation confirmée",
      description: `Votre réservation pour la ${selectedRoom?.title} a été confirmée. Un email de confirmation vous a été envoyé.`,
    });
    setIsConfirmationOpen(false);
    setSelectedRoom(null);
    // Réinitialiser les détails de réservation
    setBookingDetails({
      checkIn: '',
      checkOut: '',
      bookingType: 'night',
      nights: 0,
      total: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idType: 'cni',
      idNumber: '',
      specialRequests: '',
      paymentMethod: 'full',
      paymentOption: 'mobile'
    });
  };

  

  const handleCancelBooking = () => {
    toast({
      title: "Réservation annulée",
      description: `Votre réservation pour la ${selectedRoom?.title} a été annulée. Un email de confirmation vous a été envoyé.`,
      variant: "destructive"
    });
    setIsCancellationOpen(false);
    setSelectedRoom(null);
    setBookingDetails({
      checkIn: '',
      checkOut: '',
      bookingType: 'night',
      nights: 0,
      total: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idType: 'cni',
      idNumber: '',
      specialRequests: '',
      paymentMethod: 'full',
      paymentOption: 'mobile'
    });
  };


  const calculateTotal = (
    checkIn: string, 
    checkOut: string, 
    bookingType: 'night' | 'half-day' | 'hourly', 
    hours?: number
  ): number => {
    if (!selectedRoom) return 0;
  
    switch (bookingType) {
      case 'hourly':
        return (hours || 0) * (selectedRoom.hourlyPrice || 0);
      
      case 'half-day':
        return selectedRoom.halfDayPrice || 0;
      
      case 'night':
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * selectedRoom.price;
      
      default:
        return 0;
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'checkIn' | 'checkOut') => {
    const value = e.target.value;
    
    setBookingDetails(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
  
     
      let nights = 0;
      if (updated.bookingType === 'night' && updated.checkIn && updated.checkOut) {
        const start = new Date(updated.checkIn);
        const end = new Date(updated.checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
  
     
      const total = calculateTotal(
        updated.checkIn,
        updated.checkOut,
        updated.bookingType,
        updated.hours
      );
  
      return {
        ...updated,
        nights,
        total
      };
    });
  };

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
  const updated = [...rooms];
  (updated[index] as Room)[field] = value;
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
  

  const handleBookingTypeChange = (type: 'night' | 'half-day' | 'hourly') => {
    setBookingDetails(prev => {
      const updated = {
        ...prev,
        bookingType: type,
        hours: type === 'hourly' ? 1 : undefined
      };
  
      const total = calculateTotal(
        updated.checkIn,
        updated.checkOut,
        type,
        updated.hours
      );
  
      return {
        ...updated,
        total
      };
    });
  };
  const handleHoursChange = (hours: number) => {
    setBookingDetails(prev => {
      const total = calculateTotal(
        prev.checkIn,
        prev.checkOut,
        prev.bookingType,
        hours
      );
  
      return {
        ...prev,
        hours,
        total
      };
    });
  };

  

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingOpen(false);
    setIsConfirmationOpen(true);
  };

  const roomsPerPage = 3;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const currentRooms = rooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

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


    {/* Rooms Section  */}
<section className="py-12 bg-white">
 <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8">
  <div className="flex flex-col lg:flex-row gap-8">
      
    
    <div className="w-full lg:w-1/4">

  <button className="lg:hidden w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg mb-4 shadow-md hover:from-teal-700 hover:to-teal-600 hover:shadow-lg transition-all">
    <span className="font-medium">Filtrer les chambres</span>
    <Filter className="h-5 w-5" />
  </button>
  

  <aside className="hidden lg:flex lg:flex-col border-r pr-6 h-[calc(100vh-120px)] overflow-y-auto sticky top-24">

    <div className="bg-white pt-2 pb-4 sticky top-0 z-10">
      <h2 className="text-2xl font-bold text-teal-800 mb-2 flex items-center gap-2">
        <Filter className="h-6 w-6" />
        Filtres
      </h2>
      <p className="text-sm text-gray-500">Affinez votre recherche</p>
    </div>

    {/* Contenu scrollable */}
    <div className="space-y-6 pb-6">
      {/* Budget */}
      <div className="space-y-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-teal-600" />
          Budget (FCFA)
        </h3>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="5000"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-600"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>0 FCFA</span>
          <span>100,000 FCFA</span>
        </div>
      </div>

      {/* Capacité */}
      <div className="space-y-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Users className="h-5 w-5 text-teal-600" />
          Capacité
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, "6+"].map((num) => (
            <label key={num} className="relative">
              <input 
                type="checkbox" 
                className="absolute opacity-0 h-0 w-0 peer"
              />
              <div className="p-2 border-2 border-gray-100 rounded-lg flex flex-col items-center justify-center transition-all 
                            peer-checked:border-teal-400 peer-checked:bg-teal-50 peer-checked:shadow-sm
                            hover:border-teal-300 hover:shadow cursor-pointer">
                <div className="relative mb-1">
                  <User className="h-5 w-5 text-teal-600" />
                  {typeof num === 'number' && num > 1 && (
                    <User className="h-5 w-5 text-teal-400 absolute -right-1 -bottom-1" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-800">
                  {typeof num === 'number' ? num : "6+"} {typeof num === 'number' && num === 1 ? 'pers.' : 'pers.'}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Nouvelle section Restaurant */}
      <div className="space-y-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-teal-600" />
          Options restauration
        </h3>
        
        <div className="space-y-4">
          {/* Petit-déjeuner */}
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Coffee className="h-5 w-5 mr-3 text-amber-600" />
                <span className="text-gray-800">Petit-déjeuner inclus</span>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 transition-colors">
                  <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </div>
            </label>
            <p className="text-xs text-gray-500 pl-8">Buffet petit-déjeuner servi de 6h30 à 10h30</p>
          </div>
          
          {/* Options de repas */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 pl-1">Services proposés :</h4>
            {[
              { id: 'room-service', label: 'Room service 24h/24', icon: <Bed className="h-4 w-4" /> },
              { id: 'restaurant', label: 'Restaurant sur place', icon: <Utensils className="h-4 w-4" /> },
             { id: 'bar', label: 'Bar lounge', icon: <Wine className="h-4 w-4" /> },
              { id: 'mini-bar', label: 'Mini-bar en chambre', icon: <ShoppingBag className="h-4 w-4" /> },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-center w-7 h-7 bg-teal-50 rounded-lg text-teal-600">
                  {item.icon}
                </div>
                <span className="text-sm flex-1">{item.label}</span>
                <input 
                  type="checkbox" 
                  id={item.id}
                  className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Créneaux horaires */}
      <div className="space-y-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="h-5 w-5 text-teal-600" />
          Heure d_arrivee
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "8h-10h", value: "morning_early" },
              { label: "10h-12h", value: "morning_late" },
              { label: "12h-14h", value: "noon_early" },
              { label: "14h-16h", value: "noon_late" },
              { label: "16h-18h", value: "evening_early" },
              { label: "18h-20h", value: "evening_late" },
            ].map((slot) => (
              <label key={slot.value} className="relative">
                <input
                  type="radio"
                  name="time-slot"
                  value={slot.value}
                  className="absolute opacity-0 h-0 w-0 peer"
                />
                <div className="p-2 border-2 border-gray-100 rounded-lg text-center text-sm font-medium
                              peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-700
                              hover:border-teal-300 cursor-pointer transition-all">
                  {slot.label}
                </div>
              </label>
            ))}
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Horaire flexible</p>
                <p className="text-xs text-gray-500">Nous adapterons selon vos besoins</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Équipements */}
      <div className="space-y-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Settings className="h-5 w-5 text-teal-600" />
          Équipements
        </h3>
        <div className="space-y-3">
          {[
            { id: 'wifi', label: 'WiFi haut débit', icon: <Wifi className="h-5 w-5" /> },
            { id: 'ac', label: 'Climatisation', icon: <Snowflake className="h-5 w-5" /> },
            { id: 'tv', label: 'TV écran plat', icon: <Tv className="h-5 w-5" /> },
            { id: 'safe', label: 'Coffre-fort', icon: <Shield className="h-5 w-5" /> },
          ].map((item) => (
            <label key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-center w-7 h-7 bg-teal-50 rounded-lg text-teal-600">
                {item.icon}
              </div>
              <span className="text-sm flex-1">{item.label}</span>
              <input 
                type="checkbox" 
                id={item.id}
                className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              />
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* Boutons fixes en bas */}
    <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100 mt-auto">
      <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
        <CheckCircle className="h-5 w-5" />
        Appliquer les filtres
      </button>
      <button className="w-full text-teal-600 hover:text-teal-800 py-2 text-sm font-medium transition duration-200 flex items-center justify-center gap-2 mt-2">
        <RefreshCw className="h-4 w-4" />
        Réinitialiser
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
      <RoomList />

        {/* Pagination  */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-1">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</section>
     {/* Booking Dialog */}
<Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
  <DialogContent 
    className="max-w-7xl p-0 border-4 border-amber-500 max-h-[90vh] flex flex-col font-sans rounded-xl overflow-hidden shadow-2xl"
    style={{ fontFamily: "'Bahnschrift', sans-serif" }}
  >
    {selectedRoom && (
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Image Carousel with Enhanced Animations */}
        <div className="relative h-64 md:h-80 overflow-hidden flex-shrink-0 group">
          <img
            src={selectedRoom.images[currentImageIndices[selectedRoom.id] || 0]}
            alt={selectedRoom.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Navigation Buttons with Hover Effects */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
            onClick={(e) => { e.stopPropagation(); prevImage(selectedRoom.id); }}
          >
            <ArrowLeft className="h-6 w-6 text-teal-700" />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
            onClick={(e) => { e.stopPropagation(); nextImage(selectedRoom.id); }}
          >
            <ArrowRight className="h-6 w-6 text-teal-700" />
          </button>
          
          {/* Image Indicators with Animation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {selectedRoom.images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndices[selectedRoom.id] === idx 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndices(prev => ({
                    ...prev,
                    [selectedRoom.id]: idx
                  }));
                }}
              />
            ))}
          </div>
          
          {/* Price Tag with Pulse Animation */}
          <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse hover:animate-none">
            <p className="font-bold text-lg">{formatPrice(selectedRoom.price)}</p>
            <p className="text-xs">par nuit</p>
          </div>
        </div>

        {/* Scrollable Content with Smooth Scrolling */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
  <DialogHeader>
    <DialogTitle className="text-2xl md:text-3xl font-bold text-teal-800 mb-2 animate-fade-in">
      {selectedRoom.title}
      {selectedRoom.rating && (
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < selectedRoom.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{selectedRoom.rating}/5</span>
        </div>
      )}
    </DialogTitle>
  </DialogHeader>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
    {/* Room Details Section */}
    <div className="lg:col-span-2 space-y-6">
      {/* Room Specs with Enhanced Icons */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
          <User className="h-5 w-5 mr-2" />
          <span className="text-sm md:text-base">
            {selectedRoom.adults} adultes
            {selectedRoom.children && selectedRoom.children > 0 && ` + ${selectedRoom.children} enfants`}
          </span>
        </div>
        
        <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-sm md:text-base">{selectedRoom.size}</span>
        </div>
        
        {selectedRoom.beds && (
          <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
            <Bed className="h-5 w-5 mr-2" />
            <span className="text-sm md:text-base">
              {selectedRoom.beds} {selectedRoom.beds > 1 ? 'lits' : 'lit'}
              {selectedRoom.bedType && ` (${selectedRoom.bedType})`}
            </span>
          </div>
        )}
        
        {selectedRoom.view && (
          <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
            <Hotel className="h-5 w-5 mr-2" />
            <span className="text-sm md:text-base">Vue: {selectedRoom.view}</span>
          </div>
        )}
        
        {selectedRoom.floor && (
          <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
            <ArrowRight className="h-5 w-5 mr-2" />
            <span className="text-sm md:text-base">Étage: {selectedRoom.floor}</span>
          </div>
        )}
        
        <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full shadow-sm">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-sm md:text-base">
            {selectedRoom.smoking ? 'Fumeurs autorisés' : 'Non-fumeur'}
          </span>
        </div>
      </div>

      {/* Enhanced Description */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-lg border border-amber-100">
        <h3 className="text-lg font-semibold text-teal-700 mb-2 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-amber-600" />
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed md:text-base">
          {selectedRoom.description}
        </p>
      </div>

      {/* Amenities with Enhanced Grid Layout */}
      <div className="space-y-3 animate-fade-in-up">
        <h4 className="text-lg md:text-xl font-semibold text-teal-800 border-b border-amber-200 pb-2 flex items-center">
          <Check className="h-5 w-5 mr-2 text-amber-600" />
          Équipements & Services
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedRoom.amenities.map((amenity) => (
            <div 
              key={amenity} 
              className="flex items-start gap-3 p-3 hover:bg-amber-50 rounded-lg transition-all duration-200 border border-amber-100"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2 animate-pulse"></div>
              <span className="text-sm md:text-base">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services Section */}
      {selectedRoom.services && selectedRoom.services.length > 0 && (
        <div className="space-y-3 animate-fade-in-up">
          <h4 className="text-lg md:text-xl font-semibold text-teal-800 border-b border-amber-200 pb-2 flex items-center">
            <IdCard className="h-5 w-5 mr-2 text-amber-600" />
            Services Spéciaux
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedRoom.services.map((service) => (
              <div 
                key={service} 
                className="flex items-start gap-3 p-3 hover:bg-teal-50 rounded-lg transition-all duration-200 border border-teal-100"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-2 animate-pulse"></div>
                <span className="text-sm md:text-base text-teal-800">{service}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Information */}
      <div className="space-y-3">
        <h4 className="text-lg md:text-xl font-semibold text-teal-800 border-b border-amber-200 pb-2 flex items-center">
          <Banknote className="h-5 w-5 mr-2 text-amber-600" />
          Tarifs
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-medium text-amber-800 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              À l'heure
            </h5>
            <p className="text-2xl font-bold text-amber-700 mt-1">
              {formatPrice(selectedRoom.hourlyPrice || 0)}
            </p>
            <p className="text-xs text-amber-600">Minimum 1 heure</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-medium text-amber-800 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Demi-journée
            </h5>
            <p className="text-2xl font-bold text-amber-700 mt-1">
              {formatPrice(selectedRoom.halfDayPrice || 0)}
            </p>
            <p className="text-xs text-amber-600">4-6 heures</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-medium text-amber-800 flex items-center">
              <Bed className="h-4 w-4 mr-2" />
              Nuitée
            </h5>
            <p className="text-2xl font-bold text-amber-700 mt-1">
              {formatPrice(selectedRoom.price)}
            </p>
            <p className="text-xs text-amber-600">
              Séjour min: {selectedRoom.minStay || 1} nuit{selectedRoom.minStay && selectedRoom.minStay > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
            {/* Booking Form - Sticky with Elevation Effect */}
            <div className="lg:sticky lg:top-6 animate-fade-in">

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4">
                <h3 className="text-xl font-bold text-teal-800 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-amber-600" />
                  <span>Réserver</span>
                </h3>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Booking Type Toggle */}
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">Type de réservation</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['night', 'half-day', 'hourly'].map((type) => (
                   <Button
                   key={type}
                   type="button"
                   variant={bookingDetails.bookingType === type ? 'default' : 'outline'}
                   size="sm"
                   className={`text-sm transition-all duration-200 ${
                     bookingDetails.bookingType === type 
                       ? 'bg-teal-700 hover:bg-teal-800 shadow-md' 
                       : 'hover:bg-amber-100'
                   }`}
                   onClick={() => handleBookingTypeChange(type as 'night' | 'half-day' | 'hourly')}
                 >
                   {type === 'night' ? 'Nuitée' : 
                    type === 'half-day' ? 'Demi-journée' : 'À l\'heure'}
                 </Button>
                      ))}
                    </div>
                  </div>

                  {/* Hours Selector for Hourly Booking */}
                  {bookingDetails.bookingType === 'hourly' && (
  <div className="space-y-2 animate-fade-in-up">
    <Label htmlFor="hours" className="text-amber-800 font-medium">
      Nombre d'heures
    </Label>
    <Select
      value={bookingDetails.hours?.toString() || '1'}
      onValueChange={(value) => handleHoursChange(parseInt(value))}
    >
      <SelectTrigger className="w-full border-amber-300 hover:border-amber-400 focus:ring-2 focus:ring-amber-500">
        <SelectValue placeholder="Sélectionnez..." />
      </SelectTrigger>
      <SelectContent className="z-[1000] border-amber-200 shadow-lg">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
          <SelectItem 
            key={hour} 
            value={hour.toString()}
            className="focus:bg-amber-100 transition-colors duration-150"
          >
            {hour} heure{hour > 1 ? 's' : ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)}
                  {/* Check-in Date/Time */}
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="text-amber-800 font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {bookingDetails.bookingType === 'hourly' ? 'Date et heure de début' : 
                       bookingDetails.bookingType === 'half-day' ? 'Date et heure de début' : 'Date d\'arrivée'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="checkin"
                        type={bookingDetails.bookingType !== 'night' ? 'datetime-local' : 'date'}
                        className="pl-10 bg-white border-amber-300 hover:border-amber-400 focus:ring-2 focus:ring-amber-500"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingDetails.checkIn}
                        onChange={(e) => handleDateChange(e, 'checkIn')}
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                    </div>
                  </div>

                  {/* Check-out Date for Night Booking */}
                  {bookingDetails.bookingType === 'night' && (
                    <div className="space-y-2 animate-fade-in-up">
                      <Label htmlFor="checkout" className="text-amber-800 font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Date de départ
                      </Label>
                      <div className="relative">
                        <Input
                          id="checkout"
                          type="date"
                          className="pl-10 bg-white border-amber-300 hover:border-amber-400 focus:ring-2 focus:ring-amber-500"
                          required
                          min={bookingDetails.checkIn || new Date().toISOString().split('T')[0]}
                          value={bookingDetails.checkOut}
                          onChange={(e) => handleDateChange(e, 'checkOut')}
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                  )}

                  {/* Price Calculation with Animation */}
                  {bookingDetails.total > 0 && (
                    <div className="p-4 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg space-y-2 border border-amber-200 animate-fade-in-up">
                      <div className="flex justify-between">
                        <span className="text-amber-800">
                          {bookingDetails.bookingType === 'hourly' ? 'Prix par heure:' : 
                           bookingDetails.bookingType === 'half-day' ? 'Prix demi-journée:' : 'Prix par nuit:'}
                        </span>
                        <span className="font-medium">
                          {formatPrice(
                            bookingDetails.bookingType === 'hourly' ? selectedRoom.hourlyPrice || 0 :
                            bookingDetails.bookingType === 'half-day' ? selectedRoom.halfDayPrice || 0 :
                            selectedRoom.price
                          )}
                        </span>
                      </div>
                      {bookingDetails.bookingType === 'hourly' && (
                        <div className="flex justify-between">
                          <span className="text-amber-800">Heures:</span>
                          <span className="font-medium">{bookingDetails.hours}</span>
                        </div>
                      )}
                      {bookingDetails.bookingType === 'night' && (
                        <div className="flex justify-between">
                          <span className="text-amber-800">Nuits:</span>
                          <span className="font-medium">{bookingDetails.nights}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-2 mt-2 border-t border-amber-200">
                        <span className="text-teal-800">Total:</span>
                        <span className="text-amber-700 text-lg">
                          {formatPrice(bookingDetails.total)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button with Hover Effect */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 py-6 text-lg mt-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
                    disabled={!bookingDetails.checkIn || (bookingDetails.bookingType === 'night' && !bookingDetails.checkOut)}
                  >
                    Continuer vers le paiement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

     {/* Booking Confirmation Dialog - Improved Design */}
     <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
  <DialogContent 
    className="max-w-6xl border-2 border-teal-500 rounded-xl overflow-y-auto max-h-[90vh] animate-in fade-in-zoom-in"
    onOpenAutoFocus={(e) => e.preventDefault()}
  >
    <div className="space-y-8">
      {/* Header with Success Icon */}
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-teal-50 mb-4 ring-4 ring-teal-100"
        >
          <Check 
            className="h-10 w-10 text-teal-600" 
            aria-hidden="true"
          />
        </motion.div>
        <h2 className="text-2xl font-bold text-teal-900 mb-2">
          Confirmation de réservation
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Vous allez réserver la <span className="font-semibold text-teal-800">{selectedRoom?.title}</span> pour{' '}
          {bookingDetails.bookingType === 'hourly' 
            ? `${bookingDetails.hours} heure${bookingDetails.hours && bookingDetails.hours > 1 ? 's' : ''}`
            : bookingDetails.bookingType === 'half-day'
              ? 'une demi-journée'
              : `${bookingDetails.nights} nuit${bookingDetails.nights > 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Left Column - Booking Summary (Sticky) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-0 lg:h-[calc(100vh-200px)] lg:overflow-y-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm"
          >
            <h3 className="font-bold text-lg text-teal-900 mb-3 flex items-center gap-2">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              <span>Détails de la réservation</span>
            </h3>
            <div className="space-y-3">
              {[
                { label: "Type", value: bookingDetails.bookingType === 'hourly' ? 'À l\'heure' : 
                  bookingDetails.bookingType === 'half-day' ? 'Demi-journée' : 'Nuitée' },
                { label: "Arrivée", value: bookingDetails.checkIn },
                { label: "Départ", value: bookingDetails.checkOut },
                ...(bookingDetails.bookingType === 'hourly' 
                  ? [{ label: "Heures", value: bookingDetails.hours }]
                  : []),
                ...(bookingDetails.bookingType === 'night' 
                  ? [{ label: "Nuits", value: bookingDetails.nights }]
                  : [])
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-teal-50">
                  <span className="text-gray-600">{item.label}:</span>
                  <span className="font-medium text-teal-900">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 pt-3 border-t border-teal-200">
                <span className="text-teal-900">Total:</span>
                <span className="text-amber-600">{formatPrice(bookingDetails.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Room Preview */}
          {selectedRoom && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm"
            >
              <h3 className="font-bold text-lg text-teal-900 mb-3 flex items-center gap-2">
                <Hotel className="h-5 w-5" aria-hidden="true" />
                <span>Votre chambre</span>
              </h3>
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
              <Image
  src={selectedRoom.images[0]} 
  alt={`Photo de la chambre ${selectedRoom.title}`}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
              </div>
              <h4 className="font-semibold text-teal-900">{selectedRoom.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{selectedRoom.description}</p>
            </motion.div>
          )}
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm"
          >
            <h3 className="font-bold text-lg text-teal-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" aria-hidden="true" />
              <span>Informations personnelles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-teal-900 mb-1 block">Prénom</Label>
                <Input
                  id="firstName"
                  value={bookingDetails.firstName}
                  onChange={(e) => setBookingDetails({...bookingDetails, firstName: e.target.value})}
                  className="focus:ring-teal-500 focus:border-teal-500"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-teal-900 mb-1 block">Nom</Label>
                <Input
                  id="lastName"
                  value={bookingDetails.lastName}
                  onChange={(e) => setBookingDetails({...bookingDetails, lastName: e.target.value})}
                  className="focus:ring-teal-500 focus:border-teal-500"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-teal-900 mb-1 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  className="focus:ring-teal-500 focus:border-teal-500"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-teal-900 mb-1 block">Téléphone</Label>
                <Input
                  id="phone"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  className="focus:ring-teal-500 focus:border-teal-500"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </motion.div>

          {/* ID Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm"
          >
            <h3 className="font-bold text-lg text-teal-900 mb-4 flex items-center gap-2">
              <IdCard className="h-5 w-5" aria-hidden="true" />
              <span>Pièce d'identité</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idType" className="text-teal-900 mb-1 block">Type de pièce</Label>
                <Select
                  value={bookingDetails.idType}
                  onValueChange={(value) => setBookingDetails({...bookingDetails, idType: value})}
                >
                  <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500" aria-label="Type de pièce d'identité">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cni">CNI</SelectItem>
                    <SelectItem value="passport">Passeport</SelectItem>
                    <SelectItem value="permis">Permis de conduire</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="idNumber" className="text-teal-900 mb-1 block">Numéro de pièce</Label>
                <Input
                  id="idNumber"
                  value={bookingDetails.idNumber}
                  onChange={(e) => setBookingDetails({...bookingDetails, idNumber: e.target.value})}
                  className="focus:ring-teal-500 focus:border-teal-500"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </motion.div>

          {/* Special Requests */}
          <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm">
            <Label htmlFor="specialRequests" className="text-teal-900 mb-1 block font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Demandes spéciales (optionnel)
            </Label>
            <Textarea
              id="specialRequests"
              value={bookingDetails.specialRequests}
              onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
              placeholder="Demandes particulières, besoins spécifiques, allergies alimentaires, etc."
              className="min-h-[100px] focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm">
            <h4 className="font-bold text-lg text-teal-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Méthode de paiement
            </h4>
            
            <RadioGroup 
              value={bookingDetails.paymentMethod} 
              onValueChange={(value) => setBookingDetails({...bookingDetails, paymentMethod: value})}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div>
                <RadioGroupItem value="full" id="full" className="peer sr-only" />
                <Label
                  htmlFor="full"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-teal-300 hover:bg-teal-50 transition-all peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500 cursor-pointer"
                >
                  <CreditCard className="mb-3 h-6 w-6 text-teal-600" />
                  <span>Paiement complet</span>
                  <span className="text-xs text-gray-500 mt-1">Payez 100% maintenant</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="partial" id="partial" className="peer sr-only" />
                <Label
                  htmlFor="partial"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-teal-300 hover:bg-teal-50 transition-all peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500 cursor-pointer"
                >
                  <Wallet className="mb-3 h-6 w-6 text-teal-600" />
                  <span>Acompte</span>
                  <span className="text-xs text-gray-500 mt-1">Payez 30% maintenant</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="later" id="later" className="peer sr-only" />
                <Label
                  htmlFor="later"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-teal-300 hover:bg-teal-50 transition-all peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500 cursor-pointer"
                >
                  <Hotel className="mb-3 h-6 w-6 text-teal-600" />
                  <span>À l'arrivée</span>
                  <span className="text-xs text-gray-500 mt-1">Payez à l'hôtel</span>
                </Label>
              </div>
            </RadioGroup>

            {/* Payment Details */}
            {bookingDetails.paymentMethod !== 'later' && (
  <div className="mt-6 space-y-4 relative">
    {/* Option de paiement - Menu déroulant */}
    <div>
      <Label htmlFor="paymentOption" className="text-teal-900 mb-1 block">
        Option de paiement
      </Label>
      <Select
        value={bookingDetails.paymentOption}
        onValueChange={(value) => setBookingDetails({...bookingDetails, paymentOption: value})}
      >
        <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500 w-full">
          <SelectValue placeholder="Sélectionnez un mode de paiement" />
        </SelectTrigger>
        <SelectContent 
          className="z-[1000]"
          position="popper"
          side="bottom"
          align="start"
          style={{ width: 'var(--radix-select-trigger-width)' }}
        >
          <SelectItem value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Paiement mobile
          </SelectItem>
          <SelectItem value="card" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Carte bancaire
          </SelectItem>
          <SelectItem value="transfer" className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            Virement bancaire
          </SelectItem>
        </SelectContent>
      </Select>
    </div>


                {/* Mobile Payment Form */}
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {bookingDetails.paymentOption === 'mobile' && (
                  <div className="space-y-4 mt-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div>
                      <Label htmlFor="mobileProvider" className="text-teal-900 mb-1 block">Opérateur mobile</Label>
                      <Select
                        value={bookingDetails.mobileProvider}
                        onValueChange={(value) => setBookingDetails({...bookingDetails, mobileProvider: value})}
                      >
                        <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500">
                          <SelectValue placeholder="Sélectionnez votre opérateur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="moov">Moov Money</SelectItem>
                          <SelectItem value="wave">Wave</SelectItem>
                          <SelectItem value="orange">Orange Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber" className="text-teal-900 mb-1 block">Numéro mobile</Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        value={bookingDetails.mobileNumber || ''}
                        onChange={(e) => setBookingDetails({...bookingDetails, mobileNumber: e.target.value})}
                        placeholder="Ex: 96959595"
                        className="focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Card Payment Form */}
                {bookingDetails.paymentOption === 'card' && (
                  <div className="space-y-4 mt-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div>
                      <Label htmlFor="cardNumber" className="text-teal-900 mb-1 block">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        value={bookingDetails.cardNumber || ''}
                        onChange={(e) => setBookingDetails({...bookingDetails, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        className="focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry" className="text-teal-900 mb-1 block">Date d'expiration</Label>
                        <Input
                          id="cardExpiry"
                          type="text"
                          value={bookingDetails.cardExpiry || ''}
                          onChange={(e) => setBookingDetails({...bookingDetails, cardExpiry: e.target.value})}
                          placeholder="MM/AA"
                          className="focus:ring-teal-500 focus:border-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc" className="text-teal-900 mb-1 block">Code CVC</Label>
                        <Input
                          id="cardCvc"
                          type="text"
                          value={bookingDetails.cardCvc || ''}
                          onChange={(e) => setBookingDetails({...bookingDetails, cardCvc: e.target.value})}
                          placeholder="123"
                          className="focus:ring-teal-500 focus:border-teal-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
  <span className="h-4 w-4 text-teal-600">
    <Lock />
  </span>
  <span>Les paiements sont sécurisés et cryptés</span>
</div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {bookingDetails.paymentOption === 'transfer' && (
                  <div className="space-y-4 mt-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div>
                      <Label htmlFor="bankName" className="text-teal-900 mb-1 block">Banque</Label>
                      <Input
                        id="bankName"
                        type="text"
                        value={bookingDetails.bankName || ''}
                        onChange={(e) => setBookingDetails({...bookingDetails, bankName: e.target.value})}
                        placeholder="Nom de votre banque"
                        className="focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber" className="text-teal-900 mb-1 block">Numéro de compte</Label>
                      <Input
                        id="accountNumber"
                        type="text"
                        value={bookingDetails.accountNumber || ''}
                        onChange={(e) => setBookingDetails({...bookingDetails, accountNumber: e.target.value})}
                        placeholder="Numéro de compte bancaire"
                        className="focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    <div className="bg-teal-100 p-3 rounded-lg border border-teal-200">
                      <p className="text-sm text-teal-900">
                        <strong className="block mb-1">Veuillez effectuer le virement à :</strong>
                        <span className="flex items-baseline gap-2"><span className="w-24 text-gray-600">Banque:</span> ECOBANK</span>
                        <span className="flex items-baseline gap-2"><span className="w-24 text-gray-600">Nom du compte:</span> HOTEL ROYAL BENIN</span>
                        <span className="flex items-baseline gap-2"><span className="w-24 text-gray-600">Numéro:</span> BJ06101010101010101010101</span>
                        <span className="flex items-baseline gap-2"><span className="w-24 text-gray-600">Code SWIFT:</span> ECOCBJBJ</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
      

      {/* Footer Actions */}
      <DialogFooter className="sm:justify-between gap-3">
        <Button 
          variant="outline" 
          className="border-teal-600 text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-6 py-3"
          onClick={() => {
            setIsConfirmationOpen(false);
            setIsBookingOpen(true);
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-red-500 text-red-600 hover:bg-red-50 px-6 py-3"
            onClick={() => setIsCancellationOpen(true)}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleBookNow}
            className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg shadow-md hover:shadow-teal-200 transition-all"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Confirmer la réservation
          </Button>
        </div>
      </DialogFooter>
    </div>
  </DialogContent>
</Dialog>
                
                      {/* Cancellation Dialog */}
                      <Dialog open={isCancellationOpen} onOpenChange={setIsCancellationOpen}>
                        <DialogContent className="max-w-md border-4 border-red-500">
                          <div className="text-center space-y-4">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                              <X className="h-8 w-8 text-red-600" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-red-700">
                              Annuler la réservation
                            </DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir annuler votre réservation pour la {selectedRoom?.title} ?
                            </DialogDescription>
                            <div className="flex justify-center gap-4 pt-4">
                              <Button 
                                variant="outline" 
                                className="border-teal-600 text-teal-600 hover:text-teal-700"
                                onClick={() => setIsCancellationOpen(false)}
                              >
                                Non, conserver
                              </Button>
                              <Button 
                                variant="destructive"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={handleCancelBooking}
                              >
                                Oui, annuler
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  );
                }