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
  Star
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

interface BookingData {
  rooms: {[key: number]: number};
  reservationType: string;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  totalPrice: number;
}

interface FormData {
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
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
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
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
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      router.push('/');
    }
  }, [router]);

  // Helper function to safely get room count
  const getTotalRoomCount = () => {
    if (!bookingData?.rooms) return 0;
    return Object.values(bookingData.rooms).reduce((sum, count) => sum + count, 0);
  };

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
  setFormData(prev => {
    if (section === 'paymentInfo') {
      return {
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          [nestedSection]: {
            ...(prev.paymentInfo as any)[nestedSection],
            [field]: value
          }
        }
      };
    }
    return prev;
  });
};

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentStep(3);
    
    // Trigger confetti
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
        return Math.ceil(total * 0.5);
      case 'onsite':
        return 0;
      default:
        return total;
    }
  };

const getSelectedRoomsDetails = () => {
  const rooms = bookingData?.rooms ?? {};
  return Object.entries(rooms)
    .map(([roomId, count]) => {
      const room = sampleRooms.find(r => r.id === parseInt(roomId));
      return room ? { ...room, count } : null;
    })
    .filter(Boolean);
};

  const getNights = () => {
    if (bookingData?.checkIn && bookingData?.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
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
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-white">
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
           <p className="text-gray-600 mb-6">
  Complétez les informations pour confirmer vos {getTotalRoomCount()} chambre{getTotalRoomCount() > 1 ? 's' : ''}
</p>

            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              {[
                { step: 1, label: "Vérification" },
                { step: 2, label: "Informations & Paiement" },
                { step: 3, label: "Confirmation" }
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step === 3 && isSuccess ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-4 transition-all duration-300 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
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
            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="p-6 border-2 shadow-lg" style={{ borderColor: colors.gold }}>
                <div className="flex items-center mb-6">
                  <Star className="h-6 w-6 text-yellow-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Résumé de votre réservation</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Dates de séjour</h4>
                        <p className="text-gray-600">
                          {bookingData.checkIn && new Date(bookingData.checkIn).toLocaleDateString('fr-FR', { 
                            weekday: 'long', day: 'numeric', month: 'long' 
                          })}
                        </p>
                        <p className="text-gray-600">
                          {bookingData.checkOut && new Date(bookingData.checkOut).toLocaleDateString('fr-FR', { 
                            weekday: 'long', day: 'numeric', month: 'long' 
                          })}
                        </p>
                        {getNights() > 0 && (
                          <p className="text-sm text-blue-600 font-medium">{getNights()} nuit{getNights() > 1 ? 's' : ''}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Invités</h4>
                        <p className="text-gray-600">
                          {bookingData.adults} adulte{bookingData.adults > 1 ? 's' : ''}, {bookingData.children} enfant{bookingData.children > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <BedDouble className="h-5 w-5 mr-2" />
                    Chambres sélectionnées
                  </h4>
                  {getSelectedRoomsDetails().map((room) => (
                    <div key={room?.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-20 h-16">
                        <Image
                          src={room?.image || ''}
                          alt={room?.name || ''}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{room?.name}</h5>
                        <p className="text-sm text-gray-600 capitalize">{room?.room_type}</p>
                        <p className="text-sm text-gray-600">Quantité: {room?.count}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {((room?.price_per_night || 0) * (room?.count || 0) * Math.max(1, getNights())).toLocaleString()} FCFA
                        </p>
                        <p className="text-xs text-gray-500">
                          {room?.price_per_night?.toLocaleString()} FCFA/nuit × {room?.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{bookingData.totalPrice.toLocaleString()} FCFA</span>
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
                          <span>Vous avez sélectionné {getTotalRoomCount()} chambre{getTotalRoomCount() > 1 ? 's' : ''}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>Séjour de {getNights()} nuit{getNights() > 1 ? 's' : ''}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                          <span>Capacité totale: {getSelectedRoomsDetails().reduce((sum, room) => sum + (room?.num_person || 0) * (room?.count || 0), 0)} personnes</span>
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
                          className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="Allergies, préférences, demandes particulières..."
                        />
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        Options de paiement
                      </h4>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { key: 'full', label: '100%', desc: 'Payer maintenant', badge: 'Recommandé' },
                          { key: 'partial', label: '50%', desc: 'Acompte', badge: 'Populaire' },
                          { key: 'onsite', label: '0%', desc: 'Sur place', badge: null }
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
                            {bookingData?.rooms ? Object.values(bookingData.rooms).reduce((sum, count) => sum + count, 0) : 0}
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
                              {((bookingData?.totalPrice || 0) - calculatePaymentAmount()).toLocaleString()} FCFA
                            </span>
                          </div>
                        )}
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
                    <span>{(bookingData?.totalPrice || 0).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes et frais:</span>
                    <span className="text-green-600">Inclus</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      {(bookingData?.totalPrice || 0).toLocaleString()} FCFA
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
                        <span>{((bookingData?.totalPrice || 0) - calculatePaymentAmount()).toLocaleString()} FCFA</span>
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