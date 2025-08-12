"use client";

import { useState, useEffect, useMemo,useCallback } from 'react';
import { motion} from 'framer-motion';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Separator } from '../../../../components/ui/separator';
import sampleRooms from '../../../../types';
import { Room } from '../../../../types';
import { 

  Users, 
  CreditCard, 
  Check, 
  ArrowLeft, 
  Clock,
  Star,
  Wifi,
  BedDouble,
  Maximize2,
  MapPin,
  Plus,
  Minus,

  Phone,
  
  CheckCircle,
  Loader2,
  Banknote,
  Wallet,
  Shield
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// Couleurs Hôtel du Lac
const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};




interface BookingData {
  reservationType: string; // 'classic' | 'day_use' | 'flexible'
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Array<{ age: number }>;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isForSomeoneElse: boolean;
    guestFirstName?: string;
    guestLastName?: string;
    guestEmail?: string;
    guestPhone?: string;
    company?: string;
  };
  specialRequests: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PaymentData {
  method: 'card' | 'mobile' | 'cash';
  option: 'full' | 'partial' | 'later';
  partialAmount?: number;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  mobileNumber?: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = parseInt(params.roomId as string);
  const room = sampleRooms.find((r: Room) => r.id === roomId);

  // Récupère les types de réservation disponibles pour cette chambre
  const availableReservationTypes = useMemo(() => room?.reservation_types || [], [room]);

  const [bookingData, setBookingData] = useState<BookingData>({
    
    reservationType: availableReservationTypes[0]?.code || 'classic',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    adults: 1,
    children: [],
    
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isForSomeoneElse: false
    },
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: 'card',
    option: 'full'
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Met à jour les horaires par défaut selon le type de réservation
  useEffect(() => {
    if (!room) return;

    const selectedType = availableReservationTypes.find(
      t => t.code === bookingData.reservationType
    );

    if (selectedType && selectedType.slots.length > 0) {
      setBookingData(prev => ({
        ...prev,
        checkInTime: `${selectedType.slots[0].checkin_time}:00`,
        checkOutTime: `${selectedType.slots[0].checkout_time}:00`
      }));
    }
 }, [bookingData.reservationType, room, availableReservationTypes]);

  // Récupère les données utilisateur et de recherche
  useEffect(() => {
    const loggedIn = localStorage.getItem('user_logged_in');
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserInfo({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.com',
        phone: '+229 97 12 34 56'
      });
      
      if (!bookingData.guestInfo.isForSomeoneElse) {
        setBookingData(prev => ({
          ...prev,
          guestInfo: {
            ...prev.guestInfo,
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@email.com',
            phone: '+229 97 12 34 56'
          }
        }));
      }
    }

    const searchData = sessionStorage.getItem('searchData');
    if (searchData) {
      const parsed = JSON.parse(searchData);
      setBookingData(prev => ({
        ...prev,
        reservationType: parsed.reservationType || availableReservationTypes[0]?.code || 'classic',
        checkInDate: parsed.checkIn ? parsed.checkIn.split('T')[0] : '',
        checkOutDate: parsed.checkOut ? parsed.checkOut.split('T')[0] : '',
        adults: parsed.adults || 1,
        children: parsed.roomsData?.[0]?.childrenAges?.map((age: number) => ({ age })) || []
      }));
    }
  }, [availableReservationTypes, bookingData.guestInfo.isForSomeoneElse]);




  const calculatePrice = useCallback(() => {
  if (!room) return { price: 0, duration: '' };

  const reservationType = room.reservation_types.find(
    t => t.code === bookingData.reservationType
  );
  const pricing = room.pricing.find(
    p => p.reservation_type_id === reservationType?.id
  );

  if (!reservationType || !pricing) return { price: 0, duration: '' };

  let basePrice = 0;
  let calculatedDuration = '';

  switch (bookingData.reservationType) {
    case 'classic':
      if (!bookingData.checkInDate || !bookingData.checkOutDate) {
        return { price: 0, duration: '' };
      }
      const nights = Math.max(1, Math.ceil(
        (new Date(bookingData.checkOutDate).getTime() - 
        new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
      ));
      basePrice = pricing.price * nights;
      calculatedDuration = `${nights} nuit${nights > 1 ? 's' : ''}`;
      break;

    case 'day_use':
      basePrice = pricing.price;
      calculatedDuration = '1 journée';
      break;

    case 'flexible':
      const start = new Date(`2000-01-01T${bookingData.checkInTime}`);
      const end = new Date(`2000-01-01T${bookingData.checkOutTime}`);
      const hours = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
      basePrice = pricing.hourly_price * hours;
      calculatedDuration = `${hours.toFixed(1)}h`;
      break;
  }

  return { price: basePrice, duration: calculatedDuration };
}, [room, bookingData.reservationType, bookingData.checkInDate, bookingData.checkOutDate, bookingData.checkInTime, bookingData.checkOutTime]);
const { price, duration } = useMemo(() => calculatePrice(), [calculatePrice]);

  function validateForm() {
    const errors: string[] = [];

    // Validation des dates
    if (bookingData.reservationType === 'classic' && 
        (!bookingData.checkInDate || !bookingData.checkOutDate)) {
      errors.push("Veuillez sélectionner les dates d'arrivée et de départ");
    }

    if ((bookingData.reservationType === 'day_use' || 
         bookingData.reservationType === 'flexible') && 
        !bookingData.checkInDate) {
      errors.push("Veuillez sélectionner une date");
    }

    // Validation capacité
    if (room && (bookingData.adults + bookingData.children.length > room.num_person)) {
      errors.push(`Cette chambre ne peut accueillir que ${room.num_person} personnes maximum`);
    }

    // Validation enfants
    bookingData.children.forEach((child, index) => {
      if (child.age < 0 || child.age > 17) {
        errors.push(`Âge invalide pour l'enfant ${index + 1} (doit être entre 0 et 17 ans)`);
      }
    });

    // Validation coordonnées
    if (!bookingData.guestInfo.firstName || !bookingData.guestInfo.lastName) {
      errors.push("Veuillez renseigner votre nom complet");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.guestInfo.email)) {
      errors.push("Email invalide");
    }

    if (!/^\+[\d\s]{8,15}$/.test(bookingData.guestInfo.phone)) {
      errors.push("Numéro de téléphone invalide (format: +229 XX XX XX XX)");
    }

    setFormErrors(errors);
    return errors.length === 0;
  }

  const handleBooking = () => {
    if (!validateForm()) return;
    setShowPayment(true);
  };

  const processPayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reservationData = {
      id: Date.now(),
      roomId: room?.id,
      roomName: room?.name,
      ...bookingData,
      totalPrice: price,
      paidAmount: paymentData.option === 'full' ? price : 
                 paymentData.option === 'partial' ? (paymentData.partialAmount || price * 0.5) : 0,
      status: paymentData.option === 'later' ? 'pending' : 'confirmed',
      paymentMethod: paymentData.method,
      createdAt: new Date().toISOString(),
      duration
    };

    const existingReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
    localStorage.setItem('userReservations', JSON.stringify([...existingReservations, reservationData]));

    setIsProcessing(false);
    setIsConfirmed(true);
    setTimeout(() => router.push(isLoggedIn ? '/client' : '/'), 3000);
  };

  if (!room) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Chambre non trouvée</h2>
          <Button onClick={() => router.push('/rooms')} className="bg-teal-600 hover:bg-teal-700">
            Retour aux chambres
          </Button>
        </Card>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Card className="p-12 max-w-md mx-auto bg-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center"
            >
              <CheckCircle className="h-12 w-12 text-teal-600" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Réservation Confirmée !</h2>
            <p className="text-gray-600 mb-6">
              {paymentData.option === 'full' ? "Paiement effectué avec succès." :
               paymentData.option === 'partial' ? "Acompte enregistré." : 
               "Réservation en attente de paiement."}
            </p>
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-teal-600" />
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button onClick={() => router.push('/rooms')} variant="ghost" className="mb-4 text-teal-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux chambres
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Réservation - {room.name}</h1>
            <p className="text-gray-600">Finalisez votre réservation</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {!showPayment ? (
              <>
                {/* Étape 1: Type de réservation */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">1. Type de réservation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {availableReservationTypes.map((type) => {
                      const Icon = type.code === 'classic' ? BedDouble :
                                  type.code === 'day_use' ? Clock : Star;
                      return (
                        <Card
                          key={type.id}
                          onClick={() => setBookingData(prev => ({ ...prev, reservationType: type.code }))}
                          className={`p-4 cursor-pointer border-2 transition-all ${
                            bookingData.reservationType === type.code
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <Icon className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                            <h5 className="font-medium text-gray-800">{type.name}</h5>
                            <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>

                {/* Étape 2: Dates et invités */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">2. Dates et invités</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Date {bookingData.reservationType === 'classic' ? "d'arrivée" : ""}</Label>
                      <Input
                        type="date"
                        value={bookingData.checkInDate}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkInDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {bookingData.reservationType === 'classic' && (
                      <div>
                        <Label>Date de départ</Label>
                        <Input
                          type="date"
                          value={bookingData.checkOutDate}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                          min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                  </div>

                  {bookingData.reservationType === 'flexible' && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label>Heure d&rsquo;arrivée</Label>
                        <Input
                          type="time"
                          value={bookingData.checkInTime}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkInTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Heure de départ</Label>
                        <Input
                          type="time"
                          value={bookingData.checkOutTime}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkOutTime: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label>Adultes</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setBookingData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          disabled={bookingData.adults <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{bookingData.adults}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setBookingData(prev => ({ ...prev, adults: Math.min(room.num_person, prev.adults + 1) }))}
                          disabled={bookingData.adults >= room.num_person}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Enfants</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (bookingData.children.length < 3) {
                              setBookingData(prev => ({
                                ...prev,
                                children: [...prev.children, { age: 5 }]
                              }));
                            }
                          }}
                          disabled={bookingData.children.length >= 3}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                      
                      {bookingData.children.map((child, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                          <Input
                            type="number"
                            min="0"
                            max="17"
                            value={child.age}
                            onChange={(e) => {
                              const newChildren = [...bookingData.children];
                              newChildren[index].age = parseInt(e.target.value);
                              setBookingData(prev => ({ ...prev, children: newChildren }));
                            }}
                            className="w-20"
                            placeholder="Âge"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newChildren = bookingData.children.filter((_, i) => i !== index);
                              setBookingData(prev => ({ ...prev, children: newChildren }));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Étape 3: Informations personnelles */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">3. Informations personnelles</h3>
                  
                  {isLoggedIn && (
                    <div className="mb-6 p-4 rounded-lg bg-teal-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Connecté en tant que {userInfo?.firstName} {userInfo?.lastName}
                          </h4>
                          <p className="text-sm text-gray-600">{userInfo?.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="forSomeoneElse"
                            checked={bookingData.guestInfo.isForSomeoneElse}
                            onChange={(e) => {
                              const isForSomeoneElse = e.target.checked;
                              setBookingData(prev => ({
                                ...prev,
                                guestInfo: {
                                  ...prev.guestInfo,
                                  isForSomeoneElse,
                                  firstName: isForSomeoneElse ? '' : userInfo?.firstName || '',
                                  lastName: isForSomeoneElse ? '' : userInfo?.lastName || '',
                                  email: isForSomeoneElse ? '' : userInfo?.email || '',
                                  phone: isForSomeoneElse ? '' : userInfo?.phone || ''
                                }
                              }));
                            }}
                            className="rounded text-teal-600"
                          />
                          <label htmlFor="forSomeoneElse" className="text-sm text-gray-800">
                            Réserver pour quelqu&rsquo;un d&rsquo;autre
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Prénom *</Label>
                      <Input
                        value={bookingData.guestInfo.firstName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestInfo: { ...prev.guestInfo, firstName: e.target.value }
                        }))}
                        disabled={isLoggedIn && !bookingData.guestInfo.isForSomeoneElse}
                      />
                    </div>
                    <div>
                      <Label>Nom *</Label>
                      <Input
                        value={bookingData.guestInfo.lastName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestInfo: { ...prev.guestInfo, lastName: e.target.value }
                        }))}
                        disabled={isLoggedIn && !bookingData.guestInfo.isForSomeoneElse}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={bookingData.guestInfo.email}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestInfo: { ...prev.guestInfo, email: e.target.value }
                        }))}
                        disabled={isLoggedIn && !bookingData.guestInfo.isForSomeoneElse}
                      />
                    </div>
                    <div>
                      <Label>Téléphone *</Label>
                      <Input
                        type="tel"
                        value={bookingData.guestInfo.phone}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestInfo: { ...prev.guestInfo, phone: e.target.value }
                        }))}
                        placeholder="+229 XX XX XX XX"
                        disabled={isLoggedIn && !bookingData.guestInfo.isForSomeoneElse}
                      />
                    </div>
                  </div>

                  {bookingData.guestInfo.isForSomeoneElse && (
                    <div className="mb-6">
                      <Label>Entreprise (optionnel)</Label>
                      <Input
                        value={bookingData.guestInfo.company || ''}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestInfo: { ...prev.guestInfo, company: e.target.value }
                        }))}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                  )}

                  <div>
                    <Label>Demandes spéciales (optionnel)</Label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Allergies, préférences, demandes particulières..."
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </Card>

                {formErrors.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Erreurs à corriger :</h4>
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {formErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={!price}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmer la réservation
                </Button>
              </>
            ) : (
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">4. Paiement et confirmation</h3>
                
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block text-gray-800">Options de paiement</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { 
                        value: 'full', 
                        label: 'Payer la totalité', 
                        desc: `${price.toLocaleString()} FCFA - Réservation confirmée immédiatement`,
                        icon: CheckCircle,
                        color: colors.teal
                      },
                      { 
                        value: 'partial', 
                        label: 'Payer un acompte', 
                        desc: `${Math.round(price * 0.5).toLocaleString()} FCFA - Solde à régler plus tard`,
                        icon: Wallet,
                        color: colors.orange
                      },
                      { 
                        value: 'later', 
                        label: 'Payer plus tard', 
                        desc: 'Réservation en attente - Chambre disponible pour d\'autres',
                        icon: Clock,
                        color: colors.maroon
                      }
                    ].map((option) => (
                      <Card
                        key={option.value}
                      onClick={() => setPaymentData(prev => ({ ...prev, option: option.value as 'full' | 'partial' | 'later' }))}
                        className={`p-4 cursor-pointer border-2 transition-all ${
                          paymentData.option === option.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                            style={{ backgroundColor: `${option.color}20` }}
                          >
                            <option.icon className="h-5 w-5" style={{ color: option.color }} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800">{option.label}</h5>
                            <p className="text-xs text-gray-600 mt-1">{option.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {paymentData.option === 'partial' && (
                  <div className="mb-6">
                    <Label>Montant de l&rsquo;acompte (FCFA)</Label>
                    <Input
                      type="number"
                      min={Math.round(price * 0.3)}
                      max={price}
                      value={paymentData.partialAmount || Math.round(price * 0.5)}
                      onChange={(e) => setPaymentData(prev => ({ 
                        ...prev, 
                        partialAmount: parseInt(e.target.value) 
                      }))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: {Math.round(price * 0.3).toLocaleString()} FCFA (30%)
                    </p>
                  </div>
                )}

                {paymentData.option !== 'later' && (
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block text-gray-800">Méthode de paiement</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'card', label: 'Carte bancaire', icon: CreditCard },
                        { value: 'mobile', label: 'Mobile Money', icon: Phone },
                        { value: 'cash', label: 'Espèces', icon: Banknote }
                      ].map((method) => (
                        <Card
                          key={method.value}
                        onClick={() => setPaymentData(prev => ({ ...prev, method: method.value as 'card' | 'mobile' | 'cash' }))}
                          className={`p-3 cursor-pointer border-2 transition-all ${
                            paymentData.method === method.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <method.icon className="h-6 w-6 mx-auto mb-2 text-teal-600" />
                            <p className="text-xs font-medium text-gray-800">{method.label}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {paymentData.option !== 'later' && paymentData.method === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <Label>Numéro de carte</Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber || ''}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Date d&rsquo;expiration</Label>
                      <Input
                        placeholder="MM/AA"
                        value={paymentData.expiryDate || ''}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input
                        placeholder="123"
                        value={paymentData.cvv || ''}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {paymentData.option !== 'later' && paymentData.method === 'mobile' && (
                  <div className="mb-6">
                    <Label>Numéro de téléphone</Label>
                    <Input
                      placeholder="+229 XX XX XX XX"
                      value={paymentData.mobileNumber || ''}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPayment(false)} 
                    className="flex-1 border-teal-600 text-teal-600"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessing}
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        {paymentData.option === 'full' ? 'Payer et confirmer' :
                         paymentData.option === 'partial' ? 'Payer l\'acompte' : 'Confirmer sans payer'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-sm sticky top-24">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Résumé de la réservation</h3>

              <div className="mb-6">
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold mb-2 text-gray-800">{room.name}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Jusqu&rsquo;à {room.num_person} personnes</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    <span>{room.surface_area}m²</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Vue {room.view}</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi className="h-4 w-4 mr-2" />
                    <span>WiFi: {room.wifiCode}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 mb-6">
                <div>
                  <h5 className="font-medium mb-2 text-gray-800">Type de réservation</h5>
                  <p className="text-sm text-gray-600 capitalize">
                    {bookingData.reservationType === 'classic' ? 'Séjour Classique' :
                     bookingData.reservationType === 'day_use' ? 'Day Use (Journée)' : 'Horaires Flexibles'}
                  </p>
                </div>

                {bookingData.checkInDate && (
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">
                      {bookingData.reservationType === 'classic' ? 'Dates' : 'Date'}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingData.checkInDate).toLocaleDateString('fr-FR', { 
                        weekday: 'long', day: 'numeric', month: 'long' 
                      })}
                      {bookingData.reservationType === 'classic' && bookingData.checkOutDate && (
                        <span> - {new Date(bookingData.checkOutDate).toLocaleDateString('fr-FR', { 
                          weekday: 'long', day: 'numeric', month: 'long' 
                        })}</span>
                      )}
                    </p>
                    {bookingData.reservationType === 'flexible' && (
                      <p className="text-xs text-gray-500 mt-1">
                        {bookingData.checkInTime} - {bookingData.checkOutTime}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h5 className="font-medium mb-2 text-gray-800">Invités</h5>
                  <p className="text-sm text-gray-600">
                    {bookingData.adults} adulte{bookingData.adults > 1 ? 's' : ''}
                    {bookingData.children.length > 0 && (
                      <span>, {bookingData.children.length} enfant{bookingData.children.length > 1 ? 's' : ''}</span>
                    )}
                  </p>
                  {bookingData.children.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Âges: {bookingData.children.map(c => c.age).join(', ')} ans
                    </p>
                  )}
                </div>

                {duration && (
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">Durée</h5>
                    <p className="text-sm text-gray-600">{duration}</p>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{price.toLocaleString()} FCFA</span>
                </div>
                <p className="text-xs text-gray-500">Taxes incluses</p>
              </div>

              {!showPayment ? (
                <Button
                  onClick={handleBooking}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={!price}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmer la réservation
                </Button>
              ) : (
                <div className="p-4 rounded-lg bg-teal-50">
                  <div className="text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                    <p className="text-sm font-medium text-gray-800">Paiement sécurisé</p>
                    <p className="text-xs text-gray-600">Vos données sont protégées</p>
                  </div>
                </div>
              )}

              <Button
                onClick={() => router.push('/booking/[roomId]/new')}
                variant="outline"
                className="w-full mt-3 border-teal-600 text-teal-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une chambre
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}