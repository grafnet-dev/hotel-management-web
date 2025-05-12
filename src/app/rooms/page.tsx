"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Star, Wifi, Coffee, Tv, Bath, X, Check, Clock, Users, CreditCard, Upload, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { useToast } from "../../../hooks/use-toast";
import { Separator } from "../../../components/ui/separator";

export default function Rooms() {
 
    interface Room {
      id: number;
      title: string;
      description: string;
      longDescription: string;
      price: string;
      image: string;
      amenities: string[];
      size: string;
      rating: number;
      features: string[];
    }
    
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { toast } = useToast();
  
    const rooms = [
      {
        id: 1,
        title: "Chambre Vue Lac",
        description: "Profitez d'une vue imprenable sur le lac depuis votre balcon privé",
        longDescription: "Cette chambre spacieuse de 30m² offre une expérience unique avec sa vue panoramique sur le lac. Dotée d'une décoration raffinée et d'équipements modernes, elle dispose d'un lit king-size, d'une salle de bain en marbre et d'un balcon privé meublé.",
        price: "250€",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        amenities: ["Wi-Fi", "Machine à café", "TV HD", "Salle de bain luxueuse"],
        size: "30m²",
        rating: 5,
        features: [
          "Lit king-size",
          "Balcon privé",
          "Vue sur le lac",
          "Minibar",
          "Coffre-fort",
          "Service en chambre 24/7"
        ]
      },
      {
        id: 2,
        title: "Suite Deluxe",
        description: "Un espace généreux avec salon séparé et terrasse panoramique",
        longDescription: "Cette suite luxueuse de 50m² combine élégance et confort. Elle comprend un salon séparé, une chambre avec lit king-size, une salle de bain en marbre avec baignoire et douche à l'italienne, ainsi qu'une terrasse privée avec vue panoramique.",
        price: "400€",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        amenities: ["Wi-Fi", "Machine à café", "TV HD", "Salle de bain luxueuse"],
        size: "50m²",
        rating: 5,
        features: [
          "Salon séparé",
          "Lit king-size",
          "Terrasse privée",
          "Vue panoramique",
          "Dressing",
          "Service majordome"
        ]
      },
      {
        id: 3,
        title: "Suite Présidentielle",
        description: "Le summum du luxe avec vue à 180° sur le lac",
        longDescription: "Notre suite présidentielle de 80m² représente le summum du luxe. Avec ses espaces de vie généreux, sa chambre principale somptueuse, son salon privé et sa terrasse panoramique, elle offre une expérience incomparable.",
        price: "600€",
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
        amenities: ["Wi-Fi", "Machine à café", "TV HD", "Salle de bain luxueuse"],
        size: "80m²",
        rating: 5,
        features: [
          "Deux chambres",
          "Salon privé",
          "Salle à manger",
          "Terrasse panoramique",
          "Jacuzzi privé",
          "Service majordome 24/7"
        ]
      }
    ];
  
    const amenityIcons = {
      "Wi-Fi": <Wifi className="h-4 w-4" />,
      "Machine à café": <Coffee className="h-4 w-4" />,
      "TV HD": <Tv className="h-4 w-4" />,
      "Salle de bain luxueuse": <Bath className="h-4 w-4" />
    };
  
    const handleBookingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      toast({
        title: "Demande de réservation envoyée",
        description: "Nous avons bien reçu votre demande de réservation. Notre équipe vous contactera dans les plus brefs délais pour confirmer votre séjour.",
      });
      setIsBookingOpen(false);
      setCurrentStep(1);
    };
  
    const nextStep = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const prevStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
    return (
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative h-[70vh]">
          <div className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"
              alt="Luxury Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Nos Chambres & Suites</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                Un confort absolu dans un cadre d'exception, où chaque détail est pensé pour votre bien-être
              </p>
            </motion.div>
          </div>
        </section>
  
        {/* Rooms Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="transform transition-all duration-300"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative group">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-64 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                        onClick={() => setSelectedRoom(room)}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          variant="outline"
                          className="text-white border-white hover:bg-white hover:text-black transition-colors"
                          onClick={() => setSelectedRoom(room)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-3">{room.title}</h3>
                      <div className="flex items-center mb-4">
                        {[...Array(room.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 text-lg">{room.description}</p>
                      <div className="flex items-center text-gray-500 mb-6">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>Taille: {room.size}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {room.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-sm bg-sky-50 text-sky-700 px-3 py-2 rounded-full"
                          >
                            {amenityIcons[amenity as keyof typeof amenityIcons]}
                            {amenity}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-sky-600">
                          {room.price}
                          <span className="text-sm text-gray-500 ml-1">/nuit</span>
                        </p>
                        <Button 
                          className="bg-sky-600 hover:bg-sky-700"
                          onClick={() => {
                            setSelectedRoom(room);
                            setIsBookingOpen(true);
                          }}
                        >
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Room Detail Dialog */}
        <Dialog open={selectedRoom !== null} onOpenChange={() => setSelectedRoom(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedRoom?.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-6">
              <div className="relative h-96 overflow-hidden rounded-xl">
                <img
                  src={selectedRoom?.image}
                  alt={selectedRoom?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-3xl font-bold">
                    {selectedRoom?.price}<span className="text-sm ml-1">/nuit</span>
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {selectedRoom?.longDescription}
                </p>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Caractéristiques:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRoom?.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-sky-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    className="bg-sky-600 hover:bg-sky-700"
                    onClick={() => {
                      setIsBookingOpen(true);
                      setSelectedRoom(null);
                    }}
                  >
                    Réserver maintenant
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  
        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={(open) => {
          setIsBookingOpen(open);
          if (!open) setCurrentStep(1);
        }}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Réservation</DialogTitle>
              <DialogDescription>
                Étape {currentStep} sur 3
              </DialogDescription>
            </DialogHeader>
  
            <div className="relative mt-4">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step === 1 && <Users className="h-5 w-5" />}
                      {step === 2 && <Clock className="h-5 w-5" />}
                      {step === 3 && <CreditCard className="h-5 w-5" />}
                    </div>
                    <span className="text-sm mt-2">
                      {step === 1 && "Informations"}
                      {step === 2 && "Séjour"}
                      {step === 3 && "Paiement"}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200 -z-10">
                  <div
                    className="h-full bg-sky-600 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  />
                </div>
              </div>
  
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" customProperty="someValue" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" customProperty="someValue" />
                        </div>
                      </div>
  
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" customProperty="someValue" />
                      </div>
  
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" customProperty="someValue" />
                      </div>
                    </motion.div>
                  )}
  
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checkIn">Date d'arrivée</Label>
                          <Input id="checkIn" type="date" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkOut">Date de départ</Label>
                          <Input id="checkOut" type="date" required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" />
                        </div>
                      </div>
  
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="guests">Nombre d'adultes</Label>
                          <Input id="guests" type="number" min={1} required className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="children">Nombre d'enfants</Label>
                          <Input id="children" type="number" min={0} className="transition-all duration-300 focus:ring-2 focus:ring-sky-500" />
                        </div>
                      </div>
  
                      <div className="space-y-4">
                        <Label>Services additionnels</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: "restaurant", label: "Restaurant (petit-déjeuner)" },
                            { id: "spa", label: "Accès Spa" },
                            { id: "parking", label: "Parking privé" },
                            { id: "transfer", label: "Transfert aéroport" }
                          ].map((service) => (
                            <div key={service.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:border-sky-500 transition-colors">
                              <Checkbox id={service.id} className="h-5 w-5" />
                              <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                                {service.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
  
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Méthode de paiement</Label>
                        <select
                          id="paymentMethod"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-sky-500"
                          required
                        >
                          <option value="">Choisissez un moyen de paiement</option>
                          <option value="mobile">Mobile Money</option>
                          <option value="carte">Carte bancaire</option>
                          <option value="cash">Paiement sur place</option>
                          <option value="virement">Virement bancaire</option>
                        </select>
                      </div>
  
                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sous-total</span>
                          <span>250€</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Taxes</span>
                          <span>50€</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>300€</span>
                        </div>
                      </div>
  
                      <div className="space-y-2">
                        <Label htmlFor="special">Demandes spéciales</Label>
                        <textarea
                          id="special"
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-sky-500"
                          placeholder="Allergies, préférences..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
  
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Précédent
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button type="button" className="ml-auto" onClick={nextStep}>
                      Suivant
                    </Button>
                  ) : (
                    <Button type="submit" className="ml-auto bg-sky-600 hover:bg-sky-700">
                      Confirmer la réservation
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
  
        {/* Amenities Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
            >
              Services Inclus
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Petit-déjeuner buffet", icon: <Coffee className="h-8 w-8" /> },
                { name: "Accès au spa", icon: <Bath className="h-8 w-8" /> },
                { name: "Wi-Fi haut débit", icon: <Wifi className="h-8 w-8" /> },
                { name: "Service en chambre 24/7", icon: <Clock className="h-8 w-8" /> },
                { name: "Parking privé", icon: <MapPin className="h-8 w-8" /> },
                { name: "Conciergerie", icon: <Users className="h-8 w-8" /> },
                { name: "Salle de sport", icon: <Tv className="h-8 w-8" /> },
                { name: "Business center", icon: <CreditCard className="h-8 w-8" /> }
              ].map((amenity, index) => (
                <motion.div
                  key={amenity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sky-600">{amenity.icon}</div>
                    <div className="text-gray-800 font-medium">{amenity.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  