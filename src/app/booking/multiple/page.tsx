"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Badge } from '../../../../components/ui/badge';
import sampleRooms from '../../../../types';
import { Separator } from '../../../../components/ui/separator';
import Image from 'next/image';
import { 
   ArrowLeft,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Calendar,
  Users,
  BedDouble,
  Shield,
  Info,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  Star,
  Hotel,
  Wifi,
  Car,
  Coffee,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

// Color scheme - Updated
const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};

export interface Image {
  id: number;
  url: string;
}

interface RoomSelection {
  roomId: number;
  reservationType: 'classic' | 'day_use' | 'flexible';
  checkInDate: string;
  checkOutDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  hours?: number;
  count?: number;
}

interface BookingData {
  rooms: {[key: number]: number};
  selectedRooms: RoomSelection[];
  reservationType: string;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  totalPrice: number;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface MobileDetails {
  operator: string;
  number: string;
}

interface BankDetails {
  accountNumber: string;
  bankName: string;
}

interface PaymentInfo {
  method: 'card' | 'mobile' | 'bank' | 'cash';
  option: 'full' | 'partial' | 'onsite';
  cardDetails?: CardDetails;
  mobileDetails?: MobileDetails;
  bankDetails?: BankDetails;
}

interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface FormData {
  guestInfo: GuestInfo;
  paymentInfo: PaymentInfo;
}

interface RoomDetails {
  id: number;
  name: string;
  room_type: string;
  image: string;
  price_per_night: number;
  day_use_price?: number;
  hourly_rate?: number;
  num_person: number;
  reservationType: string;
  calculatedPrice: number;
  duration: string;
  checkInTime?: string;
  checkOutTime?: string;
  count?: number;
}

export default function BookingForm() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
const [showGuestForm, setShowGuestForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    guestInfo: {
      fullName: 'Sedjro',
      email: 'sedjro@gmail.com',
      phone: '0199587645',
      specialRequests: ''
    },
    paymentInfo: {
      method: 'card',
      option: 'full',
      cardDetails: {
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      },
      mobileDetails: {
        operator: 'mtn',
        number: ''
      },
      bankDetails: {
        accountNumber: '',
        bankName: ''
      }
    }
  });

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      const parsed = JSON.parse(data);
      setBookingData(parsed);
      console.log('Données de réservation récupérées:', parsed);
    } else {
      router.push('/');
    }
    
    // Simuler un utilisateur connecté (remplacer par vraie logique d'auth)
    const userLoggedIn = localStorage.getItem('user_logged_in');
    if (userLoggedIn) {
      setIsUserLoggedIn(true);
      setFormData(prev => ({
        ...prev,
        guestInfo: {
          fullName: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          phone: '+229 XX XX XX XX',
          specialRequests: ''
        }
      }));
    }
  }, [router]);

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

const handleNestedInputChange = (
  section: keyof FormData, 
  nestedSection: string, 
  field: string, 
  value: string
) => {
  if (section === 'paymentInfo') {
    setFormData(prev => ({
      ...prev,
      paymentInfo: {
        ...prev.paymentInfo,
        [nestedSection]: {
          ...(prev.paymentInfo[nestedSection as keyof PaymentInfo] as object), // Type assertion
          [field]: value
        }
      }
    }));
  }
};


  const calculateNights = (checkIn: string, checkOut: string) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
};


 const formatBeninPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('229')) {
    return cleaned.slice(3);
  }
  
  // Formatage visuel : 01 XX XX XX
  if (cleaned.length <= 8) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  
  return cleaned;
};

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const checkIn = bookingData?.checkIn ?? '';
const checkOut = bookingData?.checkOut ?? '';
if (typeof checkIn === 'string' && typeof checkOut === 'string') {
  const nights = calculateNights(checkIn, checkOut);
  console.log(`Nombre de nuits : ${nights}`);
} else {
  console.error('Invalid check-in or check-out dates');
}
  
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentStep(3);
    
   
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const calculatePaymentAmount = () => {
    if (!bookingData) return 0;
    const total = bookingData.totalPrice;
    switch (formData.paymentInfo.option) {
      case 'partial':
        return Math.round(total * 0.5);
      case 'onsite':
        return 0;
      default:
        return total;
    }
  };

  // Fonction utilitaire pour calculer le nombre total de chambres
 const getTotalRoomsCount = () => {
  if (!bookingData || !bookingData.selectedRooms) return 0;

  return bookingData.selectedRooms.reduce((sum, selection) => {
    return sum + (selection.count ?? 1);
  }, 0);
};


const getSelectedRoomsDetails = (): RoomDetails[] => {
  if (!bookingData || !bookingData.selectedRooms) return [];

  return bookingData.selectedRooms.map((selection: RoomSelection) => {
    const room = sampleRooms.find(r => r.id === selection.roomId);
    if (!room) throw new Error(`Room not found with id ${selection.roomId}`);

   
    let price = 0;
    if (selection.reservationType === 'classic') {
      const nights = Math.max(1, Math.ceil((new Date(selection.checkOutDate).getTime() - new Date(selection.checkInDate).getTime()) / (1000 * 60 * 60 * 24)));
      price = room.price_per_night * nights;
    } else if (selection.reservationType === 'day_use') {
      price = room.day_use_price || Math.round(room.price_per_night * 0.7);
    } else if (selection.reservationType === 'flexible') {
      const hourlyRate = room.hourly_rate || Math.round(room.price_per_night / 24);
      price = hourlyRate * (selection.hours || 1);
    }

    return {
      id: room.id,
      name: room.name,
      room_type: room.room_type,
      image: room.image,
      price_per_night: room.price_per_night,
      day_use_price: room.day_use_price,
      hourly_rate: room.hourly_rate,
      num_person: room.num_person,
      reservationType: selection.reservationType,
      calculatedPrice: price,
     duration: selection.hours ? `${selection.hours}h` : getDurationFromDates(selection),
      checkInTime: selection.checkInTime,
      checkOutTime: selection.checkOutTime,
      count: selection.count
    };
  }).filter((room): room is RoomDetails => room !== null);
};
function getDurationFromDates(
  room: RoomSelection,
  fallbackCheckIn?: string,
  fallbackCheckOut?: string
): string {
  const {
    reservationType,
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    hours
  } = room;

  const checkIn = new Date(checkInDate || fallbackCheckIn || '');
  const checkOut = new Date(checkOutDate || fallbackCheckOut || '');
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  if (reservationType === 'classic') {
    const nights = Math.max(
      1,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    );

    return `Arrivée : ${checkIn.toLocaleDateString('fr-FR', options)}\nDépart : ${checkOut.toLocaleDateString('fr-FR', options)}\nDurée : ${nights} nuit${nights > 1 ? 's' : ''}`;
  }

  if (reservationType === 'day_use') {
    return `Date : ${checkIn.toLocaleDateString('fr-FR', options)}\nDurée : 1 journée`;
  }

  if (reservationType === 'flexible') {
    return `Date : ${checkIn.toLocaleDateString('fr-FR', options)}\nHoraire : ${checkInTime} → ${checkOutTime}\nDurée : ${hours}h`;
  }

  return 'Durée non définie';
}




  const getReservationTypeLabel = (type: string) => {
    switch (type) {
      case 'classic': return 'Séjour Classique';
      case 'day_use': return 'Day Use (Journée)';
      case 'flexible': return 'Horaires Flexibles';
      default: return 'Séjour Classique';
    }
  };

  const getNights = () => {
    if (bookingData?.checkIn && bookingData?.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, diffDays);
    }
    return 0;
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Données de réservation manquantes</h2>
          <p className="text-gray-600 mb-4">Veuillez recommencer votre recherche.</p>
          <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la sélection
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.maroon }}>
              Finaliser votre réservation multiple
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complétez les informations pour confirmer vos <span className="font-semibold text-blue-600">{getTotalRoomsCount()}</span> chambre{getTotalRoomsCount() > 1 ? 's' : ''}
            </p>
            {/* Progress Steps */}
             <div className="flex justify-center items-center space-x-8 mb-8">
              {[
                { step: 1, label: "Vérification" },
                { step: 2, label: "Informations & Paiement" },
                { step: 3, label: "Confirmation" }
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl transform scale-105'
                          : 'bg-gray-200 text-gray-600 shadow-md'
                      }`}
                    >
                       {step === 3 && currentStep === 3 ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className={`text-sm mt-2 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-24 h-2 mx-6 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Booking Summary - Amélioré */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="overflow-hidden border-2 shadow-xl" style={{ borderColor: colors.gold }}>
                {/* Header avec gradient */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.teal} 100%)` 
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <Hotel className="w-full h-full" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <Star className="h-8 w-8 text-yellow-400 mr-3" />
                      <h3 className="text-2xl font-bold">Résumé de votre réservation</h3>
                    </div>
                    <p className="text-blue-100">
                      Hôtel Bain du Lac • Cotonou, Bénin
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Détails de la réservation */}

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
   <div className="bg-blue-50 rounded-xl p-4">
    <div className="flex items-center mb-3">
      <Calendar className="h-6 w-6 text-blue-600 mr-3" />
      <h4 className="font-bold text-gray-900 text-lg">Dates de séjour</h4>
    </div>

    {bookingData.selectedRooms.every(
      room =>
        room.checkInDate === bookingData.checkIn &&
        room.checkOutDate === bookingData.checkOut &&
        room.reservationType === bookingData.reservationType
    ) ? (
      <div className="space-y-2">
        <div className="text-sm text-blue-700 font-medium mb-1">
          {getReservationTypeLabel(bookingData.reservationType)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Arrivée:</span>
          <span className="font-semibold text-gray-900">
            {new Date(bookingData.checkIn!).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Départ:</span>
          <span className="font-semibold text-gray-900">
            {new Date(bookingData.checkOut!).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
          <span className="text-gray-600">Durée:</span>
          <Badge className="bg-blue-600 text-white">
  {getDurationFromDates(bookingData.selectedRooms[0], bookingData.checkIn!, bookingData.checkOut!)}
</Badge>

        </div>
      </div>
    ) : (
      <div className="space-y-4">
        {bookingData.selectedRooms.map((room, index) => {
          const fullRoom = sampleRooms.find(r => r.id === room.roomId);
          if (!fullRoom) return null;

          return (
            <div key={index} className="border-b pb-2 mb-2">
              <div className="font-medium text-gray-900">
                🛏 {fullRoom.name} – {getReservationTypeLabel(room.reservationType)}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Arrivée :</span>
                  <span>{new Date(room.checkInDate).toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Départ :</span>
                  <span>{new Date(room.checkOutDate).toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long'
                  })}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Durée :</span>
                  <span>{getDurationFromDates(room)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>

                    
                    {/* Invités */}
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <Users className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="font-bold text-gray-900 text-lg">Invités</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Adultes:</span>
                          <span className="font-semibold text-gray-900">{bookingData.adults}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Enfants:</span>
                          <span className="font-semibold text-gray-900">{bookingData.children}</span>
                        </div>
                        <div className="pt-2 border-t border-green-200">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total:</span>
                            <Badge className="bg-green-600 text-white">
                              {bookingData.adults + bookingData.children} personne{(bookingData.adults + bookingData.children) > 1 ? 's' : ''}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chambres sélectionnées */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center mb-4">
                      <BedDouble className="h-6 w-6 mr-3 text-purple-600" />
                      Détails de la réservation
                    </h4>
                    <div className="space-y-4">
                      {getSelectedRoomsDetails().map((room, index) => (
                        <motion.div 
                          key={`${room.id}-${index}`} 
                          className="p-4 bg-gray-50 rounded-lg border hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="relative w-20 h-16">
                              <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{room.name}</h5>
                              <p className="text-sm text-gray-600 capitalize">{room.room_type}</p>
                              <p className="text-sm font-medium text-blue-600">
                                {getReservationTypeLabel(room.reservationType)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-blue-600">
                                {room.calculatedPrice.toLocaleString()} FCFA
                              </p>
                              <p className="text-xs text-gray-500">{room.duration}</p>
                            </div>
                          </div>
                          
                          {/* Détails spécifiques au type de réservation */}
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-3 border-t">
                            {room.reservationType === 'classic' && (
                              <>
                                <div>Check-in: 14h00</div>
                                <div>Check-out: 12h00</div>
                              </>
                            )}
                            {room.reservationType === 'day_use' && (
                              <>
                                <div>Arrivée: 10h00</div>
                                <div>Départ: 17h00</div>
                              </>
                            )}
                            {room.reservationType === 'flexible' && (
                              <>
                                <div>Arrivée: {room.checkInTime || '14h00'}</div>
                                <div>Départ: {room.checkOutTime || '18h00'}</div>
                              </>
                            )}
                            <div className="col-span-2">
                              <span className="font-medium">Prix: </span>
                              {room.reservationType === 'classic' && `${room.price_per_night.toLocaleString()} FCFA/nuit`}
                              {room.reservationType === 'day_use' && `${(room.day_use_price || Math.round(room.price_per_night * 0.7)).toLocaleString()} FCFA/jour`}
                              {room.reservationType === 'flexible' && `${(room.hourly_rate || Math.round(room.price_per_night / 24)).toLocaleString()} FCFA/heure`}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />
                  
                  {/* Résumé financier détaillé */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Détail des prix</h4>
                    {getSelectedRoomsDetails().map((room, index) => (
                      <div key={`price-${room.id}-${index}`} className="flex justify-between text-sm">
                        <span>{room.name} - {getReservationTypeLabel(room.reservationType)}</span>
                        <span>{room.calculatedPrice.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Sous-total</span>
                        <span>{bookingData.totalPrice.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Taxes et frais</span>
                        <span>Inclus</span>
                      </div>
                    </div>
                  </div>

                  {/* Services inclus */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-600" />
                      Services inclus
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: Wifi, label: 'WiFi gratuit' },
                        { icon: Car, label: 'Parking' },
                        { icon: Coffee, label: 'Petit-déjeuner' },
                        { icon: Shield, label: 'Sécurité 24h' }
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <service.icon className="h-4 w-4 mr-2 text-green-600" />
                          {service.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium opacity-90">Total de votre séjour</h4>
                        <p className="text-sm opacity-75">
                          {getNights()} nuit{getNights() > 1 ? 's' : ''} • Taxes et services inclus
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">
                          {bookingData.totalPrice.toLocaleString()} FCFA
                        </div>
                        {getNights() > 0 && (
                          <div className="text-sm opacity-75">
                            Soit {Math.round(bookingData.totalPrice / getNights()).toLocaleString()} FCFA/nuit
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      <Info className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-blue-900">
                        Vérifiez votre sélection
                      </h3>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Informations importantes</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>Vous avez sélectionné {getTotalRoomsCount()} chambre{getTotalRoomsCount() > 1 ? 's' : ''}</span>
                        </li>
                       <li className="flex items-start">
  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />  
  {Array.from(new Set(bookingData.selectedRooms.map(r => r.reservationType))).map(type => (
    <span key={type}>
      {type === 'classic' && `Séjour de ${getNights()} nuit${getNights() > 1 ? 's' : ''}`}
      {type === 'day_use' && 'Day Use (1 journée)'}
      {type === 'flexible' && 'Horaires flexibles (X heures)'} 
    </span>
  ))}
 
</li>

                       
                      </ul>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Veuillez vérifier les détails de votre réservation ci-dessus. 
                      Vous pourrez modifier vos informations personnelles et choisir votre mode de paiement à l'étape suivante.
                    </p>

                    <div className="flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                      >
                        Continuer
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      <User className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-blue-900">
                        Informations personnelles et paiement
                      </h3>
                    </div>

                    {/* Guest Information */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Informations du client principal
                      </h4>
                      
                      {isUserLoggedIn && !showGuestForm ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-sm font-medium text-green-800">Compte connecté</span>
                            </div>
                            <div className="text-sm text-green-700">
                              <p><strong>{formData.guestInfo.fullName}</strong></p>
                              <p>{formData.guestInfo.email}</p>
                              <p>{formData.guestInfo.phone}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowGuestForm(true)}
                              className="w-full"
                            >
                              Réserver pour quelqu'un d'autre
                            </Button>
                            <p className="text-xs text-gray-500 text-center">
                              Ou modifier les informations
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {showGuestForm && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-700">
                                <strong>Réservation pour un tiers</strong><br/>
                                Remplissez les informations de la personne qui séjournera.
                              </p>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Nom complet *</Label>
                              <div className="relative mt-2">
                                <Input
                                  value={formData.guestInfo.fullName}
                                  onChange={(e) => handleInputChange('guestInfo', 'fullName', e.target.value)}
                                  className="pl-10"
                                  placeholder="Entrez votre nom complet"
                                  required
                                />
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Adresse email *</Label>
                              <div className="relative mt-2">
                                <Input
                                  type="email"
                                  value={formData.guestInfo.email}
                                  onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                                  className="pl-10"
                                  placeholder="votre@email.com"
                                  required
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <Label className="text-sm font-medium text-gray-700">Numéro de téléphone *</Label>
                            <div className="relative mt-2">
                              <Input
  value={formData.guestInfo.phone || ''}
  onChange={(e) => handleInputChange('guestInfo', 'phone', formatBeninPhone(e.target.value))}
  placeholder="+229 01 XX XX XX"
  className="mt-1"
/>
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div className="mb-8">
                            <Label className="text-sm font-medium text-gray-700">Demandes spéciales</Label>
                            <textarea
                              value={formData.guestInfo.specialRequests}
                              onChange={(e) => handleInputChange('guestInfo', 'specialRequests', e.target.value)}
                              className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={3}
                              placeholder="Allergies, préférences, demandes particulières..."
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Payment Options */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        Options de paiement
                      </h4>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
  { key: 'full', label: '100%', desc: 'Payer ou ne pas payer', badge: 'Recommandé' },
  { key: 'partial', label: '50%', desc: "50% d'acompte pour garantir la réservation", badge: 'Populaire' },
  { key: 'onsite', label: '0%', desc: 'Pas de paiement = pas de garantie de chambre', badge: 'Risque' }
].map((option) => (
                          <Card
                            key={option.key}
                            className={`p-4 cursor-pointer border-2 transition-all duration-300 relative ${
                              formData.paymentInfo.option === option.key
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                            onClick={() => handleInputChange('paymentInfo', 'option', option.key)}
                          >
                            {option.badge && (
                              <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                                {option.badge}
                              </Badge>
                            )}
                            <div className="text-center">
                              <div className="font-bold text-2xl text-blue-600">{option.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                              {formData.paymentInfo.option === option.key && (
                                <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>

                      {/* Payment Methods */}
                      {formData.paymentInfo.option !== 'onsite' && (
                        <div className="mb-6">
                          <Label className="text-base font-semibold mb-3 block">Méthode de paiement</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                              { key: 'card', label: 'Carte bancaire', icon: CreditCard, desc: 'Visa, Mastercard' },
                              { key: 'mobile', label: 'Mobile Money', icon: Smartphone, desc: 'MTN, Moov' },
                              { key: 'bank', label: 'Virement', icon: Building, desc: 'Banque' },
                              { key: 'cash', label: 'Espèces', icon: Banknote, desc: 'À la réception' }
                            ].map((method) => (
                              <Card
                                key={method.key}
                                className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                                  formData.paymentInfo.method === method.key
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                                onClick={() => handleInputChange('paymentInfo', 'method', method.key)}
                              >
                                <div className="text-center">
                                  <method.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                  <div className="text-sm font-medium">{method.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{method.desc}</div>
                                  {formData.paymentInfo.method === method.key && (
                                    <Check className="h-4 w-4 text-blue-600 mx-auto mt-2" />
                                  )}
                                </div>
                              </Card>
                            ))}
                          </div>

                          {/* Payment Details Forms */}
                          <AnimatePresence>
                            {formData.paymentInfo.method === 'card' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 p-6 rounded-lg"
                              >
                                <h4 className="font-semibold mb-4 flex items-center">
                                  <CreditCard className="h-5 w-5 mr-2" />
                                  Informations de carte
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="md:col-span-2">
                                    <Label className="text-sm">Nom sur la carte</Label>
                                    <Input
                                      value={formData.paymentInfo.cardDetails?.name || ''}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'cardDetails', 'name', e.target.value)}
                                      placeholder="Nom complet"
                                      className="mt-1"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <Label className="text-sm">Numéro de carte</Label>
                                    <Input
                                      value={formData.paymentInfo.cardDetails?.number || ''}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'cardDetails', 'number', formatCardNumber(e.target.value))}
                                      placeholder="1234 5678 9012 3456"
                                      maxLength={19}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">Date d'expiration</Label>
                                    <Input
                                      value={formData.paymentInfo.cardDetails?.expiry || ''}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'cardDetails', 'expiry', formatExpiry(e.target.value))}
                                      placeholder="MM/AA"
                                      maxLength={5}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">CVV</Label>
                                    <div className="relative">
                                      <Input
                                        type={showCvv ? 'text' : 'password'}
                                        value={formData.paymentInfo.cardDetails?.cvv || ''}
                                        onChange={(e) => handleNestedInputChange('paymentInfo', 'cardDetails', 'cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                                        placeholder="123"
                                        maxLength={3}
                                        className="mt-1 pr-10"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowCvv(!showCvv)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                      >
                                        {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {formData.paymentInfo.method === 'mobile' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 p-6 rounded-lg"
                              >
                                <h4 className="font-semibold mb-4 flex items-center">
                                  <Smartphone className="h-5 w-5 mr-2" />
                                  Mobile Money
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm">Opérateur</Label>
                                    <select
                                      value={formData.paymentInfo.mobileDetails?.operator || 'mtn'}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'mobileDetails', 'operator', e.target.value)}
                                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                      <option value="mtn">MTN Mobile Money</option>
                                      <option value="moov">Moov Money</option>
                                    </select>
                                  </div>
                                  <div>
                                  <Label className="text-sm">Numéro de téléphone</Label>
<Input
  value={formData.paymentInfo.mobileDetails?.number || ''}
  onChange={(e) => handleNestedInputChange('paymentInfo', 'mobileDetails', 'number', formatBeninPhone(e.target.value))}
  placeholder="+229 01 XX XX XX"
  className="mt-1"
/>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {formData.paymentInfo.method === 'bank' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 p-6 rounded-lg"
                              >
                                <h4 className="font-semibold mb-4 flex items-center">
                                  <Building className="h-5 w-5 mr-2" />
                                  Virement bancaire
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm">Nom de la banque</Label>
                                    <select
                                      value={formData.paymentInfo.bankDetails?.bankName || ''}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'bankName', e.target.value)}
                                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                      <option value="">Sélectionner une banque</option>
                                      <option value="ecobank">Ecobank</option>
                                      <option value="boa">Bank of Africa</option>
                                      <option value="sgb">Société Générale Bénin</option>
                                      <option value="orabank">Orabank</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label className="text-sm">Numéro de compte</Label>
                                    <Input
                                      value={formData.paymentInfo.bankDetails?.accountNumber || ''}
                                      onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'accountNumber', e.target.value)}
                                      placeholder="Numéro de compte"
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                        disabled={isSubmitting || !formData.guestInfo.fullName || !formData.guestInfo.email || !formData.guestInfo.phone}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Traitement...
                          </>
                        ) : (
                          <>
                            Confirmer la réservation
                            <CheckCircle className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && isSuccess && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="p-8 text-center shadow-lg">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-blue-900">
                      Réservation confirmée !
                    </h3>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                      Merci {formData.guestInfo.fullName.split(' ')[0]} ! Votre réservation multiple a été confirmée.
                      Vous recevrez un email de confirmation à {formData.guestInfo.email}.
                    </p>

                   <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg mb-8 text-left">
  <h4 className="font-semibold mb-4 text-lg">Détails de votre réservation</h4>
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Numéro de réservation:</span>
      <span className="font-bold text-blue-600">#BDL{Date.now().toString().slice(-6)}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Nombre de chambres:</span>
     <span className="font-medium">
  {getTotalRoomsCount()}
</span>

    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Durée du séjour:</span>
      <span className="font-medium">{getNights()} nuit{getNights() > 1 ? 's' : ''}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Montant payé:</span>
      <span className="font-bold text-xl text-blue-600">
        {calculatePaymentAmount().toLocaleString()} FCFA
      </span>
    </div>
    {formData.paymentInfo.option === 'partial' && (
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Solde à régler:</span>
        <span className="font-medium text-orange-600">
          {(bookingData.totalPrice - calculatePaymentAmount()).toLocaleString()} FCFA
        </span>
      </div>
    )}
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>Prix moyen par nuit:</span>
      <span>{Math.round(bookingData.totalPrice / getNights()).toLocaleString()} FCFA</span>
    </div>
  </div>
</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="px-6"
                      >
                        Retour à l'accueil
                      </Button>
                      <Button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 px-6"
                      >
                        Imprimer la confirmation
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 shadow-lg border-2" style={{ borderColor: colors.gold }}>
                <div className="flex items-center mb-4">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Résumé du paiement</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total:</span>
                    <span>{bookingData.totalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes et frais:</span>
                    <span className="text-green-600">Inclus</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Durée du séjour:</span>
                    <span>{getNights()} nuit{getNights() > 1 ? 's' : ''}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      {bookingData.totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  {formData.paymentInfo.option === 'partial' && (
                    <div className="bg-orange-50 p-3 rounded-lg mt-3">
                      <div className="flex justify-between text-sm">
                        <span>À payer maintenant:</span>
                        <span className="font-bold">{calculatePaymentAmount().toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Solde sur place:</span>
                        <span>{(bookingData.totalPrice - calculatePaymentAmount()).toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  )}
                  
                  {formData.paymentInfo.option === 'onsite' && (
                    <div className="bg-blue-50 p-3 rounded-lg mt-3">
                      <div className="text-sm text-center">
                        <span className="font-medium">Paiement intégral sur place</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-sm text-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}