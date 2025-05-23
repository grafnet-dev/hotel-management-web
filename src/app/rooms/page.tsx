"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Star, Heart, ArrowLeft, ArrowRight, Calendar, User, MapPin, ChevronLeft, ChevronRight,Lock, Check, CreditCard, Smartphone,Bed, Wallet ,X,CheckCircle, CalendarDays,IdCard,MessageSquare,Hotel,Banknote,Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useToast } from "../../../hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import Image from "next/image";


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
  ];
  // Initialiser les indices d'image pour chaque chambre
  useEffect(() => {
    const initialIndices = rooms.reduce((acc, room) => {
      acc[room.id] = 0;
      return acc;
    }, {} as Record<number, number>);
    setCurrentImageIndices(initialIndices);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(price);
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

  const nextImage = (roomId: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % rooms.find(r => r.id === roomId)!.images.length
    }));
  };

  const prevImage = (roomId: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + rooms.find(r => r.id === roomId)!.images.length) % 
                rooms.find(r => r.id === roomId)!.images.length
    }));
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
      <section className="relative h-[50vh] bg-teal-700">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Chambres d'Exception</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Découvrez nos hébergements haut de gamme au cœur du Bénin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentRooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden shadow-lg border border-teal-100">
                  {/* Carousel */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="flex h-full transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentImageIndices[room.id] * 100}%)` }}>
                      {room.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={room.title}
                          className="w-full h-full object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                    <button 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 p-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(room.id);
                      }}
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 p-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(room.id);
                      }}
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {room.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndices[room.id] === idx ? 'bg-white w-4' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

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

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === page 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
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