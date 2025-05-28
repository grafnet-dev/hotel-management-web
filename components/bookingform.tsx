'use client';
import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  CreditCardIcon, 
  BanknotesIcon, 
  DevicePhoneMobileIcon, 
  CalendarIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  
  ArrowPathIcon,
  ClockIcon,ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';


type PaymentMethod = 'credit_card' | 'mobile_money' | 'cash';
type PaymentOption = 'full' | 'half' | 'none';
type BookingStep = 'info' | 'payment' | 'confirmation';

type GuestInfo = {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  whatsappNotification: boolean;
};

interface BookingData {
  guestInfo: GuestInfo
  checkInDate: string
  checkOutDate: string
  isDayUse: boolean
  paymentMethod: string
  paymentOption: string
}


type BookingFormProps = {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: BookingData) => Promise<boolean>;
};

const BookingForm = ({ room, isOpen, onClose, onSubmit }: BookingFormProps) => {
  const [step, setStep] = useState<BookingStep>('info');
  const [isDayUse, setIsDayUse] = useState(room.is_day_use || false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nightsCount, setNightsCount] = useState(1);
  
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    whatsappNotification: true
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    phone: '',
    network: 'MTN'
  });

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Calculate prices
  const basePrice = isDayUse ? room.day_use_price : room.price_per_night;
  const totalPrice = isDayUse ? basePrice : basePrice * nightsCount;
  const amountToPay = paymentOption === 'full' ? totalPrice : 
                     paymentOption === 'half' ? Math.ceil(totalPrice / 2) : 0;

  // Calculate nights when check-in/out changes
  useEffect(() => {
    if (checkInDate && checkOutDate && !isDayUse) {
      const diffTime = Math.abs(new Date(checkOutDate).getTime() - new Date(checkInDate).getTime());
      setNightsCount(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
  }, [checkInDate, checkOutDate, isDayUse]);

  // Reset form when room changes
  useEffect(() => {
    if (!isOpen) return;
    
    setIsDayUse(room.is_day_use || false);
    setStep('info');
    setIsSuccess(false);
    setGuestInfo({
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
      whatsappNotification: true
    });
    setCheckInDate('');
    setCheckOutDate('');
    setNightsCount(1);
  }, [room, isOpen]);

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setGuestInfo(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileMoneyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMobileMoneyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestInfo.fullName || !guestInfo.email || !guestInfo.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!isDayUse && (!checkInDate || !checkOutDate)) {
      alert('Veuillez sélectionner les dates de séjour');
      return;
    }
    
    setStep('payment');
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Payment method specific validation
    if (paymentMethod === 'credit_card' && 
        (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      alert('Veuillez remplir tous les détails de la carte');
      setIsSubmitting(false);
      return;
    }
    
    if (paymentMethod === 'mobile_money' && !mobileMoneyDetails.phone) {
      alert('Veuillez entrer votre numéro Mobile Money');
      setIsSubmitting(false);
      return;
    }
    
    const bookingData: BookingData = {
      guestInfo,
      checkInDate: isDayUse ? new Date().toISOString().split('T')[0] : checkInDate,
      checkOutDate: isDayUse ? new Date().toISOString().split('T')[0] : checkOutDate,
      isDayUse,
      paymentMethod,
      paymentOption,
      ...(paymentMethod === 'credit_card' && { cardDetails }),
      ...(paymentMethod === 'mobile_money' && { mobileMoneyDetails })
    };
    
    const success = await onSubmit(bookingData);
    setIsSubmitting(false);
    if (isSuccess) {
  console.log('Booking was successful!');
}
    
    if (success === true ) {
  setIsSuccess(true);
  setStep('confirmation');
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Numéro de carte</label>
              <div className="relative">
                <input
                  type="text"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-gradient-to-r focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Expiration</label>
                <div className="relative">
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardDetailsChange}
                    placeholder="MM/AA"
                    className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
             <div className="relative group">
                <label className="block text-sm font-semibold text-gray-800 mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="123"
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300"
                />
              </div>
            </div>
            
           <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Nom sur la carte</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardDetailsChange}
                  placeholder="Nom complet"
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
            >
              <ShieldCheckIcon className="h-6 w-6 text-green-600 mr-3" />
              <span className="text-sm text-green-800 font-medium">Paiement 100% sécurisé avec cryptage SSL</span>
            </motion.div>
          </motion.div>
        );
        
      case 'mobile_money':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Réseau Mobile Money</label>
              <select
                name="network"
                value={mobileMoneyDetails.network}
                onChange={handleMobileMoneyChange}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="MTN">🟡 MTN Mobile Money</option>
                <option value="Celtis">🟢 Celtis</option>
                <option value="Moov">🔵 Moov Money</option>
                
              </select>
            </div>
            
            
             <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Numéro de téléphone</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={mobileMoneyDetails.phone}
                  onChange={handleMobileMoneyChange}
                  placeholder="Ex: 07 12 34 56 78"
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-400 transition-all duration-300 text-lg group-hover:border-gray-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                  <PhoneIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-amber-900 mb-1">Instructions de paiement</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Vous recevrez une demande de paiement sur ce numéro. Composez votre code PIN pour confirmer la transaction.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
        
       case 'cash':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                <BanknotesIcon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-blue-900">Paiement en espèces</h4>
                <p className="text-sm text-blue-700">À la réception de l'hôtel</p>
              </div>
            </div>
            <p className="text-blue-800 leading-relaxed">
              Vous paierez directement à la réception lors de votre arrivée. 
              {paymentOption === 'half' && ' Un acompte de 50% sera requis maintenant par un autre moyen.'}
              {paymentOption === 'none' && ' Aucun paiement ne sera effectué en ligne.'}
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
     <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3"
      >
        Réservation confirmée !
      </motion.h3>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-gray-600 mb-8"
      >
        Merci <span className="font-bold text-teal-600">{guestInfo.fullName.split(' ')[0]}</span> pour votre confiance ! 🎉
      </motion.p>
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 mb-8 border-2 border-gray-100 shadow-xl max-w-md mx-auto backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-black text-gray-900 text-xl">{room.name}</h4>
          <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full">
            {room.room_type}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          <div className="text-left">
            <p className="text-gray-500 font-medium mb-1">Arrivée</p>
            <p className="font-bold text-gray-900">
              {isDayUse ? 
                `Aujourd'hui à ${room.day_use_check_in}h` : 
                new Date(checkInDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
          </div>
           <div className="text-left">
            <p className="text-gray-500 font-medium mb-1">Départ</p>
            <p className="font-bold text-gray-900">
              {isDayUse ? 
                `Aujourd'hui à ${room.day_use_check_out}h` : 
                new Date(checkOutDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
        
         {!isDayUse && (
          <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 rounded-2xl">
            <span className="text-gray-600 font-medium">Nombre de nuits:</span>
            <span className="font-black text-xl text-gray-900">{nightsCount}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center border-t-2 border-gray-200 pt-6">
          <span className="font-black text-gray-900 text-lg">Total:</span>
          <div className="text-right">
            <span className="text-2xl font-black bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              {totalPrice.toLocaleString()} FCFA
            </span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200 max-w-md mx-auto"
      >
        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
          <ClockIcon className="h-5 w-5 mr-2 text-orange-500" />
          Prochaines étapes
        </h4>
        <ul className="text-sm text-gray-700 space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <EnvelopeIcon className="h-3 w-3 text-white" />
            </div>
            <span>Confirmation envoyée à <strong>{guestInfo.email}</strong></span>
          </li>
          {guestInfo.whatsappNotification && (
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <DevicePhoneMobileIcon className="h-3 w-3 text-white" />
              </div>
              <span>WhatsApp envoyé au <strong>{guestInfo.phone}</strong></span>
            </li>
          )}
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <ClockIcon className="h-3 w-3 text-white" />
            </div>
            <span>Check-in {isDayUse ? 
              `avant ${room.day_use_check_in}h` : 
              `à partir de ${room.default_check_in_time}h`}</span>
          </li>
        </ul>
      </motion.div>
      
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-8 py-4 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 rounded-2xl text-lg font-bold text-white hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Accueil ✨
      </motion.button>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Transition appear show={isOpen} as="div">
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
            </Transition.Child>

       <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as="div"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white text-left align-middle shadow-2xl transition-all border border-gray-200/50">
                    <div className="relative">
                      {/* Enhanced Background */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-purple-500/10"
                          style={{
                            backgroundImage: `url(${room.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(100px)',
                            opacity: 0.15
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95" />
                      </div>
                  
                 <div className="relative z-10">
                        {/* Enhanced Header */}
                        <div className="flex justify-between items-center p-8 border-b border-gray-200/50">
                          <div>
                            <Dialog.Title as="h3" className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              {step === 'info' ? '📋 Informations de réservation' : 
                               step === 'payment' ? '💳 Paiement sécurisé' : '🎉 Confirmation'}
                            </Dialog.Title>
                            <p className="text-sm text-gray-600 mt-1 font-medium">
                              Étape {step === 'info' ? '1' : step === 'payment' ? '2' : '3'} sur 3
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="p-3 text-gray-400 hover:text-gray-600 transition-colors bg-white/80 rounded-2xl shadow-sm hover:shadow-md"
                            onClick={onClose}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </motion.button>
                        </div>

                    <div className="p-8">
                          {step === 'confirmation' ? (
                            renderConfirmation()
                          ) : (
                            <>
                              
                              <motion.div 
                                layout
                                className="mb-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-black text-xl text-gray-900">{room.name}</h4>
                                  <span className="text-xs font-bold px-3 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full shadow-md">
                                    {room.room_type}
                                  </span>
                                </div>
                            {isDayUse ? (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 flex items-center"
                              >
                                <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  Day use: {room.day_use_check_in}h - {room.day_use_check_out}h
                                </div>
                                <div className="ml-2 text-sm font-bold text-orange-600">
                                  {room.day_use_price.toLocaleString()} FCFA
                                </div>
                              </motion.div>
                            ) : (
                              <div className="mt-2 flex items-center text-sm text-gray-600">
                                <span className="mr-3">{room.num_person} pers.</span>
                                <span>{room.surface_area} m²</span>
                                <span className="ml-auto font-bold text-teal-600">
                                  {room.price_per_night.toLocaleString()} FCFA/nuit
                                </span>
                              </div>
                            )}
                          </motion.div>

                          {step === 'info' ? (
                            <form onSubmit={handleSubmitInfo}>
                              <div className="space-y-4">
                                {room.is_day_use && (
                                  <motion.div 
                                    layout
                                    className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-100"
                                  >
                                    <input
                                      type="checkbox"
                                      id="dayUse"
                                      checked={isDayUse}
                                      onChange={(e) => setIsDayUse(e.target.checked)}
                                      className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                                    />
                                    <label htmlFor="dayUse" className="ml-3 block text-sm font-medium text-orange-800">
                                      Réservation Day-use
                                    </label>
                                  </motion.div>
                                )}

                                {!isDayUse && (
                                  <motion.div 
                                    layout
                                    className="grid grid-cols-2 gap-4"
                                  >
                                    <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                                      <input
                                        type="date"
                                        value={checkInDate}
                                        onChange={(e) => setCheckInDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        required
                                      />
                                      <CalendarIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                                      <input
                                        type="date"
                                        value={checkOutDate}
                                        onChange={(e) => setCheckOutDate(e.target.value)}
                                        min={checkInDate || new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        required
                                      />
                                      <CalendarIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                    </div>
                                  </motion.div>
                                )}

                                {!isDayUse && checkInDate && checkOutDate && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center text-sm bg-gray-50 p-2 rounded-lg"
                                  >
                                    {nightsCount} {nightsCount > 1 ? 'nuits' : 'nuit'} • Total: {totalPrice.toLocaleString()} FCFA
                                  </motion.div>
                                )}

                                <motion.div layout className="relative">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
                                  <input
                                    type="text"
                                    name="fullName"
                                    value={guestInfo.fullName}
                                    onChange={handleGuestInfoChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    required
                                  />
                                  <UserIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                </motion.div>

                                <div className="grid grid-cols-2 gap-4">
                                  <motion.div layout className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={guestInfo.email}
                                      onChange={handleGuestInfoChange}
                                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                      required
                                    />
                                    <EnvelopeIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                  </motion.div>
                                  <motion.div layout className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone <span className="text-red-500">*</span></label>
                                    <input
                                      type="tel"
                                      name="phone"
                                      value={guestInfo.phone}
                                      onChange={handleGuestInfoChange}
                                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                      required
                                    />
                                    <PhoneIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                                  </motion.div>
                                </div>

                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id="whatsappNotification"
                                    name="whatsappNotification"
                                    checked={guestInfo.whatsappNotification}
                                    onChange={handleGuestInfoChange}
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor="whatsappNotification" className="ml-2 block text-sm text-gray-700">
                                    Recevoir la confirmation par WhatsApp
                                  </label>
                                </div>

                                <motion.div layout>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Demandes spéciales</label>
                                  <textarea
                                    name="specialRequests"
                                    value={guestInfo.specialRequests}
                                    onChange={handleGuestInfoChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Avez-vous des demandes particulières ?"
                                  />
                                </motion.div>
                              </div>

                              <div className="mt-6 flex justify-end space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                  onClick={onClose}
                                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                  Annuler
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="submit"
                                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg text-sm font-medium text-white hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                >
                                  Continuer vers le paiement
                                </motion.button>
                              </div>
                            </form>
                          ) : (
                            <form onSubmit={handleSubmitPayment}>
                              <motion.div 
                                layout
                                className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-gray-100"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">Total:</span>
                                  <span className="font-bold text-xl text-teal-700">{totalPrice.toLocaleString()} FCFA</span>
                                </div>
                                {isDayUse ? (
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Durée:</span>
                                    <span className="font-medium text-gray-700">
                                      {room.day_use_check_in}h - {room.day_use_check_out}h
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Nuits:</span>
                                    <span className="font-medium text-gray-700">{nightsCount}</span>
                                  </div>
                                )}
                              </motion.div>

                              <motion.div layout className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Option de paiement</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentOption('full')}
                                    className={`py-2 px-3 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentOption === 'full'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="font-bold">100%</span>
                                    <span>Payer tout</span>
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentOption('half')}
                                    className={`py-2 px-3 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentOption === 'half'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="font-bold">50%</span>
                                    <span>Payer moitié</span>
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentOption('none')}
                                    className={`py-2 px-3 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentOption === 'none'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="font-bold">0%</span>
                                    <span>Sur place</span>
                                  </motion.button>
                                </div>
                              </motion.div>

                              <motion.div layout className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Méthode de paiement</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentMethod('credit_card')}
                                    className={`py-3 px-2 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentMethod === 'credit_card'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <CreditCardIcon className="h-6 w-6 mb-1" />
                                    Carte
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentMethod('mobile_money')}
                                    className={`py-3 px-2 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentMethod === 'mobile_money'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <DevicePhoneMobileIcon className="h-6 w-6 mb-1" />
                                    Mobile
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    type="button"
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`py-3 px-2 border rounded-lg text-sm font-medium flex flex-col items-center transition-all ${
                                      paymentMethod === 'cash'
                                        ? 'bg-teal-100 border-teal-500 text-teal-700 shadow-sm'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <BanknotesIcon className="h-6 w-6 mb-1" />
                                    Espèces
                                  </motion.button>
                                </div>
                              </motion.div>

                              {renderPaymentForm()}

                              {paymentOption !== 'none' && (
                                <motion.div 
                                  layout
                                  className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100"
                                >
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium text-blue-700">Montant à payer maintenant:</span>
                                    <span className="text-sm font-bold text-blue-700">{amountToPay.toLocaleString()} FCFA</span>
                                  </div>
                                </motion.div>
                              )}

                              <div className="mt-6 flex justify-between">
                                <motion.button
                                  whileHover={{ x: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                  onClick={() => setStep('info')}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                  ← Retour
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg text-sm font-medium text-white hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                                >
                                  {isSubmitting ? (
                                    <>
                                      <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                                      Traitement...
                                    </>
                                  ) : (
                                    'Confirmer la réservation'
                                  )}
                                </motion.button>
                              </div>
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        
        </div>
      </Dialog>
    </Transition>
      )}
      </AnimatePresence>
  );
};

export default BookingForm;