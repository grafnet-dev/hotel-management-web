"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Badge } from '../../../../components/ui/badge';
import  sampleRooms  from '../../../../types';
import { Separator } from '../../../../components/ui/separator';
import Image from 'next/image';
import { 
  Users, 
  Maximize2, 

  BedDouble, 
  Wifi,
  DogIcon,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  Building,
  Clock,
  Calendar,
  MapPin,
  Star,
  Shield,
  Info,
  Eye,
  EyeOff,
  ChevronRight,
  
  Check
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

// Color scheme
const colors = {
  maroon: '#800020',
  gold: '#CE9226',
  teal: '#008B8B',
  darkTeal: '#005D7C',
  orange: '#FF6B35',
  cream: '#F5F5DC'
};

interface Room {
  id: number;
  name: string;
  status: string;
  room_type: string;
  num_person: number;
  is_available: boolean;
  price_per_night: number;
  day_use_price: number;
  hourly_rate: number;
  floor: string;
  surface_area: number;
  view: string | boolean;
  bed_type: string | boolean;
  flooring_type: string | boolean;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
  room_images: {
    image: string;
  }[];
  amenities: Array<{
    id: number;
    name: string;
    description: string | boolean;
    icon: string;
  }>;
  reservation_types: Array<{
    id: number;
    name: string;
    code: string;
    description: string | boolean;
    is_flexible: boolean;
    slots: Array<{
      checkin_time: number;
      checkout_time: number;
    }>;
  }>;
  pricing: Array<{
    reservation_type_id: number;
    reservation_type_name: string;
    price: number;
    hourly_price: number;
    is_hourly_based: boolean;
    currency: string | null;
  }>;
}

interface BookingFormData {
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
  reservationDetails: {
    reservationType: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime: string;
    checkOutTime: string;
    hours: number;
    guests: number;
  };
  paymentInfo: {
    method: 'card' | 'mobile' | 'bank' | 'cash';
    option: 'full' | 'partial' | 'onsite';
    cardDetails?: {
      number: string;
      expiry: string;
      cvv: string;
      name: string;
    };
    mobileDetails?: {
      operator: string;
      number: string;
    };
    bankDetails?: {
      accountNumber: string;
      bankName: string;
    };
  };
}

export default function BookingForm() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [showCvv, setShowCvv] = useState(false);
 

  const [formData, setFormData] = useState<BookingFormData>({
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    reservationDetails: {
      reservationType: '',
      checkInDate: '',
      checkOutDate: '',
      checkInTime: '',
      checkOutTime: '',
      hours: 1,
      guests: 1
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
    // Find room by ID
    const foundRoom = sampleRooms.find(r => r.id.toString() === roomId);
    if (foundRoom) {
      setRoom(foundRoom);
      // Set default reservation type
      if (foundRoom.reservation_types.length > 0) {
        setFormData(prev => ({
          ...prev,
          reservationDetails: {
            ...prev.reservationDetails,
            reservationType: foundRoom.reservation_types[0].code,
            guests: foundRoom.num_person
          }
        }));
      }
    }
  }, [roomId]);

  const selectedReservationType = room?.reservation_types.find(
    rt => rt.code === formData.reservationDetails.reservationType
  );

  const selectedPricing = room?.pricing.find(
    p => p.reservation_type_id === selectedReservationType?.id
  );

  const calculateTotalPrice = () => {
    if (!selectedPricing) return 0;

    if (formData.reservationDetails.reservationType === 'flexible' && selectedPricing.is_hourly_based) {
      return selectedPricing.hourly_price * formData.reservationDetails.hours;
    }

    if (formData.reservationDetails.reservationType === 'day_use') {
      return room?.day_use_price || 0;
    }

    if (formData.reservationDetails.reservationType === 'classic') {
      const checkIn = new Date(formData.reservationDetails.checkInDate);
      const checkOut = new Date(formData.reservationDetails.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return selectedPricing.price * Math.max(1, nights);
    }

    return selectedPricing.price;
  };

  const calculatePaymentAmount = () => {
    const total = calculateTotalPrice();
    switch (formData.paymentInfo.option) {
      case 'partial':
        return Math.ceil(total * 0.5);
      case 'onsite':
        return 0;
      default:
        return total;
    }
  };

  const getNights = () => {
    if (formData.reservationDetails.checkInDate && formData.reservationDetails.checkOutDate) {
      const checkIn = new Date(formData.reservationDetails.checkInDate);
      const checkOut = new Date(formData.reservationDetails.checkOutDate);
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleInputChange = (section: keyof BookingFormData, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: keyof BookingFormData, nestedSection: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection as keyof typeof prev[section]],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentStep(4);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
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

  if (!room) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chambre non trouvée</h2>
          <p className="text-gray-600 mb-4">La chambre demandée n'existe pas ou n'est plus disponible.</p>
          <Button onClick={() => router.push('/rooms')} className="bg-teal-600 hover:bg-teal-700">
            Retour aux chambres
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header avec breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/rooms')}
              className="text-gray-600 hover:text-gray-900 p-0 h-auto"
            >
              Chambres
            </Button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{room.name}</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600">Réservation</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.maroon }}>
              Finaliser votre réservation
            </h1>
            <p className="text-gray-600 mb-6">Complétez les informations ci-dessous pour confirmer votre séjour</p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              {[
                { step: 1, label: "Détails" },
                { step: 2, label: "Informations" },
                { step: 3, label: "Paiement" },
                { step: 4, label: "Confirmation" }
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step
                          ? 'bg-teal-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step === 4 && isSuccess ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${currentStep >= step ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 mx-4 transition-all duration-300 ${
                        currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
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
            {/* Room Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="p-6 border-2 shadow-lg" style={{ borderColor: colors.gold }}>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Votre sélection</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <Image
                      src={room.image}
                      alt={room.name}
                      width={300}
                      height={200}
                      className="object-cover rounded-lg w-full h-48"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      Disponible
                    </Badge>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{room.name}</h4>
                        <p className="text-gray-600 capitalize">{room.room_type}</p>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">Étage {room.floor} • Vue {typeof room.view === 'string' ? room.view : 'standard'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{room.num_person} pers. max</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Maximize2 className="h-4 w-4 mr-2" />
                        <span>{room.surface_area}m²</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <BedDouble className="h-4 w-4 mr-2" />
                        <span>{typeof room.bed_type === 'string' ? room.bed_type : 'Lit standard'}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Wifi className="h-4 w-4 mr-2" />
                        <span>WiFi gratuit</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity.id} variant="outline" className="text-xs">
                          {amenity.name}
                        </Badge>
                      ))}
                      {room.is_pets_allowed && (
                        <Badge variant="outline" className="text-xs">
                          <DogIcon className="h-3 w-3 mr-1" />
                          Animaux acceptés
                        </Badge>
                      )}
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
                      <Calendar className="h-6 w-6 text-teal-600 mr-3" />
                      <h3 className="text-xl font-bold" style={{ color: colors.maroon }}>
                        Détails de votre réservation
                      </h3>
                    </div>

                    {/* Reservation Type Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-4 block flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-teal-600" />
                        Type de réservation
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {room.reservation_types.map((type) => {
                          const pricing = room.pricing.find(p => p.reservation_type_id === type.id);
                          return (
                            <motion.div
                              key={type.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card
                                className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                                  formData.reservationDetails.reservationType === type.code
                                    ? 'border-teal-500 bg-teal-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                                onClick={() => handleInputChange('reservationDetails', 'reservationType', type.code)}
                              >
                                <div className="text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    {formData.reservationDetails.reservationType === type.code && (
                                      <Check className="h-5 w-5 text-teal-600 mr-2" />
                                    )}
                                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                                  </div>
                                  {type.description && (
                                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                                  )}
                                  {pricing && (
                                    <div className="text-lg font-bold" style={{ color: colors.teal }}>
                                      {pricing.price.toLocaleString()} FCFA
                                      {pricing.is_hourly_based && <span className="text-sm">/heure</span>}
                                      {type.code === 'classic' && <span className="text-sm">/nuit</span>}
                                    </div>
                                  )}
                                  {type.slots.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-2 bg-gray-100 rounded px-2 py-1">
                                      {type.slots[0].checkin_time}h - {type.slots[0].checkout_time}h
                                    </div>
                                  )}
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date Selection */}
                    {formData.reservationDetails.reservationType === 'classic' && (
                      <div className="mb-8">
                        <Label className="text-base font-semibold mb-4 block">Dates de séjour</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-gray-600">Date d'arrivée</Label>
                            <Input
                              type="date"
                              value={formData.reservationDetails.checkInDate}
                              onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600">Date de départ</Label>
                            <Input
                              type="date"
                              value={formData.reservationDetails.checkOutDate}
                              onChange={(e) => handleInputChange('reservationDetails', 'checkOutDate', e.target.value)}
                              min={formData.reservationDetails.checkInDate || new Date().toISOString().split('T')[0]}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        {getNights() > 0 && (
                          <div className="mt-2 text-sm text-teal-600 font-medium">
                            {getNights()} nuit{getNights() > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    )}

                    {formData.reservationDetails.reservationType === 'day_use' && (
                      <div className="mb-8">
                        <Label className="text-base font-semibold mb-4 block">Date de visite</Label>
                        <Input
                          type="date"
                          value={formData.reservationDetails.checkInDate}
                          onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="max-w-md"
                        />
                      </div>
                    )}

                    {formData.reservationDetails.reservationType === 'flexible' && selectedPricing?.is_hourly_based && (
                      <div className="mb-8">
                        <Label className="text-base font-semibold mb-4 block">Horaires flexibles</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm text-gray-600">Date</Label>
                            <Input
                              type="date"
                              value={formData.reservationDetails.checkInDate}
                              onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600">Heure d'arrivée</Label>
                            <Input
                              type="time"
                              value={formData.reservationDetails.checkInTime}
                              onChange={(e) => handleInputChange('reservationDetails', 'checkInTime', e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600">Nombre d'heures</Label>
                            <Input
                              type="number"
                              min="1"
                              max="12"
                              value={formData.reservationDetails.hours}
                              onChange={(e) => handleInputChange('reservationDetails', 'hours', parseInt(e.target.value))}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Guests */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-4 block flex items-center">
                        <Users className="h-5 w-5 mr-2 text-teal-600" />
                        Nombre d'invités
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max={room.num_person}
                        value={formData.reservationDetails.guests}
                        onChange={(e) => handleInputChange('reservationDetails', 'guests', parseInt(e.target.value))}
                        className="max-w-md"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Maximum {room.num_person} personne{room.num_person > 1 ? 's' : ''} pour cette chambre
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="bg-teal-600 hover:bg-teal-700 px-8 py-3"
                        disabled={!formData.reservationDetails.reservationType}
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
                      <User className="h-6 w-6 text-teal-600 mr-3" />
                      <h3 className="text-xl font-bold" style={{ color: colors.maroon }}>
                        Informations personnelles
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                          type="tel"
                          value={formData.guestInfo.phone}
                          onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                          className="pl-10"
                          placeholder="+229 XX XX XX XX"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="mb-8">
                      <Label className="text-sm font-medium text-gray-700">Demandes spéciales</Label>
                      <textarea
                        value={formData.guestInfo.specialRequests}
                        onChange={(e) => handleInputChange('guestInfo', 'specialRequests', e.target.value)}
                        className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        rows={4}
                        placeholder="Allergies, préférences alimentaires, demandes particulières..."
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-teal-600 hover:bg-teal-700 px-8"
                        disabled={!formData.guestInfo.fullName || !formData.guestInfo.email || !formData.guestInfo.phone}
                      >
                        Continuer
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      <CreditCard className="h-6 w-6 text-teal-600 mr-3" />
                      <h3 className="text-xl font-bold" style={{ color: colors.maroon }}>
                        Paiement sécurisé
                      </h3>
                      <Shield className="h-5 w-5 text-green-500 ml-2" />
                    </div>

                    {/* Payment Option */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-4 block">Option de paiement</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { key: 'full', label: '100%', desc: 'Payer maintenant', badge: 'Recommandé' },
                          { key: 'partial', label: '50%', desc: 'Acompte', badge: 'Populaire' },
                          { key: 'onsite', label: '0%', desc: 'Sur place', badge: null }
                        ].map((option) => (
                          <Card
                            key={option.key}
                            className={`p-4 cursor-pointer border-2 transition-all duration-300 relative ${
                              formData.paymentInfo.option === option.key
                                ? 'border-teal-500 bg-teal-50 shadow-md'
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
                              <div className="font-bold text-2xl text-teal-600">{option.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                              {formData.paymentInfo.option === option.key && (
                                <Check className="h-5 w-5 text-teal-600 mx-auto mt-2" />
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method */}
                    {formData.paymentInfo.option !== 'onsite' && (
                      <div className="mb-8">
                        <Label className="text-base font-semibold mb-4 block">Méthode de paiement</Label>
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
                                  ? 'border-teal-500 bg-teal-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                              }`}
                              onClick={() => handleInputChange('paymentInfo', 'method', method.key)}
                            >
                              <div className="text-center">
                                <method.icon className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                                <div className="text-sm font-medium">{method.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{method.desc}</div>
                                {formData.paymentInfo.method === method.key && (
                                  <Check className="h-4 w-4 text-teal-600 mx-auto mt-2" />
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
                                    onChange={(e) => handleNestedInputChange('paymentInfo', 'mobileDetails', 'number', e.target.value)}
                                    placeholder="+229 XX XX XX XX"
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

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-teal-600 hover:bg-teal-700 px-8"
                        disabled={isSubmitting}
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

              {currentStep === 4 && isSuccess && (
                <motion.div
                  key="step4"
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
                    
                    <h3 className="text-3xl font-bold mb-4" style={{ color: colors.maroon }}>
                      Réservation confirmée !
                    </h3>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                      Merci {formData.guestInfo.fullName.split(' ')[0]} ! Votre réservation a été confirmée.
                      Vous recevrez un email de confirmation à {formData.guestInfo.email}.
                    </p>

                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg mb-8 text-left">
                      <h4 className="font-semibold mb-4 text-lg">Détails de votre réservation</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Numéro de réservation:</span>
                          <span className="font-bold text-teal-600">#BDL{Date.now().toString().slice(-6)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Chambre:</span>
                          <span className="font-medium">{room.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Type de réservation:</span>
                          <span className="font-medium">{selectedReservationType?.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Montant payé:</span>
                          <span className="font-bold text-xl" style={{ color: colors.teal }}>
                            {calculatePaymentAmount().toLocaleString()} FCFA
                          </span>
                        </div>
                        {formData.paymentInfo.option === 'partial' && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Solde à régler:</span>
                            <span className="font-medium text-orange-600">
                              {(calculateTotalPrice() - calculatePaymentAmount()).toLocaleString()} FCFA
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => router.push('/rooms')}
                        variant="outline"
                        className="px-6"
                      >
                        Retour aux chambres
                      </Button>
                      <Button
                        onClick={() => router.push('/')}
                        className="bg-teal-600 hover:bg-teal-700 px-6"
                      >
                        Accueil
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Résumé de réservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 shadow-lg border-2" style={{ borderColor: colors.gold }}>
                <div className="flex items-center mb-4">
                  <Info className="h-5 w-5 text-teal-600 mr-2" />
                  <h3 className="text-lg font-semibold">Résumé de votre réservation</h3>
                </div>

                {/* Room Info */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                      <BedDouble className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{room.name}</h4>
                      <p className="text-sm text-gray-600">{room.room_type}</p>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                {formData.reservationDetails.reservationType && (
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedReservationType?.name}</span>
                    </div>
                    
                    {formData.reservationDetails.checkInDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {formData.reservationDetails.reservationType === 'classic' ? 'Arrivée:' : 'Date:'}
                        </span>
                        <span className="font-medium">
                          {new Date(formData.reservationDetails.checkInDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    
                    {formData.reservationDetails.checkOutDate && formData.reservationDetails.reservationType === 'classic' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Départ:</span>
                        <span className="font-medium">
                          {new Date(formData.reservationDetails.checkOutDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    
                    {formData.reservationDetails.reservationType === 'flexible' && formData.reservationDetails.hours > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{formData.reservationDetails.hours}h</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Invités:</span>
                      <span className="font-medium">{formData.reservationDetails.guests} personne{formData.reservationDetails.guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                )}

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total:</span>
                    <span>{calculateTotalPrice().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes et frais:</span>
                    <span className="text-green-600">Inclus</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span style={{ color: colors.teal }}>
                      {calculateTotalPrice().toLocaleString()} FCFA
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
                        <span>{(calculateTotalPrice() - calculatePaymentAmount()).toLocaleString()} FCFA</span>
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
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
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